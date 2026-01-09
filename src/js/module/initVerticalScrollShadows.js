export function initVerticalScrollShadows(selector) {
  const elements = document.querySelectorAll(selector);

  // Проверяем, есть ли элементы
  if (elements.length === 0) {
    console.warn('Элементы с селектором "' + selector + '" не найдены');
    return;
  }

  console.log('Найдено ' + elements.length + ' элементов для инициализации вертикальных скролл-теней');

  elements.forEach(function (element, index) {
    const updateShadows = function () {
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;

      // Проверяем, есть ли скролл вообще
      const hasScroll = scrollHeight > clientHeight;

      if (!hasScroll) {
        // Если скролла нет - убираем все классы
        element.classList.remove('scrolled-top', 'scrolled-bottom');
        return;
      }

      // Проверяем позицию скролла
      const isAtStart = scrollTop === 0;
      const isAtEnd = Math.abs(scrollTop + clientHeight - scrollHeight) < 1;

      // Добавляем/убираем классы
      element.classList.toggle('scrolled-top', isAtStart);
      element.classList.toggle('scrolled-bottom', isAtEnd);
    };

    element.addEventListener('scroll', updateShadows);
    
    // Также отслеживаем изменение размера контента
    const resizeObserver = new ResizeObserver(updateShadows);
    resizeObserver.observe(element);
    
    updateShadows(); // Инициализация

    console.log('Инициализирован вертикальный скролл для элемента ' + (index + 1));
  });
}