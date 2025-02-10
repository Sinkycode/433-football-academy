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
      <section className="padding">
        <About />
      </section>
      <section className="padding">
        <Programs />
      </section>
      <section className="padding">
        <Gallery />
      </section>
      <section className="padding-x py-10">
        <Blog />
      </section>
      <section className="bg-pale-blue padding">
        <Contact />
      </section>
      <section className=" bg-black padding-x padding-t pb-8">
        <Footer />
      </section>
    </main>
  );
};

export default App;
