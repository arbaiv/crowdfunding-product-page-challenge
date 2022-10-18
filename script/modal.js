import A11yDialog from "../modal-plugin/a11y-dialog.esm.js"

const dialogContainer = document.getElementById('dialog-container');
const mainDialog = new A11yDialog(dialogContainer);

const backProjectBtn = document.getElementById("back-project-btn");
const modalCloseBtn = document.getElementById("modal-close-btn");
backProjectBtn.addEventListener("click", () => {
    mainDialog.show();
    document.body.classList.add("scroll-lock");
});
modalCloseBtn.addEventListener("click", () => {
    mainDialog.hide();
    document.body.classList.remove("scroll-lock");
});