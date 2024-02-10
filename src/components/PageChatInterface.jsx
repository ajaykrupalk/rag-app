import Layout from "./layout";
import InputBox from "./InputBox";
import Responses from "./Responses";
import { useLocation } from "react-router-dom";

export default function PageChatInterface() {
  const location = useLocation();
  const data = location.state
  console.log(data);

  return (
    <Layout>
      <Responses fileName={data.fileName} fileUrl={data.fileUrl}/>
      <InputBox />
    </Layout>
  )
}