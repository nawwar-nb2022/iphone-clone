import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import HighLight from "./components/HighLight"
import Model from "./components/Model"
const  App = ()=> {
  return (
      <main className="bg-black">
          <Navbar/>
          <Hero/>
          <HighLight/>

          <Model/>
      </main>
    );
}

export default App;
