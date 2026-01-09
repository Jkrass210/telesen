
/*export function initPortfolioMap() {
  const portfolioMap = document.querySelector('.box-portfolio-map');

  if (!portfolioMap) {
    console.warn('PortfolioMap: Контейнер не найден');
    return null;
  }

  // Находим все превью и кнопки
  const previews = portfolioMap.querySelectorAll('[data-id-swiper]');
  const buttons = portfolioMap.querySelectorAll('[data-id-for-swiper]');

  if (previews.length === 0 || buttons.length === 0) {
    console.warn('PortfolioMap: Элементы не найдены');
    return null;
  }

  // Функция для активации пары элементов
  function activatePair(id) {
    // Удаляем active со всех элементов
    previews.forEach(preview => preview.classList.remove('active'));
    buttons.forEach(button => button.classList.remove('active'));

    // Добавляем active к соответствующей паре
    const targetPreview = portfolioMap.querySelector(`[data-id-swiper="${id}"]`);
    const targetButton = portfolioMap.querySelector(`[data-id-for-swiper="${id}"]`);

    if (targetPreview) targetPreview.classList.add('active');
    if (targetButton) targetButton.classList.add('active');
  }

  // Функция для получения ID первой пары
  function getFirstPairId() {
    const firstPreview = previews[0];
    if (firstPreview) {
      return firstPreview.getAttribute('data-id-swiper');
    }
    return null;
  }

  // Функция проверки ширины viewport
  function isDesktop() {
    return window.innerWidth >= 1100;
  }

  // Обработчик клика на кнопки
  function handleButtonClick(e) {
    const button = e.target.closest('[data-id-for-swiper]');
    if (button) {
      const id = button.getAttribute('data-id-for-swiper');
      activatePair(id);
    }
  }

  // Добавляем обработчики событий
  buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
  });

  // Активируем первую пару при загрузке только на ПК (>= 1100px)
  if (isDesktop()) {
    const firstId = getFirstPairId();
    if (firstId) {
      activatePair(firstId);
    }
  }

  // Обработчик изменения размера окна (на случай ресайза)
  function handleResize() {
    // Если перешли с мобилки на десктоп и нет активных элементов
    if (isDesktop()) {
      const hasActive = portfolioMap.querySelector('.active');
      if (!hasActive) {
        const firstId = getFirstPairId();
        if (firstId) {
          activatePair(firstId);
        }
      }
    }
  }

  window.addEventListener('resize', handleResize);

  // Функция для ручной активации извне
  function activateById(id) {
    activatePair(id);
  }

  // Функция для деактивации всех
  function deactivateAll() {
    previews.forEach(preview => preview.classList.remove('active'));
    buttons.forEach(button => button.classList.remove('active'));
  }

  // Возвращаем методы для внешнего использования
  return {
    activateById,
    deactivateAll,
    buttons,
    previews,
    isDesktop
  };
}*/

