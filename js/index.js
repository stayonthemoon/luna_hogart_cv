let accHeading = document.querySelectorAll(".accordion");
let accPanel = document.querySelectorAll(".accordion__panel");

for (let i = 0; i < accHeading.length; i++) {
    accHeading[i].onclick = function () {
        if (this.nextElementSibling.style.maxHeight) {
            hidePanels();
        } else {
            showPanel(this);
        }
    };
}

function showPanel(elem) {
    hidePanels();
    elem.classList.add("active");
    elem.nextElementSibling.style.maxHeight = elem.nextElementSibling.scrollHeight + "px";
}

function hidePanels() {
    for (let i = 0; i < accPanel.length; i++) {
        accPanel[i].style.maxHeight = null;
        accHeading[i].classList.remove("active");
    }
}