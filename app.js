const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const cleatBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");


// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    form.addEventListener("submit", addTask)
}
function addTask(e){
    e.preventDefault();

    if(taskInput.value === ""){
        alert("Please add a task")
    }
    // create a li
    const li = document.createElement("li");
    //add class to li
    li.className= 'collection-item';
    //create text node
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement("a")
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    console.log(li)

    // appenmd li to ul
    taskList.appendChild(li)

    taskInput = ""

}