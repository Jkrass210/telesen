/*export function initDetailedSwiper() {
  const detailedTopSwiper = document.querySelector('.swiper-detailed-top');
  const detailedBottomSwiper = document.querySelector('.swiper-detailed-bottom');

  if (!detailedTopSwiper || !detailedBottomSwiper) {
    console.warn('Swiper elements not found');
    return null;
  }

  try {
    // Инициализация слайдера превью
    const thumbsSwiper = new Swiper('.swiper-detailed-bottom', {
      slidesPerView: 4,
      spaceBetween: 12,
      loop: true,
      breakpoints: {
        320: {
          direction: 'horizontal',
          spaceBetween: 4
        },
        768: {
          direction: 'vertical',
          spaceBetween: 4
        },
        1024: {
          direction: 'horizontal',
          spaceBetween: 12
        }
      },
      navigation: {
        nextEl: '.swiper-detailed-bottom .btn-arrow:nth-child(3)',
        prevEl: '.swiper-detailed-bottom .btn-arrow:nth-child(1)',
      }
    });

    // Инициализация основного слайдера
    const mainSwiper = new Swiper('.swiper-detailed-top', {
      slidesPerView: 1,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      loop: true,
      thumbs: {
        swiper: thumbsSwiper  // Связь устанавливается здесь
      }
    });

    console.log('Detailed swiper initialized successfully');

    return {
      main: mainSwiper,
      thumbs: thumbsSwiper
    };

  } catch (error) {
    console.error('Error initializing detailed swiper:', error);
    return null;
  }
}*/

export function initDetailedSwiper() {
  const detailedTopSwiper = document.querySelector('.swiper-detailed-top');
  const detailedBottomSwiper = document.querySelector('.swiper-detailed-bottom');

  if (!detailedTopSwiper || !detailedBottomSwiper) {
    console.warn('Swiper elements not found');
    return null;
  }

  try {
    // Инициализация слайдера превью
    const thumbsSwiper = new Swiper('.swiper-detailed-bottom', {
      slidesPerView: 4,
      spaceBetween: 12,
      loop: false,
      breakpoints: {
        320: {
          direction: 'horizontal',
          spaceBetween: 4
        },
        750: {
          direction: 'vertical',
          spaceBetween: 4
        },
        950: {
          spaceBetween: 4
        },
        1100: {
          direction: 'horizontal',
          spaceBetween: 12
        }
      },
      navigation: {
        nextEl: '.swiper-detailed-wrapper-bottom .--next',
        prevEl: '.swiper-detailed-wrapper-bottom .--prev',
      }
    });

    // Инициализация основного слайдера с ТЕМИ ЖЕ кнопками навигации
    const mainSwiper = new Swiper('.swiper-detailed-top', {
      slidesPerView: 1,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      loop: false,
      // Используем те же кнопки навигации
      navigation: {
        nextEl: '.swiper-detailed-wrapper-bottom .--next',
        prevEl: '.swiper-detailed-wrapper-bottom .--prev',
      },
      thumbs: {
        swiper: thumbsSwiper
      }
    });

    console.log('Detailed swiper initialized successfully');

    return {
      main: mainSwiper,
      thumbs: thumbsSwiper
    };

  } catch (error) {
    console.error('Error initializing detailed swiper:', error);
    return null;
  }
}