import { useLocation } from "react-router"

function Error() {
  const location = useLocation()

  return <p>Page {location.pathname} not found</p>
}

export default Error