import { Navbar } from './components/Navbar/Navbar'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { Services } from './components/Services/Services'
import { Skills } from './components/Skills/Skills'
import { Projects } from './components/Projects/Projects'
// import { Testimonials } from './components/Testimonials/Testimonials'
import { Contact } from './components/Contact/Contact'
import { Footer } from './components/Footer/Footer'

export function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        {/* <Testimonials /> */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
