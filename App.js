// Elements

const appContainer = document.getElementById('App')
const bookContainer = appContainer.querySelector('.book-container')
const formContainer = appContainer.querySelector('.form-container')

const addBookButton = appContainer.querySelector('.add-book')


let myLibrary = []

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

// FUNCTIONS

// this function appends a fragment in the DOM,
// this replace innerHTML
function renderFragment(htmlString, containerElement) {
  const fragment = document.createDocumentFragment()
  const parser = new DOMParser()
  const newNode = parser.parseFromString(htmlString, "text/html")
  
  const elements = newNode.documentElement.querySelectorAll('div')
  elements.forEach(element => {
    fragment.appendChild(element)
  })
  containerElement.innerHTML = ''
  containerElement.append(fragment)
}

const createBook = (bookTitle, bookAuthor, bookPages, bookRead) => {
  const newBook = Object.create(Book.prototype)

  newBook.title = bookTitle
  newBook.author = bookAuthor
  newBook.pages = bookPages
  newBook.read = bookRead

  myLibrary.push(newBook)
}

const removeBook = (id) => {
  bookContainer.innerHTML = ''
  myLibrary.splice(id, 1)
}

const createBookCards = () => {
  return myLibrary.map((book, id) => (
    /* html */`
      <div class="book-card">
        <h1 class="book-card--title">${book.title}</h1>
        <p class="book-card--author"><strong>Author:</strong> ${book.author}</p>
        <p class="book-card--pages"> <strong>Pages:</strong>  ${book.pages}</p>
        <p class="book-card--read" read="${book.read}">${book.read ? 'Read' : 'Not readed yet'}</p>
        <button id="${id}" delete onclick="removeBookEvent(event)"> <i class="fas fa-trash"></i> delete</button>
      </div>
    `
  ))
}


const renderCards = () => {
  const cardString = createBookCards().join()
  renderFragment(cardString, bookContainer)
}


// Events
const removeBookEvent = (event) => {
  const target = event.target

  removeBook(target.getAttribute('id'))
  renderCards()
}

// The add book button opens the modal with the form
addBookButton.addEventListener('click', () => {
  showModal()
  console.log('book added')  
})

// Submit handler for creating a new book
const onSubmitForm = (event) => {
  event.preventDefault()
  const formElements = event.srcElement.elements

  createBook(
    formElements.title.value, 
    formElements.author.value, 
    formElements.pages.value,
    formElements.read.checked
  )

  renderCards()
  closeModal()
}

// form modal event handler
formContainer.addEventListener('click', (event) => {
  const target = event.target
  if(target.hasAttribute('modal') || 
     target.hasAttribute('close')) {
    closeModal()
  }
})

// MODAL CLOSE AND SHOW FUNCTIONS

const showModal = () => {
  formContainer.style.display = 'grid'
}

const closeModal = () => {
  formContainer.style.display = 'none'
}



createBook('The last guardian', 'Ashi Blade', 90, true)
createBook('In the River', 'Sofos Trade', 900, false)
createBook('El Sable', 'Saruman Kanino', 120, false)








renderCards()

