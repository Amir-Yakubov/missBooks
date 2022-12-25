
export function BookDetails({ book, onGoBack }) {

    let readingRate
    if (book.pageCount > 500) readingRate = 'Serious Reading'
    else if (book.pageCount > 200) readingRate = 'Descent Reading'
    else if (book.pageCount < 100) readingRate = 'Light Reading'

    let publishRate = (2023 - book.publishedDate > 10) ? 'Vintage' : 'New'
    let priceColor
    if (book.listPrice.amount < 20) priceColor = 'price green'
    else if (book.listPrice.amount > 150) priceColor = 'price red'

    return <section className="book-details">
        <h1 className="desc-title">{book.title}</h1>
        <h2>{book.subtitle}</h2>
        <p className="author-and-date">{book.authors[0]} {book.publishedDate} {publishRate}</p>
        <h3>Price {book.listPrice.currencyCode} <span className={priceColor}>{book.listPrice.amount}</span></h3>
        <img className="img-book-detalis" src={book.thumbnail} />
        <p className="description">{book.description}</p>
        <p className="categories">Categories: {book.categories[0]}, {book.categories[1]}</p>
        <p className="language">Language {book.language}</p>
        <p className="Pages">{readingRate} {book.pageCount} Pages</p>
        {book.listPrice.isOnSale && <p className="available-in-stock">On Sale!!</p>}
        <button onClick={onGoBack}>Go Back</button>
    </section>
}