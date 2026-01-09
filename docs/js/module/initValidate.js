/*export function initValidate(options = {}) {
  const {
    formClass = 'header-form',
    namePhone = 'phone',
    nameCompany = 'company',
    nameNeme = 'neme',
    wrapperClass = 'box-modal__wrapper',
    messageClass = 'box-modal__message',

  } = options;


  const forms = document.querySelectorAll(`.${formClass}`);
  if (forms.length === 0) return;

  function initCustomValidations() {
    if (typeof $.validator !== 'undefined') {
      // Валидация только букв
      $.validator.addMethod("lettersOnly", function (value, element) {
        return this.optional(element) || /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value);
      }, "Поле должно содержать только буквы");

      // Валидация российского телефона
      $.validator.addMethod("phoneRU", function (value, element) {
        return this.optional(element) || /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(value);
      }, "Введите корректный номер телефона");
    }
  }

  initCustomValidations()

  forms.forEach((form) => {

    const phoneInput = form.querySelector(`input[name="${namePhone}"]`);
    if (phoneInput && typeof $.fn.inputmask !== 'undefined') {
      $(phoneInput).inputmask('+7 (999) 999-99-99');
    }


    $(form).validate({
      debug: false,
      rules: {
        [nameNeme]: {
          required: true,
          minlength: 2,
          lettersOnly: true
        },
        [nameCompany]: {
          required: true,
          minlength: 2,
          lettersOnly: true
        },
        [namePhone]: {
          required: true,
          phoneRU: true
        }
      },
      messages: {
        [nameNeme]: {
          required: "Введите ваше имя",
          minlength: "Имя должно содержать не менее 2 букв"
        },
        [nameCompany]: {
          required: "Введите название компании",
          minlength: "Название компании должно содержать не менее 2 букв"
        },
        [namePhone]: {
          required: "Введите номер телефона",
          phoneRU: "Введите корректный номер телефона"
        },
      },
      focusInvalid: true,
      errorElement: "span",
      errorClass: "is-error",
      validClass: "is-input",
      errorPlacement: function (error, element) {
        element.parent().addClass('is-error');
        error.appendTo(element.parent());
      },
      submitHandler: function (form, e) {
        //e.preventDefault();
        form.submit();
        const viewForm = form.querySelector(`.${wrapperClass}`)
        const viewMessage = form.querySelector(`.${messageClass}`)
        
        //Если удалить класс "active" на элемете wrapperClass = 'box-modal__wrapper' то блок скрывается
        //и для сообщения об отправке нужно добавить класс "active" на элемент messageClass = 'box-modal__message'
        
        // Отправка формы
      }
    });
  })
}*/

export function initValidate(options = {}) {
  const {
    formClass = 'header-form',
    namePhone = 'phone',
    nameCompany = 'company',
    nameNeme = 'neme',
    nameFile = 'file',
    nameTextarea = 'message',
    wrapperClass = 'box-modal__wrapper',
    messageClass = 'box-modal__message',
  } = options;

  const forms = document.querySelectorAll(`.${formClass}`);
  if (forms.length === 0) return;

  function initCustomValidations() {
    if (typeof $.validator !== 'undefined') {
      $.validator.addMethod("lettersOnly", function (value, element) {
        return this.optional(element) || /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value);
      }, "Поле должно содержать только буквы");

      $.validator.addMethod("phoneRU", function (value, element) {
        return this.optional(element) || /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(value);
      }, "Введите корректный номер телефона");

      $.validator.addMethod("fileFormat", function(value, element) {
        // Если поле пустое - пропускаем валидацию
        if (this.optional(element)) return true;
        
        const file = element.files[0];
        if (!file) return true;
        
        const allowedExtensions = ['doc', 'docx', 'pdf'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const maxSize = 5 * 1024 * 1024; // 5 MB
        
        const isValidExtension = allowedExtensions.includes(fileExtension);
        const isValidSize = file.size <= maxSize;
        
        return isValidExtension && isValidSize;
      }, "Допустимые форматы: doc, docx, pdf. Максимальный размер: 5 MB");

      $.validator.addMethod("minLength10", function(value, element) {
        return this.optional(element) || value.trim().length >= 10;
      }, "Текст не менее 10 символов");
    }
  }

  initCustomValidations();

  forms.forEach((form) => {
    const phoneInput = form.querySelector(`input[name="${namePhone}"]`);
    if (phoneInput && typeof $.fn.inputmask !== 'undefined') {
      $(phoneInput).inputmask('+7 (999) 999-99-99');
    }

    const rules = {
      [nameNeme]: {
        required: true,
        minlength: 2,
        lettersOnly: true
      },
      [nameCompany]: {
        required: true,
        minlength: 2,
        lettersOnly: true
      },
      [namePhone]: {
        required: true,
        phoneRU: true
      }
    };

    const fileInput = form.querySelector(`input[name="${nameFile}"]`);
    if (fileInput) {
      rules[nameFile] = {
        required: false,
        fileFormat: true
      };

      // Добавляем обработчик изменения файла для принудительной валидации
      fileInput.addEventListener('change', function() {
        $(this).valid();
      });
    }

    const textarea = form.querySelector(`textarea[name="${nameTextarea}"]`);
    if (textarea) {
      rules[nameTextarea] = {
        required: true,
        minLength10: true
      };
    }

    const messages = {
      [nameNeme]: {
        required: "Введите ваше имя",
        minlength: "Имя должно содержать не менее 2 букв"
      },
      [nameCompany]: {
        required: "Введите название компании",
        minlength: "Поле должно содержать не менее 2 букв"
      },
      [namePhone]: {
        required: "Введите номер телефона",
        phoneRU: "Введите корректный номер телефона"
      },
    };

    if (fileInput) {
      messages[nameFile] = {
        fileFormat: "Допустимые форматы: doc, docx, pdf. Максимальный размер: 5 MB"
      };
    }

    if (textarea) {
      messages[nameTextarea] = {
        required: "Введите текст сообщения",
        minLength10: "Текст не менее 10 символов"
      };
    }

    $(form).validate({
      debug: false,
      rules: rules,
      messages: messages,
      focusInvalid: true,
      errorElement: "span",
      errorClass: "is-error",
      validClass: "is-input",
      errorPlacement: function (error, element) {
        element.parent().addClass('is-error');
        error.appendTo(element.parent());
      },
      ignore: ":hidden:not(input[type='file'])",
      onfocusout: function(element) {
        if (element.type !== 'file') {
          $(element).valid();
        }
      },
      submitHandler: function (form, e) {
        console.log('Прошли валидацию, отправляем');
        
        // Получаем элементы для переключения состояний
        const viewForm = form.querySelector(`.${wrapperClass}`);
        const viewMessage = form.querySelector(`.${messageClass}`);
        
        // Если нужно показать сообщение об успешной отправке
        /*if (viewForm && viewMessage) {
          viewForm.classList.remove('active');
          viewMessage.classList.add('active');
        }*/
        
        //Если удалить класс "active" на элемете wrapperClass = 'box-modal__wrapper' то блок скрывается
        //и для сообщения об отправке нужно добавить класс "active" на элемент messageClass = 'box-modal__message'
        
        // Отправка формы
        form.submit();
      }
    });

    // Дополнительная проверка: выведем в консоль информацию о файле при выборе
    if (fileInput) {
      fileInput.addEventListener('change', function(e) {
        const file = this.files[0];
        if (file) {
          console.log('Выбран файл:', {
            name: file.name,
            size: file.size,
            type: file.type,
            extension: file.name.split('.').pop()
          });
        }
      });
    }
  });
}