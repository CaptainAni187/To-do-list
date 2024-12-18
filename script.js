// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Retrieve tasks from LocalStorage
const getTasks = async () => {
  return new Promise((resolve) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    resolve(tasks);
  });
};

// Save tasks to LocalStorage
const saveTasks = async (tasks) => {
  return new Promise((resolve) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    resolve();
  });
};

// Add a new task
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newTask = { text: taskInput.value, completed: false };
  const tasks = await getTasks();
  tasks.push(newTask);
  await saveTasks(tasks);
  renderTasks();
  taskInput.value = '';
});

// Render tasks
const renderTasks = async () => {
  const tasks = await getTasks();
  taskList.innerHTML = ''; // Clear the list
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
};

// Toggle task completion
window.toggleTask = async (index) => {
  const tasks = await getTasks();
  tasks[index].completed = !tasks[index].completed;
  await saveTasks(tasks);
  renderTasks();
};

// Delete a task
window.deleteTask = async (index) => {
  const tasks = await getTasks();
  tasks.splice(index, 1);
  await saveTasks(tasks);
  renderTasks();
};

// Initial render
renderTasks();
