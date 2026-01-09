export function initResponsiveTitle() {
  const sourceContainer = document.querySelector('.card-detailed-top__line-title');
  const targetContainer = document.querySelector('.card-detailed-top__line-title-hidden');
  const titleElement = document.querySelector('.card-detailed-top__line-title .card-detailed-top__title.section-title');

  // Проверяем наличие всех необходимых элементов
  if (!sourceContainer || !targetContainer || !titleElement) {
    console.warn('Responsive title elements not found');
    return null;
  }

  // Функция для перемещения заголовка
  function moveTitle() {
    const viewportWidth = window.innerWidth;
    const isMobile = viewportWidth <= 950;

    // Определяем текущий родитель заголовка
    const currentParent = titleElement.parentElement;

    if (isMobile && currentParent === sourceContainer) {
      // Перемещаем в скрытый контейнер, первым элементом
      targetContainer.insertBefore(titleElement, targetContainer.firstChild);
    } else if (!isMobile && currentParent === targetContainer) {
      // Перемещаем обратно в исходный контейнер, первым элементом
      sourceContainer.insertBefore(titleElement, sourceContainer.firstChild);
    }
  }

  // Запускаем при загрузке и ресайзе
  function init() {
    moveTitle();

    // Добавляем обработчик ресайза с debounce для оптимизации
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(moveTitle, 150);
    });
  }

  // Инициализируем
  init();

  // Возвращаем методы для управления (опционально)
  return {
    moveTitle,
    destroy: () => {
      window.removeEventListener('resize', moveTitle);
    }
  };
}