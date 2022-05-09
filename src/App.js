import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Container from "react-bootstrap/Container";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import ExplorersList from "./components/ExplorersList";
import ExplorerForm from "./components/ExplorerForm";
import CommandersList from "./components/CommandersList";
import CommanderForm from "./components/CommanderForm";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Container>
        <Routes>
          <Route path="/explorers" element={<ExplorersList />} />
          <Route path="/explorers/:id" element={<ExplorerForm />} />
          <Route path="/commanders" element={<CommandersList />} />
          <Route path="/commanders/:id" element={<CommanderForm />} />
          <Route path="/" element={<CommandersList />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
