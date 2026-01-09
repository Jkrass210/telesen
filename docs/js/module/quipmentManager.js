export const quipmentManager = {
    init() {
        // Находим элементы
        const container = document.querySelector('.box-list-equipment');
        if (!container) return;
        
        const list = container.querySelector('.box-list-equipment__list');
        const mobileBox = container.querySelector('.box-list-equipment__box-mobile');
        const lastCard = container.querySelector('.last-card-equipment');
        const targetBox = container.querySelector('.box-list-equipment__box-last-card');
        
        if (!list || !mobileBox || !lastCard || !targetBox) return;

        // Состояние
        let isMoved = false;
        let resizeTimeout;

        // Функция проверки и перемещения
        const checkAndMove = () => {
            const isMobile = window.innerWidth <= 750;
            
            if (isMobile && !isMoved) {
                // Перемещаем в мобильный блок
                targetBox.appendChild(lastCard);
                isMoved = true;
                console.log('Moved to mobile');
            } else if (!isMobile && isMoved) {
                // Возвращаем обратно в список
                list.appendChild(lastCard);
                isMoved = false;
                console.log('Moved back to list');
            }
        };

        // Обработчик ресайза с задержкой
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(checkAndMove, 100);
        };

        // Назначаем обработчики
        window.addEventListener('resize', handleResize);
        
        // Проверяем при загрузке
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', checkAndMove);
        } else {
            checkAndMove();
        }
    }
};