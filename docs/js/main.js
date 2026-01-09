import { testWebP } from './module/testWebP.js';
import { initDropdownContact } from './module/initDropdownContact.js';
import { initModalController } from './module/initModalController.js';
//import { initFormController } from './module/initFormController.js';
import { initTabsController } from './module/initTabsController.js';
import { counterAnim } from './module/counterAnim.js';
import { initSwiperTrust } from './module/initSwiperTrust.js';
import { initPortfolioSwiper } from './module/initPortfolioSwiper.js';
import { initPortfolioTabs } from './module/initPortfolioTabs.js';
import { initPortfolioDropdown } from './module/initPortfolioDropdown.js';
import { initDropdownFilter } from './module/initDropdownFilter.js';
import { initPortfolioDetailedSwipers } from './module/initPortfolioDetailedSwipers.js';
//import { initReadDescriptionSwiper } from './module/initReadDescriptionSwiper.js';
import { initPortfolioGallery } from './module/initPortfolioGallery.js';
//import { initDropdawnFilterSwiper } from './module/initDropdawnFilterSwiper.js';
import { initVerticalSwiper } from './module/initVerticalSwiper.js';
import { initSimpleThrowPositioning } from './module/initSimpleThrowPositioning.js';
import { initDropdownRadioTextCopy } from './module/initDropdownRadioTextCopy.js';
import { quipmentManager } from './module/quipmentManager.js';
import { toggleEquipmentView } from './module/toggleEquipmentView.js';
import { initOurPartnersSwiper } from './module/initOurPartnersSwiper.js';
import { initValidate } from './module/initValidate.js';
import { initSearch } from './module/initSearch.js';
import { initReadySwiper } from './module/initReadySwiper.js';
import { initTableOffer } from './module/initTableOffer.js';
import { initPositionTags } from './module/initPositionTags.js';
import { initMapPreviewSwipers } from './module/initMapPreviewSwipers.js';
import { initPortfolioMap } from './module/initPortfolioMap.js';
import { initDetailedSwiper } from './module/initDetailedSwiper.js';
import { initResponsiveTitle } from './module/initResponsiveTitle.js';
import { initSmoothScroll } from './module/initSmoothScroll.js';
import { initSpecificationsToggle } from './module/initSpecificationsToggle.js';
import { initScrollShadows } from './module/initScrollShadows.js';
import { initJobTabs } from './module/initJobTabs.js';
import { initServiceSwiper } from './module/initServiceSwiper.js';
import { initDropdownPresentations } from './module/initDropdownPresentations.js';
import { initVerticalScrollShadows } from './module/initVerticalScrollShadows.js';
import { initModalPresentations } from './module/initModalPresentations.js';
import { initVideoMaterialsSwiper } from './module/initVideoMaterialsSwiper.js';

testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
    console.log("выполнился webp")
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});

if (document.querySelectorAll('.trust-swiper').length) {
  function initializeSwipers() {
    initSwiperTrust('trust-swiper');
  }

  // Инициализация при загрузке DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSwipers);
  } else {
    setTimeout(initializeSwipers, 100); // Небольшая задержка для полной загрузки
  }

  // Убираем интервальную проверку и сложный MutationObserver
  // Простой observer только для новых контейнеров
  const containerObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            // Проверяем, добавился ли новый контейнер слайдера
            if (node.classList.contains('trust-swiper')) {
              initSwiper('trust-swiper');
            }
            // Или внутри добавленного элемента есть слайдер
            const sliders = node.querySelectorAll('.trust-swiper');
            if (sliders.length) {
              initSwiper('trust-swiper');
            }
          }
        });
      }
    });
  });

  containerObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
}

if (document.querySelectorAll('.dropdown-contact').length) {
  initDropdownContact()
}

if (document.querySelectorAll('.connection').length) {
  initModalController()
}

if (document.querySelectorAll('.form-1').length) {
  initValidate({
    formClass: 'header-form',
    namePhone: 'phone',
    nameCompany: 'company',
    nameNeme: 'neme',

    wrapperClass: 'box-modal__wrapper',
    messageClass: 'box-modal__message',
  })
}

if (document.querySelectorAll('.form-1').length) {
  initValidate({
    formClass: 'list-equipment-form',
    namePhone: 'phone-1',
    nameCompany: 'company-1',
    nameNeme: 'neme-1',

    wrapperClass: 'box-modal__wrapper',
    messageClass: 'box-modal__message',
  })
}

if (document.querySelectorAll('.form-1').length) {
  initValidate({
    formClass: 'form-message-3',
    namePhone: 'phone-form-2',
    nameCompany: 'company-form-2',
    nameNeme: 'name-form-2',
    nameFile: 'file-form-2',
    nameTextarea: 'textarea-form-2',
    wrapperClass: 'form-message__wrapper',
    messageClass: 'form-message__message',
  })
}

if (document.querySelectorAll('.dropdown-contact').length) {
  initModalController({
    containerClass: 'dropdown-contact',
    buttonClass: 'dropdown-contact__main-btn',
    modalClass: 'dropdown-contact__wrapper',
    windowClass: 'dropdown-contact__list',
    closeClass: 'close',
    activeClass: 'active',
    bodyClass: 'no-scroll'
  })
}

if (document.querySelectorAll('.read-description').length) {
  initModalController({
    containerClass: 'read-description',
    buttonClass: 'read-description__btn',
    modalClass: 'read-description__modal',
    windowClass: 'read-description__window',
    closeClass: 'close',
    activeClass: 'active',
    bodyClass: 'stop-scroll'
  })
}

