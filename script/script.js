"use strict";

const dataBase = JSON.parse(localStorage.getItem("awito")) || [];
const infoPhoto = {};

const modalAdd = document.querySelector(".modal__add");
const addAd = document.querySelector(".add__ad");
const modalBtnSubmit = document.querySelector(".modal__btn-submit");
const modalSubmit = document.querySelector(".modal__submit");
const modalItem = document.querySelector(".modal__item");
const catalog = document.querySelector(".catalog");
const modalBtnWarning = document.querySelector(".modal__btn-warning");
const modalFileInput = document.querySelector(".modal__file-input");
const modalFileBtn = document.querySelector(".modal__file-btn");
const modalImageAdd = document.querySelector(".modal__image-add");

const elementsModalSubmit = [...modalSubmit.elements].filter(
    (item) => item.tagName !== "BUTTON" && item.type !== "submit",
);

const saveDB = () => localStorage.setItem("awito", JSON.stringify(dataBase));

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
        modalImageAdd.src = "img/temp.jpg";
        modalFileBtn.textContent = "Добавить фото";
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
    itemObj.image = infoPhoto.base64;
    dataBase.push(itemObj);
    closeModal({ target: modalAdd });
    saveDB();
});

modalFileInput.addEventListener("change", (e) => {
    const target = e.target;

    const reader = new FileReader();
    const file = target.files[0];

    infoPhoto.filename = file.name;
    infoPhoto.size = file.size;

    reader.readAsBinaryString(file);

    reader.addEventListener("load", (event) => {
        if (infoPhoto.size < 200000) {
            modalFileBtn.textContent = infoPhoto.filename;
            infoPhoto.base64 = btoa(event.target.result);
            modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`;
        } else {
            modalFileBtn.textContent = "Размер файла не должен превышать 200кб";
        }
    });
});
