// Get DOM Elements
const addModal = document.querySelector('#add-modal');
const addModalBtn = document.querySelector('#add-modal-btn');
const closeAddBtn = document.querySelector('.addClose');
document.getElementById("add-form").addEventListener("submit", (event)=>{event.preventDefault();});
document.getElementById("add-form").addEventListener("submit", sendToServerPost);


const editModal = document.querySelector('#edit-modal');
const closeEditBtn = document.querySelector('.editClose');     
document.getElementById("edit-form").addEventListener("submit", (event)=>{event.preventDefault();});
document.getElementById("edit-form").addEventListener("submit", sendToServerPatch);

// Events
addModalBtn.addEventListener('click', openAddModal);
closeAddBtn.addEventListener('click', closeAddModal);

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

// showing in the edit modal your data

function getEdit(idBtn){

  const id = (idBtn.toString()).match(/\d+/g)
  const username = document.getElementById(('usernameId' + id).toString()).value;
  const email = document.getElementById(('emailId' + id).toString()).value;
  const password = document.getElementById(('pswId' + id).toString()).value;

  const user_name = document.getElementById(('username-edit'));
  const e_mail= document.getElementById(('email-edit'));
  const psw = document.getElementById(('password-edit'));

  user_name.value = username;
  e_mail.value = email;
  psw.value = password; 

  openEditModal()
}

function getBtnId(){
  const item = document.getElementsByName('edit-button')

  for( let i = 0; i < item.length; i++ ) {
    item[i].id = ('edit-btn' + i).toString()
  } 
}

function getUsernameId(){
  const item = document.getElementsByName('usernameId')

  for( let i = 0; i < item.length; i++ ) {
    item[i].id = ('usernameId' + i).toString()
  } 
}

function getEmailId(){
  const item = document.getElementsByName('emailId')
  
  for( let i = 0; i < item.length; i++ ) {
    item[i].id = ('emailId' + i).toString()
  } 
}

function getPswId(){
  const item = document.getElementsByName('pswId')

  for( let i = 0; i < item.length; i++ ) {
    item[i].id = ('pswId' + i).toString()
  } 
}

getBtnId();
getUsernameId();
getEmailId();
getPswId();