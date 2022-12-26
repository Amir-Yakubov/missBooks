const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { BookFilter } from '../cmps/book-filter.jsx';
import { BookList } from '../cmps/book-list.jsx';
import { BookDetails } from './book-details.jsx';

import { bookService } from "../services/book.service.js"
import { UserMsg } from '../cmps/user-msg.jsx';

export function BookIndex() {

    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [books, setBooks] = useState([])
    const [userMsg, setUserMsg] = useState('')

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(booksToUpdate => {
            setBooks(booksToUpdate)
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
            <BookList books={books} onRemoveBook={onRemoveBook} />
        </div>
        {console.log(books)}
        {!books.length && <img className="loader-svg" src="/assets/svg-loaders/ball-triangle.svg" />}

    </section>
}