export const initOurPartnersSwiper = () => {
  const swiperContainer = document.querySelector('.our-partners-swiper');
  if (!swiperContainer) return;

  const nextButton = swiperContainer.querySelector('.our-partners-swiper-btn-group .--next');
  const prevButton = swiperContainer.querySelector('.our-partners-swiper-btn-group .--prev');

  if (!nextButton || !prevButton) return;

  const swiper = new Swiper(swiperContainer, {
    slidesPerView: 'auto',
    spaceBetween: 24, // значение по умолчанию для ПК
    loop: true,
    speed: 600,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },

    breakpoints: {
      // when window width is <= 768px
      768: {
        spaceBetween: 16
      }
      // для других разрешений можно добавить дополнительные брейкпоинты
    },

    on: {
      init: function () {
        console.log('Our Partners Swiper initialized');
      },
    },
  });

  return swiper;
};