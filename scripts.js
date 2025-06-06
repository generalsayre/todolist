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

  // Toggle completed style on click
  li.addEventListener('click', function () {
    li.classList.toggle('completed');
  });

  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';

  deleteBtn.addEventListener('click', function (e) {
    e.stopPropagation(); // Prevent toggle on delete click
    list.removeChild(li);
  });

  li.appendChild(deleteBtn); // Append delete button to li
  list.appendChild(li);       // Append li to the ul list
}

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

todos.forEach(task => addTask(task));