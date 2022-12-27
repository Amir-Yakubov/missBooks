const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

import { bookService } from "../services/book.service.js";
import { AddReview } from "./add-review.jsx";
import { ReviewsList } from "./reviews-list.jsx";

export function BookReviews() {
    const { bookId } = useParams()
    const [book, setBook] = useState(null)
    const [isWritingReview, setIsWritingReview] = useState(false)
    const [delReview, setDelReview] = useState(false)
    console.log(bookId)

    function onDelReview(reviewId) {
        bookService.delReview(bookId, reviewId).then(() => {
            setDelReview(true)
        })

    }

    useEffect(() => {
        bookService.get(bookId).then((book) => {
            setBook(book)
        })
    }, [isWritingReview, delReview])


    return <section className="book-reviews">
        <h3>reviews</h3>
        {/* {!book || !book.reviews.lenght && <span>No reviews yet..</span>} */}
        {book && book.reviews && <ReviewsList book={book} onDelReview={onDelReview} />}
        <AddReview setIsWritingReview={setIsWritingReview} />
    </section>
}