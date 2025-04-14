import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './pages/BlogsUpdated';
import NewCulturalExchangePage from './pages/NewCulturalExchangePage';
import Login from './pages/Login';
import Signup from './pages/Signup';

const FinalRouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/cultural-exchange" element={<NewCulturalExchangePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default FinalRouterConfig;
