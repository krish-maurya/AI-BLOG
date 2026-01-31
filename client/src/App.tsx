import 'quill/dist/quill.snow.css';
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Admin/Login";
import BlogDetailPage from "./components/pages/BlogDetailPage";
import Blogpage from "./components/pages/Blogpage";
import Heropage from "./components/pages/Heropage";
import AddBlog from "./components/pages/admin/AddBlog";
import Layout from "./components/pages/admin/Layout";
import { useAppContext } from "./context/appContext";
import "./index.css";
import UserLogin from './components/pages/userLogin';

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
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/addBlog" element={<AddBlog />} />
      </Routes>
    </>
  );
}

export default App;