const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React
import { bookService } from "../services/book.service.js";


export function AddReview({ setIsWritingReview }) {
    const { bookId } = useParams()
    const [reviewToAdd, setReviewToAdd] = useState(null)
    const [isWriteReview, setIsWriteReview] = useState(false)

    function handelChange({ target }) {
        const { value, name: field } = target
        setReviewToAdd((prevReviewToAdd) => ({ ...prevReviewToAdd, [field]: value }))
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        setReviewToAdd(bookService.getEmptyReview())
        bookService.addReview(bookId, reviewToAdd).then(savedBook => {
            setIsWriteReview(false)
            setIsWritingReview(false)
        })
    }

    function onAddReview() {
        setIsWriteReview(true)
        setIsWritingReview(true)
    }

    console.log(reviewToAdd);
    return <section className="add-review">

        {!isWriteReview && <button onClick={onAddReview}>Add review</button>}
        {isWriteReview && <form onSubmit={onSaveReview} className="add-review-form">
            <label className="add-review-label" htmlFor="name">Full Name</label>
            <input className="add-review-input" name="name" id="name" type="text" onChange={handelChange} />

            <label className="add-review-label" htmlFor="rate">Rate</label>
            <input className="add-review-input" name="rate" id="rate" type="number" onChange={handelChange} />

            <label className="add-review-label" htmlFor="name">Review</label>
            <textarea className="add-review-input-box" name="review" onChange={handelChange}></textarea>
            <button>Save</button>
            <button type="button" onClick={() => setIsWriteReview(false)}>Close</button>
        </form>}

    </section>

}