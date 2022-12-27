const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { BookFilter } from '../cmps/book-filter.jsx';
import { BookList } from '../cmps/book-list.jsx';
import { bookService } from "../services/book.service.js"
import { UserMsg } from '../cmps/user-msg.jsx';

export function BookIndex() {
    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [books, setBooks] = useState([])
    const [userMsg, setUserMsg] = useState('')

    useEffect(() => {
        setIsLoading(true)
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(booksToUpdate => {
            setBooks(booksToUpdate)
            setIsLoading(false)
        })
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            const updatedBooks = books.filter(book => book.id !== bookId)
            setBooks(updatedBooks)
            flashMsg(`Book ${bookId} removed!`)
        })
    }

    function flashMsg(msg) {
        setUserMsg(msg)
        setTimeout(() => {
            setUserMsg('')
        }, 3000)
    }

    return <section className="book-index">
        {userMsg && <UserMsg msg={userMsg} />}
        <div>
            <h1 className="books-title">Library</h1>
            <BookFilter onSetFilter={onSetFilter} />
            <Link className="book-edit-btn btn" to="/book/edit" >Add book</Link>
            {!isLoading && <BookList books={books} onRemoveBook={onRemoveBook} />}
        </div>
        {isLoading && <img className="loader-svg" src="/assets/svg-loaders/ball-triangle.svg" />}
        {!books.length && <h2>No books to show, please add book</h2>}
        {console.log(books)}

    </section>
}