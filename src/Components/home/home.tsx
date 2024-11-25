import { useNavigate } from 'react-router-dom'
import '../../App.css'
import { Button } from 'react-bootstrap'
export const Home:React.FC = () => {

  const navigate = useNavigate()
  

  return (
    <>
      <h1>Welcome to the Home Page</h1>
      <div className="card">
      <Button className="btn-dark" onClick={()=>navigate("/users")}>Users</Button>
      </div>
    </>
  )

}
export default Home
