export function initModalController(options = {}) {
  const {
    containerClass = 'connection',
    buttonClass = 'connection__btn',
    modalClass = 'connection__modal',
    windowClass = 'box-modal__window',
    closeClass = 'close',
    activeClass = 'active',
    bodyClass = 'stop-scroll'
  } = options;

  let modals = [];
  let isInitialized = false;
  let clickStartedInside = false;

  function init() {
    if (isInitialized) return;
    isInitialized = true;

    // Инициализация существующих модальных окон
    updateModals();

    // Обработчики событий
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    // Наблюдатель для динамически добавляемых элементов
    observeDynamicElements();
  }

  function handleMouseDown(e) {
    // Запоминаем, где начался клик
    clickStartedInside = false;

    modals.forEach(modal => {
      if (modal.classList.contains(activeClass)) {
        const modalWindow = modal.querySelector(`.${windowClass}`);
        if (modalWindow && modalWindow.contains(e.target)) {
          clickStartedInside = true;
        }
      }
    });
  }

  function handleDocumentClick(e) {
    // Открытие/закрытие модального окна через кнопку (toggle)
    const openButton = e.target.closest(`.${buttonClass}`);
    if (openButton) {
      const container = openButton.closest(`.${containerClass}`);
      if (container) {
        const modal = container.querySelector(`.${modalClass}`);
        if (modal) {
          e.preventDefault();
          e.stopPropagation();
          toggleModal(modal, openButton);
          return;
        }
      }
    }

    // Закрытие модального окна через кнопку закрытия
    const closeButton = e.target.closest(`.${closeClass}`);
    if (closeButton) {
      const modalWindow = closeButton.closest(`.${windowClass}`);
      if (modalWindow) {
        const modal = modalWindow.closest(`.${modalClass}`);
        if (modal && modal.classList.contains(activeClass)) {
          e.preventDefault();
          e.stopPropagation();
          closeModal(modal);
          return;
        }
      }
    }

    // Закрытие по клику вне окна (только если весь клик был снаружи)
    modals.forEach(modal => {
      if (modal.classList.contains(activeClass)) {
        const modalWindow = modal.querySelector(`.${windowClass}`);
        if (modalWindow && !modalWindow.contains(e.target) && !clickStartedInside) {
          closeModal(modal);
        }
      }
    });

    // Сбрасываем флаг после обработки клика
    clickStartedInside = false;
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      const activeModal = modals.find(modal => modal.classList.contains(activeClass));
      if (activeModal) {
        e.preventDefault();
        closeModal(activeModal);
      }
    }
  }

  // Функция для переключения состояния модального окна
  function toggleModal(modal, button) {
    if (modal.classList.contains(activeClass)) {
      closeModal(modal);
    } else {
      openModal(modal);
    }
  }

  function openModal(modal) {
    if (modal.classList.contains(activeClass)) return;

    modal.classList.add(activeClass);

    // Находим соответствующую кнопку
    const container = modal.closest(`.${containerClass}`);
    if (container) {
      const button = container.querySelector(`.${buttonClass}`);
      if (button) {
        button.classList.add(activeClass);
      }
    }

    // Блокируем скролл на body
    document.body.classList.add(bodyClass);
  }

  function closeModal(modal) {
    if (!modal.classList.contains(activeClass)) return;

    modal.classList.remove(activeClass);

    // Находим соответствующую кнопку
    const container = modal.closest(`.${containerClass}`);
    if (container) {
      const button = container.querySelector(`.${buttonClass}`);
      if (button) {
        button.classList.remove(activeClass);
      }
    }

    // Разблокируем скролл на body, если нет других открытых модальных окон
    const hasActiveModal = modals.some(m => m.classList.contains(activeClass));
    if (!hasActiveModal) {
      document.body.classList.remove(bodyClass);
    }
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
              } else if (node.matches && node.matches(`.${buttonClass}`)) {
                shouldUpdate = true;
              } else if (node.querySelector) {
                const newContainers = node.querySelectorAll(`.${containerClass}`);
                const newButtons = node.querySelectorAll(`.${buttonClass}`);
                if (newContainers.length > 0 || newButtons.length > 0) {
                  shouldUpdate = true;
                }
              }
            }
          });
        }
      });

      if (shouldUpdate) {
        updateModals();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function updateModals() {
    modals = Array.from(document.querySelectorAll(`.${modalClass}`));
  }

  // Автоматически инициализируем при создании
  init();

  // Публичные методы
  return {
    reinit: init,
    openModal: (modalElement) => {
      if (modalElement instanceof Element && modalElement.classList.contains(modalClass)) {
        openModal(modalElement);
      }
    },
    closeModal: (modalElement) => {
      if (modalElement instanceof Element && modalElement.classList.contains(modalClass)) {
        closeModal(modalElement);
      }
    },
    toggleModal: (modalElement) => {
      if (modalElement instanceof Element && modalElement.classList.contains(modalClass)) {
        const container = modalElement.closest(`.${containerClass}`);
        const button = container ? container.querySelector(`.${buttonClass}`) : null;
        toggleModal(modalElement, button);
      }
    },
    destroy: () => {
      if (!isInitialized) return;

      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);

      // Закрываем все открытые модальные окна
      modals.forEach(modal => {
        if (modal.classList.contains(activeClass)) {
          closeModal(modal);
        }
      });

      isInitialized = false;
      modals = [];
      clickStartedInside = false;
    }
  };
}