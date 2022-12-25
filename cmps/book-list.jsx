import { BookPreview } from "./book-preview.jsx";

export function BookList({ books, onRemoveBook, onSelectBook }) {

    return <ul className="Book-list">
        {
            books.map(book => <li className="book-card" key={book.id}>
                <BookPreview book={book} />
                <div>
                    <button className="btn remove-btn" onClick={() => onRemoveBook(book.id)}>x</button>
                    <button className="btn read-btn" onClick={() => onSelectBook(book.id)}>read more</button>
                </div>
            </li>)
        }
    </ul>
}