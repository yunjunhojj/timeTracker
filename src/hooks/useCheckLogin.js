// check login status

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// useCheckLogin hook - check login status, check and redirect
export const useCheckLogin = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [loadUser, setLoadUser] = useState(false);

  useEffect(() => {
    // login status check
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
        navigate("/login");
      }
      setLoadUser(true);
    });
  }, [loadUser]);

  if (!loadUser) {
    return [isLogged, setIsLogged];
  }

  return [isLogged, setIsLogged];
};
