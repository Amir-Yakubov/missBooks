import { DataTableRow } from "./data-table-row.jsx"

// const { useState, useEffect } = React

export function DataTable({ books }) {

    return <table border="1">
        <thead>
            <tr>
                {/* <th>Id</th> */}
                <th>Img</th>
                <th>Title</th>
                <th>Price</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
            {books.map(book => <DataTableRow key={book.id} book={book} />)}
        </tbody>
    </table>
}
