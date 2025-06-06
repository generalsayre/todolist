function addTask() {
var task = document.getElementById("new-task").value;
var li = document.createElement ("li");
li.appendChild(document.createTextNode(task));
document.getElementById("todo-list").appendChild(li);
document.getElementById("new-task").value = "";
}