export function initPortfolioMap() {
  const portfolioMap = document.querySelector('.box-portfolio-map');

  if (!portfolioMap) {
    console.warn('PortfolioMap: Контейнер не найден');
    return null;
  }

  // Находим все превью и кнопки
  const previews = portfolioMap.querySelectorAll('[data-id-swiper]');
  const buttons = portfolioMap.querySelectorAll('[data-id-for-swiper]');

  if (previews.length === 0 || buttons.length === 0) {
    console.warn('PortfolioMap: Элементы не найдены');
    return null;
  }

  // Переменные для хранения текущих обработчиков
  let currentOutsideClickHandler = null;
  let currentEscapeHandler = null;
  let currentCloseButtonHandler = null;

  // Функция проверки ширины viewport
  function isDesktop() {
    return window.innerWidth >= 1100;
  }

  // Функция для удаления всех обработчиков закрытия
  function removeCloseHandlers() {
    if (currentOutsideClickHandler) {
      document.removeEventListener('click', currentOutsideClickHandler);
      currentOutsideClickHandler = null;
    }
    if (currentEscapeHandler) {
      document.removeEventListener('keydown', currentEscapeHandler);
      currentEscapeHandler = null;
    }
  }

  // Функция для закрытия модального окна (только для мобильных/планшетов)
  function closeModal() {
    // Удаляем active со всех элементов
    previews.forEach(preview => preview.classList.remove('active'));
    buttons.forEach(button => button.classList.remove('active'));

    // Восстанавливаем скролл на body
    document.body.style.overflow = '';

    // Удаляем обработчики закрытия
    removeCloseHandlers();
  }

  // Функция для активации пары элементов
  function activatePair(id) {
    // Удаляем active со всех элементов
    previews.forEach(preview => preview.classList.remove('active'));
    buttons.forEach(button => button.classList.remove('active'));

    // Добавляем active к соответствующей паре
    const targetPreview = portfolioMap.querySelector(`[data-id-swiper="${id}"]`);
    const targetButton = portfolioMap.querySelector(`[data-id-for-swiper="${id}"]`);

    if (targetPreview) targetPreview.classList.add('active');
    if (targetButton) targetButton.classList.add('active');

    // Для мобильных/планшетов добавляем обработчики закрытия
    if (!isDesktop()) {
      // Блокируем скролл на body
      document.body.style.overflow = 'hidden';

      // Удаляем старые обработчики
      removeCloseHandlers();

      // Обработчик клика по кнопке закрытия внутри превью
      const closeButton = targetPreview.querySelector('.close');
      if (closeButton) {
        currentCloseButtonHandler = closeModal;
        closeButton.addEventListener('click', currentCloseButtonHandler);
      }

      // Обработчик клика вне превью
      /*currentOutsideClickHandler = function(e) {
        if (!targetPreview.contains(e.target) && !targetButton.contains(e.target)) {
          closeModal();
        }
      };*/

      currentOutsideClickHandler = function (e) {
        const wrapper = targetPreview.querySelector('.box-preview__wrapper-swiper');
        if (wrapper && !wrapper.contains(e.target) && !targetButton.contains(e.target)) {
          closeModal();
        }
      };

      // Добавляем обработчик с небольшой задержкой чтобы не сработал сразу
      setTimeout(() => {
        document.addEventListener('click', currentOutsideClickHandler);
      }, 10);

      // Обработчик Escape
      currentEscapeHandler = function (e) {
        if (e.key === 'Escape') {
          closeModal();
        }
      };
      document.addEventListener('keydown', currentEscapeHandler);
    }
  }

  // Функция для получения ID первой пары
  function getFirstPairId() {
    const firstPreview = previews[0];
    if (firstPreview) {
      return firstPreview.getAttribute('data-id-swiper');
    }
    return null;
  }

  // Обработчик клика на кнопки
  function handleButtonClick(e) {
    const button = e.target.closest('[data-id-for-swiper]');
    if (button) {
      const id = button.getAttribute('data-id-for-swiper');

      // Для мобильных/планшетов проверяем, не кликаем ли мы на уже активную кнопку
      if (!isDesktop()) {
        const targetPreview = portfolioMap.querySelector(`[data-id-swiper="${id}"]`);
        if (targetPreview && targetPreview.classList.contains('active')) {
          closeModal();
          return;
        }
      }

      activatePair(id);
    }
  }

  // Добавляем обработчики событий
  buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
  });

  // Активируем первую пару при загрузке только на ПК (>= 1100px)
  if (isDesktop()) {
    const firstId = getFirstPairId();
    if (firstId) {
      activatePair(firstId);
    }
  }

  // Обработчик изменения размера окна (на случай ресайза)
  function handleResize() {
    // Удаляем обработчики при ресайзе (но не закрываем модалку)
    removeCloseHandlers();

    // Если перешли с мобилки на десктоп
    if (isDesktop()) {
      // Восстанавливаем скролл на body (если был заблокирован)
      document.body.style.overflow = '';

      const hasActive = portfolioMap.querySelector('.active');
      if (!hasActive) {
        const firstId = getFirstPairId();
        if (firstId) {
          activatePair(firstId);
        }
      }
    } else {
      // Если перешли с десктопа на мобилку и есть активные элементы - переустанавливаем обработчики
      const activePreview = portfolioMap.querySelector('[data-id-swiper].active');
      if (activePreview) {
        const id = activePreview.getAttribute('data-id-swiper');
        // Переустанавливаем обработчики для активного элемента
        const targetPreview = portfolioMap.querySelector(`[data-id-swiper="${id}"]`);
        const targetButton = portfolioMap.querySelector(`[data-id-for-swiper="${id}"]`);

        if (targetPreview && targetButton) {
          // Блокируем скролл на body
          document.body.style.overflow = 'hidden';

          // Обработчик клика по кнопке закрытия внутри превью
          const closeButton = targetPreview.querySelector('.close');
          if (closeButton) {
            currentCloseButtonHandler = closeModal;
            closeButton.addEventListener('click', currentCloseButtonHandler);
          }

          // Обработчик клика вне превью
          /*currentOutsideClickHandler = function (e) {
            if (!targetPreview.contains(e.target) && !targetButton.contains(e.target)) {
              closeModal();
            }
          };*/

          currentOutsideClickHandler = function (e) {
            const wrapper = targetPreview.querySelector('.box-preview__wrapper-swiper');
            if (wrapper && !wrapper.contains(e.target) && !targetButton.contains(e.target)) {
              closeModal();
            }
          };

          setTimeout(() => {
            document.addEventListener('click', currentOutsideClickHandler);
          }, 10);

          // Обработчик Escape
          currentEscapeHandler = function (e) {
            if (e.key === 'Escape') {
              closeModal();
            }
          };
          document.addEventListener('keydown', currentEscapeHandler);
        }
      }
    }
  }

  window.addEventListener('resize', handleResize);

  // Функция для ручной активации извне
  function activateById(id) {
    activatePair(id);
  }

  // Функция для деактивации всех
  function deactivateAll() {
    closeModal();
  }

  // Возвращаем методы для внешнего использования
  return {
    activateById,
    deactivateAll,
    buttons,
    previews,
    isDesktop,
    closeModal
  };
}