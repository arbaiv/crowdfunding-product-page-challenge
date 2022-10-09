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
    navbar.dataset.status = (navbar.dataset.status === "inactive") ? "active":"inactive";
};
menuButton.addEventListener("click", toggleNavbar);
menuButton.addEventListener("keypress", (e) =>{
    if(e.keyCode === 13) {
        toggleNavbar();
    }
});