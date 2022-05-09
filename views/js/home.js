// Get DOM Elements
const addModal = document.querySelector('#add-modal');
const addModalBtn = document.querySelector('#add-modal-btn');
const closeAddBtn = document.querySelector('.addClose');
document.getElementById("add-form").addEventListener("submit", (event)=>{event.preventDefault();});
document.getElementById("add-form").addEventListener("submit", sendToServer);


const editModal = document.querySelector('#edit-modal');
const editModalBtn = document.querySelector('#edit-modal-btn');
const closeEditBtn = document.querySelector('.editClose');

// Events
addModalBtn.addEventListener('click', openAddModal);
closeAddBtn.addEventListener('click', closeAddModal);
window.addEventListener('click', addOutsideClick);

editModalBtn.addEventListener('click', openEditModal);
closeEditBtn.addEventListener('click', closeEditModal);
window.addEventListener('click', editOutsideClick);

// Open
function openAddModal(){
  addModal.style.display = 'block';
}

function openEditModal(){
  editModal.style.display = 'block';
}

// Close
function closeAddModal(){
  addModal.style.display = 'none';
}

function closeEditModal(){
  editModal.style.display = 'none';
}

// Close If Outside Click

function addOutsideClick(e) {
  if (e.target == addModal) {
    addModal.style.display = 'none';
  }
}

function editOutsideClick(e) {
  if (e.target == editModal) {
    editModal.style.display = 'none';
  }
}

// send data form to the server
async function sendToServer(){

  const uri = document.getElementById('uri').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const data = {uri, username, email, password}
  const options = {
    method: 'PATCH',
    headers: {
            'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }
  fetch('/home', options).then((res)=>{})

}
