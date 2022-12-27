const { useState, Fragment } = React

export function ReviewsList({ book, onDelReview }) {

    const [isExpanded, setIsExpanded] = useState(false)

    function onExpandPreview() {
        setIsExpanded(!isExpanded)
    }

    return <Fragment>
        <section className="reviews-list-container">
            {book.reviews.map((review, i) => {
                return <ul key={i} className="reviews-list">
                    <button onClick={() => onDelReview(review.id)}>x</button>
                    <li onClick={onExpandPreview}>{review.name} Rate {review.rate}</li>
                    <li hidden={!isExpanded}>{review.review}</li>
                </ul>
            })}
        </section>
    </Fragment>
}
