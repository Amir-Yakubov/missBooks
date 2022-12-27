const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React
import { bookService } from "../services/book.service.js";


export function AddReview({ setIsWritingReview }) {
    const { bookId } = useParams()
    const [reviewToAdd, setReviewToAdd] = useState(bookService.getEmptyReview())
    const [isWriteReview, setIsWriteReview] = useState(false)

    function handelChange({ target }) {
        const { value, name: field } = target
        setReviewToAdd((prevReviewToAdd) => ({ ...prevReviewToAdd, [field]: value }))
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        // setReviewToAdd(bookService.getEmptyReview())
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
            <label className="add-review-label" htmlFor="name">Name</label>
            <input className="add-review-input" name="name" id="name" type="text" onChange={handelChange} />

            <label className="add-review-label" htmlFor="rate">Rating</label>
            <input
                className="add-review-input"
                name="rate"
                id="rate"
                type="range"
                min="1"
                max="5"
                firstvalue="5"
                value={reviewToAdd ? reviewToAdd.rate : "5"}
                title={reviewToAdd ? reviewToAdd.rate : "5"}
                onChange={handelChange}
            />

            <label className="add-review-label" htmlFor="readAt">Read at</label>
            <input className="add-review-label" type="date" id="readAt" name="readAt" onChange={handelChange} />

            <label className="add-review-label" htmlFor="name">Review</label>
            <textarea className="add-review-input-box" name="review" onChange={handelChange}></textarea>
            <button>Save</button>
            <button type="button" onClick={() => setIsWriteReview(false)}>Close</button>

        </form>}

    </section>

}
