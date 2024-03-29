import Layout from "./Layout";
import InputBox from "./InputBox";
import Responses from "./Responses";
import { useLocation } from "react-router-dom";
import AuthGuard from "../guards/auth.guard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function PageChatInterface() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [cookies, setCookies] = useCookies(['token','fileURL']);

  useEffect(()=> {
    if(!location.state){
      return navigate("/upload");
    } else {
      setData(location.state)
    }

    const checkAuth = async () => {
      const authStatus = await AuthGuard(cookies.token);
      if(!authStatus){ 
        return navigate("/");
      }
      setData(location.state)
    }

    checkAuth();
  },[navigate, location, cookies.token]);

  const handleInputChange = (value) => {
    setInputValue(value)
  }

  return (
    <Layout>
      <Responses fileName={data.fileName} userInput={inputValue} fileObj={data.fileObj}/>
      <InputBox handleInput={handleInputChange}/>
    </Layout>
  )
}