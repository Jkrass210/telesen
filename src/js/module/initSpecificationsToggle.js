// specifications-toggle.js
export function initSpecificationsToggle(
  containerClass = 'card-specifications',
  listClass = 'card-specifications__list',
  buttonClass = 'show-more',
  activeClass = 'active',
  maxItems = 10
) {
  // Находим все контейнеры
  const containers = document.querySelectorAll(`.${containerClass}`);
  
  // Если нет нужных элементов, выходим
  if (containers.length === 0) {
    return;
  }

  containers.forEach(container => {
    // Находим элементы внутри контейнера
    const list = container.querySelector(`.${listClass}`);
    const button = container.querySelector(`.${buttonClass}`);
    
    // Проверяем, что все необходимые элементы найдены
    if (!list || !button) {
      return;
    }

    const items = list.querySelectorAll('li');
    const totalItems = items.length;
    
    // Если элементов меньше или равно максимальному количеству, скрываем кнопку
    if (totalItems <= maxItems) {
      button.style.display = 'none';
      return;
    }

    // Функция для скрытия лишних элементов
    function hideExcessItems() {
      items.forEach((item, index) => {
        if (index >= maxItems) {
          item.style.display = 'none';
        }
      });
    }

    // Функция для показа всех элементов
    function showAllItems() {
      items.forEach(item => {
        item.style.display = '';
      });
    }

    // Функция для переключения состояния
    function toggleItems() {
      const isActive = button.classList.contains(activeClass);
      
      if (isActive) {
        // Скрываем элементы
        hideExcessItems();
        button.classList.remove(activeClass);
      } else {
        // Показываем все элементы
        showAllItems();
        button.classList.add(activeClass);
      }
    }

    // Инициализация
    hideExcessItems();
    
    // Добавляем обработчик клика
    button.addEventListener('click', toggleItems);
    
    // Очистка обработчиков при уничтожении (опционально)
    return () => {
      button.removeEventListener('click', toggleItems);
    };
  });
}