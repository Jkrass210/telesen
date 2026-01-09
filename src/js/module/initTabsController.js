export function initTabsController(options = {}) {
  const {
    containerClass = 'dropdown-nav',
    buttonClass = 'dropdown-nav__btn',
    listClass = 'dropdown-nav__list',
    activeClass = 'active'
  } = options;

  let tabs = [];
  let isInitialized = false;
  let activeTab = null;

  function init() {
    if (isInitialized) return;
    isInitialized = true;

    // Инициализация существующих табов
    updateTabs();

    // Находим изначально активный таб
    findInitialActiveTab();

    // Обработчик для делегирования событий
    document.addEventListener('click', handleDocumentClick);

    // Наблюдатель для динамически добавляемых элементов
    observeDynamicElements();
  }

  function findInitialActiveTab() {
    tabs.forEach(tab => {
      const button = tab.querySelector(`.${buttonClass}`);
      const list = tab.querySelector(`.${listClass}`);

      // Если хотя бы один элемент таба имеет класс active, считаем таб активным
      if (tab.classList.contains(activeClass) ||
        (button && button.classList.contains(activeClass)) ||
        (list && list.classList.contains(activeClass))) {

        // Приводим все элементы таба к一致ному состоянию
        if (!tab.classList.contains(activeClass)) tab.classList.add(activeClass);
        if (button && !button.classList.contains(activeClass)) button.classList.add(activeClass);
        if (list && !list.classList.contains(activeClass)) list.classList.add(activeClass);

        activeTab = tab;
      } else {
        // Убеждаемся, что неактивные табы действительно неактивны
        closeTab(tab);
      }
    });
  }

  function handleDocumentClick(e) {
    // Обработка клика по кнопке таба
    const button = e.target.closest(`.${buttonClass}`);
    if (button) {
      const tab = button.closest(`.${containerClass}`);
      if (tab) {
        e.preventDefault();
        toggleTab(tab);
        return;
      }
    }

    // Закрытие всех табов при клике вне их области
    const clickedInsideTab = e.target.closest(`.${containerClass}`);
    if (!clickedInsideTab) {
      closeAllTabs();
    }
  }

  function toggleTab(tab) {
    // Если кликаем по уже активному табу - закрываем его
    if (tab === activeTab) {
      closeTab(tab);
      activeTab = null;
    } else {
      // Закрываем текущий активный таб и открываем новый
      closeAllTabs();
      openTab(tab);
      activeTab = tab;
    }
  }

  function openTab(tab) {
    const button = tab.querySelector(`.${buttonClass}`);
    const list = tab.querySelector(`.${listClass}`);

    tab.classList.add(activeClass);
    if (button) button.classList.add(activeClass);
    if (list) list.classList.add(activeClass);

    activeTab = tab;
  }

  function closeTab(tab) {
    const button = tab.querySelector(`.${buttonClass}`);
    const list = tab.querySelector(`.${listClass}`);

    tab.classList.remove(activeClass);
    if (button) button.classList.remove(activeClass);
    if (list) list.classList.remove(activeClass);

    if (tab === activeTab) {
      activeTab = null;
    }
  }

  function closeAllTabs() {
    tabs.forEach(tab => {
      closeTab(tab);
    });
    activeTab = null;
  }

  function observeDynamicElements() {
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;

      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              if (node.classList && node.classList.contains(containerClass)) {
                shouldUpdate = true;
              } else if (node.querySelector) {
                const newTabs = node.querySelectorAll(`.${containerClass}`);
                if (newTabs.length > 0) {
                  shouldUpdate = true;
                }
              }
            }
          });
        }
      });

      if (shouldUpdate) {
        const previousActiveTab = activeTab;
        updateTabs();

        // Восстанавливаем активный таб после обновления
        if (previousActiveTab && previousActiveTab.isConnected) {
          activeTab = previousActiveTab;
        } else {
          activeTab = null;
          findInitialActiveTab();
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function updateTabs() {
    tabs = Array.from(document.querySelectorAll(`.${containerClass}`));
  }

  // Автоматически инициализируем при создании
  init();

  // Публичные методы
  return {
    reinit: () => {
      const previousActiveTab = activeTab;
      updateTabs();
      findInitialActiveTab();

      // Если предыдущий активный таб больше не существует, сбрасываем
      if (previousActiveTab && !previousActiveTab.isConnected) {
        activeTab = null;
      }
    },
    openTab: (tabElement) => {
      if (tabElement instanceof Element && tabElement.classList.contains(containerClass)) {
        closeAllTabs();
        openTab(tabElement);
      }
    },
    closeTab: (tabElement) => {
      if (tabElement instanceof Element && tabElement.classList.contains(containerClass)) {
        closeTab(tabElement);
      }
    },
    closeAllTabs: closeAllTabs,
    toggleTab: (tabElement) => {
      if (tabElement instanceof Element && tabElement.classList.contains(containerClass)) {
        toggleTab(tabElement);
      }
    },
    getActiveTab: () => activeTab,
    destroy: () => {
      if (!isInitialized) return;

      document.removeEventListener('click', handleDocumentClick);
      closeAllTabs();

      isInitialized = false;
      tabs = [];
      activeTab = null;
    }
  };
}