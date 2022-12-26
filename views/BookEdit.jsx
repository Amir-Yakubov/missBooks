import { bookService } from "../services/book.service.js"

const { useState } = React

export function BookEdit() {
    const [bookToEdit, SetBookToEdit] = useState(bookService.getEmptyBook())
    console.log(bookToEdit);

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
            console.log('saved book', book);
        })
    }
    let price = bookToEdit.listPrice.amount
    return <section className="book-edit">

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

            <button>Save</button>
            <button type="button">Cancel</button>
            {/* 
            <input type="file"
                name="image"
                id="image"
                // value={bookToEdit.thumbnail}
                onChange={handelChange} 
                /> */}
        </form>
    </section>
}