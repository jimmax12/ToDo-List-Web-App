const inputTask = document.getElementById('js-input-task');
const addTask = document.getElementById('js-add-task');
const updatedTask = document.getElementById('save-updated-task');
const saveTaskBtn = document.getElementById('js-save-task-btn')
const displayTask = document.getElementById('js-display-list');


const myTask = JSON.parse(localStorage.getItem('myTask')) || [];

//display current tasks
renderTaskList();

//add tasks
function addTodo() {
  getItemsStorage();
  task = inputTask.value;
  myTask.push(task);
  setItemsStorage();
  displayTask.innerHTML = myTask;
  renderTaskList();
  inputTask.value = '';
}

addTask.addEventListener('click', () => {
  addTodo();
})

//display tasks
function renderTaskList() {
  getItemsStorage();
  let todoHTML = '';
  
  myTask.forEach((taskList, index) => {
    const renderHTML = `
    <div class="task-list-container">
    <p class="task-list">${taskList}</p>
    <button class="edit-button" id="js-update-task">Edit</button> 
    <button class="delete-button" id="js-delete-task">Delete</button>
    </div>
    `
    todoHTML += renderHTML;
  })
  displayTask.innerHTML = todoHTML;
  
  
  //mark the task that is finished
  document.querySelectorAll('.task-list').forEach((taskFinished, index) => {
    taskFinished.addEventListener('click', () => {
      if (taskFinished.style.textDecoration === "none") {
        taskFinished.style.textDecoration = "line-through";
      } else {
        taskFinished.style.textDecoration = "none";
      }
    })
  })
  
  //delete tasks
  document.querySelectorAll('#js-delete-task').forEach((deleteBtn, index) => {
    deleteBtn.addEventListener('click', () => {
      myTask.splice(index, 1);
      removeItemsStorage();
      renderTaskList();
      showDeleteConfirmation();
    })
  })
  
  //edit tasks
  document.querySelectorAll('#js-update-task').forEach((editTask, index) => {
    editTask.addEventListener('click', () => {
      updatedTask.value = index;
      getItemsStorage();
      inputTask.value = myTask[index]
      addTask.style.display ="none";
      saveTaskBtn.style.display = "inline";
      
    })
  })
}

//save edited tasks
saveTaskBtn.addEventListener('click', () => {
  getItemsStorage();
  let indx = updatedTask.value;
  myTask[indx] = inputTask.value;
  addTask.style.display = "inline";
  saveTaskBtn.style.display = "none";
  setItemsStorage();
  renderTaskList();
  inputTask.value = '';
})

//checking if the task is done.
function showDeleteConfirmation() {
  let confirmation = confirm('Are you done with the task?');
  
  if (confirmation === true) {
    return true;
  } else {
    return false;
  }

function setItemsStorage() {
  localStorage.setItem('myTask', JSON.stringify(myTask))
}

function getItemsStorage() {
  localStorage.getItem('myTask');
}

function removeItemsStorage() {
  localStorage.removeItem('myTask')
}
