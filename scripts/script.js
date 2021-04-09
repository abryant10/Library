let myLibrary = [];
//var bookDeleteButton = ''; //dont think i need this
const libraryFeed = document.querySelector('.libraryFeed');
const addBookButton = document.getElementById('addBookButton');
const addBookSubmit = document.getElementById('addBookSubmit');
var formPopup = document.getElementById("form-popup");
var formCloseButton = document.getElementById("closeFormButton");

addBookSubmit.addEventListener('click', addBookToLibrary);
// When the user clicks on the add book button, open the popup
addBookButton.onclick = function() {
  formPopup.style.display = "block";
}
// When the user clicks on (x), close the popup
formCloseButton.onclick = function() {
  formPopup.style.display = "none";
  clearForm();
}
// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
  if (event.target == formPopup) {
    formPopup.style.display = "none";
    clearForm();
  }
}

function Book (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () {
  console.log('hi');
  if (this.read == 'Read') {
    this.read = 'Not Read'
  } else {
    this.read = 'Read'
  };
}

function toggleRead (e){
  var toggleIndex = myLibrary.findIndex(i => i.title === e.target.dataset.index);
  myLibrary[toggleIndex].toggleReadStatus;

}

function clearForm() {
  document.getElementById("form-body").reset();
  document.getElementById('titleRequired').style.display = 'none';
  document.getElementById('authorRequired').style.display = 'none';
  document.getElementById('pagesRequired').style.display = 'none';
}

function deleteBook(e){ //deletes book from array and rebuilds library feed with new array
  var spliceIndex = myLibrary.findIndex(i => i.title === e.target.dataset.index);
  myLibrary.splice(spliceIndex, 1);
  clearFeed();
  const chronologicalFeed = myLibrary.map(function (bookListing){
    var bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");
    bookCard.innerHTML = `<button class='bookDeleteButton' data-index='${bookListing.title}'>X</button><h3 class="bookTitle">${bookListing.title}</h3><br>Author: ${bookListing.author}<br>Number of pages: ${bookListing.pages}<br>Read status: ${bookListing.read}<label for="readFieldCard" class="switchCard">
    <input type="checkbox" data-index='${bookListing.title}' id="readFieldCard" name="readCard">
    <span class="slider round"></span>
    </label>`
    libraryFeed.appendChild(bookCard);
  })
  var bookDeleteButton = document.querySelectorAll('.bookDeleteButton');
  bookDeleteButton.forEach(button => button.addEventListener('click', deleteBook))
}

function clearFeed() {
  while (libraryFeed.firstChild)  {
    libraryFeed.removeChild(libraryFeed.lastChild);
  }
}

function addBookToLibrary() {
  var titleField = document.getElementById('titleField').value;
  var authorField = document.getElementById('authorField').value;
  var pagesField = document.getElementById('pagesField').value;
  
  if (titleField == ''){ //logic to make fields required
    document.getElementById('titleRequired').style.display = 'contents';
    return;
  } else if (authorField == ''){
    document.getElementById('authorRequired').style.display = 'contents';
    return;
  } else if (pagesField == '') {
    document.getElementById('pagesRequired').style.display = 'contents';
    return;
  } else {
    clearFeed();

    function getCheckVal(){
      if (document.getElementById('readField').checked) {
        return "Read"
      } else {
        return "Not Read"
      };
    }

    var readField = getCheckVal();
    var book = new Book(titleField, authorField, pagesField, readField);

    myLibrary.push(book);

    const chronologicalFeed = myLibrary.map(function (bookListing){
      var bookCard = document.createElement("div");
      bookCard.classList.add("bookCard");
      bookCard.innerHTML = `<button class='bookDeleteButton' data-index='${bookListing.title}'>X</button><h3 class="bookTitle">${bookListing.title}</h3><br>Author: ${bookListing.author}<br>Number of pages: ${bookListing.pages}<br>Read status: ${bookListing.read}<button class='toggleReadButtonCard' data-index='${bookListing.title}'>o</button>`
      libraryFeed.appendChild(bookCard);
    })
    
    formPopup.style.display = "none";
    clearForm();

    var bookDeleteButton = document.querySelectorAll('.bookDeleteButton');
    bookDeleteButton.forEach(button => button.addEventListener('click', deleteBook));

    var toggleReadButton = document.querySelectorAll('.toggleReadButtonCard');
    toggleReadButton.forEach(toggle => toggle.addEventListener('click', toggleRead));
  }
}  


