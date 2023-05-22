let myTask = JSON.parse(localStorage.getItem('myTask')) || [];
//setting up targets
const getTaskInput = document.querySelector('.js-input-task');
const newTaskInput= document.querySelector('.js-update-task');
const addTaskBtn = document.querySelector('.js-add-btn');
const saveTaskBtn = document.querySelector('.js-save-btn');
const displayTask = document.querySelector('.js-display-list');
const updateBtn = document.querySelector('.js-edit-task')

//adding task
function addTask() {
  task = getTaskInput.value;
  myTask.push(task);
  displayTask.innerHTML = myTask;
  localStorage.setItem('myTask', JSON.stringify(myTask))
  getTaskInput.value = '';
  renderList();
}

addTaskBtn.addEventListener('click', () => {
  addTask();
})

function renderList () {
  let todoHTML = '';
  
  myTask.forEach((list, index) => {
    //const task = myTaskObject;
    
    const makeHTML = `
    <div class="task-list-container">
      <p class="task-list">${list}<p>
          <button class="js-edit-task">Edit</button>
          <button class='js-delete-task'>Delete</button>
    </div>
    `
    todoHTML += makeHTML;
  })
  
  displayTask.innerHTML = todoHTML;
  
  //delete tasks
  document.querySelectorAll('.js-delete-task').forEach((deleteBtn, index) => {
    deleteBtn.addEventListener('click', () => {
      removeStorage();
      myTask.splice(index, 1);
      renderList();
    })
  })
  
  
  //edit tasks
  document.querySelectorAll('.js-edit-task').forEach((editTask, index) => {
    editTask.addEventListener('click', () => {
      getItemStorage();
      newTaskInput.value = index;
      getTaskInput.value = myTask[index];
      addTaskBtn.style.display = "inline-flex";
      saveTaskBtn.style.display = "inline-flex";
      saveTaskBtn.innerHTML = 'Save'
      renderList();
    })
  })
  
  
  document.querySelectorAll('.js-edit-task').forEach((saveTask, index) => {
    getItemStorage();
    let newInput = newTaskInput.value;
    myTask[newInput] = getTaskInput.value;
    addTaskBtn.style.display = "inline";
    saveTaskBtn.style.display = "none";
    getTaskInput.value = '';
    setItemStorage();
    renderList();
  })
  /*
  })*/
}

saveTaskBtn.addEventListener('click', () => {
      getItemStorage();
      let newInput = newTaskInput.value;
      myTask[newInput] = getTaskInput.value;
      addTaskBtn.style.display = "inline-flex";
      saveTaskBtn.style.display = "none";
      getTaskInput.value = '';
      setItemStorage();
      renderList();
}




//getting values in Local Storage
function setItemStorage() {
  localStorage.setItem('myTask', JSON.stringify(myTask))
}

function getItemStorage() {
  localStorage.getItem('myTask')
}

function removeStorage() {
  localStorage.removeItem('myTask')
}