const { NavLink } = ReactRouterDOM

export function AppHeader() {
    return <header className="app-header main-layout full">
        <div className="logo">Miss Books</div>
        <nav className="app-nav">

            <NavLink className="nav-link home" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/about">About</NavLink>
            <NavLink className="nav-link book" to="/book">Books</NavLink>

        </nav>
    </header>
}