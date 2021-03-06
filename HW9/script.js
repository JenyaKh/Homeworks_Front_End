const buttonAddEl = document.getElementById('buttonAdd');
const inputEl = document.getElementById('input');
const listEl = document.getElementById('list');
const errorEl = document.getElementById('error');


buttonAddEl.addEventListener('click', onButtonAddClick);
inputEl.addEventListener('input', onTextInput);
listEl.addEventListener('click', onItemClick);

function onButtonAddClick() {
    const error = checkLength();
    if (!error) {
        createItem();
        clearInput();
    };
};

function createItem() {
    const newItem = document.createElement('li');
    newItem.textContent = inputEl.value;
    listEl.append(newItem);
};

function onTextInput() {
    const error = checkLength();
    error ? showError() : hideError();
};

function checkLength() {
    return inputEl.value.length < 3 ? 'error' : null;
};

function showError() {   
    inputEl.classList.add('invalid');
    errorEl.classList.remove('hidden');
};

function hideError() {
    inputEl.classList.remove('invalid');
    errorEl.classList.add('hidden');
};

function clearInput() {
    inputEl.value = '';
};

function onItemClick(event) {
    const item = event.target;
    item.classList.contains('marked') ? item.classList.remove('marked') : item.classList.add('marked'); 
};