//Selectores
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)

//Funciones
function removeLocalTodos(todo){
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    
    todos.forEach(function(todo){
    //Crear Todo Div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")
    //Crear li
    const newTodo = document.createElement("li")
    newTodo.innerText = todo
    newTodo.classList.add("todo-item")
    //Agregar elemento li al div 
    todoDiv.appendChild(newTodo)
    //Check button
    const completedButton = document.createElement("button")
    completedButton.innerHTML = "<i class='fas fa-check'></i>"
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)
    //Trash button
    const trashButton = document.createElement("button")
    trashButton.innerHTML = "<i class='fas fa-trash'></i>"
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)
    //Agregar a la ul
    todoList.appendChild(todoDiv)
    })
    
    
}

function saveLocalTodos(todo) {
    //comprobar si hay todos guardados previamente
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex"
                break
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break
        }
    })
}

function deleteCheck(e) {
    const item = e.target
    //delete
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener("transitionend", function () {
            todo.remove()
        })

    }

    //check
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement
        todo.classList.toggle("completed")
    }

}

function addTodo(event) {
    //previene el envio del form
    event.preventDefault()
    //Crear Todo Div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")
    //Crear li
    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value
    newTodo.classList.add("todo-item")
    //Agregar elemento li al div 
    todoDiv.appendChild(newTodo)
    //Agregar TODO al LocalStorage
    saveLocalTodos(todoInput.value)
    //Check button
    const completedButton = document.createElement("button")
    completedButton.innerHTML = "<i class='fas fa-check'></i>"
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)
    //Trash button
    const trashButton = document.createElement("button")
    trashButton.innerHTML = "<i class='fas fa-trash'></i>"
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)
    //Agregar a la ul
    todoList.appendChild(todoDiv)
    //borrar el texto del input
    todoInput.value = ""
}

//Ingreso del nombre de usuario

function alerta() 
{
var mensaje;
var opcion = prompt("Introduzca su nombre:", "Ej:James Bond");
 
if (opcion == null || opcion == "") {
        mensaje = "Has cancelado o introducido el nombre vacío";
        } else {
            mensaje = "Hola, " + opcion;
            }
            document.getElementById("ejemplo").innerHTML = mensaje;
            document.getElementById("titulo").innerHTML = opcion + " TodoList";
}
