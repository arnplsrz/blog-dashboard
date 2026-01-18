import { Link, NavLink } from "react-router"

function Home() {

  return (
    <main>
      <h1>Home Component</h1>
      <nav>
        <NavLink to='/' end>Home</NavLink>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        <Link to='/dashboard'>Dashboard</Link>
      </nav>
    </main>
  )
}

export default Home
