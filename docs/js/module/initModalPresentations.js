export function initModalPresentations() {
  const modals = document.querySelectorAll('.box-presentations');

  if (!modals.length) return;

  modals.forEach(modal => {
    const btn = modal.querySelector('.box-presentations__btn');
    const modalWindow = modal.querySelector('.box-presentations__modal');
    const closeBtn = modal.querySelector('.close');

    if (!btn || !modalWindow) return;

    const openModal = () => {
      modalWindow.classList.add('active');
      btn.classList.add('active');
      //document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modalWindow.classList.remove('active');
      btn.classList.remove('active');
      //document.body.style.overflow = '';
    };

    // Открытие по кнопке
    btn.addEventListener('click', openModal);

    // Закрытие по кнопке close
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Закрытие по клику вне окна
    modalWindow.addEventListener('click', (e) => {
      if (e.target === modalWindow) {
        closeModal();
      }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalWindow.classList.contains('active')) {
        closeModal();
      }
    });
  });
}