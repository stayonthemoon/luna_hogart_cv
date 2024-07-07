const accHeading = document.querySelectorAll(".accordion");
const accPanel = document.querySelectorAll(".accordion__panel");
const goUpButton = document.getElementById("go-up-button");

function updateAccordionState(panel, button, triangle) {
    if (panel.style.maxHeight && panel.style.maxHeight !== "0px") {
        button.textContent = "Show Less";
        triangle.classList.add("triangle_less");
    } else {
        button.textContent = "Show More";
        triangle.classList.remove("triangle_less");
    }
}

function showPanel(accordion, panel, button, triangle) {
    accordion.classList.add("active");
    panel.style.maxHeight = panel.scrollHeight + "px";
    if (button) button.textContent = "Show Less";
    if (triangle) triangle.classList.add("triangle_less");
}

function hideAllPanels(callback) {
    accPanel.forEach((panel, index) => {
        panel.style.maxHeight = null;
        accHeading[index].classList.remove("active");
        const button = accHeading[index].querySelector(".accordion__button");
        const triangle = accHeading[index].querySelector(".triangle");
        if (button) button.textContent = "Show More";
        if (triangle) triangle.classList.remove("triangle_less");
    });
    if (callback) requestAnimationFrame(callback);
}

function hidePanel(panel, button, triangle) {
    panel.style.maxHeight = null;
    panel.previousElementSibling.classList.remove("active");
    if (button) button.textContent = "Show More";
    if (triangle) triangle.classList.remove("triangle_less");
}

accHeading.forEach((heading) => {
    const button = heading.querySelector(".accordion__button");
    const triangle = heading.querySelector(".triangle");
    const panel = heading.nextElementSibling;

    if (button && triangle && panel) {
        updateAccordionState(panel, button, triangle);
    }

    heading.addEventListener("click", function (event) {
        event.preventDefault();

        if (panel.style.maxHeight && panel.style.maxHeight !== "0px") {
            hidePanel(panel, button, triangle);
        } else {
            const currentScroll = window.scrollY;
            hideAllPanels(() => {
                showPanel(this, panel, button, triangle);
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
                window.scrollTo({
                    top: currentScroll,
                    behavior: 'smooth'
                });
            });
        }
    });
});

goUpButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


function initCarousel(carouselClass) {
    const carousel = document.querySelector(carouselClass);
    const container = carousel.querySelector(`${carouselClass}-container`);
    const items = carousel.querySelectorAll(`${carouselClass}-item`);
    const dotsContainer = carousel.querySelector(`${carouselClass}-dots`);
    const itemsPerPage = 2;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    let currentPage = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add(`${carouselClass.slice(1)}-dot`);
            dot.addEventListener('click', () => goToPage(i));
            dotsContainer.appendChild(dot);
        }
    }

    function addEventListeners() {
        carousel.querySelector(`${carouselClass}-arrow--left`).addEventListener('click', prevPage);
        carousel.querySelector(`${carouselClass}-arrow--right`).addEventListener('click', nextPage);
        carousel.addEventListener('touchstart', handleTouchStart);
        carousel.addEventListener('touchend', handleTouchEnd);
    }

    function updateCarousel() {
        container.style.transform = `translateX(-${currentPage * 100}%)`;
        updateDots();
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll(`${carouselClass}-dot`);
        dots.forEach((dot, index) => {
            dot.classList.toggle(`${carouselClass.slice(1)}-dot--active`, index === currentPage);
        });
    }

    function goToPage(page) {
        currentPage = page;
        updateCarousel();
    }

    function nextPage() {
        currentPage = (currentPage + 1) % totalPages;
        updateCarousel();
    }

    function prevPage() {
        currentPage = (currentPage - 1 + totalPages) % totalPages;
        updateCarousel();
    }

    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX) nextPage();
        if (touchEndX > touchStartX) prevPage();
    }

    createDots();
    addEventListeners();
    updateCarousel();
}

document.addEventListener('DOMContentLoaded', function () {
    initCarousel('.education__carousel');
});

window.addEventListener('resize', function () {
    initCarousel('.education__carousel');
});