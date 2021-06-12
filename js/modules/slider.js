function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
        // Slider

        const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesFeild = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;


    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesFeild.style.width = 100 * slides.length + '%';
    slidesFeild.style.display = 'flex';
    slidesFeild.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    let dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
        `;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
            `;

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }
    // Настраиваем нули
    function currentZero() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    // Настраиваем заливку полоски слайдера
    function dotsStyle() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    // Удаляем не числа
    function removeNotANum(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == removeNotANum(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += removeNotANum(width);
        }

        slidesFeild.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentZero();

        dotsStyle();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = removeNotANum(width) * (slides.length - 1);
        } else {
            offset -= removeNotANum(width);
        }

        slidesFeild.style.transform = `translateX(-${offset}px)`;


        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currentZero();

        dotsStyle();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = removeNotANum(width) * (slideTo - 1);

            slidesFeild.style.transform = `translateX(-${offset}px)`;

            currentZero();

            dotsStyle();
        });
    });

    // Слайдер легкий вариант
    function easySlider() {

        // showSlides(slideIndex);

        // if (slides.length < 10) {
        //     total.textContent = `0${slides.length}`;
        // } else {
        //     total.textContent = slides.length;
        // }

        // function showSlides(n) {
        //     // Если мы уперлись в правую границу, то начинаем все с начала
        //     if (n > slides.length) {
        //         slideIndex = 1;
        //     }

        //     // Если мы в отрицательную сторону ушли, то перемещаемся в конец
        //     if (n < 1) {
        //         slideIndex = slides.length;
        //     }

        //     slides.forEach(item => item.style.display = 'none');

        //     slides[slideIndex - 1].style.display = 'block';

        //     if (slides.length < 10) {
        //         current.textContent = `0${slideIndex}`;
        //     } else {
        //         current.textContent = slideIndex;
        //     }
        // }

        // function plusSlides(n) {
        //     showSlides(slideIndex += n);
        // }

        // prev.addEventListener('click', () => {
        //     plusSlides(-1);
        // });

        // next.addEventListener('click', () => {
        //     plusSlides(1);
        // });
    }
}

export default slider;