import Card from "./Card";
import Layout from "./Layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import AuthGuard from "../guards/auth.guard";

export default function PageTokenAuth() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(['token'])

  useEffect(()=> {
    const checkAuth = async () => {
      const authStatus = await AuthGuard(cookies.token);
      if(authStatus){ 
        return navigate("/upload");
      }
    }
    checkAuth();
  })

  return (
    <Layout>
      <Card />
    </Layout>
  )
}