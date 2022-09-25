import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  msg: document.querySelector('.feedback-form textarea'),
};

const FORM_KEY = 'feedback-form-state';

const localData = {};

populateForm();

refs.form.addEventListener('input', throttle(inputForm, 500));
refs.form.addEventListener('submit', submitForm);

function inputForm(e) {
  localData[e.target.name] = e.target.value;

  localStorage.setItem(FORM_KEY, JSON.stringify(localData));
}

function submitForm(e) {
  e.preventDefault();
  e.currentTarget.reset();

  const savedFormData = JSON.parse(localStorage.getItem(FORM_KEY));
  console.log(savedFormData);
  localStorage.removeItem(FORM_KEY);
}

function populateForm() {
  const savedForm = JSON.parse(localStorage.getItem(FORM_KEY));

  if (savedForm === null) {
    return;
  }

  if (savedForm.email) {
    refs.email.value = savedForm.email;
    localData['email'] = refs.email.value;
  }
  if (savedForm.message) {
    refs.msg.value = savedForm.message;
    localData['message'] = refs.msg.value;
  }
}
