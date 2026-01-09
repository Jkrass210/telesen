// swiper-init.js
export function initReadySwiper(containerClass = '.ready-swiper') {
  const swiperContainers = document.querySelectorAll(containerClass);

  if (!swiperContainers.length) return;

  swiperContainers.forEach(container => {
    // Находим элементы внутри контейнера
    const wrapper = container.querySelector('.swiper-wrapper');
    const prevBtn = container.querySelector('.btn-arrow-ready-swiper.--prev');
    const nextBtn = container.querySelector('.btn-arrow-ready-swiper.--next');

    if (!wrapper) return;

    // Инициализация Swiper
    new Swiper(container, {
      slidesPerView: 1,
      spaceBetween: 12,
      loop: false,

      breakpoints: {
        750: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        950: {
          slidesPerView: 3,
          spaceBetween: 24,
        }
      },

      // Навигация
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },

      // Отключение функционала, если слайдов меньше чем нужно
      watchOverflow: true,

      on: {
        init: function () {
          console.log('Swiper initialized');
        },
      }
    });
  });
}