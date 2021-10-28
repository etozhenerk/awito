"use strict";

const modalAdd = document.querySelector(".modal__add");
const addAd = document.querySelector(".add__ad");
const modalBtnSubmit = document.querySelector(".modal__btn-submit");
const modalSubmit = document.querySelector(".modal__submit");
const modalItem = document.querySelector(".modal__item");
const catalog = document.querySelector(".catalog");

const closeModal = function (e) {
    const target = e.target;
    if (target.classList.contains("modal__close") || target === this) {
        this.classList.add("hide");
        modalSubmit.reset();
    }
};

modalAdd.addEventListener("click", closeModal);
modalItem.addEventListener("click", closeModal);

addAd.addEventListener("click", () => {
    modalAdd.classList.remove("hide");
    modalBtnSubmit.disabled = true;
});

catalog.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".card")) {
        modalItem.classList.remove("hide");
    }
});
