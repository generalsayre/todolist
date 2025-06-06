function addTask() {
  var input = document.getElementById("new-task");
  var task = input.value.trim();

  if (task === '') {
    input.classList.add('shake');
    input.addEventListener('animationend', () => {
      input.classList.remove('shake');
    }, { once: true });
    return; // Don't add empty task
  }

  var li = document.createElement("li");
  li.appendChild(document.createTextNode(task));
  document.getElementById("todo-list").appendChild(li);
  input.value = "";
}