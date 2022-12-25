const { useState } = React

import { About } from './views/about.jsx'
import { BookIndex } from './views/book-index.jsx'
import { Home } from './views/home.jsx'

export function App() {

    const [page, setPage] = useState('books')

    return <section className="app">
        <header className="app-header">
            <h1>My App</h1>
            <nav className="app-nav">
                <a href="#" onClick={() => setPage('home')}>Home</a> |
                <a href="#" onClick={() => setPage('about')}>About</a> |
                <a href="#" onClick={() => setPage('books')}>Books</a>
            </nav>
        </header>
        <main>
            {page === 'home' && <Home />}
            {page === 'about' && <About />}
            {page === 'books' && <BookIndex />}
        </main>
    </section>
}