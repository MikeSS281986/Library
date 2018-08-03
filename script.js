let myLibrary = [];
let bId = 0;
let id;

function addToLibrary(bookInfo) {
  let bookInfoArray = [];
  bookInfoArray.push(bookInfo);
  myLibrary.push(bookInfoArray);
  return myLibrary;
}

function Book(bookId, bookTitle, bookAuthor, bookPages) {
  this.bookId = bookId;
  this.bookTitle = bookTitle;
  this.bookAuthor = bookAuthor;
  this.bookPages = bookPages;
}

document.getElementById('submit').addEventListener("click", function (e) {
  e.preventDefault() //prevent submit button from reloading page without adding data
  let form = document.getElementsByTagName('FORM')[0];
  let yes = document.getElementById('yes');
  let no = document.getElementById('no');
  let table = document.getElementById("myTable");

  //Date Variables to grab current date
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0.
  let yyyy = today.getFullYear();

  //get values entered in form
  getRowId();
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  today = mm + '/' + dd + '/' + yyyy;
  //Creates a new book entry with values given from form
  const book = new Book(id, title, author, pages);

  //Add Book entry to the collection
  addToLibrary(book);
  // console.log(myLibrary);
  // console.log(book.bookTitle);

  //Create delete button to delete book row
  let deleteBook = document.createElement('input');
  deleteBook.type = "button";
  deleteBook.className = "delete";
  deleteBook.value = "Delete";
  deleteBook.onclick = function (e) {
    (this).closest('tr').remove();
    myLibrary.splice(e, 1);
    bId = 0;
    let rowId = document.getElementsByClassName('rowId');
    for (let i = 0; i < rowId.length; i++) {
      getRowId();
      rowId.item(i).innerHTML = id;
    }
  }

  //  Create dropdown for person to update if book was read or not.
  let array = ["No", "Yes"];
  let readDropdown = document.createElement('select');
  readDropdown.className = "dropdown-list";
  for (let i = 0; i < array.length; i++) {
    let options = document.createElement("option");
    options.value = array[i];
    options.text = array[i];
    readDropdown.appendChild(options);
  }
  //Log if book has not been read or not;
  if (no.checked) {
    readDropdown.value = 'No';
  } else if (yes.checked) {
    readDropdown.value = "Yes";
  }
  //Insert row and insert cells into row
  let row = table.insertRow(-1);
  let cell0 = row.insertCell(0);
  cell0.className = 'rowId';
  let cell1 = row.insertCell(1);
  let cell2 = row.insertCell(2);
  let cell3 = row.insertCell(3);
  let cell4 = row.insertCell(4);
  let cell5 = row.insertCell(5);
  let cell6 = row.insertCell(6);

  //Populate cells with data from book upload form;
  cell0.innerHTML = book.bookId;
  cell1.innerHTML = book.bookTitle;
  cell2.innerHTML = book.bookAuthor;
  cell3.innerHTML = book.bookPages;
  cell4.appendChild(readDropdown);
  cell5.appendChild(deleteBook);
  cell6.innerHTML = today;
  //cell5.innerHTML = '<input type="checkbox" id="delete' + id + '">';

  //reset form for new entries
  form.reset();
})

function getRowId() {
  id = bId += 1; //make index of page inserted;
  return id;
}