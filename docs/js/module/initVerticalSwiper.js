export function initVerticalSwiper(
  containerClass = 'dropdown-filter-swiper',
  scrollbarClass = 'swiper-scrollbar'
) {
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
      // Находим все элементы с указанным классом
      const swiperElements = document.querySelectorAll(`.${containerClass}`);
      
      if (swiperElements.length === 0) {
        console.warn(`Элементы с классом .${containerClass} не найдены`);
        return;
      }
      
      // Инициализируем Swiper для каждого элемента
      swiperElements.forEach((element, index) => {
        try {
          // Создаем уникальный селектор для каждого элемента
          const uniqueSelector = `.${containerClass}-${index}`;
          
          // Добавляем уникальный класс к элементу
          element.classList.add(`${containerClass}-${index}`);
          
          // Инициализируем Swiper с уникальным селектором
          new Swiper(uniqueSelector, {
            direction: "vertical",
            slidesPerView: "auto",
            freeMode: true,
            scrollbar: {
              el: `${uniqueSelector} .${scrollbarClass}`,
              draggable: true
            },
            mousewheel: {
              enabled: true,
              eventsTarget: uniqueSelector
            },
            observer: true,
            observeParents: true,
            observeSlideChildren: true
          });
          
        } catch (error) {
          console.error(`Ошибка инициализации Swiper для элемента ${index}:`, error);
        }
      });
      
      console.log(`Инициализировано ${swiperElements.length} свайперов с классом .${containerClass}`);
      
    }, 100);
  });
}