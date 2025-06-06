const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', function (e) {
    e.preventDefault();
const task = input.value.trim();
if (task !== '') {
    addTask(task);
    input.value = '';
    }
});

function addTask(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;
}

li.addEventListener('click', function () {
    li.classList.toggle('completed');
});

const deleteBtn = document.createElement('button');
deleteBtn.textContent = 'X';
deleteBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    list.removeChild(li);
});

li.apendChild(deleteBtn);
list.appendChild(li);

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

todos.forEach(task => addTask(task));