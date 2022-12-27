const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { BookReviews } from "../cmps/book-reviews.jsx"
import { bookService } from "../services/book.service.js"

export function BookDetails() {
    const params = useParams()
    const navigate = useNavigate()
    const [book, setBook] = useState()

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(params.bookId)
            .then((book) => setBook(book))
            .catch((err) => {
                console.log('Could not load book', err)
                navigate('/book')
            })
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

    return <section className="book-details">
        <h1 className="desc-title">{book.title}</h1>
        <h2>{book.subtitle}</h2>
        <p className="author-and-date">{book.authors[0]} {book.publishedDate} {isBookVintage()}</p>
        <h3>{book.listPrice.currencyCode} <span className={getPriceColor()}>{book.listPrice.amount}</span></h3>
        <img className="img-book-detalis" src={book.thumbnail} />
        <p className="description">{book.description}</p>
        <p className="categories">Categories: {book.categories[0]}, {book.categories[1]}</p>
        <p className="language">Language {book.language}</p>
        <p className="Pages">{getPagesRate()} {book.pageCount} Pages</p>
        {book.listPrice.isOnSale && <p className="available-in-stock">On Sale!!</p>}
        <BookReviews />

        <button onClick={onGoBack}>Go Back</button>
        <Link to={`/book/edit/${book.id}`}>Edit Book</Link>
    </section>
}