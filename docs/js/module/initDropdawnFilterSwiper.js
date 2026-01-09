export function initDropdawnFilterSwiper() {
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
      // Находим все элементы с классом dropdown-filter-swiper
      const swiperElements = document.querySelectorAll('.dropdown-filter-swiper');
      
      if (swiperElements.length === 0) {
        console.warn('Элементы с классом .dropdown-filter-swiper не найдены');
        return;
      }
      
      // Инициализируем Swiper для каждого элемента
      swiperElements.forEach((element, index) => {
        try {
          // Создаем уникальный селектор для каждого элемента
          const uniqueSelector = `.dropdown-filter-swiper-${index}`;
          
          // Добавляем уникальный класс к элементу
          element.classList.add(`dropdown-filter-swiper-${index}`);
          
          // Инициализируем Swiper с уникальным селектором
          new Swiper(uniqueSelector, {
            direction: "vertical",
            slidesPerView: "auto",
            freeMode: true,
            scrollbar: {
              el: `${uniqueSelector} .swiper-scrollbar`,
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
      
      console.log(`Инициализировано ${swiperElements.length} свайперов`);
      
    }, 100);
  });
}