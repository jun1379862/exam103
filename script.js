const form = document.getElementById('signupForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const fname = document.getElementById('fname');
  const lname = document.getElementById('lname');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const agree = document.getElementById('agree');

  const showError = (element, message) => {
    const requiredText = element.nextElementSibling;
    if (requiredText.classList.contains('required-text')) {
      requiredText.style.display = 'inline';
      requiredText.textContent = message;
    }
    if (element.tagName === 'INPUT') {
      element.classList.add('invalid-input');
    }
  };

  const hideError = (element) => {
    const requiredText = element.nextElementSibling;
    if (requiredText.classList.contains('required-text')) {
      requiredText.style.display = 'none';
      requiredText.textContent = 'This is required';
    }
    if (element.tagName === 'INPUT') {
      element.classList.remove('invalid-input');
    }
  };

  const checkValidity = (element) => {
    if (!element.value.trim()) {
      showError(element, 'This is required');
      return false;
    } else {
      hideError(element);
      return true;
    }
  };

  const isValid = checkValidity(fname) && checkValidity(lname) && checkValidity(email)
    && checkValidity(phone) && checkValidity(agree);

  if (isValid) {
    mockAPI(fname.value, lname.value, email.value, phone.value, agree.checked)
      .then(() => {
        const modal = document.getElementById('successModal');
        modal.style.display = 'block';
        modal.querySelector('.close').onclick = () => modal.style.display = 'none';
        window.onclick = (event) => {
          if (event.target === modal) {
            modal.style.display = 'none';
          }
        };
      })
      .catch(() => {
        alert('Error submitting form. Please try again.'); // Show error message
      });
  }
});

const mockAPI = (fname, lname, email, phone, agree) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() < 0.8; // 80% success rate
      if (success) {
        resolve();
      } else {
        reject(new Error('Signup failed. Please try again later.'));
      }
    }, 1000); // Simulating a delay of 1 second
  });
};

// Event listener to allow only numeric input for phone field
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (event) => {
  const { value } = event.target;
  event.target.value = value.replace(/\D/g, ''); // Remove non-numeric characters
});
