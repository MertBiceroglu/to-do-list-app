todoInput = document.querySelector('#todo');
addButton = document.querySelectorAll('button')[0];
todoList = document.querySelector('ol');
alertWrapper = document.querySelector('.alert');
baslik = document.querySelector('h1');

eventListeners();
function eventListeners() {
    addButton.addEventListener('click', addTodo);
}

function addTodo() {
    let todo = todoInput.value.trim();
    addTodoToUI(todo);
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
function addTodoToStorage() {

}