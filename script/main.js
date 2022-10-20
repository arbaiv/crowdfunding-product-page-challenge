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

const numberInputs = document.querySelectorAll('input[type="number"]');
numberInputs.forEach((value) => {
    value.addEventListener("input", () => {
        let el = value;
        if (el.value.length > el.maxLength) {
            el.value = el.value.slice(0, el.maxLength);
        }
    });
});


function bookmark(title, url) {
    if (window.sidebar) { 
      // Firefox
      window.sidebar.addPanel(title, url, '');
    } 
    else if (window.opera && window.print) 
    { 
      // Opera
      var elem = document.createElement('a');
      elem.setAttribute('href', url);
      elem.setAttribute('title', title);
      elem.setAttribute('rel', 'sidebar');
      elem.click(); //this.title=document.title;
    } 
    else if (document.all) 
    { 
      // ie
      window.external.AddFavorite(url, title);
    }
  }

const bookmarkBtn = document.getElementById("bookmark-btn");
bookmarkBtn.addEventListener("click", () => {
    console.log(document.title, location.href);
    bookmark(document.title, location.href);
});

/* oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" */