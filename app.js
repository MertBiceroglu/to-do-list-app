const todoInput = document.querySelector('#todo');
const addButton = document.querySelectorAll('button')[0];
const todoList = document.querySelector('ol');
const alertWrapper = document.querySelector('.alert');
const baslik = document.querySelector('h1');
const clearCompletedB = document.querySelectorAll('button')[1];
eventListeners();
function eventListeners() {
    addButton.addEventListener('click', addTodo);
    window.addEventListener('DOMContentLoaded', loadAllTodosToUI);
    todoList.addEventListener('click', completed);
    clearCompletedB.addEventListener('click', clearCompleted);
}

function addTodo() {
    let todo = todoInput.value.trim();
    addTodoToUI(todo);
    addTodoToStorage(todo);
}
function addTodoToUI(newTodo) {
    listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.appendChild(document.createTextNode(newTodo));


    if (limitTodos() && !checkIfEmpty(newTodo)) {
        todoList.appendChild(listItem);
        todoNumber++;
        baslik.textContent = 'My Todo-List (' + todoNumber + '/6)';

        alerts(limitTodos());
    }
    else if (checkIfEmpty(newTodo)) {
        alerts(false);
    }



}
function limitTodos() {
    todoNumber = document.querySelectorAll('li').length;
    if (todoNumber < 6) {

        return true;
    }
    else if (todoNumber === 6) {
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
        addTodoToUI(todo);
    });
}
function completed(e) {
    if (e.target.className === 'list-group-item') {
        e.target.style.textDecoration = 'line-through';
        e.target.style.fontStyle = 'italic';
        e.target.className = 'list-group-item completed';
    }
    else {
        //do nothing
    }
}
function clearCompleted() {
    let todos = document.querySelectorAll('li');
    todos.forEach(function (e) {
        if (e.className === 'list-group-item completed') {
            e.remove();
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
