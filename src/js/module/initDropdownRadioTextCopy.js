/**
 * Специальная версия для радио-кнопок
 */
export function initDropdownRadioTextCopy(
    containerClass = 'dropdown-filter',
    btnTextClass = 'text',
    labelClass = 'filter-checkbox',
    labelTextClass = 'filter-checkbox__catom'
) {
    function init() {
        const containers = document.querySelectorAll(`.${containerClass}`);
        
        containers.forEach(container => {
            const btnText = container.querySelector(`.${btnTextClass}`);
            const labels = container.querySelectorAll(`.${labelClass}`);

            if (!btnText) return;

            const originalText = btnText.textContent;

            labels.forEach(labelElement => {
                const radioInput = labelElement.querySelector('input[type="radio"]');
                const labelText = labelElement.querySelector(`.${labelTextClass}`);

                if (radioInput && labelText) {
                    radioInput.addEventListener('change', () => {
                        if (radioInput.checked) {
                            btnText.textContent = labelText.textContent;
                            
                            // Закрываем dropdown после выбора
                            const btn = container.querySelector('.dropdown-filter__btn');
                            const box = container.querySelector('.dropdown-filter__box');
                            if (btn && box) {
                                btn.classList.remove('active');
                                box.classList.remove('active');
                            }
                        }
                    });

                    labelElement.addEventListener('click', () => {
                        setTimeout(() => {
                            if (radioInput.checked) {
                                btnText.textContent = labelText.textContent;
                            }
                        }, 10);
                    });
                }
            });

            // Обработчик для кнопки сброса (если есть)
            const resetBtn = container.querySelector('.dropdown-filter__throw');
            if (resetBtn) {
                resetBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    btnText.textContent = originalText;
                    
                    // Сбрасываем выбор радио-кнопок
                    const radios = container.querySelectorAll('input[type="radio"]');
                    radios.forEach(radio => {
                        radio.checked = false;
                    });
                });
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}