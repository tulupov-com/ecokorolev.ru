// Галерея с модальным окном
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.getElementById('modal-close');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');
    
    let currentImageIndex = 0;
    let images = [];
    
    // Инициализация галереи
    if (galleryItems.length > 0) {
        // Сбор информации о всех изображениях галереи
        galleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption');
            
            images.push({
                src: img.getAttribute('data-full') || img.src,
                alt: img.alt,
                caption: caption ? caption.textContent : ''
            });
            
            // Добавление обработчика клика для каждого элемента галереи
            item.addEventListener('click', function() {
                openModal(index);
            });
            
            // Поддержка клавиатурной навигации для элементов галереи
            item.setAttribute('tabindex', '0');
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(index);
                }
            });
        });
        
        // Обработчики событий для модального окна
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        
        if (modalPrev) {
            modalPrev.addEventListener('click', showPrevImage);
        }
        
        if (modalNext) {
            modalNext.addEventListener('click', showNextImage);
        }
        
        // Закрытие модального окна при клике на затемненную область
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Закрытие модального окна по клавише Esc
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
            
            // Навигация по галерее с помощью клавиш стрелок
            if (modal.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    showPrevImage();
                } else if (e.key === 'ArrowRight') {
                    showNextImage();
                }
            }
        });
    }
    
    // Функция для открытия модального окна
    function openModal(index) {
        currentImageIndex = index;
        updateModalContent();
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        
        // Блокировка прокрутки основного контента
        document.body.style.overflow = 'hidden';
        
        // Установка фокуса на кнопку закрытия для доступности
        setTimeout(() => {
            modalClose.focus();
        }, 100);
        
        // Скрытие остального контента от скринридеров
        const mainContent = document.querySelector('main');
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        
        if (mainContent) mainContent.setAttribute('aria-hidden', 'true');
        if (header) header.setAttribute('aria-hidden', 'true');
        if (footer) footer.setAttribute('aria-hidden', 'true');
    }
    
    // Функция для закрытия модального окна
    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        
        // Восстановление прокрутки основного контента
        document.body.style.overflow = '';
        
        // Возврат фокуса на элемент галереи, который был открыт
        const galleryItem = galleryItems[currentImageIndex];
        if (galleryItem) {
            galleryItem.focus();
        }
        
        // Восстановление видимости для скринридеров
        const mainContent = document.querySelector('main');
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        
        if (mainContent) mainContent.setAttribute('aria-hidden', 'false');
        if (header) header.setAttribute('aria-hidden', 'false');
        if (footer) footer.setAttribute('aria-hidden', 'false');
    }
    
    // Функция для показа предыдущего изображения
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateModalContent();
    }
    
    // Функция для показа следующего изображения
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateModalContent();
    }
    
    // Функция для обновления содержимого модального окна
    function updateModalContent() {
        if (images[currentImageIndex]) {
            modalImage.src = images[currentImageIndex].src;
            modalImage.alt = images[currentImageIndex].alt;
            modalCaption.textContent = images[currentImageIndex].caption;
        }
    }
});