import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected({ Component }: any) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  return <Component />;
}

export default Protected;

/*

This component is used to protect routes from unauthorized access. It checks if a token exists in the local storage. If it doesn't exist, it redirects the user to the signin page.

*/
