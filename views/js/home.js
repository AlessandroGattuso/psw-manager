// Get DOM Elements
const addModal = document.querySelector('#add-modal');
const addModalBtn = document.querySelector('#add-modal-btn');
const closeAddBtn = document.querySelector('.addClose');

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

