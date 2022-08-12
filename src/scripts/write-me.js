const myForm = document.querySelector('#form');
const modalBtn = document.querySelector('#modal-button');
const formInputs = document.querySelectorAll('input');

myForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!formValidate()) formSend(e.target.elements);
});

function formValidate() {
  let formErrors = 0;

  formInputs.forEach(elem => {
    if (!elem.value) {
      elem.closest('.write-me__block-input').classList.add('write-me__block-input--error');
      formErrors++;
      return;
    }
    elem.closest('.write-me__block-input').classList.remove('write-me__block-input--error');
  });

  return formErrors;
};

async function formSend(form) {
  const formData = {
    name: form.name.value,
    email: form.email.value,
    text: form.text.value
  }
  
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "./script.json");
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(formData));

  xhr.addEventListener('load', () => {
    document.querySelector('.write-me__modal').style.display = 'flex'
    myForm.reset();
  });
};

formInputs.forEach(elem => {
  elem.addEventListener('focus', () => {
    elem.closest('.write-me__block-input').classList.remove('write-me__block-input--error');
  });
});

modalBtn.addEventListener('click', () => {
  document.querySelector('.write-me__modal').style.display = 'none';
});
