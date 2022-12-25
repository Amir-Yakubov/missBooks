const { useState } = React

import { About } from './views/about.jsx'
import { BookIndex } from './views/book-index.jsx'
import { Home } from './views/home.jsx'

export function App() {

    const [page, setPage] = useState('books')

    return <section className="app main-layout">
        <header className="app-header main-layout full">
            <h1 className="logo">Miss Books</h1>
            <nav className="app-nav">
                <a href="#" className="nav-link home" onClick={() => setPage('home')}>Home</a> |
                <a href="#" className="nav-link" onClick={() => setPage('about')}>About</a> |
                <a href="#" className="nav-link" onClick={() => setPage('books')}>Books</a>
            </nav>
        </header>
        <main className="page-content">
            {page === 'home' && <Home />}
            {page === 'about' && <About />}
            {page === 'books' && <BookIndex />}
        </main>
    </section>
}