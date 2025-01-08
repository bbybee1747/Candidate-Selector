import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import "bootstrap/dist/css/bootstrap.css";
import imagePath from "./assets/GitHub-Mark-ea2971cee799.png";
import "./index.css";

function App() {
  return (
    <>
      <header>
        <div className="container mb-5">
          <Nav brandName="" imageSrcPath={imagePath} />
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default App;
