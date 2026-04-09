import AppWrapper from "@/components/app-wrapper";
import ChatList from "@/components/chat/chat-list";
import useChatId from "@/hooks/use-chat-id";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const chatId = useChatId();

  return (
    <AppWrapper>
      <div className="h-screen flex overflow-hidden">
        {/* ================= LEFT SIDE (Chat List) ================= */}
        <div
          className={cn(
            "h-full flex-shrink-0",
            chatId ? "hidden lg:block" : "block",
            chatId ? "w-[420px]" : "lg:w-[380px]",
          )}
        >
          <ChatList />
        </div>

        {/* ================= RIGHT SIDE (Chat Area) ================= */}
        <div
          className={cn(
            "flex-1 h-full flex flex-col min-w-0",
            chatId ? "block" : "hidden lg:flex",
          )}
        >
          <Outlet />
        </div>
      </div>
    </AppWrapper>
  );
};

export default AppLayout;
