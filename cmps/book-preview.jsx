
export function BookPreview({ book }) {
    return <article className="book-preview">
        <h2>Book title: {book.title}</h2>
        <h3>Book Price: {book.listPrice.currencyCode} {book.listPrice.amount}</h3>
        <img src={book.thumbnail} />
    </article>
}