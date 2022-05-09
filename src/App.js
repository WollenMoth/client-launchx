import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "./components/Navbar";
import ExplorersList from "./components/ExplorersList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/explorers" element={<ExplorersList />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
