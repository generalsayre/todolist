>
    let tasks = [];

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
      const stored = localStorage.getItem("tasks");
      if (stored) {
        tasks = JSON.parse(stored);
        tasks.forEach(task => renderTask(task));
      }
    }

    function addTask() {
      const input = document.getElementById("new-task");
      const task = input.value.trim();

      if (task === '') {
        input.classList.add('shake');
        input.addEventListener('animationend', () => {
          input.classList.remove('shake');
        }, { once: true });
        return;
      }

      const taskObj = {
        id: Date.now(),
        text: task,
        completed: false
      };

      tasks.push(taskObj);
      saveTasks();
      renderTask(taskObj);
      input.value = "";
    }

    function renderTask(taskObj) {
      const li = document.createElement("li");

      const label = document.createElement("label");
      label.classList.add("custom-checkbox");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("task-checkbox");
      checkbox.checked = taskObj.completed;

      const customBox = document.createElement("span");
      customBox.classList.add("checkmark");

      label.appendChild(checkbox);
      label.appendChild(customBox);

      const span = document.createElement("span");
      span.textContent = taskObj.text;
      span.classList.add("task-text");
      if (taskObj.completed) span.classList.add("completed");

      checkbox.addEventListener('change', function () {
        span.classList.toggle('completed', checkbox.checked);
        taskObj.completed = checkbox.checked;
        saveTasks();
      });

      span.addEventListener('dblclick', function () {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = taskObj.text;
        input.classList.add('task-editing');

        li.replaceChild(input, span);
        input.focus();

        input.addEventListener('blur', () => finishEdit(input));
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') finishEdit(input);
        });

        function finishEdit(editInput) {
          const newText = editInput.value.trim();
          if (newText !== "") {
            taskObj.text = newText;
            saveTasks();
          }
          span.textContent = taskObj.text;
          li.replaceChild(span, editInput);
        }
      });

      li.appendChild(label);
      li.appendChild(span);

      // 🗑️ Delete task (ignore clicks on label/checkbox)
      li.addEventListener('click', function (e) {
        if (e.target.closest('label')) return;

        if (confirm("Delete this task?")) {
          li.classList.add('fade-out');
          li.addEventListener('transitionend', () => {
            li.remove();
            tasks = tasks.filter(t => t.id !== taskObj.id);
            saveTasks();
          }, { once: true });
        }
      });

      document.getElementById("todo-list").appendChild(li);
    }

    window.addEventListener('DOMContentLoaded', loadTasks);