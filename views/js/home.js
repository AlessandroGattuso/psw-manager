// Get DOM Elements
const addModal = document.querySelector('#add-modal');
const addModalBtn = document.querySelector('#add-modal-btn');
const closeAddBtn = document.querySelector('.addClose');
document.getElementById("add-form").addEventListener("submit", (event)=>{event.preventDefault();});
document.getElementById("add-form").addEventListener("submit", sendToServerPost);


const editModal = document.querySelector('#edit-modal');
const editModalBtn = document.querySelectorAll('.edit-button');
const closeEditBtn = document.querySelector('.editClose');
document.getElementById("edit-form").addEventListener("submit", (event)=>{event.preventDefault();});
document.getElementById("edit-form").addEventListener("submit", sendToServerPatch);

// Events
addModalBtn.addEventListener('click', openAddModal);
closeAddBtn.addEventListener('click', closeAddModal);


editModalBtn.forEach(button => button.addEventListener('click', openEditModal))
closeEditBtn.addEventListener('click', closeEditModal);


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

// send data form to the server
function sendToServerPost(){

  const uri = document.getElementById('uri').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const data = {uri, username, email, password}
  const options = {
    method: 'post',
    headers: {
            'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }
  fetch('/home', options).then((res)=>{
    if(res.redirected === true && res.status === 200)
               window.location.href = '/home';
  })

}

function sendToServerPatch(){

  const uri = document.getElementById('uri').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const data = {uri, username, email, password}
  const options = {
    method: 'patch',
    headers: {
            'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }
  fetch('/home', options).then((res)=>{
    if(res.redirected === true && res.status === 200)
               window.location.href = '/home';
  })

}

//get an id 
let id = -1
function getId(){
  return 'edit-button' + ++id;
}