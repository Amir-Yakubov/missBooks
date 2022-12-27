const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

import { bookService } from "../services/book.service.js";
import { AddReview } from "./add-review.jsx";
import { ReviewsList } from "./reviews-list.jsx";

export function BookReviews() {
    const { bookId } = useParams()
    const [book, setBook] = useState(null)
    console.log(bookId)

    useEffect(() => {
        bookService.get(bookId).then((book) => {
            setBook(book)
        })
    }, [])

    return <section className="book-reviews">
        <h2>shalom m book reviews</h2>
        <AddReview />
        {book && <ReviewsList book={book} />}
    </section>
}