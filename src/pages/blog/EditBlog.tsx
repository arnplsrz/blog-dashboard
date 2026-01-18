import { useParams } from "react-router"

function EditBlog() {
  const params = useParams()

  return <h1>Edit Blog page {params.blogId}</h1>
}

export default EditBlog