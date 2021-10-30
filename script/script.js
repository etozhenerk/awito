"use strict";

const dataBase = [];

const modalAdd = document.querySelector(".modal__add");
const addAd = document.querySelector(".add__ad");
const modalBtnSubmit = document.querySelector(".modal__btn-submit");
const modalSubmit = document.querySelector(".modal__submit");
const modalItem = document.querySelector(".modal__item");
const catalog = document.querySelector(".catalog");
const modalBtnWarning = document.querySelector(".modal__btn-warning");

const elementsModalSubmit = [...modalSubmit.elements].filter(
    (item) => item.tagName !== "BUTTON" && item.type !== "submit",
);

const checkForm = () => {
    const validForm = elementsModalSubmit.every((item) => item.value);
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? "none" : "";
};

const closeModal = (e) => {
    const target = e.target;
    if (target.closest(".modal__close") || target.classList.contains("modal")) {
        modalAdd.classList.add("hide");
        modalItem.classList.add("hide");
        modalSubmit.reset();
        checkForm();
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

modalSubmit.addEventListener("input", checkForm);
modalSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    const itemObj = {};

    for (const item of elementsModalSubmit) {
        itemObj[item.name] = item.value;
    }
    dataBase.push(itemObj);
    closeModal({target: modalAdd});
});
