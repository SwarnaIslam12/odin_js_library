const myLibrary = [];
let tempBook;
function Book(props) {
  this.id = props.id || Date.now();
  this.title = props.title;
  this.author = props.author;
  this.page = props.page;
  this.isRead = props.isRead || false;
}
const book1 = new Book({
  title: "Opekkha",
  author: "Humayun Ahmed",
  page: 100,
  isRead: true,
  id: 1,
});
const book2 = new Book({
  title: "Inferno",
  author: "Dan Brown",
  page: 100,
  isRead: true,
  id: 2,
});
const book3 = new Book({
  title: "Man's Search for Meaning",
  author: "Viktor",
  page: 100,
  isRead: false,
});

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

function addBookToLibrary() {
  if (tempBook !== null) {
    myLibrary.push(tempBook);
    displayBooks();
  }
  tempBook = null;
}

function handleFormSubmit(event) {
  event.preventDefault();

  var bookTitle = document.getElementById("bookTitle").value;
  var bookAuthor = document.getElementById("bookAuthor").value;
  var bookPage = document.getElementById("bookPage").value;

  tempBook = new Book({ title: bookTitle, author: bookAuthor, page: bookPage });
  addBookToLibrary();
  var myModal = bootstrap.Modal.getInstance(
    document.getElementById("addBookModal")
  );
  myModal.hide();
}

function displayBooks() {
  const bookSection = document.getElementById("book-section");
  while (bookSection.firstChild) {
    bookSection.lastChild.remove();
  }
  myLibrary.forEach((book) => {
    const el = document.createElement("div");
    const title = document.createElement("h4");
    const author = document.createElement("h6");
    const page = document.createElement("p");
    const boldText = document.createElement("b");

    title.textContent = book.title;
    author.textContent = book.author;

    boldText.textContent = "Page size: ";
    page.append(boldText);
    page.append(document.createTextNode(book.page));

    el.classList.add("individual-book");
    el.style.position = "relative";

    el.append(title);
    el.append(author);
    el.append(page);

    const switchCode = `  
<div class="form-check form-switch">  
  <input class="form-check-input ${
    book.id
  }" type="checkbox" role="switch" id="flexSwitchCheckChecked" ${
      book.isRead === true ? "checked" : ""
    }>  
   <b>Complete reading</b>
</div>  
`;
    const deleteBtn = `<div style="position:absolute; top:5px; right:5px">
    <img type="button" class="trash-btn" src="./assets/trash.png" width="20px" id="${book.id}"/>
    </div>`;
    el.insertAdjacentHTML("beforeend", switchCode);

    el.insertAdjacentHTML("beforeend", deleteBtn);

    bookSection.append(el);
  });
}
document.getElementById("add-btn").addEventListener("click", (e) => {
  var myModal = new bootstrap.Modal(document.getElementById("addBookModal"));
  myModal.show();
});
document.getElementById("book-section").addEventListener("change", (e) => {
  const targetClass = e.target.classList[0];
  if (targetClass === "form-check-input") {
    const elementId = e.target.classList[1];

    const ind = myLibrary.indexOf(
      myLibrary.filter((book) => book.id == elementId)[0]
    );
    myLibrary[ind].isRead = !myLibrary[ind].isRead;
    displayBooks();
  }
});
document.getElementById("book-section").addEventListener("click", (e) => {
  const targetClass = e.target.classList[0];
  if (targetClass === "trash-btn") {
    const elementId = e.target.id;

    const ind = myLibrary.indexOf(
      myLibrary.filter((book) => book.id == elementId)[0]
    );
    myLibrary.splice(ind, 1);
    displayBooks();
  }
});
displayBooks();
