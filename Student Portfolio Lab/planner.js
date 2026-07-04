let tasks = [];

const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-task-button');
const taskList  = document.getElementById('task-list');


function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'empty-message';
        empty.textContent = 'no tasks yet, add one above! :)';
        taskList.appendChild(empty);
        return;
    }

    tasks.forEach(function(task, index) {
        const li = document.createElement('li');
        li.className = task.completed ? 'task-item completed' : 'task-item';

        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="task-buttons">
                <button class="done-btn"   onclick="toggleComplete(${index})">
                    ${task.completed ? 'undo' : 'done ✓'}
                </button>
                <button class="delete-btn" onclick="deleteTask(${index})">delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}


function addTask() {
    const text = taskInput.value.trim();

    if (text === '') {
        taskInput.placeholder = 'please type something first!';
        taskInput.focus();
        return;
    }

    tasks.push({ text: text, completed: false });
    taskInput.value = '';
    taskInput.placeholder = 'New task...';
    renderTasks();
}


function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;

    renderTasks();

    const items = taskList.querySelectorAll('.task-item');
    if (items[index]) {
        items[index].classList.add('bouncing');

        items[index].addEventListener('animationend', function() {
            items[index].classList.remove('bouncing');
        }, { once: true });
    }
}


//  this might be confusing so i'll explaib
//  we're playing the shelf-out animation first, THEN
//  it removes the task from the array and redraws the list. if we just removed it from the array first, the animation would never get to play.
function deleteTask(index) {
    const items = taskList.querySelectorAll('.task-item');
    const li = items[index];

    // the CSS class that triggers the shelf-out animation
    li.classList.add('deleting');

    // wait for the animation to finish, THEN update the data and redraw
    li.addEventListener('animationend', function() {
        tasks.splice(index, 1);
        renderTasks();
    }, { once: true });
}


addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

renderTasks();