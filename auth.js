// Form Validation and Submission Handling

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(inputId + '-toggle');
    
    if (input.type === 'password') {
        input.type = 'text';
        toggle.classList.remove('bi-eye');
        toggle.classList.add('bi-eye-slash');
    } else {
        input.type = 'password';
        toggle.classList.remove('bi-eye-slash');
        toggle.classList.add('bi-eye');
    }
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    const bars = document.querySelectorAll('#strength-bar > div');
    
    if (!bars.length) return;
    
    // Reset bars
    bars.forEach(bar => {
        bar.classList.remove('tw-bg-red-500', 'tw-bg-orange-500', 'tw-bg-yellow-500', 'tw-bg-green-500');
        bar.classList.add('tw-bg-gray-200');
    });
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    
    const colors = ['tw-bg-red-500', 'tw-bg-orange-500', 'tw-bg-yellow-500', 'tw-bg-green-500'];
    
    for (let i = 0; i < strength; i++) {
        bars[i].classList.remove('tw-bg-gray-200');
        bars[i].classList.add(colors[strength - 1]);
    }
}

// Show message helper
function showMessage(containerId, message, type) {
    const container = document.getElementById(containerId);
    container.classList.remove('tw-hidden', 'tw-bg-red-100', 'tw-bg-green-100', 'tw-text-red-700', 'tw-text-green-700');
    
    if (type === 'error') {
        container.classList.add('tw-bg-red-100', 'tw-text-red-700', 'tw-border', 'tw-border-red-300');
        container.innerHTML = `<i class="bi bi-exclamation-circle tw-mr-2"></i>${message}`;
    } else {
        container.classList.add('tw-bg-green-100', 'tw-text-green-700', 'tw-border', 'tw-border-green-300');
        container.innerHTML = `<i class="bi bi-check-circle tw-mr-2"></i>${message}`;
    }
}

// Hide message
function hideMessage(containerId) {
    const container = document.getElementById(containerId);
    container.classList.add('tw-hidden');
}

// Show field error
function showFieldError(fieldId, message) {
    const errorSpan = document.getElementById(fieldId + '-error');
    const input = document.getElementById(fieldId);
    
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.classList.remove('tw-hidden');
    }
    
    if (input) {
        input.classList.add('tw-border-red-500');
    }
}

// Hide field error
function hideFieldError(fieldId) {
    const errorSpan = document.getElementById(fieldId + '-error');
    const input = document.getElementById(fieldId);
    
    if (errorSpan) {
        errorSpan.classList.add('tw-hidden');
    }
    
    if (input) {
        input.classList.remove('tw-border-red-500');
    }
}

// Social login handler
function socialLogin(provider) {
    console.log(`Initiating ${provider} login...`);
    // In a real app, this would redirect to OAuth provider
    alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login would be initiated here. This is a demo.`);
}

// Login Form Handler
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = document.getElementById('login-btn');
        const btnText = document.getElementById('login-btn-text');
        const btnSpinner = document.getElementById('login-btn-spinner');
        
        // Validate
        let isValid = true;
        hideMessage('login-message');
        hideFieldError('email');
        hideFieldError('password');
        
        if (!validateEmail(email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (password.length < 8) {
            showFieldError('password', 'Password must be at least 8 characters');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        btn.disabled = true;
        btnText.classList.add('tw-hidden');
        btnSpinner.classList.remove('tw-hidden');
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            btn.disabled = false;
            btnText.classList.remove('tw-hidden');
            btnSpinner.classList.add('tw-hidden');
            
            // Show success (in real app, redirect to dashboard)
            showMessage('login-message', 'Login successful! Redirecting to dashboard...', 'success');
            
            // Simulate redirect
            setTimeout(() => {
                console.log('Would redirect to dashboard');
                // window.location.href = 'dashboard.html';
            }, 1500);
        }, 2000);
    });
}

// Signup Form Handler
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    const passwordInput = document.getElementById('signup-password');
    
    // Password strength checker
    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            checkPasswordStrength(e.target.value);
        });
    }
    
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('signup-email').value;
        const company = document.getElementById('company').value;
        const password = document.getElementById('signup-password').value;
        const terms = document.getElementById('terms').checked;
        const btn = document.getElementById('signup-btn');
        const btnText = document.getElementById('signup-btn-text');
        const btnSpinner = document.getElementById('signup-btn-spinner');
        
        // Validate
        let isValid = true;
        hideMessage('signup-message');
        hideFieldError('first-name');
        hideFieldError('last-name');
        hideFieldError('signup-email');
        hideFieldError('company');
        hideFieldError('signup-password');
        
        if (firstName.trim().length < 2) {
            showFieldError('first-name', 'First name must be at least 2 characters');
            isValid = false;
        }
        
        if (lastName.trim().length < 2) {
            showFieldError('last-name', 'Last name must be at least 2 characters');
            isValid = false;
        }
        
        if (!validateEmail(email)) {
            showFieldError('signup-email', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (company.trim().length < 2) {
            showFieldError('company', 'Company name is required');
            isValid = false;
        }
        
        if (password.length < 8 || !password.match(/[a-z]/) || !password.match(/[A-Z]/) || !password.match(/[0-9]/)) {
            showFieldError('signup-password', 'Password must be at least 8 characters with uppercase, lowercase, and number');
            isValid = false;
        }
        
        if (!terms) {
            showMessage('signup-message', 'You must agree to the Terms of Service and Privacy Policy', 'error');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        btn.disabled = true;
        btnText.classList.add('tw-hidden');
        btnSpinner.classList.remove('tw-hidden');
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            btn.disabled = false;
            btnText.classList.remove('tw-hidden');
            btnSpinner.classList.add('tw-hidden');
            
            // Show success
            showMessage('signup-message', 'Account created successfully! Check your email to verify your account.', 'success');
            
            // Simulate redirect
            setTimeout(() => {
                console.log('Would redirect to onboarding or dashboard');
                // window.location.href = 'onboarding.html';
            }, 2000);
        }, 2000);
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bi bi-arrow-repeat tw-animate-spin tw-mr-2"></i>Sending...';
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            // Show success message
            const messageDiv = document.createElement('div');
            messageDiv.className = 'tw-bg-green-100 tw-border tw-border-green-300 tw-text-green-700 tw-p-4 tw-rounded-lg tw-mb-6';
            messageDiv.innerHTML = '<i class="bi bi-check-circle tw-mr-2"></i>Thank you! Your message has been sent. We\'ll get back to you within 24 hours.';
            
            contactForm.parentElement.insertBefore(messageDiv, contactForm);
            contactForm.reset();
            
            // Remove message after 5 seconds
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }, 2000);
    });
}
