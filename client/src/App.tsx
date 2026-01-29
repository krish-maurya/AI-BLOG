import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BlogDetailPage from "./components/pages/BlogDetailPage";
import Blogpage from "./components/pages/Blogpage";
import Heropage from "./components/pages/Heropage";
import Layout from "./components/pages/admin/Layout";
import "./index.css";
import Login from "./components/Admin/Login";
import AddBlog from "./components/pages/admin/AddBlog";
import 'quill/dist/quill.snow.css';
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/appContext";
import LoginPage from "./components/pages/LoginPage";
import ProfilePage from "./components/pages/ProfilePage";

function App() {
  const {token}=useAppContext();
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Heropage />} />
        <Route path="/blog" element={<Blogpage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/admin" element={token ? <Layout /> : <Login />} />
        <Route path="/login" element={token ? <ProfilePage /> : <LoginPage />} />
        <Route path="/addBlog" element={<AddBlog />} />
      </Routes>
    </>
  );
}

export default App;