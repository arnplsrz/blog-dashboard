import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router"
import { Fragment } from "react/jsx-runtime"
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { API_URL } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

type PostSummary = {
  id: string
  title: string
  createdAt: string
  author: { name: string | null }
  _count: { comments: number }
}

function Home() {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState<PostSummary[] | null>(null);

  useEffect(() => {
    let active = true;

    fetch(`${API_URL}/api/posts`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then(({ data }) => {
        if (active) setPosts(data.posts);
      })
      .catch(() => {
        if (!active) return;
        setPosts([]);
        toast.error("Could not load posts");
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <Fragment>
      <header className="px-12 py-8 bg-black text-white flex justify-between">
        {user ? (
          <Button variant="secondary" onClick={logout}>Logout</Button>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className={buttonVariants({ variant: 'ghost' })}>Login</Link>
            <Link to="/register" className={buttonVariants({ variant: 'secondary' })}>Register</Link>
          </div>
        )}
        {user && <p className="text-sm text-background">Hello! {user.name}</p>
        }
      </header>
      <nav className="h-auto mx-6 pt-12 pb-4 flex gap-4 flex-col items-center border-b-3 border-double border-black">
        <NavLink className="flex gap-2 justify-center items-center" to="/" end>
          <h1 className="font-extrabold font-heading text-9xl">Blog Website</h1>
        </NavLink>
      </nav>
      <main className="mx-auto w-full max-w-3xl px-6 py-9 flex flex-1 flex-col gap-6">
        {posts === null ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet</p>
        ) : (
          posts.map((post) => (
            <article key={post.id} className="border-b pb-6">
              <Link to={`/posts/${post.id}`}>
                <h2 className="text-2xl font-bold hover:underline">{post.title}</h2>
              </Link>
              <p className="text-sm text-muted-foreground">
                {post.author.name ?? "Unknown"} · <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString()}</time> · {post._count.comments} comments
              </p>
            </article>
          ))
        )}
      </main>
    </Fragment>
  );
}

export default Home
