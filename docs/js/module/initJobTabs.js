export function initJobTabs(
  containerSelector = '.box-jop-tabs',
  tabSelector = '.jop-tab',
  buttonSelector = '.jop-tab__btn',
  listSelector = '.jop-tab__list'
) {
  const containers = document.querySelectorAll(containerSelector);

  // Проверяем наличие контейнеров
  if (containers.length === 0) {
    console.warn('Контейнеры с селектором "' + containerSelector + '" не найдены');
    return;
  }

  containers.forEach(function (container) {
    const tabs = container.querySelectorAll(tabSelector);
    const buttons = container.querySelectorAll(buttonSelector);
    const lists = container.querySelectorAll(listSelector);

    // Проверяем наличие всех элементов в контейнере
    if (tabs.length === 0 || buttons.length === 0 || lists.length === 0) {
      console.warn('Не все необходимые элементы найдены в контейнере');
      return;
    }

    // Функция закрытия всех табов
    function closeAllTabs() {
      buttons.forEach(function (button) {
        button.classList.remove('active');
      });
      lists.forEach(function (list) {
        list.classList.remove('active');
      });
    }

    // Функция переключения таба
    function toggleTab(button, list) {
      var isActive = button.classList.contains('active');

      if (isActive) {
        // Закрываем текущий таб
        button.classList.remove('active');
        list.classList.remove('active');
      } else {
        // Открываем новый таб
        closeAllTabs();
        button.classList.add('active');
        list.classList.add('active');
      }
    }

    // Обработчики клика на кнопки
    buttons.forEach(function (button, index) {
      button.addEventListener('click', function () {
        var list = lists[index];
        if (list) {
          toggleTab(button, list);
        }
      });
    });

    // Обработчик клавиши Esc
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeAllTabs();
      }
    });
  });
}