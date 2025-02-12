let container = document.querySelector(".container");
let navbar = document.querySelector(".navbar");
let menuList = document.querySelector(".menu-list");
let rail = document.querySelector(".rail");
let menuListFocused = false;

let lastScroll = 0;
window.addEventListener("scroll", e => {
    if (window.scrollY < lastScroll) {
        navbar.classList.remove("floating");
    } else {
        navbar.classList.add("floating")
    }
    lastScroll = window.scrollY;
});


let currentDistance = 0;
let startX = 0;
let maxX = rail.getBoundingClientRect().width - container.getBoundingClientRect().width;
console.log(maxX);
menuList.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

menuList.addEventListener("touchend", () => {
    startX = 0;
});

menuList.addEventListener("touchmove", (e) => {
    let x = e.touches[0].clientX;
    moveMenu(x);
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

let mouseSwipe = false;
menuList.addEventListener("mousemove", (e) => {
    if (!mouseDown)
        return;
    mouseSwipe = true;
    moveMenu(e.clientX);
});

function moveMenu(newX) {
    currentDistance -= startX - newX;
    if (currentDistance <= 0)
        currentDistance = 0;
    else if (currentDistance > maxX)
        currentDistance = maxX;
    menuList.style.transform = `translateX(${currentDistance}px)`;
    startX = newX;
}


function openModal() {
    if (mouseSwipe) {
        mouseSwipe = false;
        return;
    }
    document.querySelector(".modal").classList.add("show");
}

function closeModal() {
    document.querySelector(".modal").classList.remove("show");
}