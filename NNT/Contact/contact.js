// Contact Form Functionality with Formspree Integration
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    // Form submission handler
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (validateForm(formData)) {
            // Submit to Formspree
            await submitToFormspree(formData);
        }
    });

    // Close modal handler
    closeModal.addEventListener('click', function() {
        successModal.style.display = 'none';
        contactForm.reset();
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.style.display = 'none';
            contactForm.reset();
        }
    });

    // Form validation
    function validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        
        if (!data.name.trim()) {
            showError('name', 'Please enter your full name');
            return false;
        }

        if (!data.email.trim()) {
            showError('email', 'Please enter your email address');
            return false;
        }

        if (!emailRegex.test(data.email)) {
            showError('email', 'Please enter a valid email address');
            return false;
        }

        if (data.phone && !phoneRegex.test(data.phone)) {
            showError('phone', 'Please enter a valid phone number');
            return false;
        }

        if (!data.subject) {
            showError('subject', 'Please select a subject');
            return false;
        }

        if (!data.message.trim()) {
            showError('message', 'Please enter your message');
            return false;
        }

        if (data.message.trim().length < 10) {
            showError('message', 'Message should be at least 10 characters long');
            return false;
        }

        clearErrors();
        return true;
    }

    // Show error message
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.parentElement;
        
        // Remove existing error
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error styling
        field.style.borderColor = 'var(--accent)';
        
        // Create error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'var(--accent)';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '5px';
        errorElement.textContent = message;
        
        formGroup.appendChild(errorElement);
        
        // Scroll to error field
        field.focus();
    }

    // Clear all errors
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const fields = document.querySelectorAll('.form-control');
        fields.forEach(field => {
            field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
    }

    // Submit to Formspree
    async function submitToFormspree(data) {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        
        // Show loading state
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Prepare form data for Formspree
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('phone', data.phone || 'Not provided');
            formData.append('subject', data.subject);
            formData.append('message', data.message);

            // Send to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                successModal.style.display = 'flex';
                contactForm.reset();
            } else {
                // Error
                throw new Error('Form submission failed');
            }

        } catch (error) {
            // Handle errors
            console.error('Form submission error:', error);
            alert('Sorry, there was an error sending your message. Please try again later.');
        } finally {
            // Reset button
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    // Add real-time validation
    const formFields = contactForm.querySelectorAll('.form-control');
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            if (this.style.borderColor === 'var(--accent)') {
                this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                const error = this.parentElement.querySelector('.error-message');
                if (error) error.remove();
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger-menu");
    const mobileMenu = document.getElementById("mobileMenu");
    const body = document.body;

    if (!hamburger || !mobileMenu) {
        console.error("Hamburger elements missing.");
        return;
    }

    // ✅ Toggle menu
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("active");
        body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
    });

    // ✅ Close menu when link is clicked
    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            mobileMenu.classList.remove("active");
            body.style.overflow = "";
        });
    });

    // ✅ Close when clicking outside the menu
    mobileMenu.addEventListener("click", (e) => {
        if (e.target === mobileMenu) {
            hamburger.classList.remove("active");
            mobileMenu.classList.remove("active");
            body.style.overflow = "";
        }
    });
});
