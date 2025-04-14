import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import BlogsPage from './pages/Blogs';
import CulturalExchange from './pages/CulturalExchange';

export default function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/cultural-exchange" element={<CulturalExchange />} />
    </Routes>
  );
}
