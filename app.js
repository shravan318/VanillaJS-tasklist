const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const cleatBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");


// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // dom load event
    document.addEventListener("DOMContentLoaded", getTasks)
    //add task
    form.addEventListener("submit",addTask)
    // remove task 
    taskList.addEventListener("click",removeTask)
    //clear tasks event
    cleatBtn.addEventListener("click",clearTasks)
    //filter tasks
    filter.addEventListener("keyup",filtertasks)
}

// get tasks for localStorage
function getTasks(){
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task){
        // create a li
        const li = document.createElement("li");
        //add class to li
        li.className = 'collection-item';
        //create text node
        li.appendChild(document.createTextNode(task));

        const link = document.createElement("a")
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        // appenmd li to ul
        taskList.appendChild(li)
    })
}



function addTask(e) {
    e.preventDefault();
    if (taskInput.value === "") {
        alert("Please enter a task")
        return
    }
    // create a li
    const li = document.createElement("li");
    //add class to li
    li.className = 'collection-item';
    //create text node
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement("a")
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    
    // appenmd li to ul
    taskList.appendChild(li)
    //store in LS
    storeTaskInlocalStorage(taskInput.value);

    taskInput.value = ""


}

// store task
function storeTaskInlocalStorage(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks=[]
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

//Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure")) {
            e.target.parentElement.parentElement.remove();
            
            //remove fromm ls
            removeTaskFrosessionlStorage(e.target.parentElement.parentElement)
        }
    }
}

function removeTaskFromlocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    
    tasks.forEach(function(task,index){
        console.log(task)
        if(taskItem.textContent === task){
            tasks.splice(index,1)
        }
    })
    localStorage.setItem("tasks",JSON.stringify(tasks))
}

// clear tasks
function clearTasks() {

    // taskList.innerHTML = ""
    if(confirm("This will delete all the tasks")){

        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        clearTasksFrolocalStorage();
    }
    filter.value = ""

}

function clearTasksFrolocalStorage(){
    localStorage.clear();
}
function filtertasks(e){
    const text = e.target.value.toLowerCase();
   document.querySelectorAll(".collection-item").forEach(function(task){
const item = task.firstChild.textContent;
if(item.toLowerCase().indexOf(text) != -1){
    task.style.display = "block"
}else(
    task.style.display = "none"
    )
   })

}