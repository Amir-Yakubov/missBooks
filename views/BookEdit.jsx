const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { eventBusService, showSuccessMsg } from "../services/event-bus.service.js"

export function BookEdit() {
    const [bookToEdit, SetBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()
    console.log(bookToEdit)
    console.log(bookId)

    useEffect(() => {
        if (!bookId) return
        loadBook()

    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then((book) => SetBookToEdit(book))
            .catch((err) => {
                console.log('Could not load book', err)
                navigate('/book')
            })
    }

    function handelChange({ target }) {
        let { value, name: field } = target
        SetBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function handelPriceChange({ target }) {
        let { value, type } = target
        if (type !== 'number') return
        value = +value
        // let field = listPrice.amount
        SetBookToEdit((prevBook) => ({ ...prevBook, listPrice: { amount: value, currencyCode: 'EUR', isOnSale: false } }))
    }

    function onSaveCar(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit).then((book) => {
            console.log('saved book', book)
            showSuccessMsg('Book saved')
            navigate('/book')
        })
    }
    let price = bookToEdit.listPrice.amount
    return <section className="book-edit">
        <h1>{bookToEdit.id ? `Edit book ${bookToEdit.title}` : 'Add book'}</h1>
        {bookToEdit.id && <img className="img-book-detalis" src={bookToEdit.thumbnail}></img>}
        <form className="book-edit-form" onSubmit={onSaveCar}>
            <label htmlFor="title">Title</label>
            <input type="text"
                name="title"
                id="title"
                placeholder="Enter book title..."
                value={bookToEdit.title}
                onChange={handelChange}
            />

            <label htmlFor="listPrice">Price</label>
            <input type="number"
                name="listPrice"
                id="listPrice"
                placeholder="Enter book price..."
                value={price}
                onChange={handelPriceChange}
            />

            <button>{bookToEdit.id ? 'Edit' : 'Save'}</button>
            <button type="button" onClick={() => navigate('/book')}>Cancel</button>

        </form>
    </section>
}