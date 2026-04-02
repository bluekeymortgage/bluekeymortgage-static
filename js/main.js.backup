// Blue Key Mortgage - Main JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav && nav.classList.contains('active')) {
            if (!event.target.closest('nav') && !event.target.closest('.menu-toggle')) {
                nav.classList.remove('active');
            }
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
});

// Mortgage Payment Calculator
function calculateMortgagePayment() {
    const principal = parseFloat(document.getElementById('principal').value);
    const annualRate = parseFloat(document.getElementById('interestRate').value);
    const years = parseInt(document.getElementById('amortization').value);
    
    if (isNaN(principal) || isNaN(annualRate) || isNaN(years)) {
        document.getElementById('paymentResult').innerHTML = '<p>Please fill in all fields</p>';
        return;
    }
    
    // Calculate monthly payment
    const monthlyRate = (annualRate / 100) / 12;
    const numPayments = years * 12;
    
    let monthlyPayment;
    if (monthlyRate === 0) {
        monthlyPayment = principal / numPayments;
    } else {
        monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                        (Math.pow(1 + monthlyRate, numPayments) - 1);
    }
    
    const totalPaid = monthlyPayment * numPayments;
    const totalInterest = totalPaid - principal;
    
    document.getElementById('paymentResult').innerHTML = `
        <h3>$${monthlyPayment.toFixed(2)}</h3>
        <p>Monthly Payment</p>
        <div style="margin-top: 1.5rem; text-align: left;">
            <p><strong>Total Amount Paid:</strong> $${totalPaid.toLocaleString('en-CA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            <p><strong>Total Interest:</strong> $${totalInterest.toLocaleString('en-CA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        </div>
    `;
}

// Affordability Calculator
function calculateAffordability() {
    const annualIncome = parseFloat(document.getElementById('annualIncome').value);
    const monthlyDebts = parseFloat(document.getElementById('monthlyDebts').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    const interestRate = parseFloat(document.getElementById('affordInterestRate').value);
    
    if (isNaN(annualIncome) || isNaN(monthlyDebts) || isNaN(downPayment) || isNaN(interestRate)) {
        document.getElementById('affordabilityResult').innerHTML = '<p>Please fill in all fields</p>';
        return;
    }
    
    // Use 39% Gross Debt Service Ratio (GDS)
    const monthlyIncome = annualIncome / 12;
    const maxMonthlyPayment = (monthlyIncome * 0.39) - monthlyDebts;
    
    if (maxMonthlyPayment <= 0) {
        document.getElementById('affordabilityResult').innerHTML = `
            <h3>Unable to Calculate</h3>
            <p>Your current debt levels are too high relative to your income. Please contact us to discuss your options.</p>
        `;
        return;
    }
    
    // Calculate maximum mortgage amount (assuming 25-year amortization)
    const monthlyRate = (interestRate / 100) / 12;
    const numPayments = 25 * 12;
    
    let maxMortgage;
    if (monthlyRate === 0) {
        maxMortgage = maxMonthlyPayment * numPayments;
    } else {
        maxMortgage = maxMonthlyPayment * (Math.pow(1 + monthlyRate, numPayments) - 1) / 
                     (monthlyRate * Math.pow(1 + monthlyRate, numPayments));
    }
    
    const maxHomePrice = maxMortgage + downPayment;
    
    document.getElementById('affordabilityResult').innerHTML = `
        <h3>$${maxHomePrice.toLocaleString('en-CA', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</h3>
        <p>Estimated Home Price You Can Afford</p>
        <div style="margin-top: 1.5rem; text-align: left;">
            <p><strong>Maximum Mortgage:</strong> $${maxMortgage.toLocaleString('en-CA', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</p>
            <p><strong>Down Payment:</strong> $${downPayment.toLocaleString('en-CA', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</p>
            <p><strong>Estimated Monthly Payment:</strong> $${maxMonthlyPayment.toLocaleString('en-CA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        </div>
    `;
}

// Reverse Mortgage Calculator
function calculateReverseMortgage() {
    const age = parseInt(document.getElementById('age').value);
    const homeValue = parseFloat(document.getElementById('homeValue').value);
    const mortgageBalance = parseFloat(document.getElementById('mortgageBalance').value) || 0;
    
    if (isNaN(age) || isNaN(homeValue)) {
        document.getElementById('reverseMortgageResult').innerHTML = '<p>Please fill in all required fields</p>';
        return;
    }
    
    if (age < 55) {
        document.getElementById('reverseMortgageResult').innerHTML = `
            <h3>Not Eligible</h3>
            <p>You must be at least 55 years old to qualify for a reverse mortgage in Canada.</p>
        `;
        return;
    }
    
    // Calculate percentage based on age (scales from 20% at 55 to 55% at 80+)
    let percentage;
    if (age >= 80) {
        percentage = 0.55;
    } else if (age >= 55) {
        // Linear scale from 20% to 55%
        percentage = 0.20 + ((age - 55) / (80 - 55)) * (0.55 - 0.20);
    }
    
    const availableEquity = homeValue - mortgageBalance;
    const maxAmount = Math.min(availableEquity * percentage, availableEquity);
    
    if (availableEquity <= 0) {
        document.getElementById('reverseMortgageResult').innerHTML = `
            <h3>Insufficient Equity</h3>
            <p>Your current mortgage balance exceeds or equals your home value. Please contact us to discuss your options.</p>
        `;
        return;
    }
    
    document.getElementById('reverseMortgageResult').innerHTML = `
        <h3>$${maxAmount.toLocaleString('en-CA', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</h3>
        <p>Estimated Equity You Could Access</p>
        <div style="margin-top: 1.5rem; text-align: left;">
            <p><strong>Your Age:</strong> ${age} years</p>
            <p><strong>Home Value:</strong> $${homeValue.toLocaleString('en-CA', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</p>
            <p><strong>Available Equity:</strong> $${availableEquity.toLocaleString('en-CA', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</p>
            <p><strong>Percentage Available:</strong> ${(percentage * 100).toFixed(0)}%</p>
        </div>
    `;
}

// Form Submission Handler (using Formspree - free form service)
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Formspree endpoint for ragini@bluekeymortgage.ca
    fetch('https://formspree.io/f/xpwkoqjd', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            form.reset();
            alert('Thank you for your message! We will get back to you within 24 hours.');
        } else {
            alert('There was a problem submitting your form. Please try again or email us directly at ragini@bluekeymortgage.ca');
        }
    })
    .catch(error => {
        alert('There was a problem submitting your form. Please try again or email us directly at ragini@bluekeymortgage.ca');
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
