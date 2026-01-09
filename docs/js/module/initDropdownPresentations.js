export function initDropdownPresentations() {
  const dropdowns = document.querySelectorAll('.dropdown-presentations');

  if (!dropdowns.length) return;

  dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.dropdown-presentations__btn');
    const textSpan = dropdown.querySelector('.dropdown-presentations__btn .text');
    const list = dropdown.querySelector('.dropdown-presentations__list');
    const points = dropdown.querySelectorAll('.dropdown-presentations__point');

    if (!btn || !textSpan || !list || !points.length) return;

    // Инициализация - находим активный пункт при загрузке
    const currentText = textSpan.textContent.trim();
    points.forEach(point => {
      if (point.textContent.trim() === currentText) {
        point.classList.add('disabled');
      }
    });

    // Открытие/закрытие dropdown
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = list.classList.contains('active');

      // Закрываем все остальные dropdowns
      document.querySelectorAll('.dropdown-presentations__list.active').forEach(activeList => {
        if (activeList !== list) {
          activeList.classList.remove('active');
          activeList.closest('.dropdown-presentations').querySelector('.dropdown-presentations__btn').classList.remove('active');
        }
      });

      // Переключаем текущий
      list.classList.toggle('active', !isActive);
      btn.classList.toggle('active', !isActive);
    });

    // Обработка выбора пункта
    points.forEach(point => {
      point.addEventListener('click', (e) => {
        e.preventDefault();

        // Убираем disabled со всех пунктов
        points.forEach(p => p.classList.remove('disabled'));

        // Добавляем disabled к выбранному пункту
        point.classList.add('disabled');

        // Обновляем текст в кнопке
        textSpan.textContent = point.textContent;

        // Закрываем dropdown
        list.classList.remove('active');
        btn.classList.remove('active');
      });
    });

    // Закрытие по клику вне dropdown
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        list.classList.remove('active');
        btn.classList.remove('active');
      }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && list.classList.contains('active')) {
        list.classList.remove('active');
        btn.classList.remove('active');
      }
    });
  });
}