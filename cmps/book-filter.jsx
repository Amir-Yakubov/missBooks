const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"


export function BookFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="book-filter">
        <form onSubmit={onSubmitFilter}>
            {/* <label htmlFor="title">Search</label> */}
            <input type="text"
                id="title"
                name="title"
                placeholder="filter by title"
                value={filterByToEdit.txt}
                onChange={handleChange}
            />

            {/* <label htmlFor="price">Price</label> */}
            <input type="number"
                id="price"
                name="price"
                placeholder="filter by max price"
                value={filterByToEdit.minSpeed}
                onChange={handleChange}
            />

            <button className="filter-btn">Filter</button>
        </form>

    </section>
}