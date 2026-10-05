(function () {
  'use strict';
  var HANDOFF_KEY = 'bkGuideHandoff.v1';
  var LIFETIME = 10 * 60 * 1000;
  var ENDPOINT = 'https://formspree.io/f/xwvwrrjd';

  if (!window.fetch || !window.FormData) return;

  function isConfirmation(response, data) {
    if (!response.ok || !data || typeof data !== 'object' || data.ok === false || data.error || data.errors) return false;
    // Formspree's current public client recognises a string `next` as its
    // success acknowledgement. Restrict it to the expected success routes.
    if (typeof data.next !== 'string' || !data.next) return false;
    try {
      var target = new URL(data.next, ENDPOINT);
      return (target.origin === 'https://formspree.io' && /^\/thanks\/?$/.test(target.pathname)) ||
        (target.origin === 'https://bluekeymortgage.ca' && /^\/thank-you(?:\.html)?\/?$/.test(target.pathname));
    } catch (_) { return false; }
  }

  document.querySelectorAll('form[data-bk-form]').forEach(function (form) {
    if (form.action !== ENDPOINT) return;
    var button = form.querySelector('button[type="submit"]');
    var status = form.querySelector('[data-bk-status]');
    var downloads = form.querySelector('[data-bk-downloads]');
    var label = button.textContent;
    var state = { busy: false, accepted: false, uncertain: false, timer: null };

    function show(message, kind) {
      status.textContent = message;
      status.setAttribute('data-state', kind);
      status.hidden = false;
    }
    function update() {
      button.disabled = state.busy || state.accepted || state.uncertain;
      button.textContent = state.busy ? 'Submitting…' : label;
      form.setAttribute('aria-busy', state.busy ? 'true' : 'false');
    }
    function clearTimer() {
      if (state.timer !== null) window.clearTimeout(state.timer);
      state.timer = null;
    }
    function uncertain() {
      clearTimer();
      state.busy = false;
      state.uncertain = true;
      show('We could not confirm whether your request was submitted. Please call 647-231-3910 before sending it again.', 'uncertain');
      update();
    }
    function rejectFields(response, data) {
      if (![400, 422].includes(response.status) || !data || !Array.isArray(data.errors) || !data.errors.length) return false;
      if (!data.errors.every(function (e) { return e && ['name', 'email', 'phone', 'message'].includes(e.field) && typeof e.message === 'string'; })) return false;
      data.errors.forEach(function (e) {
        var input = form.elements.namedItem(e.field);
        if (input) input.setAttribute('aria-invalid', 'true');
      });
      state.uncertain = false;
      show('Your request was not accepted. Please check the highlighted details and try again, or call 647-231-3910.', 'error');
      return true;
    }
    function accepted() {
      clearTimer();
      state.busy = false;
      state.uncertain = false;
      state.accepted = true;
      if (downloads) {
        downloads.hidden = false;
        show('Your request was submitted. Your free guide is ready below.', 'success');
        update();
        var stored = false;
        try {
          var receipt = JSON.stringify({ confirmed: true, at: Date.now(), expiresAt: Date.now() + LIFETIME });
          window.sessionStorage.setItem(HANDOFF_KEY, receipt);
          stored = window.sessionStorage.getItem(HANDOFF_KEY) === receipt;
        } catch (_) {}
        // No personal details are stored. If storage is unavailable, the
        // confirmed inline links remain available without another submission.
        if (stored) {
          try { window.location.assign('/thank-you'); } catch (_) {}
        }
      } else {
        show('Your message was submitted. Ragini will review it. If you need to speak sooner, call 647-231-3910.', 'success');
        form.reset();
        update();
      }
    }

    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      if (state.busy || state.accepted || state.uncertain) return;
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = new FormData(form);
      if (typeof data.get('name') !== 'string' || !data.get('name').trim() || typeof data.get('email') !== 'string' || !data.get('email').trim()) {
        show('Please enter your name and email address to request the guide or send an enquiry.', 'error');
        return;
      }
      form.querySelectorAll('[aria-invalid]').forEach(function (el) { el.removeAttribute('aria-invalid'); });
      state.busy = true;
      show('Submitting your request…', 'pending');
      update();
      // A slow request is uncertain, not a failed request to retry. Keep the
      // original request in flight; a late valid acknowledgement can complete.
      state.timer = window.setTimeout(uncertain, 20000);
      try {
        var response = await window.fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' }, mode: 'cors', credentials: 'omit' });
        var result;
        try { result = await response.json(); } catch (_) { uncertain(); return; }
        if (isConfirmation(response, result)) { accepted(); return; }
        if (!rejectFields(response, result)) uncertain();
      } catch (_) { uncertain(); }
      finally { clearTimer(); state.busy = false; update(); }
    });
  });
}());
