import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f9fafb', color: '#111111' }}>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"                element={<Home />} />
            <Route path="/about"           element={<About />} />
            <Route path="/register"        element={<Contact />} />
            <Route path="/contact"         element={<Contact />} />
            <Route path="/login"           element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
