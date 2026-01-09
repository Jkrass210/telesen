export function initPortfolioDetailedSwipers() {
  // Проверяем, что Swiper доступен глобально
  if (typeof Swiper === 'undefined') {
    console.error('Swiper is not loaded. Please check if Swiper script is included.');
    return;
  }

  const swiperContainers = document.querySelectorAll('.box-portfolio-detailed__box-swiper');

  swiperContainers.forEach(container => {
    // Проверяем, не был ли уже инициализирован свайпер
    if (container.classList.contains('swiper-initialized')) return;

    const swiperEl = container.querySelector('.portfolio-detailed-swiper');
    const prevBtn = container.querySelector('.btn-arrow-portfolio-detailed-swiper.--prev');
    const nextBtn = container.querySelector('.btn-arrow-portfolio-detailed-swiper.--next');

    if (!swiperEl) {
      console.warn('Swiper element not found in container');
      return;
    }

    if (!prevBtn || !nextBtn) {
      console.warn('Navigation buttons not found in container');
      return;
    }

    try {
      // Инициализация свайпера
      const swiper = new Swiper(swiperEl, {
        slidesPerView: 1.2,
        spaceBetween: 16,
        navigation: {
          prevEl: prevBtn,
          nextEl: nextBtn,
        },
        breakpoints: {
          750: {
            slidesPerView: 2.8,
            spaceBetween: 16
          },
          950: {
            slidesPerView: 2.7,
            spaceBetween: 20
          },
          1100: {
            slidesPerView: 3.2,
            spaceBetween: 24
          }
        },
        // Опционально: добавляем маркер после инициализации
        on: {
          init: function () {
            container.classList.add('swiper-initialized');
          }
        }
      });

      console.log('Swiper initialized successfully');

    } catch (error) {
      console.error('Swiper initialization error:', error);
    }
  });
}