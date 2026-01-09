// smooth-scroll.js
export function initSmoothScroll() {
  // Проверяем поддержку необходимых API
  if (typeof window === 'undefined' || !('scrollTo' in window) || !('querySelector' in document)) {
    return;
  }

  // Обработчик клика на ссылки
  function handleLinkClick(event) {
    const link = event.currentTarget;
    const href = link.getAttribute('href');

    // Проверяем, что это якорная ссылка
    if (href && href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        event.preventDefault();

        // Плавная прокрутка
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Обновляем URL без перезагрузки страницы
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    }
  }

  // Инициализация
  function init() {
    // Находим все якорные ссылки с классом card-detailed-top__link
    const anchorLinks = document.querySelectorAll('a.card-detailed-top__link[href^="#"]');

    anchorLinks.forEach(link => {
      // Удаляем предыдущие обработчики чтобы избежать дублирования
      link.removeEventListener('click', handleLinkClick);
      // Добавляем обработчик
      link.addEventListener('click', handleLinkClick);
    });
  }

  // Запускаем инициализацию когда DOM готов
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Возвращаем функции для ручного управления если нужно
  return {
    init,
    handleLinkClick
  };
}

// Автоматическая инициализация при импорте (опционально)
// initSmoothScroll();