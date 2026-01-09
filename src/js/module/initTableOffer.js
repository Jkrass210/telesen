export function initTableOffer(options) {
  // Устанавливаем значения по умолчанию
  const config = {
    contentClass: 'box-table-offer__content',
    tableClass: 'table-offer',
    lineClass: 'table-offer__line',
    boxShowClass: 'table-offer__box-show',
    buttonClass: 'show-more',
    activeClass: 'active',
    maxLines: 11,
    ...options  // Перезаписываем значениями из options если они есть
  };

  const contents = document.querySelectorAll(`.${config.contentClass}`);

  contents.forEach(content => {
    const table = content.querySelector(`.${config.tableClass}`);
    const lines = content.querySelectorAll(`.${config.lineClass}`);
    const boxShow = content.querySelector(`.${config.boxShowClass}`);
    const button = content.querySelector(`.${config.buttonClass}`);

    if (!table || !boxShow || !button) return;

    if (lines.length <= config.maxLines) {
      boxShow.style.display = 'none';
      return;
    }

    button.addEventListener('click', () => {
      table.classList.toggle(config.activeClass);
      button.classList.toggle(config.activeClass);
    });
  });
}