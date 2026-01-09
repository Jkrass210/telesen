export function initPortfolioSwiper() {
  // Находим все контейнеры слайдеров
  const swiperContainers = document.querySelectorAll('.portfolio-swiper');
  
  if (!swiperContainers.length) return;

  // Находим кнопки навигации
  const nextBtn = document.querySelector('.btn-swiper-2.--next');
  const prevBtn = document.querySelector('.btn-swiper-2.--prev');

  // Если кнопки не найдены, выходим
  if (!nextBtn || !prevBtn) {
    console.warn('Кнопки навигации не найдены');
    return;
  }

  swiperContainers.forEach((container) => {
    // Проверяем, не был ли уже инициализирован этот слайдер
    if (container.swiperInstance) return;

    const wrapper = container.querySelector('.swiper-wrapper');
    const slides = container.querySelectorAll('.swiper-slide');

    if (!wrapper || !slides.length) {
      console.warn('Не все элементы слайдера найдены', container);
      return;
    }

    // Создаем экземпляр Swiper
    const swiper = new Swiper(container, {
      effect: 'fade', // Включаем fade эффект
      fadeEffect: {
        crossFade: true // Одновременное перекрытие слайдов
      },
      speed: 500, // Скорость перехода в ms
      slidesPerView: 1, // Один слайд
      spaceBetween: 0, // Без отступов
      
      loop: true, // Бесконечная прокрутка
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      // Отключаем стандартные эффекты, чтобы был обычный слайдер
      
      allowTouchMove: true, // Разрешаем свайп
    });

    // Сохраняем экземпляр
    container.swiperInstance = swiper;

    // Обработчик для динамического добавления слайдов
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          // Обновляем слайдер при добавлении новых слайдов
          setTimeout(() => {
            if (swiper && !swiper.destroyed) {
              swiper.update();
            }
          }, 100);
        }
      });
    });

    observer.observe(wrapper, { childList: true });
  });
}