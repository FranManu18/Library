const d=document;

class Book{
  constructor(tittle,author,pages,read){
    this.id=crypto.randomUUID();
    this.tittle=tittle;
    this.author=author;
    this.pages=pages;
    this.read=read;
    this.info = `The ${this.tittle} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
  }

  changeRead(){
    this.read=!this.read;
  }
}



class Library{
  constructor(){
    this.books=[];
  }
  
  add(book){
    this.books.push(book);
  }
  
  delete(index){
    this.books.splice(index, 1);
}


  getBook(index){
    if (this.books[index] != null){
      return this.books[index];
    }
  }
  
  getBooks(){
    return this.books;
  }
  
}

const spiderman= new Book('Spiderman','Stan lee','100',true);
const library=new Library;
library.add(spiderman);

function mostrarLibros(){
    const $table = d.querySelector(".books");
    $table.innerHTML = `<tr>
    <th>Titulo</th>
    <th>Autor</th>
    <th>Paginas</th>
    <th>Leido</th>`;

    library.getBooks().forEach((book,index)=>{
        const booktr=d.createElement("tr");
        booktr.innerHTML=`
        <td>${book.tittle}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.read ? "Si" : "No"}</td>
        <td><button class="delete" data-index="${index}">borrar libro</button></td>
        <td><button class="status-read" data-index="${index}">Estado Leer</button></td>
        `
        $table.appendChild(booktr);
    })

    const $deleteButton=d.querySelectorAll(".delete")
    $deleteButton.forEach((button)=>{
        button.addEventListener("click",()=>{
            let confirmation= confirm("¿Estas seguro que queres borrar ese libro?");
            if (confirmation){
                const indexButton= button.getAttribute("data-index");
                library.delete(indexButton);
                mostrarLibros();
            }
        })
    })

    const $readButton=d.querySelectorAll(".status-read")
    $readButton.forEach((button) => {
        button.addEventListener("click", () =>{
            const indexButton=button.getAttribute("data-index");
            library.getBook(indexButton).changeRead();
            mostrarLibros();
        })
    })
};
mostrarLibros();



function agregarLibro(){
    const $button = d.querySelector(".addbook"),
    $form=d.querySelector(".formulario");

    $form.addEventListener("submit",(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);

        const tittle = formData.get("tittle");
        const author = formData.get("author");
        const pages = formData.get("pages");
        const read = formData.get("read") === "1";

        const newBook = new Book(tittle, author, pages, read);

        library.add(newBook);
        $form.classList.add("hidden");
        $button.classList.remove("hidden");
        mostrarLibros();
        $form.reset();
    });
}

function openForm(){
    const $button = d.querySelector(".addbook");
    $button.addEventListener("click", ()=>{
        const $form =d.querySelector(".formulario")
        $form.classList.remove("hidden");
        $button.classList.add("hidden");
    })
}

d.addEventListener("DOMContentLoaded", () =>{
    mostrarLibros();
    agregarLibro();
    openForm();
})
