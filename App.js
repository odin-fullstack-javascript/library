// Elements

const appContainer = document.getElementById('App')
const bookContainer = appContainer.querySelector('.book-container')


let myLibrary = []

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

// FUNCTIONS

const createBook = (bookTitle, bookAuthor, bookPages, bookRead) => {
  const newBook = Object.create(Book.prototype)

  newBook.title = bookTitle
  newBook.author = bookAuthor
  newBook.pages = bookPages
  newBook.read = bookRead

  myLibrary.push(newBook)
}

const removeBook = (id) => {
  myLibrary.splice(id, 1)
}

const createBookCards = () => {
  return myLibrary.map((book, id) => (
    /* html */`
      <div class="book-card">
        <h1 class="book-card--title">${book.title}</h1>
        <p class="book-card--author">${book.author}</p>
        <p class="book-car--pages">${book.pages}</p>
        <button id="${id}" delete>delete</button>
      </div>
    `
  ))
}

const renderCards = () => {
  bookContainer.innerHTML = createBookCards().toString().replaceAll(',', '')
}

// Events

bookContainer.addEventListener('click', (event) => {
  const target = event.target

  if (target.hasAttribute('delete')) {
    removeBook(target.getAttribute('id'))
    renderCards()
  }
})

createBook('La Paradise', 'John Fuga', 90, true)
createBook('In the River', 'Palsulo Trade', 900, false)
createBook('El Sable', 'Saruman Kanino', 120, false)

renderCards()

