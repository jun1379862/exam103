const form = document.getElementById('signupForm');
const modal = document.getElementById('successModal');
const modalTextDiv = document.getElementsByClassName('msgmodal');
const loader = document.querySelector('.loader');
const buttonText = document.querySelector('.button-text');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const fname = document.getElementById('fname');
  const lname = document.getElementById('lname');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const agree = document.getElementById('agree');

  modalTextDiv[0].textContent = 'Successfully signed up!';
  loader.style.display = 'block';
  buttonText.style.display = 'none';
  
  const checkValidity = (element) => {

    if (!element.value.trim() && element.type !== 'checkbox') {
      modalTextDiv[0].textContent = 'Please input the correct value in each corresponded fields.';
      modal.style.display = 'block';
      return false;
    } else {
      return true;
    }
  };

  var isValid = checkValidity(fname) && checkValidity(lname) && checkValidity(email)
    && checkValidity(phone) && checkValidity(agree);


  if (!agree.checked) {
    modalTextDiv[0].textContent = 'Please agree to the terms and conditions';
    modal.style.display = 'block';
    isValid = false;
    loader.style.display = 'none';
    buttonText.style.display = 'inline';
  }

  if (isValid) {
    mockAPI(fname.value, lname.value, email.value, phone.value, agree.checked)
      .then(() => {
        loader.style.display = 'none';
        buttonText.style.display = 'inline';
        modal.style.display = 'block'; 
      })
      .catch(() => {
        console.log('------FAIL')
        loader.style.display = 'none';
        buttonText.style.display = 'inline';
        modalTextDiv[0].textContent = 'Error submitting form. Please try again.';
        modal.style.display = 'block';
      });
  }
});

const mockAPI = (fname, lname, email, phone, agree) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() < 0.3; // 80% success rate
      if (success) {
        resolve();
      } else {
        modalTextDiv[0].textContent = 'Error submitting form. Please try again.';
        modal.style.display = 'block';
        loader.style.display = 'none';
        buttonText.style.display = 'inline';
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


document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('successModal');
  modal.querySelector('.close').onclick = () => modal.style.display = 'none';
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
});