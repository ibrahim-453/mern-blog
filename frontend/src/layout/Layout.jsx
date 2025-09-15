import NavBar from '../components/NavBar'
import {Outlet} from 'react-router-dom'
import Footer from '../components/Footer'

function Layout() {
  return (
    <div>
        <NavBar/>
        <main>
            <Outlet/>
        </main>
        <Footer />
    </div>
  )
}

export default Layout