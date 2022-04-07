// Variables //

const text = document.getElementById("task_input")
const addtask = document.getElementById("add_task")
const updateTask = document.getElementById("save_task")
const list = document.getElementById("todolist")
const save = document.getElementById("savetodo")
const date = document.getElementById("todo_date")
const sort = document.getElementById("sort_task")


let Todoarray = []
addtask.addEventListener("click", (e) => {
    e.preventDefault();

    const fillin = text.value;
    if (!fillin) {
        alert("Please fill out the task");
        return;
    }
    
    let tasks = localStorage.getItem("todolist")
    if (tasks === null) {
        Todoarray = []
    } else {
        Todoarray = JSON.parse(tasks)
    }
    Todoarray.push(text.value + " " + date.value);
    text.value = ""
    localStorage.setItem("todolist", JSON.stringify(Todoarray))
    displayTasks()

})

function displayTasks() {
    let tasks = localStorage.getItem("todolist")
    if (tasks === null) {
        Todoarray = []
    } else {
        Todoarray = JSON.parse(tasks)
    }
    let change = ""
    Todoarray.forEach((list, ind) => {
        change += `<div class = "newinput">
        <p class=w>${list}</p>
        <button class ="savetodo" onclick='edit(${ind})'>Update</button>
          <button class = "delete" onclick='deleteTask(${ind})'>Delete</button>
         
        </div>`
    })
    list.innerHTML = change
}

function deleteTask(ind) {
    let tasks = localStorage.getItem("todolist")
    Todoarray = JSON.parse(tasks)
    Todoarray.splice(ind, 1)
    localStorage.setItem("todolist", JSON.stringify(Todoarray))
    displayTasks()
}

function edit(ind) {
    save.value = ind
    let tasks = localStorage.getItem("todolist")
    Todoarray = JSON.parse(tasks)
    text.value = Todoarray[ind]
    addtask.style.display = "none"
    updateTask.style.display = "block"
}

updateTask.addEventListener("click", (e) => {
    e.preventDefault();
    let tasks = localStorage.getItem("todolist")
    Todoarray = JSON.parse(tasks)
    let id = save.value
    Todoarray[id] = text.value
    addtask.style.display = "block"
    updateTask.style.display = "none"
    text.value = ""
    localStorage.setItem("todolist", JSON.stringify(Todoarray))
    displayTasks()
})

sort.addEventListener("click", (e) => {
    e.preventDefault();
    let tasks = localStorage.getItem("todolist")
    Todoarray = JSON.parse(tasks)
    Todoarray.sort()
    localStorage.setItem("todolist", JSON.stringify(Todoarray))
    displayTasks()
})


list.querySelector("#todolist")
list.addEventListener('dblclick', (e) => {
    e.preventDefault()
    let Tasks = document.querySelectorAll("#todolist")
    Tasks.forEach(element => {
        element.addEventListener('dblclick', (e) => {
            e.preventDefault()
            element.classList.add("completed")
        })
    })

}, false)
