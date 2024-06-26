const accHeading = document.querySelectorAll(".accordion");
const accPanel = document.querySelectorAll(".accordion__panel");
const goUpButton = document.getElementById("go-up-button");

// Функция для обновления состояния аккордеона (открыто/закрыто)
function updateAccordionState(panel, button, triangle) {
    if (panel.style.maxHeight && panel.style.maxHeight !== "0px") {
        button.textContent = "Show Less";
        triangle.classList.add("triangle_less");
    } else {
        button.textContent = "Show More";
        triangle.classList.remove("triangle_less");
    }
}

// Функция для показа панели аккордеона
function showPanel(accordion, panel, button, triangle) {
    accordion.classList.add("active");
    panel.style.maxHeight = panel.scrollHeight + "px";
    if (button) button.textContent = "Show Less";
    if (triangle) triangle.classList.add("triangle_less");
}

// Функция для скрытия всех панелей аккордеона
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

// Функция для скрытия одной панели аккордеона
function hidePanel(panel, button, triangle) {
    panel.style.maxHeight = null;
    panel.previousElementSibling.classList.remove("active");
    if (button) button.textContent = "Show More";
    if (triangle) triangle.classList.remove("triangle_less");
}

// Обработчик клика по аккордеону
accHeading.forEach((heading) => {
    const button = heading.querySelector(".accordion__button");
    const triangle = heading.querySelector(".triangle");
    const panel = heading.nextElementSibling;

    if (button && triangle && panel) {
        updateAccordionState(panel, button, triangle);
    }

    heading.addEventListener("click", function (event) {
        event.preventDefault(); // Предотвращаем дефолтное поведение

        if (panel.style.maxHeight && panel.style.maxHeight !== "0px") {
            hidePanel(panel, button, triangle);
        } else {
            const currentScroll = window.scrollY;
            hideAllPanels(() => {
                showPanel(this, panel, button, triangle);
                // Прокрутка к началу новой секции после ее открытия
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300); // Задержка для плавной анимации раскрытия

                // Восстановление позиции прокрутки
                window.scrollTo({
                    top: currentScroll,
                    behavior: 'smooth'
                });
            });
        }
    });
});

// Обработчик клика по кнопке "Go Up"
goUpButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
