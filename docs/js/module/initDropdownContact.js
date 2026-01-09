export function initDropdownContact(containerSelector) {
    // Устанавливаем дефолтное значение
    const effectiveSelector = containerSelector || '.dropdown-contact';
    
    // Конфигурация селекторов
    const selectors = {
        container: effectiveSelector,
        button: '.dropdown-contact__small-btn',
        list: '.dropdown-contact__list',
        activeClass: 'active'
    };

    // ... остальной код без изменений ...
    // Переменные состояния
    let dropdownInstances = new Map();

    function init() {
        // Поиск всех контейнеров
        const containers = document.querySelectorAll(selectors.container);
        
        if (containers.length === 0) {
            console.warn('DropdownContact: Контейнеры не найдены');
            return null;
        }

        // Инициализируем каждый контейнер
        containers.forEach((container, index) => {
            const button = container.querySelector(selectors.button);
            const list = container.querySelector(selectors.list);

            if (!button || !list) {
                console.warn(`DropdownContact ${index}: Не все элементы найдены в контейнере`);
                return;
            }

            const instance = createDropdownInstance(button, list, container);
            dropdownInstances.set(container, instance);
        });

        return {
            closeAll: closeAllDropdowns,
            destroy: destroyAll,
            getInstance: (container) => dropdownInstances.get(container)
        };
    }

    function createDropdownInstance(button, list, container) {
        let isOpen = false;

        // Открытие dropdown
        function openDropdown() {
            // Закрываем все остальные dropdowns
            closeAllDropdowns();
            
            // Добавляем классы
            button.classList.add(selectors.activeClass);
            list.classList.add(selectors.activeClass);
            isOpen = true;
        }

        // Закрытие dropdown
        function closeDropdown() {
            button.classList.remove(selectors.activeClass);
            list.classList.remove(selectors.activeClass);
            isOpen = false;
        }

        // Обработчик клика по кнопке
        function handleButtonClick(event) {
            event.stopPropagation();
            
            if (isOpen) {
                closeDropdown();
            } else {
                openDropdown();
            }
        }

        // Обработчик клика вне dropdown
        function handleClickOutside(event) {
            if (!container.contains(event.target)) {
                closeDropdown();
            }
        }

        // Обработчик клавиши ESC
        function handleKeyDown(event) {
            if (event.key === 'Escape' && isOpen) {
                closeDropdown();
            }
        }

        // Добавляем обработчики
        button.addEventListener('click', handleButtonClick);
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return {
            open: openDropdown,
            close: closeDropdown,
            isOpen: () => isOpen,
            destroy: function() {
                button.removeEventListener('click', handleButtonClick);
                document.removeEventListener('click', handleClickOutside);
                document.removeEventListener('keydown', handleKeyDown);
                closeDropdown();
            }
        };
    }

    function closeAllDropdowns() {
        dropdownInstances.forEach(instance => {
            instance.close();
        });
    }

    function destroyAll() {
        dropdownInstances.forEach(instance => {
            instance.destroy();
        });
        dropdownInstances.clear();
    }

    // Инициализация при полной загрузке DOM
    let dropdownAPI = null;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            dropdownAPI = init();
            if (dropdownAPI) {
                console.log('DropdownContact: Инициализирован после DOMContentLoaded');
            }
        });
    } else {
        dropdownAPI = init();
        if (dropdownAPI) {
            console.log('DropdownContact: Инициализирован');
        }
    }

    return dropdownAPI;
}