let userId = null;
const tasksData = [];

const freezeCount = document.getElementById('freezeCount');
const streakCount = document.getElementById('streakCount');
const xpCount = document.getElementById('xpCount');
const tasksContainer = document.getElementById('tasks');
const newTaskInput = document.getElementById('newTask');
const addTaskBtn = document.getElementById('addTaskBtn');
const themeToggleBtn = document.getElementById('themeToggle');
const imageModal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');

function init(){
  userId = Date.now().toString();
  loadStats();
}

function loadStats(){
  freezeCount.innerText = 1;
  streakCount.innerText = 0;
  xpCount.innerText = 0;
}

function renderTasks(){
  tasksContainer.innerHTML = '';
  tasksData.forEach(t=>{
    const div = document.createElement('div');
    div.className = 'task' + (t.completed?' completed':'');
    div.innerHTML = `
      <span>${t.text}</span>
      <div>
        <button onclick="deleteTask('${t.id}')">🗑️</button>
        <button onclick="viewImage('${t.id}')">📷</button>
      </div>
    `;
    tasksContainer.appendChild(div);
  });
}

function addTask(){
  if(!newTaskInput.value.trim()) return;
  tasksData.push({id:Date.now(), text:newTaskInput.value, completed:false, image:null});
  newTaskInput.value='';
  renderTasks();
}

function deleteTask(id){
  const index = tasksData.findIndex(t=>t.id==id);
  if(index>-1) tasksData.splice(index,1);
  renderTasks();
}

function viewImage(id){
  const task = tasksData.find(t=>t.id==id);
  if(!task || !task.image) return;
  modalImg.src = task.image;
  imageModal.classList.add('show');
}

function closeModal(){
  imageModal.classList.remove('show');
}

function toggleTheme(){
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
}

addTaskBtn.addEventListener('click', addTask);
themeToggleBtn.addEventListener('click', toggleTheme);
imageModal.addEventListener('click', closeModal);

init();
