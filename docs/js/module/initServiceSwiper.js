export function initServiceSwiper() {
  const swiperContainers = document.querySelectorAll('.swiper-service-detailed');

  // Проверяем наличие контейнеров
  if (!swiperContainers.length) {
    return;
  }

  swiperContainers.forEach(container => {
    const prevBtn = container.querySelector('.swiper-service-detailed .btn-swiper-1.--prev');
    const nextBtn = container.querySelector('.swiper-service-detailed .btn-swiper-1.--next');

    // Проверяем наличие кнопок внутри текущего контейнера
    if (!prevBtn || !nextBtn) {
      return;
    }

    // Инициализация слайдера
    const swiper = new Swiper(container, {
      effect: 'fade', // Включаем fade эффект
      fadeEffect: {
        crossFade: true // Одновременное перекрытие слайдов
      },
      speed: 500, // Скорость перехода в ms
      slidesPerView: 1,
      spaceBetween: 0,
      loop: false,
      navigation: {
        nextEl: prevBtn,
        prevEl: nextBtn,
      },
    });
  });
}