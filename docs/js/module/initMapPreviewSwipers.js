export function initMapPreviewSwipers() {
  const swipers = document.querySelectorAll('.map-preview-swiper');

  swipers.forEach((swiperElement) => {
    const slides = swiperElement.querySelectorAll('.swiper-slide');
    if (slides.length === 0) return;

    new Swiper(swiperElement, {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      pagination: {
        el: swiperElement.querySelector('.swiper-pagination'),
        type: 'fraction',
      },
      navigation: {
        nextEl: swiperElement.querySelector('.map-preview-swiper-btn.--next'),
        prevEl: swiperElement.querySelector('.map-preview-swiper-btn.--prev'),
      },
      observer: true,
      observeParents: true,
    });
  });
}