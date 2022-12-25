
export function BookPreview({ book }) {

    return <article className="book-preview">
        <h2>Book title: {book.title}</h2>
        <h3>Book Price: {book.price}</h3>
        <img src={`assets/img/${book.title}.png`} />
    </article>
}