export function initSearch(searchContainer) {
  // Проверяем наличие необходимых элементов
  const searchBtn = searchContainer.querySelector('.search__btn');
  const searchBox = searchContainer.querySelector('.search__box');
  const searchClose = searchContainer.querySelector('.search__close');

  if (!searchBtn || !searchBox || !searchClose) {
    console.warn('Не все необходимые элементы найдены в контейнере поиска');
    return;
  }

  // Функция открытия поиска
  function openSearch() {
    searchBtn.classList.add('active');
    searchBox.classList.add('active');
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
  }

  // Функция закрытия поиска
  function closeSearch() {
    searchBtn.classList.remove('active');
    searchBox.classList.remove('active');
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleEscape);
  }

  // Обработчик клика вне области поиска
  function handleClickOutside(event) {
    if (!searchContainer.contains(event.target)) {
      closeSearch();
    }
  }

  // Обработчик нажатия Escape
  function handleEscape(event) {
    if (event.key === 'Escape') {
      closeSearch();
    }
  }

  // Вешаем обработчики событий
  searchBtn.addEventListener('click', openSearch);
  searchClose.addEventListener('click', closeSearch);
}