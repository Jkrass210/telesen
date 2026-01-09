export function initSimpleThrowPositioning(
    containerClass = 'dropdown-filter',
    throwBtnClass = 'dropdown-filter__throw',
    targetThrowClass = 'throw',
    triggerBtnClass = 'dropdown-filter__btn'
) {
    let observer = null;
    let animationFrameId = null;

    function positionAll() {
        const containers = document.querySelectorAll(`.${containerClass}`);
        
        containers.forEach((container, index) => {
            const throwBtn = container.querySelector(`.${throwBtnClass}`);
            const targetThrow = container.querySelector(`.${targetThrowClass}`);

            if (!throwBtn || !targetThrow) return;

            const targetRect = targetThrow.getBoundingClientRect();

            throwBtn.style.position = 'fixed';
            throwBtn.style.left = `${targetRect.left}px`;
            throwBtn.style.top = `${targetRect.top}px`;
            throwBtn.style.width = `${targetRect.width}px`;
            throwBtn.style.height = `${targetRect.height}px`;
            throwBtn.style.zIndex = '1000';
        });
    }

    function handleUpdate() {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(positionAll);
    }

    function init() {
        positionAll();
        
        window.addEventListener('resize', handleUpdate);
        window.addEventListener('scroll', handleUpdate, { passive: true });
        
        // Специальный Observer для отслеживания изменений классов у кнопки
        observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            
            mutations.forEach((mutation) => {
                // Если изменились атрибуты (классы)
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const element = mutation.target;
                    // Проверяем, является ли элемент кнопкой или находится внутри контейнера
                    if (element.classList.contains(triggerBtnClass) || 
                        element.closest(`.${containerClass}`)) {
                        shouldUpdate = true;
                    }
                }
                
                // Если изменилась структура DOM
                if (mutation.type === 'childList') {
                    shouldUpdate = true;
                }
            });
            
            if (shouldUpdate) {
                handleUpdate();
            }
        });
        
        // Наблюдаем за всеми контейнерами и кнопками
        const containers = document.querySelectorAll(`.${containerClass}`);
        const triggerBtns = document.querySelectorAll(`.${triggerBtnClass}`);
        
        containers.forEach(container => {
            observer.observe(container, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class']
            });
        });
        
        triggerBtns.forEach(btn => {
            observer.observe(btn, {
                attributes: true,
                attributeFilter: ['class']
            });
        });
        
        return {
            update: positionAll,
            destroy: () => {
                window.removeEventListener('resize', handleUpdate);
                window.removeEventListener('scroll', handleUpdate);
                if (observer) {
                    observer.disconnect();
                }
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
            }
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        return init();
    }
}