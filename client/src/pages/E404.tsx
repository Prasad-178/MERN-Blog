import { useParams } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'

const E404 = () => {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "60px" }}>404</div>
      <Footer />
    </>
  )
}

export default E404