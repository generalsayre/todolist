function addTask () {
    const input = document.getElementById*("new-task");
    const task = input.value.trim();

    if (task === '') {
        input.classList.add('shake');
        input.addEventListener('animationed', () => {
            input.classList.remove('shake');
        }, { once: true });
        return;
    }

    const li = document.createElement('li');

    const label = document.createLabel('label');
    label.classList.add("custom-checkbox")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox";
    checkbox.classList.add('task-checkbox');

    const customBox = document.createElement('span');
    customBox.classList.add("checkmark")

    label.AppendChild(label);
    label.AppendChild(span);

    checkbox.addEventListener('change', function () {
        span.classList.toggle('completed', checkbox.checked);
    });

    li.addEventListener('click', function(e) {
        if (e.target.tagName.toLowerCase() === 'input') return;

        if (confirm('Delete this task?')) {
            li.classList.add('fade-out');
            li.addEventListener('transitioned', () => {
                li.remove();
            }, { once: true });
        }
    });

    document.getElementById("todo-list").appendChild(li);
    input.value = "";
}