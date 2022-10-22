const menuButton = document.getElementById("menu-button");
const navbar =  document.getElementById("navbar");
const toggleNavbar = () => {
    if(menuButton.classList.contains("hamburger-icon")){
        menuButton.classList.remove("hamburger-icon");
        menuButton.classList.add("close-icon");
    } else {
        menuButton.classList.remove("close-icon");
        menuButton.classList.add("hamburger-icon");
    }
    if (navbar.dataset.status === "inactive") {
        navbar.dataset.status = "active";
        document.body.classList.add("scroll-lock");    
    } else {
        navbar.dataset.status = "inactive";
        document.body.classList.remove("scroll-lock");
    }
};
menuButton.addEventListener("click", toggleNavbar);
menuButton.addEventListener("keypress", (e) =>{
    if(e.keyCode === 13) {
        toggleNavbar();
    }
});
const navLinks = document.querySelectorAll('a[href*="#"]');
navLinks.forEach((value) => {
    value.addEventListener("click", () => {
        if (navbar.dataset.status === "active") {
            toggleNavbar();
        }
    });
});

const numberInputs = document.querySelectorAll('input[type="number"]');
numberInputs.forEach((value) => {
    value.addEventListener("input", () => {
        let el = value;
        if (el.value.length > el.maxLength) {
            el.value = el.value.slice(0, el.maxLength);
        }
    });
});
