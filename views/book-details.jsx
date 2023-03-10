const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { showErrorMsg } from "../services/event-bus.service.js"
import { bookService } from "../services/book.service.js"

import { BookReviews } from "../cmps/book-reviews.jsx"
import { LongTxt } from "../cmps/long-txt.jsx"

export function BookDetails() {

    const [nextBookId, setNextBookId] = useState(null)
    const [prevBookId, setPrevtBookId] = useState(null)
    const [book, setBook] = useState()
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
            .then((book) => setBook(book))
            .catch((err) => {
                console.log('Could not load book', err)
                showErrorMsg('Could not load book')
                navigate('/book')
            })

        bookService.getNextBookId(bookId)
            .then(setNextBookId)

        bookService.getPrevBookId(bookId)
            .then(setPrevtBookId)
    }

    function getPagesRate() {
        if (book.pageCount > 500) return 'Serious Reading'
        else if (book.pageCount > 200) return 'Descent Reading'
        else if (book.pageCount < 100) return 'Light Reading'
        else return ''
    }

    function getPriceColor() {
        if (book.listPrice.amount < 20) return 'price green'
        else if (book.listPrice.amount > 150) return 'price red'
    }

    function isBookVintage() {
        return (2023 - book.publishedDate > 10) ? 'Vintage' : 'New'
    }

    function onGoBack() {
        navigate('/book')
    }

    if (!book) return <img className="loader-svg" src="/assets/svg-loaders/ball-triangle.svg" />
    console.log('nextBookId', nextBookId)
    return <section className="book-details">
        <h1 className="desc-title">{book.title}</h1>
        <h2>{book.subtitle}</h2>
        <p className="author-and-date">{book.authors[0]} {book.publishedDate} {isBookVintage()}</p>
        <h3>{book.listPrice.currencyCode} <span className={getPriceColor()}>{book.listPrice.amount}</span></h3>
        <img className="img-book-detalis" src={book.thumbnail} />
        {/* <p className="description">{book.description}</p> */}
        <LongTxt txt={book.description} length={100} />
        <p className="categories">Categories: {book.categories[0]}, {book.categories[1]}</p>
        <p className="language">Language {book.language}</p>
        <p className="Pages">{getPagesRate()} {book.pageCount} Pages</p>
        {book.listPrice.isOnSale && <p className="available-in-stock">On Sale!!</p>}
        <BookReviews />

        <button onClick={onGoBack}>Go Back</button>
        <Link to={`/book/edit/${book.id}`}>Edit Book</Link>
        <hr></hr>

        <Link to={`/book/${prevBookId}`}> ?????? </Link>
        <Link to={`/book/${nextBookId}`}> ?????? </Link>
    </section>
}