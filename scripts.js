let navbar = document.querySelector(".navbar");
let menuList = document.querySelector(".menu-list");
let menuListFocused = false;

window.addEventListener("wheel", e => {
    const scrolledUp = e.deltaY < 0 ? true : false;
    if (scrolledUp) {
        navbar.classList.remove("floating");
    } else {
        navbar.classList.add("floating")
    }
});


let currentDistance = 0;
let startX = 0;
let items = document.querySelectorAll(".menu-item");
let maxX = items[0]?.clientWidth * items.length / 2;
menuList.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

menuList.addEventListener("touchend", () => {
    startX = 0;
});

menuList.addEventListener("touchmove", (e) => {
    let x = e.touches[0].clientX;
    currentDistance -= startX - x;
    if (currentDistance <= 0)
        currentDistance = 0;
    else if (currentDistance > maxX)
        currentDistance = maxX;
    menuList.style.transform = `translateX(${currentDistance}px)`;
    startX = x;
});

let mouseDown = false;
menuList.addEventListener("mousedown", (e) => {
    mouseDown = true;
    startX = e.clientX;
});

menuList.addEventListener("mouseup", () => {
    startX = 0;
    mouseDown = false;
});

menuList.addEventListener("mousemove", (e) => {
    if (!mouseDown)
        return;
    let x = e.clientX;
    currentDistance -= startX - x;
    if (currentDistance <= 0)
        currentDistance = 0;
    else if (currentDistance > maxX)
        currentDistance = maxX;
    menuList.style.transform = `translateX(${currentDistance}px)`;
    startX = x;
});


function openModal() {
    document.querySelector(".modal").classList.add("show");
}

function closeModal() {
    document.querySelector(".modal").classList.remove("show");
}