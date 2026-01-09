export function initScrollShadows(selector) {
  const elements = document.querySelectorAll(selector);

  // Проверяем, есть ли элементы
  if (elements.length === 0) {
    console.warn('Элементы с селектором "' + selector + '" не найдены');
    return;
  }

  console.log('Найдено ' + elements.length + ' элементов для инициализации скролл-теней');

  elements.forEach(function (element, index) {
    const updateShadows = function () {
      const scrollLeft = element.scrollLeft;
      const scrollWidth = element.scrollWidth;
      const clientWidth = element.clientWidth;

      // Проверяем позицию скролла
      const isAtStart = scrollLeft === 0;
      const isAtEnd = Math.abs(scrollLeft + clientWidth - scrollWidth) < 1;

      // Добавляем/убираем классы
      element.classList.toggle('scrolled-start', isAtStart);
      element.classList.toggle('scrolled-end', isAtEnd);
    };

    element.addEventListener('scroll', updateShadows);
    updateShadows(); // Инициализация

    console.log('Инициализирован скролл для элемента ' + (index + 1));
  });
}