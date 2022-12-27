const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

export function DataTableRow({ book }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const { listPrice } = book
    return <Fragment>
        <tr onClick={() => {
            setIsExpanded(!isExpanded)
        }}>
            {/* <td>{book.id}</td> */}
            <td><img src={book.thumbnail} /></td>
            <td>{book.title}</td>
            <td>{listPrice.amount}</td>
            <td>
                <Link to={`/book/${book.id}`}>Details</Link> |
                <Link to={`/book/edit/${book.id}`}>Edit</Link>
            </td>
        </tr>
        <tr hidden={!isExpanded}>
            <td colSpan="3">
                <img src={`https://robohash.org/${book.id}`} style={{ maxWidth: '50px' }} />
                <p>Lorem ipsum dolor</p>
            </td>
        </tr>
    </Fragment>

}
