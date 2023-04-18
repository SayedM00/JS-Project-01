// Variables
let colors = document.querySelectorAll(".colors li");
let links = document.querySelectorAll(".landing-page .head-area .links li a")
let body_style = document.documentElement.style;
let bg_checkbox = document.querySelector(".bg-checkbox");
let nav_checkbox = document.querySelector(".nav-checkbox");
let lb_control;
let skillsBox = document.querySelector(".skills-section");
let skills = document.querySelectorAll(".skills-section .skills li span");
let rightClick = document.querySelector(".right");
let leftClick = document.querySelector(".left");
let imgs = document.querySelectorAll(".gallery-section .imgs img");
let navBullets = document.querySelectorAll(".nav-bullets .bullet");

if (localStorage.getItem("color_option") !== null) {
    // Save The Choosen Color
    body_style.setProperty("--main--color", localStorage.getItem("color_option"))
    // Save Class Active On The Choosen Color
    for(let i = 0; i < colors.length; i++) {
        if (localStorage.getItem("color_option") == colors[i].dataset.color) {
            colors.forEach((ele) => {
                ele.classList.remove("active")
            });
            colors[i].classList.add("active") 
        }
    }
}

// Save The Choosen Image
localStorage.getItem("image_number") != null ? document.getElementById("landing").style.backgroundImage = `url('../imgs/landing-page\ ${localStorage.getItem("image_number")}')` : ""

// Check Background Switch's value
if (localStorage.getItem("backgroundSwitch") != null) {
    if (localStorage.getItem("backgroundSwitch") == "true") {
        bg_checkbox.click();
        switchBg()
    }
}

// Links Switch 
document.querySelector(".bars").addEventListener(("click"), () => {
    document.querySelector(".links").classList.toggle("links-open")
})

// Links Active Class 
links.forEach((ele) => {
    ele.onclick = function () {
        activeClass(links, ele)
    }
})

// Setting Box And Gear
document.querySelector(".gear-p").onclick = ()=> {
    document.querySelector(".setting-box").classList.toggle("open");
    document.querySelector(".gear-c").classList.toggle("fa-spin")
}

// Control Colors
colors.forEach((ele) => {
    ele.onclick = function() {

        activeClass(colors, ele)
        // Change Main Color's Body Style
        body_style.setProperty("--main--color", this.dataset.color)
        // Save The Choosen Color in Local Storage
        localStorage.setItem("color_option", this.dataset.color)
    }
})

// Landing Page Switch 
document.querySelector(".bg-toggle-switch").onclick = function () {
    if (bg_checkbox.checked == true) {
        localStorage.setItem("backgroundSwitch", "false")
        clearInterval(lb_control)
    } else {
        localStorage.setItem("backgroundSwitch", "true")
        switchBg()
    }
}

// Switch Function
function switchBg() {
    let number; 
    lb_control = setInterval(() => {
            number= `0${Math.ceil(Math.random() * 5)}.jpg`;
            document.getElementById("landing").style.backgroundImage = `url('../imgs/landing-page\ ${number}')`
            localStorage.setItem("image_number", number)
        }, 5000);
    }

// Reset Option 
document.querySelector(".reset-button").onclick = () => {
    window.localStorage.clear();
    window.location.reload()
}

// Nav Bullents Switch
if (localStorage.getItem("navSwitch") !== null ||  localStorage.getItem("navSwitch") === null) {
    if (localStorage.getItem("navSwitch") === 'true') {
        document.querySelector(".nav-bullets").style.display = "block";
        nav_checkbox.click()
    } else {
        document.querySelector(".nav-bullets").style.display = "none"
    }
}

// Nav Bullents Switch
document.querySelector(".nav-toggle-switch").onclick = function () {
    if (nav_checkbox.checked == true) {
        localStorage.setItem("navSwitch", "false")
        document.querySelector(".nav-bullets").style.display = "none"
    } else {
        localStorage.setItem("navSwitch", "true")
        document.querySelector(".nav-bullets").style.display = "block";
    }
}

// Skills Progress
function skillPro() {
    let skillsOfSet = skillsBox.offsetTop;
    let skillsInnerHeight = skillsBox.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScroll = this.scrollY;
    if (windowScroll > (skillsOfSet + skillsInnerHeight - windowHeight)) {
        skills.forEach((span) => {
            span.style.width = span.dataset.progress
        })
    } else {
        skills.forEach((span) => {
            span.style.width = "0"
        })
    }
}

// Gallery Section 
let x = Number(false)

rightClick.onclick = function () {
    imgs.forEach((ele) => ele.classList.remove("gallery-effect"))

    if (x === imgs.length - 1) {
        x = Number(false);
        imgs[Number(false)].classList.add("gallery-effect")

    } else {
        x += 1
        imgs[x].classList.add("gallery-effect")
    }
} 
leftClick.onclick = function() {
    imgs.forEach((ele) => ele.classList.remove("gallery-effect"))
    if (x === Number(false)) {
        x = imgs.length - 1
        imgs[imgs.length - 1].classList.add("gallery-effect")
    } else {
        x -= 1
        imgs[x].classList.add("gallery-effect");
    }
}

// Function Rmove & Add Active Class
function activeClass(elements, element) {
    elements.forEach((element) => {
        element.classList.remove("active")
    })
    element.classList.add("active")
}
// Function Scroll To Element
function windowScroll(elements) {
    elements.forEach((ele) => {
        ele.addEventListener("click", function(e) {
            window.scrollTo({
                top : document.querySelector(e.target.dataset.section).offsetTop,
                behavior : "smooth"
            })
        })
    })
    
}
windowScroll(navBullets)

window.onscroll = function () {
    // Skill Progress 
    skillPro()
    //Button Scroll To Top
    if (window.scrollY >= 300) {
        document.querySelector(".scroll-to-top").style.display = "flex"
        document.querySelector(".scroll-to-top").onclick = function () {
            window.scrollTo(0,0)
        }
    }else {
        document.querySelector(".scroll-to-top").style.display = "none"
    }
    // Remove Active Class
    window.scrollY === 0 ? activeClass(links, links[0]) : ""
}