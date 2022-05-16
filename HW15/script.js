const contactsListEl = document.getElementById('contactsList');
const contactTemplate = document.getElementById('contactTemplate').innerHTML;

let contactsList = [];

init();

function init() {

    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((data) => {
        contactsList = data;
        renderList()
    })
}

function renderList() {
    contactsListEl.innerHTML = contactsList.map(generateContactHtml).join('\n');
}

function generateContactHtml(contact) {
    return interpolate(contactTemplate, contact);
}

function interpolate(template, obj) {
    for (key in obj) {
        if (key === 'address') {
            template = template.replaceAll(`{{${key}}}`, getAddressDetails(obj[key])); 
            continue;          
        } 
        template = template.replaceAll(`{{${key}}}`, obj[key]);  
    }

    return template;
}

function getAddressDetails(obj) {
    return `${obj.city}, ${obj.street}`;
}