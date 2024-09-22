import { Outlet } from "react-router-dom"
import Header from "../../components/Navbar/Header/Header"
import CartAlert from "../../components/CartAlert/CartAlert"
import Footer from "../../components/Footer/Footer"


const GenericLayout = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <CartAlert />
      <section className="flex-grow">
        <Outlet />
      </section>
      <Footer />
    </main>
  )
}

export default GenericLayout
