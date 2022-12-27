const { useState, useRef } = React


export function ReviewsList({ book, onDelReview }) {
    let [liClass, setLiClass] = useState('hidden')
    let isHidden = useRef(true)

    function onShowReview() {
        isHidden = !isHidden
        setLiClass(isHidden ? 'hidden' : '')
    }

    return <section className="reviews-list-container">
        {book.reviews.map((review, i) => {
            return <ul key={i} className="reviews-list">
                <button className="close-review-btn" onClick={() => onDelReview(review.id)}>x</button>
                <li className="main-li reviews-li" title="click to toggle review" onClick={onShowReview}>{review.name} {review.rate + '\u2605'}</li>
                <li className={`reviews-li ${liClass}`} >Reat at {review.readAt}</li>
                <li className={`reviews-li ${liClass}`} >{review.review}</li>
            </ul>
        })}
    </section>

}
