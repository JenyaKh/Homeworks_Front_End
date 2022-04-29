const buttonAddEl = document.getElementById('buttonAdd');
const firstNameEl = document.getElementById('firstName');
const lastNameEl = document.getElementById('lastName');
const numberEl = document.getElementById('number');
const errorEl = document.getElementById('error');
const contactsTableEl= document.getElementById('contactsTable');
const addContactFormEl = document.getElementById('addContactForm');

const NEW_ROW_TEMPLATE = document.getElementById('newRow').innerHTML;
const HIDDEN_CLASS = 'hidden';
const DELETE_BTN_CLASS = 'deleteBtn';
const ERROR_MESSAGE = {
                      firstName: 'Firstname must not be empty',
                      lastName: 'Lastname must not be empty',
                      number: 'Number must not be empty',
                    }
const CONTACT_ROW_CLASS = 'contactRow';

addContactFormEl.addEventListener('submit', onAddContactFormSubmit);
contactsTableEl.addEventListener('click', onContactClick);

function onAddContactFormSubmit(e) {
        e.preventDefault();
        const error = validateForm();
        if (!error) {
        submitForm();
        };
};

function validateForm() {
    const firstName = getInputValue(firstNameEl);
    const lastName = getInputValue(lastNameEl);
    const number = getInputValue(numberEl);
    const error = validateData(firstName, lastName, number);

    if (error) {
        showError(error);
    } else {
        hideError();
    }
    return error;
}

function validateData(firstName, lastName, number) {
    if (firstName === '') return ERROR_MESSAGE.firstName;
    if (lastName === '') return ERROR_MESSAGE.lastName;
    if (number === '') return ERROR_MESSAGE.number;
    return null;
}

function submitForm() {
    const firstName = getInputValue(firstNameEl);
    const lastName = getInputValue(lastNameEl);
    const number = getInputValue(numberEl);

    addNewContact(firstName, lastName, number);
};

function getInputValue(el) {
    return el.value;
}

function showError(msg) {   
    errorEl.textContent = msg;
    errorEl.classList.remove(HIDDEN_CLASS);
};

function hideError() {
    errorEl.classList.add(HIDDEN_CLASS);
};

function clearInput() {
    firstNameEl.value = '';
    lastNameEl.value = '';
    numberEl.value = '';
};

function addNewContact(firstName, lastName, number) {
    const contactHTML = createContactHtml(firstName, lastName, number);

    contactsTableEl.insertAdjacentHTML('beforeend', contactHTML);
    clearInput();
}

function createContactHtml(firstName,lastName,number) {

    return NEW_ROW_TEMPLATE.replace('{{firstName}}', firstName).replace('{{lastName}}', lastName).replace('{{number}}', number);
}

function onContactClick(e) {
    if (e.target.classList.contains(DELETE_BTN_CLASS)) {
        deleteContact(e.target.closest('.' + CONTACT_ROW_CLASS));
    }
}

function deleteContact(el) {
    el.remove();
}
