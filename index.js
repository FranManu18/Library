function book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return !read
      ? `${this.title} by ${this.author} , ${pages} pages, not read yet`
      : `${this.title} by ${this.author} , ${pages} pages, i readed`;
  };
}

const d = document;

d.addEventListener("DOMContentLoaded", () => {
  openForm();
  addBookToLibrary();
});

function openForm() {
  const $button = d.querySelector(".addBook");

  $button.addEventListener("click", () => {
    const $form = d.querySelector(".formulario");
    $form.classList.remove("hidden");
    $button.classList.add("hidden");
  });
}
const myLibrary = [];

function addBookToLibrary() {
  const $button = d.querySelector(".addBook"),
    $form = d.querySelector(".formulario");

  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newBook = new book();
    formData.forEach((value, key) => {
      if (key === "read") {
        newBook[key] = value == 1;
      } else {
        newBook[key] = value;
      }
    });

    myLibrary.push(newBook);

    $form.classList.add("hidden");
    $button.classList.remove("hidden");

    printOnPage();
  });
}

function printOnPage() {
  const $table = d.querySelector(".books");
  $table.innerHTML = `<tr>
        <th>Titulo</th>
        <th>Autor</th>
        <th>Paginas</th>
        <th>Leido</th>
      </tr>`;
  myLibrary.forEach((book, index) => {
    const booktr = d.createElement("tr");
    booktr.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.pages}</td>
          <td>${book.read ? "Si" : "No"}</td>
      <td><button class="toggle-read" data-index="${index}">${
      book.read ? "Marcar como no leído" : "Marcar como leído"
    }</button></td>
    <td><button class="delete" data-index="${index}">borrar libro</button></td>
          `;
    $table.appendChild(booktr);
  });

  const $toggleButtons = d.querySelectorAll(".toggle-read"),
    $deleteButtons = d.querySelectorAll(".delete");

  $toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const bookIndex = button.getAttribute("data-index");
      toggleChangeStatus(bookIndex);
    });
  });

  $deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let confirmacion = confirm("Estas seguro que deseas borrar este libro?");
      if (confirmacion) {
        const bookIndex = button.getAttribute("data-index");
        deleteBook(bookIndex);
      }
    });
  });
}

function toggleChangeStatus(index) {
  if (myLibrary[index].read) {
    myLibrary[index].read = false;
  } else {
    myLibrary[index].read = true;
  }
  printOnPage();
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  printOnPage();
}
