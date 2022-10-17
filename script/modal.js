import A11yDialog from "../modal-plugin/a11y-dialog.esm.js"

const dialogContainer = document.getElementById('dialog-container');
const mainDialog = new A11yDialog(dialogContainer);
console.log("dsafgsd");
const backProjectBtn = document.getElementById("back-project-btn");
backProjectBtn.addEventListener("click", () => {
    console.log("clicked");
    mainDialog.show();
});