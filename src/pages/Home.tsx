import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Link, NavLink } from "react-router"
import { Fragment } from "react/jsx-runtime"

function Home() {
  const { user } = useAuth();

  return (
    <Fragment>
      <header className="px-12 py-8 bg-black text-white flex justify-between">
        <ul className="flex gap-6">
          <li>Personal</li>
          <li>Technology</li>
          <li>Lifestyle</li>
          <li>Health & Fitness</li>
          <li>Food</li>
          <li>Travel</li>
          <li>Music</li>
        </ul>
        {user ? (
          <Button>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost">
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="secondary">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        )}
      </header>
      <nav className="h-auto mx-6 pt-12 pb-4 flex gap-4 flex-col items-center border-b-3 border-double border-black">
        <NavLink className="flex gap-2 justify-center items-center" to="/" end>
          <h1 className="font-extrabold font-heading text-9xl">Blog Website</h1>
        </NavLink>
        <ul className="w-full px-4 flex gap-4 justify-between items-center">
          <li>Article 1</li>
          <li>Article 2</li>
          <li>Article 3</li>
          <li>Article 4</li>
          <li>Article 5</li>
        </ul>
      </nav>
      <main className="px-6 py-9 flex flex-1 flex-col gap-12">
        <section className="grid xl:grid-cols-[0.8fr_1fr_0.8fr] gap-2">
          <section>
            <h2>Top Stories</h2>
            <article>
              <h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Assumenda, natus!
              </h3>
              <span>John Smith</span>
              <time>1 Jan 2000</time>
              <img src="https://placehold.co/50x50" alt="Placeholder image" />
            </article>
            <article>
              <h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Assumenda, natus!
              </h3>
              <span>John Smith</span>
              <time>1 Jan 2000</time>
              <img src="https://placehold.co/50x50" alt="Placeholder image" />
            </article>
            <article>
              <h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Assumenda, natus!
              </h3>
              <span>John Smith</span>
              <time>1 Jan 2000</time>
              <img src="https://placehold.co/50x50" alt="Placeholder image" />
            </article>
          </section>
          <article>
            <img src="https://placehold.co/450x250" alt="Placeholder image" />
            <div className="flex" role="group" aria-label="Categories">
              <div>Lorem.</div>
              <div>Lorem.</div>
              <div>Lorem.</div>
            </div>
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
              magnam.
            </h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
              aspernatur fuga, quibusdam tenetur qui blanditiis labore, sequi
              eos distinctio corrupti cum? Aliquam ab provident facilis?
            </p>
          </article>
          <section>
            <h2>Top Stories</h2>
            <article>
              <h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Assumenda, natus!
              </h3>
              <span>John Smith</span>
              <time>1 Jan 2000</time>
              <img src="https://placehold.co/50x50" alt="Placeholder image" />
            </article>
            <article>
              <h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Assumenda, natus!
              </h3>
              <span>John Smith</span>
              <time>1 Jan 2000</time>
              <img src="https://placehold.co/50x50" alt="Placeholder image" />
            </article>
            <article>
              <h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Assumenda, natus!
              </h3>
              <span>John Smith</span>
              <time>1 Jan 2000</time>
              <img src="https://placehold.co/50x50" alt="Placeholder image" />
            </article>
          </section>
        </section>
        <section className="grid xl:grid-cols-2 md:grid-cols-none gap-2">
          <article>
            <img src="https://placehold.co/450x200" alt="Placeholder image" />
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
              magnam.
            </h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
              aspernatur fuga, quibusdam tenetur qui blanditiis labore, sequi
              eos distinctio corrupti cum? Aliquam ab provident facilis?
            </p>
            <div className="flex" role="group" aria-label="Categories">
              <div>Lorem.</div>
              <div>Lorem.</div>
              <div>Lorem.</div>
            </div>
          </article>
          <article>
            <img src="https://placehold.co/450x200" alt="Placeholder image" />
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
              magnam.
            </h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
              aspernatur fuga, quibusdam tenetur qui blanditiis labore, sequi
              eos distinctio corrupti cum? Aliquam ab provident facilis?
            </p>
            <div className="flex" role="group" aria-label="Categories">
              <div>Lorem.</div>
              <div>Lorem.</div>
              <div>Lorem.</div>
            </div>
          </article>
        </section>
      </main>
      <footer className="px-6 py-12 bg-black text-white">
        <h2>Blog Website</h2>
        <p>
          An admin web app for managing blog posts from an external API, built
          using React, Tailwind CSS, and TypeScript
        </p>
      </footer>
    </Fragment>
  );
}

export default Home
