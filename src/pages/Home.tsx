import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, NavLink } from "react-router"
import { Fragment } from "react/jsx-runtime"

function Home() {
  const [user, setUser] = useState(true);

  return (
    <Fragment>
      <header className="px-6">
        <section className="h-12 flex justify-end items-center gap-2">
          {user ? (
            <>
              <Button>
                <Link to='/login'>Login</Link>
              </Button>
              <Button>
                <Link to='/register'>Register</Link>
              </Button>
            </>
            ) : (
              <Button>
                <Link to='/dashboard'>Dashboard</Link>
              </Button>
            )
          }
        </section>
        <section className="h-16">
          <NavLink className="flex gap-2 justify-center items-center" to='/' end>
            <h1 className="font-extrabold font-heading italic text-3xl">Blog Website</h1>
          </NavLink>
        </section>
        <nav className="h-12 flex flex-row justify-between items-center">
        </nav>
      </header>
      <main className="px-6 flex flex-col gap-12">
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
      <footer className="px-6 h-16">
        <h2>Blog Website</h2>
        <p>An admin web app for managing blog posts from an external API, built using React, Tailwind CSS, and TypeScript</p>
      </footer>
    </Fragment>
  )
}

export default Home
