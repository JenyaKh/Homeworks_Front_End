const DELETE_BTN_CLASS = 'deleteBtn';
const UPDATE_BTN_CLASS = 'updateBtn';
const CONTACT_ROW_SELECTOR = '.contactRow';
const HIDDEN_CLASS = 'hidden';
const API_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/users/';

const contactFormEl = document.getElementById('newContactForm');
const errorEl = document.getElementById('error');
const contactsListEl = document.getElementById('contactsList');
const contactTemplate = document.getElementById('contactTemplate').innerHTML;
const formInputs = document.querySelectorAll('.formInput');
const addContactBtnEl = document.getElementById('addContactBtn');


contactFormEl.addEventListener('submit', onContactFormSubmit);
contactsListEl.addEventListener('click', onContactsListClick);

let contactsList = [];

init();

function init() {
    fetchContacts();
}

function fetchContacts() {
    fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
            contactsList = data;
            renderList();
        });
}

function renderList() {
    contactsListEl.innerHTML = contactsList.map(generateContactHtml).join('\n');
}

function generateContactHtml(contact) {
    return interpolate(contactTemplate, contact);
}

function interpolate(template, obj) {
    for (key in obj) {
        template = template.replaceAll(`{{${key}}}`, obj[key]);
    }

    return template;
}

function onContactFormSubmit(e) {

    e.preventDefault();   
    const newContact = getContact();

    if (isContactValid(newContact)) {
        hideError();
        saveContact(newContact);
        resetForm();
    } else {
        showError();
    }
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
        isTextFieldValid(contact.email) &&
        isPhoneFieldValid(contact.phone)
    );
}

function isTextFieldValid(value) {
    return value !== '';
}

function isPhoneFieldValid(value) {
    return isTextFieldValid(value) && !isNaN(value);
}

function showError() {   
    errorEl.classList.remove(HIDDEN_CLASS);
};

function hideError() {
    errorEl.classList.add(HIDDEN_CLASS);
};

function saveContact(contact) {
    if (contact.id) {
        updateContact(contact);
    } else {
        addContact(contact);
    }
}

function addContact(contact) {
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((data) => {
        fetchContacts();
    });
}

function updateContact(contact) {
    fetch(API_URL + contact.id, {
        method: 'PUT',
        body: JSON.stringify(contact),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((data) => {
        fetchContacts();
    });
}

function resetForm() {
    formInputs.forEach((inp) => {
        inp.value = '';
    });
}

function onContactsListClick(e) {
    if (e.target.classList.contains(DELETE_BTN_CLASS)) {
        const id = getContactId(e.target);
        removeContact(id);
    }
    if (e.target.classList.contains(UPDATE_BTN_CLASS)) {
        const id = getContactId(e.target);
        editContact(id);
    }
}

function getContactId(el) {
    const contactRowEl = el.closest(CONTACT_ROW_SELECTOR);

    return contactRowEl.dataset.contactId;
}

function removeContact(id) {
    fetch(API_URL + id, {
        method: 'DELETE',
    }).then((data) => {
        fetchContacts();
    });
}

function editContact(id) {
    const contact = contactsList.find((contact) => contact.id === id);
    setContactDetails(contact);
}

function setContactDetails(contact) {
    formInputs.forEach((inp) => {
        inp.value = contact[inp.name];
    });
}
