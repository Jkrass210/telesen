export function initDropdownFilter(
    dropdownSelector = '.dropdown-filter',
    btnSelector = '.dropdown-filter__btn',
    boxSelector = '.dropdown-filter__box',
    backBtnSelector = '.dropdown-filter__back',
    activeClass = 'active'
) {
    // Находим все dropdown-элементы на странице
    const dropdowns = document.querySelectorAll(dropdownSelector);
    
    if (dropdowns.length === 0) {
        console.warn(`Элементы с селектором "${dropdownSelector}" не найдены`);
        return;
    }

    // Инициализируем каждый dropdown
    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector(btnSelector);
        const box = dropdown.querySelector(boxSelector);
        const backBtn = box ? box.querySelector(backBtnSelector) : null;

        if (!btn || !box) {
            console.warn('Не найдены необходимые элементы внутри dropdown', dropdown);
            return;
        }

        // Функция открытия/закрытия
        const toggleDropdown = () => {
            btn.classList.toggle(activeClass);
            box.classList.toggle(activeClass);
        };

        // Функция закрытия
        const closeDropdown = () => {
            btn.classList.remove(activeClass);
            box.classList.remove(activeClass);
        };

        // Обработчик клика по кнопке
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Проверяем, активен ли текущий дропдаун
            const isCurrentlyActive = btn.classList.contains(activeClass);
            
            // Закрываем все дропдауны
            document.querySelectorAll(btnSelector).forEach(e => {
                e.classList.remove(activeClass)
            })
            document.querySelectorAll(boxSelector).forEach(e => {
                e.classList.remove(activeClass)
            })
            
            // Если текущий дропдаун был неактивен - открываем его
            if (!isCurrentlyActive) {
                toggleDropdown();
            }
        });

        // Обработчик клика по кнопке "Назад" если есть
        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeDropdown();
            });
        }

        // Обработчик клика по документу для закрытия при клике вне блока
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && box.classList.contains(activeClass)) {
                closeDropdown();
            }
        });

        // Обработчик клавиши ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && box.classList.contains(activeClass)) {
                closeDropdown();
            }
        });

        // Останавливаем всплытие события внутри выпадающего блока
        box.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    console.log(`Dropdown Filter инициализирован для ${dropdowns.length} элементов`);
}