if (document.querySelectorAll('.header').length) {
  initModalController({
    containerClass: 'header',
    buttonClass: 'burger',
    modalClass: 'header__line-bottom',
    windowClass: 'header__line-bottom',
    closeClass: 'close',
    activeClass: 'active',
    bodyClass: 'stop-scroll'
  })
}

if (document.querySelectorAll('.filter').length) {
  initModalController({
    containerClass: 'filter',
    buttonClass: 'filter__open',
    modalClass: 'filter__wrapper',
    windowClass: 'filter__wrapper',
    closeClass: 'filter__btn-back',
    activeClass: 'active',
    bodyClass: 'stop-scroll'
  })
}

if (document.querySelectorAll('.dropdown-nav').length) {
  initTabsController()
}

if (document.querySelectorAll('.counter').length) {
  counterAnim()
}

if (document.querySelectorAll('.portfolio-swiper').length) {
  function initializePortfolioSwipers() {
    initPortfolioSwiper();
  }

  // Инициализация при загрузке DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolioSwipers);
  } else {
    setTimeout(initializePortfolioSwipers, 100);
  }

  // Observer для динамического добавления слайдеров
  const portfolioObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        let needInit = false;

        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            // Проверяем, добавился ли новый слайдер
            if (node.classList.contains('portfolio-swiper')) {
              needInit = true;
            }
            // Или внутри есть слайдер
            const swipers = node.querySelectorAll('.portfolio-swiper');
            if (swipers.length) {
              needInit = true;
            }
          }
        });

        if (needInit) {
          setTimeout(initializePortfolioSwipers, 300);
        }
      }
    });
  });

  portfolioObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Также обновляем при изменении размеров окна
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (typeof window.updatePortfolioSwipers === 'function') {
        window.updatePortfolioSwipers();
      }
    }, 250);
  });
}

if (document.querySelectorAll('.portfolio-name__btn').length) {

  initPortfolioTabs();

  // Для динамического добавления всей структуры
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            // Если добавился контейнер с табами
            if (node.classList.contains('portfolio-box-btn') ||
              node.querySelector('.portfolio-box-btn')) {
              initPortfolioTabs();
            }
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.querySelector('.portfolio-name')) {

  initPortfolioDropdown();


  // Для динамического добавления всей структуры
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            // Если добавился контейнер с dropdown
            if (node.classList.contains('portfolio-name') ||
              node.querySelector('.portfolio-name')) {
              initPortfolioDropdown();
            }
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.querySelectorAll('.dropdown-filter').length) {
  initDropdownFilter();
  initSimpleThrowPositioning();
  initDropdownRadioTextCopy();
}

if (document.querySelectorAll('.box-portfolio-detailed__box-swiper').length) {
  initPortfolioDetailedSwipers();
}

if (document.querySelector('.open-elem-tile') && document.querySelector('.portfolio-detailed-swiper') && document.querySelector('.box-portfolio-detailed__elem-tile')) {
  initPortfolioGallery()
}

if (document.querySelector('.read-description-swiper')) {
  initVerticalSwiper('read-description-swiper', 'swiper-scrollbar');
}

if (document.querySelector('.portfolio-name-swiper')) {
  initVerticalSwiper('portfolio-name-swiper', 'swiper-scrollbar');
}

if (document.querySelectorAll('.dropdown-filter-swiper').length) {
  initVerticalSwiper()
}

if (document.querySelectorAll('.box-list-equipment').length) {
  quipmentManager.init();
}

if (document.querySelectorAll('.box-list-equipment__content').length) {
  toggleEquipmentView();
}

if (document.querySelectorAll('.our-partners-swiper').length) {
  initOurPartnersSwiper();
}

if (document.querySelectorAll('.search').length) {
  const searchContainers = document.querySelectorAll('.search');
  searchContainers.forEach(container => {
    initSearch(container);
  });
}

if (document.querySelectorAll('.ready-swiper').length) {
  initReadySwiper();
}

if (document.querySelector('.box-table-offer__content') && document.querySelector('.table-offer') && document.querySelector('.table-offer__box-show')) {
  initTableOffer({})
}

if (document.querySelector('.box-portfolio-map')) {
  initPositionTags()
}

if (document.querySelectorAll('.map-preview-swiper').length) {
  initMapPreviewSwipers()
}

if (document.querySelector('.box-portfolio-map')) {
  initPortfolioMap()
}

if (document.querySelector('.swiper-detailed')) {
  initDetailedSwiper()
}

if (document.querySelector('.card-detailed-top__line-title-hidden')) {
  initResponsiveTitle();
}

if (document.querySelector('.card-detailed-top__link')) {
  initSmoothScroll()
}

if (document.querySelector('.card-specifications')) {
  initSpecificationsToggle()
}

if (document.querySelector('.table-registry__scroll-wrapper')) {
  initScrollShadows('.table-registry__scroll-wrapper')
}

if (document.querySelectorAll('.box-jop-tabs').length) {
  initJobTabs()
}

if (document.querySelectorAll('.box-services-tabs').length) {
  initJobTabs(
    '.box-services-tabs',
    '.services-tab',
    '.services-tab__btn',
    '.services-tab__list'
  )
}

if (document.querySelectorAll('.swiper-service-detailed').length) {
  initServiceSwiper()
}

if (document.querySelectorAll('.dropdown-presentations').length) {
  initDropdownPresentations()
}

if (document.querySelector('.box-modal-1__content')) {
  initVerticalScrollShadows('.box-modal-1__content')
}

if (document.querySelectorAll('.box-presentations').length) {
  initModalPresentations()
}

if (document.querySelectorAll('.swiper-video-materials').length) {
  initVideoMaterialsSwiper()
}


