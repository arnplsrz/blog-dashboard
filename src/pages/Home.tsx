import { Link, NavLink } from "react-router"
import { Fragment } from "react/jsx-runtime"

function Home() {

  return (
    <Fragment>
      <nav className="py-6 flex flex-col sm:items-baseline md:flex-row md:items-center md:justify-between">
        <div>
          <NavLink className="flex gap-2 items-center" to='/' end>
            <img src="public\newspaper.svg" alt="Site Logo" width={40} height={40} />
            <h1 className="font-bold">Blog Website</h1>
          </NavLink>
        </div>
        <div className="flex gap-2">
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
          <Link to='/dashboard'>Dashboard</Link>
        </div>
      </nav>
      <main className="flex flex-col gap-12">
        <header>
          <p>arnplsrz Blog</p>
          <h2>Featured</h2>
          <p>All featured articles across categories</p>
        </header>
        <section className="grid xl:grid-cols-2 md:grid-cols-none gap-2">
          <article>
            <img src="https://placehold.co/450x250" alt="Placeholder image" />
            <div className="flex" role="group" aria-label="Categories">
              <div>Lorem.</div>
              <div>Lorem.</div>
              <div>Lorem.</div>
            </div>
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, magnam.</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus aspernatur fuga, quibusdam tenetur qui blanditiis labore, sequi eos distinctio corrupti cum? Aliquam ab provident facilis?</p>
          </article>
          <section>
            <h2>Top Stories</h2>
            <article>
              <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda, natus!</h3>
              <span>John Smith</span>
              <time>1 Jan 2000</time>
              <img src="https://placehold.co/50x50" alt="Placeholder image" />
            </article>
            <article>
              <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda, natus!</h3>
              <span>John Smith</span>
              <time>1 Jan 2000</time>
              <img src="https://placehold.co/50x50" alt="Placeholder image" />
            </article>
            <article>
              <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda, natus!</h3>
              <span>John Smith</span>
              <time>1 Jan 2000</time>
              <img src="https://placehold.co/50x50" alt="Placeholder image" />
            </article>
          </section>
        </section>
        <section className="grid xl:grid-cols-2 md:grid-cols-none gap-2">
          <article>
            <img src="https://placehold.co/450x200" alt="Placeholder image" />
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, magnam.</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus aspernatur fuga, quibusdam tenetur qui blanditiis labore, sequi eos distinctio corrupti cum? Aliquam ab provident facilis?</p>
            <div className="flex" role="group" aria-label="Categories">
              <div>Lorem.</div>
              <div>Lorem.</div>
              <div>Lorem.</div>
            </div>
          </article>
          <article>
            <img src="https://placehold.co/450x200" alt="Placeholder image" />
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, magnam.</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus aspernatur fuga, quibusdam tenetur qui blanditiis labore, sequi eos distinctio corrupti cum? Aliquam ab provident facilis?</p>
            <div className="flex" role="group" aria-label="Categories">
              <div>Lorem.</div>
              <div>Lorem.</div>
              <div>Lorem.</div>
            </div>
          </article>
        </section>
      </main>
      <footer className="py-6">
        <h2>Blog Website</h2>
        <p>An admin web app for managing blog posts from an external API, built using React, Tailwind CSS, and TypeScript</p>
      </footer>
    </Fragment>
  )
}

export default Home
