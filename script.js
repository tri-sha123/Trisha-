
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Show selected section
  document.getElementById(sectionId).classList.add('active');
}

function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('input[type="password"]').value;
  
  // Simple admin check - in real app, this should be server-side
  if (email === 'admin@example.com' && password === 'admin') {
    showSection('admin');
  } else if (email && password) {
    showSection('dashboard');
    updateDashboard();
  } else {
    alert('Please enter valid credentials');
  }
}

function updateDashboard() {
  const readingList = document.getElementById('userReadingList');
  const sampleBooks = [
    'The Little Prince - In Progress',
    'Harry Potter - Next Up',
    'Matilda - Completed'
  ];
  
  readingList.innerHTML = sampleBooks
    .map(book => `<li>${book}</li>`)
    .join('');
}

function handleRegister(event) {
  event.preventDefault();
  const form = event.target;
  alert('Registration successful!');
  form.reset();
  showSection('login');
}

function addBook() {
  const bookName = prompt('Enter book name:');
  if (bookName) {
    const bookHtml = `<div class="book">${bookName}</div>`;
    document.querySelector('.book-grid').insertAdjacentHTML('beforeend', bookHtml);
  }
}

function manageUsers() {
  document.getElementById('adminContent').innerHTML = `
    <h3>User Management</h3>
    <p>This is a placeholder for user management functionality.</p>
  `;
}

function toggleStory(button) {
  const story = button.nextElementSibling;
  if (story.style.display === 'block') {
    story.style.display = 'none';
    button.textContent = 'Read Story';
  } else {
    story.style.display = 'block';
    button.textContent = 'Hide Story';
  }
}

function toggleFilter() {
  const popup = document.getElementById('filterPopup');
  if (popup.style.display === 'block') {
    popup.style.display = 'none';
  } else {
    popup.style.display = 'block';
    updateFilterList();
  }
}

function updateFilterList() {
  const filterList = document.getElementById('filterList');
  const books = document.querySelectorAll('.book h3');
  filterList.innerHTML = '';
  
  books.forEach(book => {
    const div = document.createElement('div');
    div.className = 'filter-list-item';
    div.textContent = book.textContent;
    div.onclick = () => filterBooks(book.textContent);
    filterList.appendChild(div);
  });
}

function filterBooks(title) {
  const books = document.querySelectorAll('.book');
  books.forEach(book => {
    const bookTitle = book.querySelector('h3').textContent;
    book.style.display = title === 'All' || bookTitle === title ? 'block' : 'none';
  });
  
  document.getElementById('filterPopup').style.display = 'none';
}

// Show home section by default
showSection('home');
