export function initReadDescriptionSwiper() {
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
      var swiper = new Swiper(".read-description-swiper", {
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: true,
        scrollbar: {
          el: ".swiper-scrollbar",
          draggable: true
        },
        mousewheel: {
          enabled: true,
          eventsTarget: ".read-description-swiper"
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      });
    }, 100);
  });
}