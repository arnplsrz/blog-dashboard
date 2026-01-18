import { useParams } from "react-router"

function Blog() {
  const params = useParams()

  return (
    <h1>Blog {params.blogId}</h1>
  )
}

export default Blog