const STORAGE_KEY = 'contacts';
const DELETE_BTN_CLASS = 'deleteBtn';
const UPDATE_BTN_CLASS = 'updateBtn';
const CONTACT_ROW_SELECTOR = '.contactRow';
const HIDDEN_CLASS = 'hidden';

const contactFormEl = document.getElementById('newContactForm');
const errorEl = document.getElementById('error');
const contactsListEl = document.getElementById('contactsList');
const contactTemplate = document.getElementById('contactTemplate').innerHTML;
const formInputs = document.querySelectorAll('.formInput');
const addContactBtnEl = document.getElementById('addContactBtn');


contactFormEl.addEventListener('submit', onContactFormSubmit);
contactsListEl.addEventListener('click', onContactsListClick);

let contactsList = [];
let currentId = null;

init();


function onContactFormSubmit(e) {

    e.preventDefault();   
    const newContact = getContact();

    if (isContactValid(newContact)) {
        hideError();
        if (!currentId) {
            addContact(newContact);
        } else {
            updateContact(newContact);
        }
        resetForm();
    } else {
        showError();
    }
}

function onContactsListClick(e) {
    if (e.target.classList.contains(DELETE_BTN_CLASS)) {
        const id = getContactId(e.target);
        removeContact(id);
    }
    if (e.target.classList.contains(UPDATE_BTN_CLASS)) {
        const id = getContactId(e.target);
        getContactDetails(id);
        currentId = id;
    }
}

function init() {
    contactsList = restoreData();
    renderList();
}

function getContact() {
    const contact = {};

    formInputs.forEach((inp) => {
        contact[inp.name] = inp.value;
    });

    return contact;
}

function isContactValid(contact) {
    return (
        isTextFieldValid(contact.name) &&
        isTextFieldValid(contact.surname) &&
        isPhoneFieldValid(contact.phone)
    );
}

function isTextFieldValid(value) {
    return value !== '';
}

function isPhoneFieldValid(value) {
    return isTextFieldValid(value) && !isNaN(value);
}

function generateContactHtml(contact) {
    return interpolate(contactTemplate, contact);
}

function addContact(contact) {
    contact.id = Date.now();
    contactsList.push(contact);

    saveData();
    renderList();
}

function updateContact(contact) {
    const index = getCurrentIndex();
    contactsList[index] = contact;
    contactsList[index].id = currentId;
    currentId = null;

    saveData();
    renderList();   
}

function getCurrentIndex() {
    return contactsList.findIndex(({ id }) => id === currentId);
}

function renderList() {
    contactsListEl.innerHTML = contactsList.map(generateContactHtml).join('\n');
}

function resetForm() {
    contactFormEl.reset();
}

function getContactId(el) {
    const contactRowEl = el.closest(CONTACT_ROW_SELECTOR);

    return +contactRowEl.dataset.contactId;
}

function removeContact(id) {

    contactsList = contactsList.filter((obj) => obj.id !== id);

    saveData();
    renderList();
}

function getContactDetails(contactId) {
    const dataContact = Object.values(contactsList.find(({ id }) => id === contactId));

    formInputs.forEach((el, index) => el.value = dataContact[index]);
}

function interpolate(template, obj) {
    for (key in obj) {
        template = template.replaceAll(`{{${key}}}`, obj[key]);
    }

    return template;
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contactsList));
}

function restoreData() {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
}

function showError() {   
    errorEl.classList.remove(HIDDEN_CLASS);
};

function hideError() {
    errorEl.classList.add(HIDDEN_CLASS);
};