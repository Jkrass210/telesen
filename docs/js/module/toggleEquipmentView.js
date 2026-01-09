export const toggleEquipmentView = () => {
  const container = document.querySelector('.box-list-equipment__content');
  if (!container) return;

  const list = container.querySelector('.box-list-equipment__list');
  const button = container.querySelector('.view-all.btn-reset');

  if (!list || !button) return;

  // Функция переключения классов
  const toggleActive = () => {
    list.classList.toggle('active');
    button.classList.toggle('active');
  };

  // Назначаем обработчик клика
  button.addEventListener('click', toggleActive);
};