'use strict';
const todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('.todo-list'),
todoCompleted = document.querySelector('.todo-completed'),
todoRemove = document.querySelector('.todo-remove');
let todoData = [];

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    todoData.forEach(function(item,index){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
        '</div>'; 
        if(item.completed){
            todoCompleted.append(li);
        }else{
            todoList.append(li);
        }
        localStorage.setItem('data', JSON.stringify(todoData));
         const todoRemove = li.querySelector('.todo-remove');
         todoRemove.addEventListener('click',function(){
             todoData.splice(index,1);
             localStorage.setItem('data', JSON.stringify(todoData));
             render();
     });
        const btnTodoCompleted = li.querySelector('.todo-complete');
        btnTodoCompleted.addEventListener('click',function(){
            item.completed = !item.completed;
            localStorage.setItem('data', JSON.stringify(todoData));
            render();
        });
    });
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if(headerInput.value === '') {
        alert("error");
    } else {
        const newTodo = {
            value:headerInput.value,
            completed:false
        };
        todoData.push(newTodo);
        headerInput.value = '';  
        localStorage.setItem('data', JSON.stringify(todoData));
        render();
    }
}
);

if (localStorage.getItem("data")) {
    todoData = JSON.parse(localStorage.getItem("data"));
    render();
} else {
    todoData = [];
    }
