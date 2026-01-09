export function initVideoMaterialsSwiper() {
  const swiperContainers = document.querySelectorAll('.swiper-video-materials');

  if (!swiperContainers.length) return;

  swiperContainers.forEach(container => {
    const nextBtn = container.querySelector('.btn-swiper-1.--next');
    const prevBtn = container.querySelector('.btn-swiper-1.--prev');

    if (!nextBtn || !prevBtn) return;

    const swiper = new Swiper(container, {
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