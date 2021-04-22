// select elements 
let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
const libraryFeed = document.querySelector('.libraryFeed');
const addBookButton = document.querySelector('.addBookButton');
const formPopup = document.getElementById("form-popup");
const form = document.querySelector('.form-body');
const formCloseButton = document.getElementById("closeFormButton");

// function to  make book, push to array, populate list, update local store, reset form. 
function Book (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(e) {
  e.preventDefault();
  const titleField = (this.querySelector('[name=title]')).value;
  const authorField = (this.querySelector('[name=author]')).value;
  const pagesField = (this.querySelector('[name=pages]')).value;
  const readField = (this.querySelector('[name=read]')).checked;
  var book = new Book(titleField, authorField, pagesField, readField);
  myLibrary.push(book);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  populateList(myLibrary, libraryFeed);
  formPopup.style.display = "none";
  this.reset();
  }
  
// function to populate list
function populateList(items = [], libraryFeed) {
  libraryFeed.innerHTML = items.map((bookListing, i) => {
    let readConverted;
    if (bookListing.read) {
      readConverted = 'Read'
    }else { readConverted = 'Not Read'};
    return ` 
    <div class='bookCard'>
      <button class='bookDeleteButton' data-index='${i}'>X</button>
      <h3 class="bookTitle">${bookListing.title}</h3> 
      <br>Author: ${bookListing.author}
      <br>Number of pages: ${bookListing.pages}
      <br>
      <button class='toggleReadButtonCard' data-index='${i}'>${readConverted}</button>
    </div>
    `    
  })
}
//funtion to toggle read and pop list

function toggleRead(e){
  if(!e.target.matches('.toggleReadButtonCard')) return;
  const element = e.target;
  const elIndex = element.dataset.index;
  myLibrary[elIndex].read = !myLibrary[elIndex].read;
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  populateList(myLibrary, libraryFeed);
}
// function to delete and pop list and update local storage

function deleteBook(e){ 
  if(!e.target.matches('.bookDeleteButton')) return;
  myLibrary.splice((e.target.dataset.index), 1);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  populateList(myLibrary, libraryFeed);
}


form.addEventListener('submit', addBookToLibrary);
// When the user clicks on the add book button, open the popup
addBookButton.onclick = function() {
  formPopup.style.display = "block";
}
// When the user clicks on (x), close the popup
formCloseButton.onclick = function() {
  formPopup.style.display = "none";
}
// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
  if (event.target == formPopup) {
    formPopup.style.display = "none";
  }
}
libraryFeed.addEventListener('click', deleteBook);
libraryFeed.addEventListener('click', toggleRead);

//initial populate list
populateList(myLibrary, libraryFeed);