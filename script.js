const todoInput = document.querySelector('.todo--input')
const todoButton = document.querySelector('.todo--button')
const todoList = document.querySelector('.todo--list')
const filterOption = document.querySelector('.filter-todo')

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteAndCheck);
filterOption.addEventListener('click', filterTodo)
document.addEventListener('DOMContentLoaded', getTodos)

function addTodo(event) {
    // preventing form from submiting on load
    event.preventDefault();
    // creating new div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    // creating li element
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo--item')
    todoDiv.appendChild(newTodo)

    // check mark button 
    const completed = document.createElement('button')
    completed.innerHTML = '<i class="fas fa-check"></i>'
    completed.classList.add('complete--button')
    todoDiv.appendChild(completed)

    // adding to loacal storage
    saveToLocalStorage(todoInput.value)

    // check trash button
    const trashed = document.createElement('button')
    trashed.innerHTML = '<i class="fas fa-trash"></i>'
    trashed.classList.add('trashed--button')
    todoDiv.appendChild(trashed)

    //appending to our list
    todoList.appendChild(todoDiv)
     
    //clear input bar
    todoInput.value = ''
}

function deleteAndCheck(event) {
    const item = event.target
    if(item.classList[0] === 'trashed--button') {
        const todo = item.parentElement
        todo.remove()
        removeLocalStorage(todo)
    }

    if(item.classList[0] === 'complete--button') {
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes

    todos.forEach(function(todo) {
        switch(event.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break;
            case 'completed':
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
            case 'pending':
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
        }
    })
}

function saveToLocalStorage(todo) {
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    let todos

    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        // creating li element
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo--item')
        todoDiv.appendChild(newTodo)
    
        // check mark button 
        const completed = document.createElement('button')
        completed.innerHTML = '<i class="fas fa-check"></i>'
        completed.classList.add('complete--button')
        todoDiv.appendChild(completed)
    
        // check trash button
        const trashed = document.createElement('button')
        trashed.innerHTML = '<i class="fas fa-trash"></i>'
        trashed.classList.add('trashed--button')
        todoDiv.appendChild(trashed)
    
        //appending to our list
        todoList.appendChild(todoDiv)
    })
}

function removeLocalStorage(todo) {
    let todos

    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}