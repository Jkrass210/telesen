export function initPortfolioDropdown(selectors = {}) {
  const defaultSelectors = {
    container: 'portfolio-name',
    btn: 'portfolio-name__btn',
    listWrapper: 'portfolio-name__list-wrapper',
    list: 'portfolio-name__list',
    listItem: 'portfolio-name__item-btn',
    activeClass: 'active'
  };

  const config = { ...defaultSelectors, ...selectors };

  function initializeDropdown() {
    // Находим основные элементы
    const container = document.querySelector(`.${config.container}`);
    const btn = container ? container.querySelector(`.${config.btn}`) : null;
    const listWrapper = container ? container.querySelector(`.${config.listWrapper}`) : null;
    const list = container ? container.querySelector(`.${config.list}`) : null;
    const listItems = list ? list.querySelectorAll(`.${config.listItem}`) : null;

    // Проверяем, все ли элементы найдены
    if (!container || !btn || !listWrapper || !list || !listItems) {
      console.warn('Не все необходимые элементы найдены для инициализации dropdown');
      return false;
    }

    // Функция для открытия/закрытия dropdown
    function toggleDropdown(isOpen) {
      const shouldOpen = isOpen !== undefined ? isOpen : !btn.classList.contains(config.activeClass);

      if (shouldOpen) {
        btn.classList.add(config.activeClass);
        listWrapper.style.display = 'block';
      } else {
        btn.classList.remove(config.activeClass);
        listWrapper.style.display = 'none';
      }
    }

    // Функция для закрытия dropdown
    function closeDropdown() {
      toggleDropdown(false);
    }

    // Обработчик клика по основной кнопке
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown();
    });

    // Обработчик клика по кнопкам в списке
    listItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDropdown();
      });
    });

    // Закрытие при клике вне области
    document.addEventListener('click', (e) => {
      if (!e.target.closest(`.${config.container}`)) {
        closeDropdown();
      }
    });

    // Закрытие при нажатии Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && btn.classList.contains(config.activeClass)) {
        closeDropdown();
      }
    });

    return true;
  }

  // Инициализация при загрузке
  let isInitialized = initializeDropdown();

  // Observer для динамического добавления элементов
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        let needReinit = false;

        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            // Проверяем, добавились ли нужные нам элементы
            if (node.classList.contains(config.container) ||
              node.querySelector(`.${config.container}`)) {
              needReinit = true;
            }
          }
        });

        if (needReinit && !isInitialized) {
          isInitialized = initializeDropdown();
        }
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  return {
    reinitialize: () => {
      isInitialized = initializeDropdown();
      return isInitialized;
    }
  };
}