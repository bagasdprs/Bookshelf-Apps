document.addEventListener('DOMContentLoaded', function() {
  const inputBook = document.getElementById('inputBook');
  const inputSearchBook = document.getElementById('searchBook');
  const inputBookIsComplete = document.getElementById('inputBookComplete');

  inputBook.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  inputSearchBook.addEventListener("keyup", function (event) {
    event.preventDefault();
    searchBook();
  });

  inputSearchBook.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBook();
  });

  inputBookIsComplete.addEventListener("input", function (event) {
    event.preventDefault();
    checkButton();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener('ondatasaved', () => {
  console.log("Book Saved Successfully");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});