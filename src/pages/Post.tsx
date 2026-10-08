import { useEffect, useState, type FormEvent } from "react"
import { Link, useLocation, useParams } from "react-router"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { API_URL } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"

type Comment = {
  id: string
  content: string
  createdAt: string
  author: { id: string; name: string | null }
}

type PostDetail = {
  id: string
  title: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string | null 
    email: string | null
  }
  comments: Comment[]
}

const formatDate = (value: string) => new Date(value).toLocaleDateString()

function Post() {
  const { postId } = useParams()
  const location = useLocation()
  const { user, authFetch } = useAuth()
  const [post, setPost] = useState<PostDetail | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editing, setEditing] = useState<{ id: string; content: string } | null>(null)

  useEffect(() => {
    let active = true

    fetch(`${API_URL}/api/posts/${postId}`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (active) setPost(data.post)
      })
      .catch(() => {
        if (active) setNotFound(true)
      })

    return () => {
      active = false
    }
  }, [postId])

  const send = async (path: string, method: string, body?: object) => {
    const response = await authFetch(`${API_URL}${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body && JSON.stringify(body),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(data.error ?? "Request failed")
    return data
  }

  const showError = (error: unknown) =>
    toast.error(error instanceof Error ? error.message : "Request failed")

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const data = await send(`/api/posts/${postId}/comments`, "POST", { content })
      setPost((post) => post && { ...post, comments: [...post.comments, data.comment] })
      setContent("")
    } catch (error) {
      showError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSaveEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editing) return

    try {
      const data = await send(`/api/comments/${editing.id}`, "PATCH", { content: editing.content })
      setPost((post) => post && {
        ...post,
        comments: post.comments.map((comment) =>
          comment.id === editing.id ? { ...comment, content: data.comment.content } : comment
        ),
      })
      setEditing(null)
    } catch (error) {
      showError(error)
    }
  }

  const onDelete = async (id: string) => {
    if (!window.confirm("Delete this comment?")) return

    try {
      await send(`/api/comments/${id}`, "DELETE")
      setPost((post) => post && { ...post, comments: post.comments.filter((comment) => comment.id !== id) })
    } catch (error) {
      showError(error)
    }
  }

  if (notFound) return <p className="p-6">Post not found. <Link to="/" className="underline">Back to posts</Link></p>
  if (!post) return null

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-9 flex flex-col gap-8">
      <Link to="/" className="underline">Back to posts</Link>
      <article className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <p className="text-sm text-muted-foreground">
          {post.author.name ?? "Unknown"} · <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Comments ({post.comments.length})</h2>
        {post.comments.map((comment) => (
          <article key={comment.id} className="border-b pb-4">
            <p className="text-sm text-muted-foreground">
              {comment.author.name ?? "Unknown"} · <time dateTime={comment.createdAt}>{formatDate(comment.createdAt)}</time>
            </p>
            {editing?.id === comment.id ? (
              <form onSubmit={onSaveEdit} className="flex flex-col gap-2">
                <textarea
                  aria-label="Edit comment"
                  className="min-h-24 rounded-md border p-2"
                  value={editing.content}
                  onChange={(event) => setEditing({ id: comment.id, content: event.target.value })}
                  maxLength={2000}
                  required
                />
                <div className="flex gap-2">
                  <Button type="submit" size="sm">Save</Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                </div>
              </form>
            ) : (
              <p className="whitespace-pre-wrap">{comment.content}</p>
            )}
            {user && (user.id === comment.author.id || user.role === "AUTHOR") && editing?.id !== comment.id && (
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setEditing({ id: comment.id, content: comment.content })}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(comment.id)}>Delete</Button>
              </div>
            )}
          </article>
        ))}
        {user ? (
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <label htmlFor="comment">Add a comment</label>
            <textarea
              id="comment"
              className="min-h-24 rounded-md border p-2"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              maxLength={2000}
              required
            />
            <Button type="submit" className="self-start" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post comment"}
            </Button>
          </form>
        ) : (
          <p>
            <Link to="/login" state={{ from: location.pathname }} className="underline">Log in</Link> to comment
          </p>
        )}
      </section>
    </main>
  )
}

export default Post
