
const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import { AppHeader } from './cmps/app-header.jsx'
import { BookDetails } from './views/book-details.jsx'
import { BookIndex } from './views/book-index.jsx'
import { BookEdit } from './views/BookEdit.jsx'
import { Home } from './views/home.jsx'
import { About } from "./views/about.jsx"
import { AboutIndex } from "./cmps/about-index.jsx"
import { Team } from "./cmps/team.jsx"
import { Vision } from "./cmps/vision.jsx"
import { UserMsg } from './cmps/user-msg.jsx'

export function App() {


    return <Router>
        <section className="app main-layout">

            <AppHeader />

            <main className="page-content">
                <Routes>
                    <Route element={<Home />} path="/" />

                    <Route element={<About />} path="/about" >
                        <Route element={<AboutIndex />} path="/about" />
                        <Route element={<Team />} path="/about/team" />
                        <Route element={<Vision />} path="/about/vision" />
                    </Route>

                    <Route element={<BookIndex />} path="/book" />
                    <Route element={<BookEdit />} path="/book/edit" />
                    <Route element={<BookEdit />} path="/book/edit/:bookId" />
                    <Route element={<BookDetails />} path="/book/:bookId" />
                </Routes>

            </main>
            <UserMsg />
        </section>
    </Router>
}