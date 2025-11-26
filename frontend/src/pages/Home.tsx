import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import axios from "axios";

const Home = () => {
  const { logout } = useAuth();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
          withCredentials: true,
        });

        console.log(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMe();
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Home</h1>
      <Button
        onClick={() => window.open("http://localhost:5173/login", "_self")}
      >
        Login
      </Button>
      <Button onClick={handleLogout}>Logout</Button>

      <div className="mt-10">
        <h1 className="text-xl font-semibold">User Information</h1>
      </div>
    </div>
  );
};

export default Home;
