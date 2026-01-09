// positionTagsModule.js
/*export function initPositionTags() {
  // Проверяем существование всех необходимых элементов
  const tags = document.querySelectorAll('.tag-region');
  const icons = document.querySelectorAll('.icon-region');

  // Если элементы не найдены или их количество не совпадает - выходим
  if (tags.length === 0 || icons.length === 0 || tags.length !== icons.length) {
    console.warn('PositionTags: Элементы не найдены или их количество не совпадает');
    return null; // или return false;
  }

  function positionTags() {
    tags.forEach(tag => {
      const id = tag.getAttribute('data-id');
      const icon = document.querySelector(`.icon-region[data-id="${id}"]`);

      if (icon) {
        const iconRect = icon.getBoundingClientRect();
        const tagRect = tag.getBoundingClientRect();

        tag.style.top = (iconRect.top + iconRect.height / 2 - tagRect.height / 2 + window.pageYOffset) + 'px';
        tag.style.left = (iconRect.left + iconRect.width / 2 - tagRect.width / 2 + window.pageXOffset) + 'px';
      }
    });
  }

  // throttle - выполняется не чаще чем раз в указанный период
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  const throttledPositionTags = throttle(positionTags, 16); // ~60fps

  // Обработчики событий
  window.addEventListener('load', positionTags);
  window.addEventListener('resize', throttledPositionTags);
  window.addEventListener('scroll', throttledPositionTags);

  // Первоначальный вызов
  positionTags();

  // Возвращаем функцию для ручного вызова если нужно
  return positionTags;
}*/

export function initPositionTags() {
    const tags = document.querySelectorAll('.tag-region');
    const icons = document.querySelectorAll('.icon-region');
    
    if (tags.length === 0 || icons.length === 0 || tags.length !== icons.length) {
        console.warn('PositionTags: Элементы не найдены или их количество не совпадает');
        return null;
    }

    function positionTags() {
        const container = document.querySelector('.portfolio-map-tags');
        if (!container) return;
        
        const containerRect = container.getBoundingClientRect();
        
        tags.forEach(tag => {
            const id = tag.getAttribute('data-id');
            const icon = document.querySelector(`.icon-region[data-id="${id}"]`);
            
            if (icon) {
                const iconRect = icon.getBoundingClientRect();
                const tagRect = tag.getBoundingClientRect();
                
                // Позиционируем относительно контейнера
                const top = iconRect.top - containerRect.top + (iconRect.height / 2) - (tagRect.height / 2);
                const left = iconRect.left - containerRect.left + (iconRect.width / 2) - (tagRect.width / 2);
                
                tag.style.top = top + 'px';
                tag.style.left = left + 'px';
            }
        });
    }

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    const throttledPositionTags = throttle(positionTags, 16);

    window.addEventListener('load', positionTags);
    window.addEventListener('resize', throttledPositionTags);
    window.addEventListener('scroll', throttledPositionTags);
    
    positionTags();
    return positionTags;
}