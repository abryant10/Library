let myLibrary = [];
  
function Book (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  //this.info = function (){
  //  return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read;
  //}
}
  
function addBookToLibrary() {
  while (libraryFeed.firstChild)  {
    libraryFeed.removeChild(libraryFeed.lastChild);
  }
  var titleField = document.getElementById('titleField').value;
  var authorField = document.getElementById('authorField').value;
  var pagesField = document.getElementById('pagesField').value;
  var readField = document.getElementById('readField').value;
  var book = new Book(titleField, authorField, pagesField, readField);
  myLibrary.push(book);

  const chronologicalFeed = myLibrary.map(function (bookListing){
    var bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");
    bookCard.textContent = `${bookListing.title} ${bookListing.author} ${bookListing.pages} ${bookListing.read}`
    libraryFeed.appendChild(bookCard);
  })
  
}  

const libraryFeed = document.querySelector('.libraryFeed');
const addBookButton = document.querySelector('.addBookButton');
const addBookSubmit = document.getElementById('addBookSubmit');

addBookSubmit.addEventListener('click', addBookToLibrary);