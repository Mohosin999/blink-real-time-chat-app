import { useEffect, useState } from "react";
import { useAuth } from "./hooks/use-auth";
import AppRoutes from "./routes";
import { Spinner } from "./components/ui/spinner";
import Logo from "./components/logo";

function App() {
  const { user, isAuthStatus, isAuthStatusLoading } = useAuth();
  const [isRehydrated, setIsRehydrated] = useState(false);

  useEffect(() => {
    // Give time for persist to rehydrate
    const timer = setTimeout(() => {
      setIsRehydrated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isRehydrated) {
      isAuthStatus();
    }
  }, [isRehydrated, isAuthStatus]);

  if (!isRehydrated || (isAuthStatusLoading && !user)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Logo imgClass="size-20" showText={false} />
        <Spinner className="w-6 h-6" />
      </div>
    );
  }

  return <AppRoutes />;
}

export default App;
