import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


axios.defaults.baseURL = (import.meta as any).env.VITE_BASE_URL;

const AppContext = createContext<any>({});
export const AppProvider = ({ children }: any) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState<string>("");

    const fetchBlog = async () => {
        try {
            const { data } = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }
    }

    

    useEffect(()=>{
        fetchBlog()
        const token = localStorage.getItem('token')
        if(token){
            setToken(token)
            axios.defaults.headers.common['Authorization']=`${token}`;
        }
    },[])

    const value = {
        axios,
        navigate,
        token,
        setToken,
        blogs,
        setBlogs,
        input,
        setInput,
    };
    return (

        <AppContext.Provider value={value}>{children}</AppContext.Provider>)
}
export const useAppContext = () => {
    return useContext(AppContext);
};