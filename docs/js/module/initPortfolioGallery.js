/*export function initPortfolioGallery(
  triggerClass = 'open-elem-tile',
  swiperClass = 'portfolio-detailed-swiper',
  cardClass = 'card-portfolio-detailed',
  targetClass = 'box-portfolio-detailed__elem-tile',
  elementsToHideClass = 'group-arrow', // класс элементов для скрытия
  hiddenClass = 'hidden', // класс для скрытия
  openText = 'Вернуться' // текст при открытии
) {
  let isOpen = false;
  let cardsCopied = false;

  const trigger = document.querySelector(`.${triggerClass}`);
  const swiperContainer = document.querySelector(`.${swiperClass}`);
  const targetContainer = document.querySelector(`.${targetClass}`);
  const elementsToHide = document.querySelectorAll(`.${elementsToHideClass}`);
  const textSpan = trigger?.querySelector('.text');

  if (!trigger || !swiperContainer || !targetContainer || !textSpan) {
    console.warn('Portfolio Gallery: Не найдены необходимые элементы');
    return;
  }

  const originalText = textSpan.textContent;

  function copyCards() {
    if (cardsCopied) return;

    const cards = swiperContainer.querySelectorAll(`.${cardClass}`);
    cards.forEach(card => {
      const clonedCard = card.cloneNode(true);
      targetContainer.appendChild(clonedCard);
    });

    cardsCopied = true;
  }

  function toggleClasses() {
    // Управляем свайпером
    swiperContainer.classList.toggle(hiddenClass, isOpen);
    
    // Управляем дополнительными элементами
    elementsToHide.forEach(element => {
      element.classList.toggle(hiddenClass, isOpen);
    });
    
    // Управляем текстом кнопки
    textSpan.textContent = isOpen ? openText : originalText;
  }

  function toggleGallery() {
    if (!isOpen) {
      if (!cardsCopied) copyCards();
      targetContainer.style.display = 'grid';
      isOpen = true;
    } else {
      targetContainer.style.display = 'none';
      isOpen = false;
    }
    
    toggleClasses();
  }

  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    toggleGallery();
  });

  return {
    open: () => {
      if (!isOpen) toggleGallery();
    },
    close: () => {
      if (isOpen) toggleGallery();
    },
    toggle: toggleGallery,
    isOpen: () => isOpen
  };
}*/

export function initPortfolioGallery(
  triggerClass = 'open-elem-tile',
  swiperClass = 'portfolio-detailed-swiper',
  cardClass = 'card-portfolio-detailed',
  targetClass = 'box-portfolio-detailed__elem-tile',
  elementsToHideClass = 'group-arrow', // класс элементов для скрытия
  hiddenClass = 'hidden', // класс для скрытия
  openText = 'Вернуться' // текст при открытии
) {
  let isOpen = false;
  let cardsCopied = false;

  const trigger = document.querySelector(`.${triggerClass}`);
  const swiperContainer = document.querySelector(`.${swiperClass}`);
  const targetContainer = document.querySelector(`.${targetClass}`);
  const elementsToHide = document.querySelectorAll(`.${elementsToHideClass}`);
  const textSpan = trigger?.querySelector('.text');

  if (!trigger || !swiperContainer || !targetContainer || !textSpan) {
    console.warn('Portfolio Gallery: Не найдены необходимые элементы');
    return;
  }

  const originalText = textSpan.textContent;

  function copyCards() {
    if (cardsCopied) return;

    const cards = swiperContainer.querySelectorAll(`.${cardClass}`);
    cards.forEach(card => {
      const clonedCard = card.cloneNode(true);
      targetContainer.appendChild(clonedCard);
    });

    cardsCopied = true;
    
    // Инициализация fslightbox для динамически добавленных элементов
    initFsLightboxForDynamicContent();
  }

  function initFsLightboxForDynamicContent() {
    // Ждем немного, чтобы DOM обновился
    setTimeout(() => {
      // Способ 1: Если есть глобальная функция refreshFsLightbox
      if (typeof refreshFsLightbox === 'function') {
        refreshFsLightbox();
        return;
      }
      
      // Способ 2: Если библиотека предоставляет метод обновления
      if (window.fsLightbox && typeof window.fsLightbox.refresh === 'function') {
        window.fsLightbox.refresh();
        return;
      }
      
      // Способ 3: Для новых версий fslightbox
      if (window.fsLightbox && typeof window.fsLightbox.init === 'function') {
        window.fsLightbox.init();
        return;
      }
      
      // Способ 4: Простая переинициализация
      if (typeof fsLightbox === 'function') {
        fsLightbox();
        return;
      }
      
      // Способ 5: Если есть инстансы, пересоздаем их
      if (window.fsLightboxInstances) {
        // Закрываем все открытые лайтбоксы
        document.querySelectorAll('[data-fslightbox-close]').forEach(btn => {
          btn.click();
        });
        
        // Переинициализируем после небольшой задержки
        setTimeout(() => {
          if (typeof fsLightbox === 'function') {
            fsLightbox();
          }
        }, 150);
        return;
      }
      
      console.warn('FsLightbox: не удалось найти метод инициализации для динамического контента');
    }, 100);
  }

  function toggleClasses() {
    // Управляем свайпером
    swiperContainer.classList.toggle(hiddenClass, isOpen);
    
    // Управляем дополнительными элементами
    elementsToHide.forEach(element => {
      element.classList.toggle(hiddenClass, isOpen);
    });
    
    // Управляем текстом кнопки
    textSpan.textContent = isOpen ? openText : originalText;
  }

  function toggleGallery() {
    if (!isOpen) {
      if (!cardsCopied) copyCards();
      targetContainer.style.display = 'grid';
      isOpen = true;
    } else {
      targetContainer.style.display = 'none';
      isOpen = false;
    }
    
    toggleClasses();
  }

  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    toggleGallery();
  });

  return {
    open: () => {
      if (!isOpen) toggleGallery();
    },
    close: () => {
      if (isOpen) toggleGallery();
    },
    toggle: toggleGallery,
    isOpen: () => isOpen,
    // Добавляем метод для принудительной переинициализации fslightbox
    refreshLightbox: initFsLightboxForDynamicContent
  };
}