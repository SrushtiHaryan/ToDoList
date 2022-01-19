"use strict";

//selectors

const toDoInput = document.querySelector(".todo-input");
const toDoButton = document.querySelector(".todo-button");
const toDoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listeners
document.addEventListener("DOMContentLoaded",getToDos);
toDoButton.addEventListener("click", addTodo);
toDoList.addEventListener("click", checkORdelete);
filterOption.addEventListener("click",filterTodo);

//functions

function addTodo(event) {
  //prevents form submission and reloading
  event.preventDefault();
//   console.log("hello");

  //Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create list
  const newToDoList = document.createElement("li");
  console.log(toDoInput.value);
  newToDoList.innerText = toDoInput.value;
  newToDoList.classList.add("todo-item");
  todoDiv.appendChild(newToDoList);

  //adding to the localStorage
  saveLocalTodos(toDoInput.value);

  //check
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  //trash
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  toDoList.appendChild(todoDiv);

  //clear to do input value
  toDoInput.value = "";
}

function checkORdelete(event){

    const item = event.target;

    if (item.classList[0]==="trash-btn") {
        const todo = item.parentElement;

        console.log(item.parentElement);
        //animation
        todo.classList.add("fall");

        removeLocalToDos(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        })

        // todo.remove();
        
    }else if (item.classList[0]==="complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}

function filterTodo(e) {
    const todos = toDoList.childNodes;
    console.log(todos);

    console.log(e.target.value);
    todos.forEach(function(todo){

        
        switch (e.target.value) {
            
            case "all":

            todo.style.display="flex";
                
                break;
            case "finished":
                if (todo.classList.contains("completed")) {
                    todo.style.display="flex";
                    
                }else{
                    todo.style.display="none";
                }
                break;
            case "unfinished":

                if (!todo.classList.contains("completed")) {
                    todo.style.display="flex";
                    
                }else{
                    todo.style.display="none";
                }
                
                break;
        
            default:
                break;
            }

    });

    
}

function saveLocalTodos(todo){
    //check whether there are todos?
    let todos;
    if (localStorage.getItem('todos')===null) {
        todos = [];
    }else{
        //stores whatever is present in localStorage in todos
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);//adding the new todo
    localStorage.setItem('todos',JSON.stringify(todos));//putting the updated array in localStorage
}

function getToDos(){
    let todos;

    if (localStorage.getItem('todos')===null) {
        todos = [];
    }else{
        //stores whatever is present in localStorage in todos
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
//Todo Div
const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");
//create list
const newToDoList = document.createElement("li");
console.log(toDoInput.value);
newToDoList.innerText = todo;
newToDoList.classList.add("todo-item");
todoDiv.appendChild(newToDoList);


//check
const completeButton = document.createElement("button");
completeButton.innerHTML = '<i class="fas fa-check"></i>';
completeButton.classList.add("complete-btn");
todoDiv.appendChild(completeButton);

//trash
const trashButton = document.createElement("button");
trashButton.innerHTML = '<i class="fas fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);

toDoList.appendChild(todoDiv);

    });
}


function removeLocalToDos(todo){
    let todos;

    if (localStorage.getItem('todos')===null) {
        todos = [];
    }else{
        //stores whatever is present in localStorage in todos
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const toDoIndex = todos.indexOf(todo.children[0].innerText); //getting the text corresponding to the removed item
    todos.splice(toDoIndex,1);//removing the value at toDOIndex
    localStorage.setItem('todos',JSON.stringify(todos));//putting the updated array in localStorage


    
}