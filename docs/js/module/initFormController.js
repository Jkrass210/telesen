export function initFormController(options = {}) {
    const {
        formClass = 'form-1__form',
        wrapperClass = 'box-modal__wrapper',
        messageClass = 'box-modal__message',
        activeClass = 'active',
        inputClass = 'form-1__input',
        submitClass = 'form-1__submit'
    } = options;

    let forms = [];
    let isInitialized = false;

    function init() {
        if (isInitialized) return;
        isInitialized = true;

        // Инициализация существующих форм
        updateForms();
        initExistingForms();

        // Наблюдатель для динамически добавляемых элементов
        observeDynamicElements();
    }

    function initExistingForms() {
        forms.forEach(form => {
            initForm(form);
        });
    }

    function initForm(form) {
        if (form._formInitialized) return;

        // Инициализация маски телефона
        const phoneInput = form.querySelector('input[name="phone"]');
        if (phoneInput && typeof $.fn.inputmask !== 'undefined') {
            $(phoneInput).inputmask('+7 (999) 999-99-99');
        }

        // Инициализация валидации
        if (typeof $.fn.validate !== 'undefined') {
            $(form).validate({
                rules: {
                    neme: {
                        required: true,
                        minlength: 2,
                        lettersOnly: true
                    },
                    company: {
                        required: true,
                        minlength: 2,
                        lettersOnly: true
                    },
                    phone: {
                        required: true,
                        phoneRU: true
                    }
                },
                messages: {
                    neme: {
                        required: "Введите ваше имя",
                        minlength: "Имя должно содержать не менее 2 букв"
                    },
                    company: {
                        required: "Введите название компании",
                        minlength: "Название компании должно содержать не менее 2 букв"
                    },
                    phone: {
                        required: "Введите номер телефона",
                        phoneRU: "Введите корректный номер телефона"
                    }
                },
                errorClass: 'form-error',
                errorElement: 'span',
                errorPlacement: function(error, element) {
                    error.addClass('form-error-text');
                    element.after(error);
                },
                highlight: function(element) {
                    $(element).addClass('form-error-input');
                },
                unhighlight: function(element) {
                    $(element).removeClass('form-error-input');
                },
                submitHandler: function(formElement) {
                    handleFormSubmit(formElement);
                    return false;
                }
            });
        } else {
            // Fallback если jQuery Validation не подключен
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                if (validateForm(form)) {
                    handleFormSubmit(form);
                }
            });
        }

        form._formInitialized = true;
    }

    // Кастомные методы валидации
    function initCustomValidations() {
        if (typeof $.validator !== 'undefined') {
            // Валидация только букв
            $.validator.addMethod("lettersOnly", function(value, element) {
                return this.optional(element) || /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value);
            }, "Поле должно содержать только буквы");

            // Валидация российского телефона
            $.validator.addMethod("phoneRU", function(value, element) {
                return this.optional(element) || /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(value.replace(/\D/g, ''));
            }, "Введите корректный номер телефона");
        }
    }

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll(`.${inputClass}`);

        inputs.forEach(input => {
            if (input.name === 'neme' || input.name === 'company') {
                if (input.value.length < 2 || !/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(input.value)) {
                    isValid = false;
                    input.classList.add('form-error-input');
                } else {
                    input.classList.remove('form-error-input');
                }
            } else if (input.name === 'phone') {
                const phone = input.value.replace(/\D/g, '');
                if (phone.length < 11 || !/^(\+7|7|8)?[489][0-9]{9}$/.test(phone)) {
                    isValid = false;
                    input.classList.add('form-error-input');
                } else {
                    input.classList.remove('form-error-input');
                }
            }
        });

        return isValid;
    }

    function handleFormSubmit(form) {
        // Находим родительские элементы
        const wrapper = form.closest(`.${wrapperClass}`);
        const modal = wrapper ? wrapper.closest('.connection__modal') : null;
        
        if (wrapper && modal) {
            // Убираем active с wrapper
            wrapper.classList.remove(activeClass);
            
            // Находим блок сообщения и добавляем active
            const message = modal.querySelector(`.${messageClass}`);
            if (message) {
                message.classList.add(activeClass);
            }

            // Можно добавить отправку данных на сервер здесь
            console.log('Форма отправлена:', {
                name: form.querySelector('input[name="neme"]').value,
                company: form.querySelector('input[name="company"]').value,
                phone: form.querySelector('input[name="phone"]').value
            });

            // Сброс формы
            form.reset();
        }
    }

    function observeDynamicElements() {
        const observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) {
                            if (node.classList && node.classList.contains(formClass)) {
                                shouldUpdate = true;
                            } else if (node.querySelector) {
                                const newForms = node.querySelectorAll(`.${formClass}`);
                                if (newForms.length > 0) {
                                    shouldUpdate = true;
                                }
                            }
                        }
                    });
                }
            });

            if (shouldUpdate) {
                updateForms();
                initExistingForms();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function updateForms() {
        forms = Array.from(document.querySelectorAll(`.${formClass}`));
    }

    // Инициализируем кастомные валидации
    initCustomValidations();

    // Автоматически инициализируем при создании
    init();

    // Публичные методы
    return {
        reinit: init,
        validateForm: (formElement) => {
            if (formElement instanceof Element && formElement.classList.contains(formClass)) {
                return validateForm(formElement);
            }
            return false;
        },
        submitForm: (formElement) => {
            if (formElement instanceof Element && formElement.classList.contains(formClass)) {
                handleFormSubmit(formElement);
            }
        },
        destroy: () => {
            if (!isInitialized) return;
            
            // Удаляем валидацию с форм
            forms.forEach(form => {
                if (form._formInitialized && typeof $.fn.validate !== 'undefined') {
                    $(form).validate().destroy();
                }
                delete form._formInitialized;
            });
            
            isInitialized = false;
            forms = [];
        }
    };
}