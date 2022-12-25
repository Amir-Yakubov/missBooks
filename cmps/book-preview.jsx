
export function BookPreview({ book }) {
    return <article className="book-preview">
        <h2 className="book-card-title">{book.title}</h2>
        <h3>Price: {book.listPrice.currencyCode} {book.listPrice.amount}</h3>
        <img src={book.thumbnail} />
    </article>
}