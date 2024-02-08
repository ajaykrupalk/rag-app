import Layout from "../components/layout";
import ChatResponse from "../components/ChatResponse";
import InputBox from "../components/InputBox";
import UserResponse from "../components/UserResponse";
import PdfDisplay from "../components/PdfDisplay";

export default function ChatInterface() {
  return (
    <Layout>
      <div className="h-full w-full overflow-y-auto">
        <PdfDisplay />
        <UserResponse />
        <ChatResponse />
        <UserResponse />
        <ChatResponse />
      </div>
      <div>
        <InputBox />
      </div>
    </Layout>
  )
}