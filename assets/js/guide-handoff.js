(function () {
  'use strict';
  var confirmed = false;
  try {
    var receipt = JSON.parse(window.sessionStorage.getItem('bkGuideHandoff.v1'));
    var now = Date.now();
    confirmed = !!receipt && receipt.confirmed === true && Number.isFinite(receipt.at) &&
      Number.isFinite(receipt.expiresAt) && receipt.at <= now && receipt.expiresAt > now &&
      receipt.expiresAt - receipt.at === 10 * 60 * 1000;
  } catch (_) {}
  var content = document.getElementById('bk-guide-confirmed');
  var fallback = document.getElementById('bk-guide-unconfirmed');
  if (confirmed && content && fallback) {
    content.hidden = false;
    fallback.hidden = true;
  }
}());
