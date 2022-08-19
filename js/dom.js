const UNCOMPLETED_READ_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_READ_BOOK_ID = "completeBookshelfList";
const BOOK_ITEM_ID = "itemId";

function makeBook (title, author, year, isComplete) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = title;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = author;

  const bookYear = document.createElement("p");
  bookYear.innerText = year;

  const bookAction = document.createElement("p");
  bookAction.classList.add("action");
  if (isComplete) {
    bookAction.append(
        createUndoButton(),
        createTrashButton()
    );
} else {
    bookAction.append(
        createCheckButton(),
        createTrashButton()
    );
}

const container = document.createElement("article");
container.classList.add("book_item");
container.append(bookTitle, bookAuthor, bookYear, bookAction);

return container;

}

function createUndoButton() {
  return createButton("green", "Not Yet Reading", function (event) {
      undoBookFromCompleted(event.target.parentElement.parentElement);
  });
}

function createTrashButton() {
  return createButton("red", "Delete Book", function (event) {
      removeBook(event.target.parentElement.parentElement);
  });
}

function createCheckButton() {
  return createButton("green", "Done Reading", function (event) {
      addBookToCompleted(event.target.parentElement.parentElement);
  });
}

function createButton(buttonTypeClass, buttonText, eventListener) {
  const button = document.createElement("button");
  button.innerText = buttonText;
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
      eventListener(event);
  });

  return button;
}

function addBook() {
  const incompleteBookshelfList = document.getElementById(UNCOMPLETED_READ_BOOK_ID);
  const completeBookshelfList = document.getElementById(COMPLETED_READ_BOOK_ID);
  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const bookisComplete = document.getElementById("inputBookComplete").checked;

  const book = makeBook(bookTitle, `Author: ${bookAuthor}`, `Year: ${bookYear}`, bookisComplete);
  const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, bookisComplete);

  book[BOOK_ITEM_ID] = bookObject.id;
  books.push(bookObject);

  if (bookisComplete) {
    completeBookshelfList.append(book);
} else {
    incompleteBookshelfList.append(book);
}
updateDataToStorage();
}

function addBookToCompleted(bookElement) {
  const completeBookshelfList = document.getElementById(COMPLETED_READ_BOOK_ID);
  const bookTitle = bookElement.querySelector("h3").innerText;
  const bookAuthor = bookElement.querySelectorAll("p")[0].innerText;
  const bookYear = bookElement.querySelectorAll("p")[1].innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
  const book = findBook(bookElement[BOOK_ITEM_ID]);
  book.isComplete = true;
  newBook[BOOK_ITEM_ID] = book.id;

  completeBookshelfList.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

function undoBookFromCompleted(bookElement) {
  const incompleteBookshelfList = document.getElementById(UNCOMPLETED_READ_BOOK_ID);
  const bookTitle = bookElement.querySelector("h3").innerText;
  const bookAuthor = bookElement.querySelectorAll("p")[0].innerText;
  const bookYear = bookElement.querySelectorAll("p")[1].innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);

  const book = findBook(bookElement[BOOK_ITEM_ID]);
  book.isComplete = false;
  newBook[BOOK_ITEM_ID] = book.id;

  incompleteBookshelfList.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

function removeBook(bookElement) {
  const isDelete = window.confirm("Are you sure want to delete this book?");
    if (isDelete) {
        const bookPosition = findBookIndex(bookElement[BOOK_ITEM_ID]);
        books.splice(bookPosition, 1);

        bookElement.remove();
        updateDataToStorage();
        alert("Book deleted successfully");
    } else {
        alert("Book Failed to Delete");
    }
}

function searchBook() {
  const searchBook = document.getElementById("searchBookTitle");
  const filter = searchBook.value.toUpperCase();
  const bookItem = document.querySelectorAll("section.bookShelf > .bookList > .book_item");
  for (let i = 0; i < bookItem.length; i++) {
      txtValue = bookItem[i].textContent || bookItem[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          bookItem[i].style.display = "";
      } else {
          bookItem[i].style.display = "none";
      }
  }
}

function checkButton() {
  const span = document.querySelector("span");
  if (inputBookIsComplete.checked) {
      span.innerText = "Reading is Finished";
  } else {
      span.innerText = "Not yet Reading";
  }
}
