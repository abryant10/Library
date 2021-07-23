let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
const libraryFeed = document.querySelector('.libraryFeed');
const addBookButton = document.querySelector('.addBookButton');
const formPopup = document.getElementById("form-popup");
const form = document.querySelector('.form-body');
const titleField = document.querySelector('[name=title]');
const titleError = document.querySelector('#titleField + span.error');
const authorError = document.querySelector('#authorField + span.error');
const pagesError = document.querySelector('#pagesField + span.error');
const authorField = document.querySelector('[name=author]');
const pagesField = document.querySelector('[name=pages]');
const readField = document.querySelector('[name=read]');
const formCloseButton = document.getElementById("closeFormButton");

class Book {
  constructor (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  }
}

function addBookToLibrary(e) {
  e.preventDefault();
  const titleFieldValue = titleField.value;
  const authorFieldValue = authorField.value;
  const pagesFieldValue = pagesField.value;
  const readFieldValue = readField.checked;
  var book = new Book(titleFieldValue, authorFieldValue, pagesFieldValue, readFieldValue);
  myLibrary.push(book);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  populateList(myLibrary, libraryFeed);
  formPopup.style.display = "none";
  form.reset();
  }
  
// function to populate list
function populateList(items = [], libraryFeed) {
  libraryFeed.innerHTML = items.map((bookListing, i) => {
    let readConverted;
    let readClass;
    if (bookListing.read) {
      readConverted = 'Read'
      readClass = 'buttonRead';
    }else { 
      readConverted = 'Not Read';
      readClass = 'buttonNotRead';
    };
    return ` 
    <div class='bookCard'>
      <button class='bookDeleteButton' data-index='${i}'>X</button>
      <h3 class="bookTitle">${bookListing.title}</h3> 
      <br><b>Author:</b> ${bookListing.author}
      <br>
      <br><b>Page Count:</b> ${bookListing.pages}
      <br>
      <button class='toggleReadButtonCard ${readClass}' data-index='${i}'>${readConverted}</button>
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

// function to add message to an empty library
function checkEmpty () {
  if (myLibrary[0] == undefined) {
    libraryFeed.innerHTML = `
    <div class='emptyLibraryDiv'>Your library is empty <br> Add books to save them here!</div>`
  } else {return};
}
 const showTitleError = function showTitleError() {
  if(titleField.validity.valueMissing) {
     titleError.textContent = 'Please enter a book title.';
  }
  titleError.className = 'error active';
};

const showAuthorError = function showAuthorError() {
  if(authorField.validity.valueMissing) {
     authorError.textContent = 'Please enter an author.';
  }
  authorError.className = 'error active';
};

const showPagesError = function showPagesError() {
  if(pagesField.validity.valueMissing) {
     pagesError.textContent = 'Please enter the number of pages.';
  }
  pagesError.className = 'error active';
};

//event listeners 


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
window.addEventListener('keydown', function(e) {
  if (e.key === "Escape") {
    formPopup.style.display = "none";
  }
})
libraryFeed.addEventListener('click', deleteBook);
libraryFeed.addEventListener('click', toggleRead);
window.addEventListener('click', checkEmpty);

titleField.addEventListener('input', function (event) {
  if ( titleField.validity.valid) {
    titleError.textContent = ''; 
    titleError.className = 'error'; 
  } else {
    showTitleError();
  }
});

authorField.addEventListener('input', function (event) {
  if ( authorField.validity.valid) {
    authorError.textContent = ''; 
    authorError.className = 'error'; 
  } else {
    showAuthorError();
  }
});

pagesField.addEventListener('input', function (event) {
  if ( pagesField.validity.valid) {
    pagesError.textContent = ''; 
    pagesError.className = 'error'; 
  } else {
    showPagesError();
  }
});

form.addEventListener('submit', function (event) {
  if(!titleField.validity.valid) {
    showTitleError();
    event.preventDefault();
    return;
  }
  if(!authorField.validity.valid) {
    showAuthorError();
    event.preventDefault();
    return;
  }
  if(!pagesField.validity.valid) {
    showPagesError();
    event.preventDefault();
    return;
  }
  addBookToLibrary(event);
});
// populate list on startup

populateList(myLibrary, libraryFeed);
checkEmpty();