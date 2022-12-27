
const { useRef, useState, useEffect } = React
const { Outlet, Link, NavLink } = ReactRouterDOM
import { DataTable } from "../cmps/data-table/data-table.jsx"
import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"


export function About() {

    const [cmpType, setCmpType] = useState('Hello')
    const [books, setBooks] = useState([])
    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then(setBooks)
    }


    const titleRef = useRef()
    const style = {
        backgroundColor: 'lightcoral',
        padding: '5px', margin: '5px'
    }

    return <section className="about">
        <h3 >We are all about Books!</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus modi, architecto suscipit iure doloremque minima deserunt exercitationem neque quidem, officia dolor earum quasi possimus quam iusto. Minus sequi aliquid praesentium?</p>

        <hr />
        <select onChange={ev => setCmpType(ev.target.value)}>
            <option>Hello</option>
            <option>GoodBye</option>
            <option>WelcomeBack</option>
        </select>
        <DynamicCmp name="Puk" cmpType={cmpType} />


        <nav>
            <Link to="/about">Index</Link> |
            <NavLink to="/about/team">Team</NavLink> |
            <NavLink to="/about/vision">Vision</NavLink>
        </nav>
        <div className="nested-route">
            <Outlet />
        </div>
        <hr />
        <DataTable books={books}></DataTable>

    </section>
}

function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'Hello':
            return <Hello {...props} />
        case 'GoodBye':
            return <GoodBye {...props} />
        case 'WelcomeBack':
            return <WelcomeBack {...props} />
    }
}

function Hello({ name }) {
    return <h1>Hello there {name}</h1>
}
function GoodBye({ name }) {
    return <h1>Bye {name}</h1>
}
function WelcomeBack({ name }) {
    return <h1>Welcome back {name}</h1>
}
