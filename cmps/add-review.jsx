const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React
import { bookService } from "../services/book.service.js";


export function AddReview() {
    const { bookId } = useParams()
    const [reviewToAdd, setReviewToAdd] = useState(bookService.getEmptyReview())

    function handelChange({ target }) {
        const { value, name: field } = target
        setReviewToAdd((prevReviewToAdd) => ({ ...prevReviewToAdd, [field]: value }))
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        bookService.addReview(bookId, reviewToAdd)
    }
    console.log(reviewToAdd);
    return <section className="add-review">
        <h1>Shalom m Add review</h1>
        <form onSubmit={onSaveReview} className="add-review-form">
            <label htmlFor="name">Full Name</label>
            <input name="name" id="name" type="text" onChange={handelChange} />

            <label htmlFor="rate">Rate</label>
            <input name="rate" id="rate" type="number" onChange={handelChange} />

            <label htmlFor="name">Review</label>
            <textarea name="review" onChange={handelChange}></textarea>
            <button>Save</button>
        </form>

    </section>

}