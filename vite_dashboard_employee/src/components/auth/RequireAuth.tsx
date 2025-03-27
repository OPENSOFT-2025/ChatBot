
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default RequireAuth;
