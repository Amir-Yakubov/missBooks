

export function ReviewsList({ book }) {



    if (!book.reviews) return
    return <section className="reviews-list-container">
        <h2>hello from reviews list</h2>

        {book.reviews.map((review, i) => {
            return <ul key={i} className="reviews-list">
                <li>{review.name}</li>,
                <li>{review.rate}</li>,
                <li>{review.review}</li>
            </ul>
        })}

    </section>
}