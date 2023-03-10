const { Link } = ReactRouterDOM

import { BookPreview } from "./book-preview.jsx";

export function BookList({ books, onRemoveBook }) {

    return <ul className="Book-list">
        {
            books.map(book => <li className="book-card" key={book.id}>
                <BookPreview book={book} />
                <div>
                    <button className="btn remove-btn" onClick={() => onRemoveBook(book.id)}>x</button>
                    {/* <button onClick={() => { }}>select</button> */}
                    <Link className="btn read-btn" to={`/book/${book.id}`}>Read more</Link>
                </div>
            </li>)
        }
    </ul>
}