const form          = document.querySelector('.contact-form');
const nameInput     = document.getElementById('user-name');
const emailInput    = document.getElementById('user-email');
const phoneInput    = document.getElementById('user-phone');
const messageInput  = document.getElementById('user-message');


function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}


function isValidPhone(phone) {
    const pattern = /^\+?[\d\s\-]{7,15}$/;
    return pattern.test(phone);
}


function showError(input, message) {

    clearError(input);

    const error = document.createElement('p');
    error.className = 'field-error';
    error.textContent = message;

    input.parentElement.appendChild(error);

    input.classList.add('input-error');
}


function clearError(input) {
    const existing = input.parentElement.querySelector('.field-error');
    if (existing) existing.remove();
    input.classList.remove('input-error');
}


function validateForm(event) {

    event.preventDefault();

    let isValid = true;

    if (nameInput.value.trim() === '') {
        showError(nameInput, 'please enter your name.'); /* the index already does this, so I can't get it to show :( */
        isValid = false;
    } else {
        clearError(nameInput);
    }

    if (emailInput.value.trim() === '') {
        showError(emailInput, 'please enter your email address.'); /* also can't seem to get this to work */
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'that doesn\'t look like a valid email. try: name@example.com');
        isValid = false;
    } else {
        clearError(emailInput);
    }

    if (phoneInput.value.trim() === '') {
        showError(phoneInput, 'please enter your phone number.');
        isValid = false;
    } else if (!isValidPhone(phoneInput.value.trim())) {
        showError(phoneInput, 'phone number should only contain digits (and an optional +).');
        isValid = false;
    } else {
        clearError(phoneInput);
    }

    if (messageInput.value.trim() === '') {
        showError(messageInput, 'please write a message before sending.');
        isValid = false;
    } else {
        clearError(messageInput);
    }

    if (isValid) {
        showSuccess();
    }
}


function showSuccess() {
    form.innerHTML = `
        <div class="success-message">
            <h2>message sent!</h2>
            <p>thanks for reaching out, I'll get back to you soon<span class="wobble-dot">.</span></p>
        </div>
    `;
}


form.addEventListener('submit', validateForm);