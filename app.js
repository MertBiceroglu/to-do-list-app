const todoInput = document.querySelector('#todo');
const addButton = document.querySelectorAll('button')[0];
const todoList = document.querySelector('ol');
const alertWrapper = document.querySelector('.alert');
const baslik = document.querySelector('h1');
const clearCompletedB = document.querySelectorAll('button')[1];
const saveList = document.querySelectorAll('button')[3];
const emptyListB = document.querySelectorAll('button')[2];
const autoSaveCheckBox = document.querySelectorAll('input')[1];
let autoSave;

eventListeners();


function eventListeners() {
    addButton.addEventListener('click', addTodo);
    window.addEventListener('DOMContentLoaded', loadAllTodosToUI);
    window.addEventListener('DOMContentLoaded', setUPUI);
    todoList.addEventListener('dblclick', completed);
    clearCompletedB.addEventListener('click', clearCompleted);
    saveList.addEventListener('click', saveToLocalStorage);
    emptyListB.addEventListener('click', emptyList);
    todoList.addEventListener('click', deleteOne);
    autoSaveCheckBox.addEventListener('click', saveCheck);
}

function addTodo() {
    let todo = todoInput.value.trim();
    addTodoToUI(todo, true);
    setUPUI();
    if (autoSave) {
        if (!checkIfEmpty(todo))
            addTodoToStorage(todo);
    }
    todoInput.value = null;
}
function addTodoToUI(newTodo, checker) {
    listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.innerHTML = ' <i class="far fa-trash-alt deleteIcon"></i>';
    listItem.appendChild(document.createTextNode(newTodo));


    if (limitTodos() && !checkIfEmpty(newTodo)) {
        todoList.appendChild(listItem);
        todoNumber++;
        updateHeader();
        if (checker)
            alerts(true);

    }
    else if (checkIfEmpty(newTodo)) {
        checker = false;
        if (!checker)
            alerts(false);
    }



}
function limitTodos() {
    todoNumber = document.querySelectorAll('li').length;
    if (todoNumber < 14) {

        return true;
    }
    else if (todoNumber === 14) {
        return false;
    }
}
function alerts(limit) {

    alert = document.createElement('div');


    if (limit) {
        alert.textContent = 'Todo Ekleme Başarılı!';
        alertWrapper.appendChild(alert);
        setTimeout(function () { alertWrapper.lastChild.remove(); }, 1000)
    }
    else if (!limit) {
        alert.textContent = 'Boş todo eklenemez!';
        alertWrapper.appendChild(alert);
        setTimeout(function () { alertWrapper.lastChild.remove(); }, 1000)
    }
    else {
        alert.textContent = 'Todo limitine ulaşıldı!';
        alertWrapper.appendChild(alert);
        setTimeout(function () { alertWrapper.lastChild.remove(); }, 1000)
    }


}
function checkIfEmpty(newTodo) {
    if (newTodo === '')
        return true;
    else {
        return false;
    }
}
function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodosFromStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function loadAllTodosToUI() {
    let todos = getTodosFromStorage();


    todos.forEach(function (todo) {
        addTodoToUI(todo, false);
    });
}
function completed(e) {


    if (e.target.className === 'list-group-item') {
        e.target.style.textDecoration = 'line-through';
        e.target.style.fontStyle = 'italic';
        e.target.className = 'list-group-item completed';
        todoNumber--;
        updateHeader();

    }
    else if (e.target.className === 'list-group-item completed') {
        e.target.style.textDecoration = 'none';
        e.target.style.fontStyle = 'normal';
        e.target.className = 'list-group-item';
        todoNumber++;
        updateHeader();
    }

}
function clearCompleted() {
    let todos = document.querySelectorAll('li');
    todos.forEach(function (e) {
        if (e.className === 'list-group-item completed') {
            e.remove();
            // todoNumber--;
            updateHeader();
        }
    })
    saveToLocalStorage();
}
function saveToLocalStorage() {
    const todos = document.querySelectorAll('li');
    newTodos = [];
    for (i = 0; i < todos.length; i++) {
        newTodos.push(todos[i].textContent);
    }
    localStorage.setItem("todos", JSON.stringify(newTodos));
}
function emptyList() {
    answer = confirm('Do you want to empty the list? (No Turning Backs)');
    if (answer) {
        const todos = document.querySelectorAll('li');
        todos.forEach(function (e) {
            e.remove();
        });
        saveToLocalStorage();
        todoNumber = 0;
        updateHeader();
    }
}
function deleteOne(e) {
    if (e.target.className === 'far fa-trash-alt deleteIcon') {
        if (e.target.parentElement.className != 'list-group-item completed') {
            todoNumber--;
            updateHeader();
        }
        e.target.parentElement.remove();

        saveToLocalStorage();
    }
}
function updateHeader() {
    baslik.textContent = 'My Todo-List (' + todoNumber + '/14)';
}
function saveCheck(e) {
    if (autoSaveCheckBox.checked) {
        localStorage.setItem('check', true);
    }
    else if (autoSaveCheckBox.checked === false) {
        localStorage.setItem('check', false);
    }
}
function setUPUI() {
    let checkTest = localStorage.getItem('check');

    if (checkTest === 'true') {
        autoSaveCheckBox.checked = true;
        autoSave = true;
    }
    else if (checkTest === 'false') {
        autoSave = false;
        autoSaveCheckBox.checked = false;
    }
}