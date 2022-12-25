import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                books = books.filter(car => regex.test(car.vendor))
            }
            if (filterBy.minSpeed) {
                books = books.filter(car => car.maxSpeed >= filterBy.minSpeed)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
    // return axios.get(CAR_KEY, carId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', price = '') {
    return { id: '', title, price }
}

function getDefaultFilter() {
    return { title: '', price: '' }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            {
                "id": "OXeMG8wNskc",
                "title": "metus hendrerit",
                "description": "placerat nisi sodales suscipit tellus",
                "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/8/89/Book_stub_img.svg",
                "listPrice": {
                    "amount": 109,
                    "currencyCode": "EUR",
                    "isOnSale": false
                }
            },
            {
                "id": "OXeMG123skc",
                "title": "Amirs book",
                "description": "mashu mashu mashu",
                "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/8/89/Book_stub_img.svg",
                "listPrice": {
                    "amount": 29,
                    "currencyCode": "EUR",
                    "isOnSale": false
                }
            }
        ]

        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, maxPrice = 250) {
    const car = getEmptyBook(title, maxPrice)
    car.id = utilService.makeId()
    return book
}