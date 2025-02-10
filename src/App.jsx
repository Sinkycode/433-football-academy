import Nav from "./components/Nav";
import {
  About,
  Blog,
  Contact,
  Footer,
  Gallery,
  Hero,
  Programs,
} from "./sections";
const App = () => {
  return (
    <main>
      <Nav />
      <section className="xl:padding-l wide:padding-r padding-b">
        <Hero />
      </section>
      <section id="about-us" className="padding">
        <About />
      </section>
      <section id="programs" className="padding">
        <Programs />
      </section>
      <section id="gallery" className="padding">
        <Gallery />
      </section>
      <section id="blog" className="padding-x py-10">
        <Blog />
      </section>
      <section id="contacts" className="bg-pale-blue padding">
        <Contact />
      </section>
      <section className=" bg-black padding-x padding-t pb-8">
        <Footer />
      </section>
    </main>
  );
};

export default App;
