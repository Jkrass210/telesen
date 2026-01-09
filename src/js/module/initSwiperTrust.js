export function initSwiperTrust(containerClass, options = {}) {
  const containers = document.querySelectorAll(`.${containerClass}`);
  
  if (!containers.length) return;

  containers.forEach(container => {
    // Проверяем, не был ли уже инициализирован этот слайдер
    if (container.swiperInstance) {
      // Если слайдер уже существует, просто обновляем его
      container.swiperInstance.update();
      return;
    }

    // Находим элементы внутри контейнера
    const wrapper = container.querySelector('.swiper-wrapper');
    const nextBtn = container.querySelector('.--next');
    const prevBtn = container.querySelector('.--prev');
    const slides = container.querySelectorAll('.swiper-slide');

    if (!wrapper || !nextBtn || !prevBtn || !slides.length) {
      console.warn('Не все необходимые элементы найдены в контейнере', container);
      return;
    }

    // Устанавливаем правильные стили для автоматической ширины
    slides.forEach(slide => {
      slide.style.width = 'auto';
      slide.style.flexShrink = '0';
    });

    // Определяем, включать ли loop (минимум 2 слайда)
    const shouldLoop = slides.length >= 2;

    // Создаем экземпляр Swiper
    const swiper = new Swiper(container, {
      slidesPerView: 'auto',
      spaceBetween: 24,
      //loop: shouldLoop,
      loopAdditionalSlides: shouldLoop ? 2 : 0,
      navigation: {
        nextEl: prevBtn,
        prevEl: nextBtn,
      },
      breakpoints: {
        1100: {
          spaceBetween: 20,
        },
        750: {
          spaceBetween: 16,
        },
      },
      ...options
    });

    // Обработка динамического добавления слайдов - ТОЛЬКО ОБНОВЛЯЕМ, НЕ ПЕРЕСОЗДАЕМ
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          // Обновляем стили для новых слайдов
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.classList.contains('swiper-slide')) {
              node.style.width = 'auto';
              node.style.flexShrink = '0';
            }
          });
          
          // Просто обновляем слайдер, не пересоздаем
          setTimeout(() => {
            if (swiper && !swiper.destroyed) {
              swiper.update();
            }
          }, 50);
        }
      });
    });

    observer.observe(wrapper, { childList: true });

    // Сохраняем ссылку на swiper в контейнере
    container.swiperInstance = swiper;
  });
}