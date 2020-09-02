// Variables
const sendBtn = document.getElementById('sendBtn'),
      email = document.getElementById('email'),
      subject = document.getElementById('subject'),
      message = document.getElementById('message'),
      resetBtn = document.getElementById('resetBtn'),
      sendEmailForm = document.getElementById('email-form');
      


// Event Listeners 
eventListeners();

function eventListeners() {
  // Инициализация приложения
  document.addEventListener('DOMContentLoaded', appInit);

  // Проверяем формы
  email.addEventListener('blur', validateField);
  subject.addEventListener('blur', validateField);
  message.addEventListener('blur', validateField);

  // Отправить электронную почту & Кнопку сброса
  sendEmailForm.addEventListener('submit', sendEmail);
  resetBtn.addEventListener('click', resetForm);
}


// Functions 



// Инициализация приложения
function appInit() {
   // Отключаем кнопку отправки при загрузке
   sendBtn.disabled = true;
}

function sendEmail(e) {
  e.preventDefault();

  // показать spinner
  const spinner = document.querySelector('#spinner');
  spinner.style.display = 'block';

  // Показать картинку
  const sendEmailImg = document.createElement('img');
  sendEmailImg.src = './img/mail.gif';
  sendEmailImg.style.display = 'block';

  // Скрыть Spinner затем показать изображение для отправки по электронной почте
  setTimeout(function(){

    //Скрыть Spinner
    spinner.style.display = 'none';

    // Показать картинку
    document.querySelector('#loaders').appendChild( sendEmailImg);

    // Через 5 секунд скрыт изображение и сбросьте форму
    setTimeout(function(){
      sendEmailForm.reset();
      sendEmailImg.remove();
    }, 5000);
  }, 3000);
}

// Проверяем поля 
function validateField() {
  let errors;

  // Проверяем длину поля
  validateLenght(this)

  // Проверяем электронную почту
  if(this.type === 'email') {
    validateEmail(this);
  }

  // Оба вернут ошибки, затем проверьте, есть ли ошибки
  errors = document.querySelectorAll('.error');

  // Убедитесь, что входы не пустые
  if(email.value !== '' && subject.value !== '' && message.value !== '') {
    if(errors.length === 0) {
      // Кнопка должна быть включена
      sendBtn.disabled = false;
    }
  }
}

// Проверить длину полей
function validateLenght(field) {
  if(field.value.length > 0) {
    field.style.borderBottomColor = 'green';
    field.classList.remove('error');
  } else {
    field.style.borderBottomColor = 'red';
    field.classList.add('error')
  }
}

// Проверить адрес электронной почты (проверяет @ в значении)
function validateEmail(field) {
  let emailText = field.value;
  // Проверяем, есть ли в тексте письма знак @
  if(emailText.indexOf('@') !== -1) {
    field.style.borderBottomColor = 'green';
    field.classList.remove('error');
  } else {
    field.style.borderBottomColor = 'red';
    field.classList.add('error')
  }
}

// Reset the form
function resetForm() {
  sendEmailForm.reset();
}