export function initPortfolioTabs(selectors = {}) {
  const defaultSelectors = {
    btn: 'portfolio-name__btn',
    btnText: 'text',
    list: 'portfolio-name__list',
    listItem: 'portfolio-name__item-btn',
    swipersBox: 'portfolio-box-swipers',
    swiperWrapper: 'portfolio-swiper-wrapper',
    activeClass: 'active'
  };

  const config = { ...defaultSelectors, ...selectors };

  function initializeTabs() {
    // Находим основные элементы
    const mainBtn = document.querySelector(`.${config.btn}`);
    const btnText = mainBtn ? mainBtn.querySelector(`.${config.btnText}`) : null;
    const list = document.querySelector(`.${config.list}`);
    const listItems = list ? list.querySelectorAll(`.${config.listItem}`) : null;
    const swipersBox = document.querySelector(`.${config.swipersBox}`);
    const swiperWrappers = swipersBox ? swipersBox.querySelectorAll(`.${config.swiperWrapper}`) : null;

    // Проверяем, все ли элементы найдены и количество совпадает
    if (!mainBtn || !btnText || !list || !listItems || !swipersBox || !swiperWrappers) {
      console.warn('Не все необходимые элементы найдены для инициализации табов');
      return false;
    }

    if (listItems.length !== swiperWrappers.length) {
      console.warn('Количество кнопок не совпадает с количеством блоков');
      return false;
    }

    // Функция для активации таба по индексу
    function activateTab(index) {
      // Удаляем активный класс у всех кнопок и блоков
      listItems.forEach(item => item.classList.remove(config.activeClass));
      swiperWrappers.forEach(wrapper => wrapper.classList.remove(config.activeClass));

      // Добавляем активный класс выбранной кнопке и блоку
      if (listItems[index]) {
        listItems[index].classList.add(config.activeClass);

        // Обновляем текст в основной кнопке
        const textSpan = listItems[index].querySelector(`.${config.btnText}`);
        if (textSpan && btnText) {
          btnText.textContent = textSpan.textContent;
        }
      }

      if (swiperWrappers[index]) {
        swiperWrappers[index].classList.add(config.activeClass);
      }
    }

    // Обработчик клика по кнопкам в списке
    listItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        activateTab(index);
      });
    });

    // Обработчик клика по основной кнопке (если нужно открывать/закрывать список)
    mainBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Здесь можно добавить логику открытия/закрытия выпадающего списка
      list.closest('.portfolio-name__list-wrapper').classList.toggle('open');
    });

    // Закрытие списка при клике вне области
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.portfolio-name')) {
        const listWrapper = list.closest('.portfolio-name__list-wrapper');
        if (listWrapper) {
          listWrapper.classList.remove('open');
        }
      }
    });

    return true;
  }

  // Инициализация при загрузке
  let isInitialized = initializeTabs();

  // Observer для динамического добавления элементов
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        let needReinit = false;

        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            // Проверяем, добавились ли нужные нам элементы
            if (node.classList.contains(config.list) ||
              node.classList.contains(config.swipersBox) ||
              node.querySelector(`.${config.list}`) ||
              node.querySelector(`.${config.swipersBox}`)) {
              needReinit = true;
            }
          }
        });

        if (needReinit && !isInitialized) {
          isInitialized = initializeTabs();
        }
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  return {
    reinitialize: () => {
      isInitialized = initializeTabs();
      return isInitialized;
    }
  };
}