import A11yDialog from "../modal-plugin/a11y-dialog.esm.js"
const dialogContainer = document.getElementById('dialog-container');
const mainDialog = new A11yDialog(dialogContainer);
const openMainDialog = () => {
    mainDialog.show();
    document.body.classList.add("scroll-lock");
};
const closeMainDialog = () => {
    mainDialog.hide();
    document.body.classList.remove("scroll-lock");
};
const backProjectBtn = document.getElementById("back-project-btn");
const modalCloseBtn = document.getElementById("modal-close-btn");
backProjectBtn.addEventListener("click", () => {
    openMainDialog();
});
modalCloseBtn.addEventListener("click", () => {
    closeMainDialog();
});
mainDialog.on("hide", () => document.body.classList.remove("scroll-lock"));
// Animate between dialogs
const backProjectSec = document.getElementById("back-project-sec");
const pledgeDoneSec = document.getElementById("pledge-done-sec");
const animateBetweenModals = () => {
    backProjectSec.dataset.animateStatus = "done";
    dialogContainer.setAttribute("aria-labelledby", "pledge-done-sec");
    setTimeout(function(){
        backProjectSec.style.display = "none";
        pledgeDoneSec.dataset.animateStatus = "open";
    }, 400);
};
const pledgeDoneButton = document.getElementById("pledge-done-button");
const closePledgeDoneSec = () => {
    pledgeDoneSec.dataset.animateStatus = "done";
    setTimeout(function(){
        pledgeDoneSec.style.display = "none";
        closeMainDialog();
    }, 400);
};
pledgeDoneButton.addEventListener("click", () => {
    closePledgeDoneSec();
});

// Project Data
const projectDetails = {
    pledged: false,
    moneyBackedEl: document.getElementById("total-amount"),
    moneyBacked: 89914,
    totalBackersEl: document.getElementById("total-backers"),
    totalBackers: 5007,
    rangeSliderPercentage: function(){
        return (this.moneyBacked / 100000) * 100;
    },
    rangeSliderEl: document.getElementById("range-upper-slider"),
    noReward: {
        updateBackedDetails: function(){
            ++projectDetails.totalBackers;
        },
        checkPriceValidity: function(){
            return true;
        }
    },
    bambooStand: {
        inputEls: document.querySelectorAll("[data-bamboo-stand-input]"),
        rewardLeftEls: document.querySelectorAll("[data-bamboo-stand-left]"),
        rewardLeft: 101,
        updateBackedDetails: function(){
            projectDetails.moneyBacked += parseInt(this.inputEls[2].value);
            ++projectDetails.totalBackers;
            if(this.rewardLeft !== 0){
                --this.rewardLeft;
            }
        },
        checkRewardLeft: function(){
            if(this.rewardLeft === 0){
                this.inputEls.forEach((value) => {
                    value.disabled = true;
                });
            }
        },
        checkStandButton: function (){
            this.inputEls[1].checked = true;
        },
        checkPriceValidity: function (){
            if (this.inputEls[2].validity.valueMissing || this.inputEls[2].validity.rangeUnderflow || this.inputEls[2].validity.stepMismatch) {
                this.inputEls.invalid = true;
                return false;
            } else {
                return true;
            }
        }
    },
    blackEditionStand: {
        inputEls: document.querySelectorAll("[data-black-edition-stand-input]"),
        rewardLeftEls: document.querySelectorAll("[data-black-edition-stand-left]"),
        rewardLeft: 64,
        updateBackedDetails: function(){
            projectDetails.moneyBacked += parseInt(this.inputEls[2].value);
            ++projectDetails.totalBackers;
            if(this.rewardLeft !== 0){
                --this.rewardLeft;
            }
        },
        checkRewardLeft: function(){
            if(this.rewardLeft === 0){
                this.inputEls.forEach((value) => {
                    value.disabled = true;
                });
            }
        },
        checkStandButton: function (){
            this.inputEls[1].checked = true;
        },
        checkPriceValidity: function (){
            if (this.inputEls[2].validity.valueMissing || this.inputEls[2].validity.rangeUnderflow || this.inputEls[2].validity.stepMismatch) {
                this.inputEls.invalid = true;
                return false;
            } else {
                return true;
            }
        }
    },
    mahoganyStand: {
        inputEls: document.querySelectorAll("[data-mahogany-stand-input]"),
        rewardLeftEls: document.querySelectorAll("[data-mahogany-stand-left]"),
        rewardLeft: 0,
        updateBackedDetails: function(){
            this.moneyBacked += parseInt(this.inputEls[2].value);
            ++this.totalBackers;
            if(this.rewardLeft !== 0){
                --this.rewardLeft;
            }
        },
        checkRewardLeft: function(){
            if(this.rewardLeft === 0){
                this.inputEls.forEach((value) => {
                    value.disabled = true;
                });
            }
        },
        checkStandButton: function (){
            this.inputEls[1].checked = true;
        },
        checkPriceValidity: function (){
            if (this.inputEls[2].validity.valueMissing || this.inputEls[2].validity.rangeUnderflow || this.inputEls[2].validity.stepMismatch) {
                this.inputEls.invalid = true;
                return false;
            } else {
                return true;
            }
        }
    },
    loadDetails: function (){
        this.moneyBackedEl.textContent = `$${this.moneyBacked.toLocaleString()}`;
        this.totalBackersEl.textContent = `${this.totalBackers.toLocaleString()}`;
        this.rangeSliderEl.style.width = `${this.rangeSliderPercentage()}%`;
        this.bambooStand.rewardLeftEls.forEach((value) => {
            value.textContent = `${this.bambooStand.rewardLeft}`
        });
        this.blackEditionStand.rewardLeftEls.forEach((value) => {
            value.textContent = `${this.blackEditionStand.rewardLeft}`
        });
        this.mahoganyStand.rewardLeftEls.forEach((value) => {
            value.textContent = `${this.mahoganyStand.rewardLeft}`
        });
        this.bambooStand.checkRewardLeft();
        this.blackEditionStand.checkRewardLeft();
        this.mahoganyStand.checkRewardLeft();
    },
    pledgeComplete: function (){
        const modalOpenButtons = document.querySelectorAll("#back-project-btn, [data-select-reward]");
        if(this.pledged) {
            modalOpenButtons.forEach((value) => value.disabled = true);
        }
    }
};
// Initiate Project Details
window.onload = () => projectDetails.loadDetails();
// Open dialog with check input
const selectRewardButtons = document.querySelectorAll("[data-select-reward]");
selectRewardButtons.forEach((value) => {
    value.addEventListener("click", () => {
        projectDetails[value.dataset.selectReward].checkStandButton();
        openMainDialog();
    });
});
// Complete pledge
const continuePledgeButtons = document.querySelectorAll("[data-continue-pledge]");
continuePledgeButtons.forEach((value) => {
    value.addEventListener("click", () => {
        if(projectDetails[value.dataset.continuePledge].checkPriceValidity()){
            projectDetails[value.dataset.continuePledge].updateBackedDetails();
            projectDetails.loadDetails();
            projectDetails.pledged = true;
            projectDetails.pledgeComplete();
            animateBetweenModals();                
        }
    });
});