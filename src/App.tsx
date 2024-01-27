import Container from 'react-bootstrap/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import CommanderForm from './components/CommanderForm';
import CommandersList from './components/CommandersList';
import ExplorerForm from './components/ExplorerForm';
import ExplorersList from './components/ExplorersList';
import Navbar from './components/Navbar';

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
