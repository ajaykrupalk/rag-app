import Upload from "./Upload";
import Layout from "./Layout";
import AuthGuard from "../guards/auth.guard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function PageUploadFile() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(['token'])

  useEffect(()=> {
    const checkAuth = async () => {
      const authStatus = await AuthGuard(cookies.token);
      if(!authStatus){ 
        return navigate("/");
      }
    }
    checkAuth();
  })

  return (
    <Layout>
      <Upload />
    </Layout>
  )
}