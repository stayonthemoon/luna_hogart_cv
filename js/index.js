let accHeading = document.querySelectorAll(".accordion");
let accPanel = document.querySelectorAll(".accordion__panel");

// Инициализация текста кнопок при загрузке страницы
accHeading.forEach((heading) => {
    let button = heading.querySelector(".accordion__button");
    let triangle = heading.querySelector(".triangle");
    if (button && triangle) {
        if (heading.nextElementSibling.style.maxHeight && heading.nextElementSibling.style.maxHeight !== "0px") {
            button.textContent = "Show Less";
            triangle.classList.add("triangle_less");
        } else {
            button.textContent = "Show More";
            triangle.classList.remove("triangle_less");
        }
    }
});

for (let i = 0; i < accHeading.length; i++) {
    accHeading[i].onclick = function () {
        let panel = this.nextElementSibling;
        let button = this.querySelector(".accordion__button");
        let triangle = this.querySelector(".triangle"); // Находим треугольник внутри кнопки

        if (panel.style.maxHeight && panel.style.maxHeight !== "0px") {
            hidePanel(panel, button, triangle);
        } else {
            showPanel(this, panel, button, triangle);
        }
    };
}

function showPanel(elem, panel, button, triangle) {
    hidePanels();
    elem.classList.add("active");
    panel.style.maxHeight = panel.scrollHeight + "px";
    if (button) button.textContent = "Show Less";
    if (triangle) triangle.classList.add("triangle_less"); // Добавляем класс для поворота треугольника
}

function hidePanels() {
    accPanel.forEach((panel, index) => {
        panel.style.maxHeight = null;
        accHeading[index].classList.remove("active");
        let button = accHeading[index].querySelector(".accordion__button");
        let triangle = accHeading[index].querySelector(".triangle"); // Находим треугольник внутри кнопки
        if (button) button.textContent = "Show More";
        if (triangle) triangle.classList.remove("triangle_less"); // Убираем класс для поворота треугольника
    });
}

function hidePanel(panel, button, triangle) {
    panel.style.maxHeight = null;
    panel.previousElementSibling.classList.remove("active");
    if (button) button.textContent = "Show More";
    if (triangle) triangle.classList.remove("triangle_less"); // Убираем класс для поворота треугольника
}
