



import { useState, useEffect, useContext, createContext } from "react";
import asiox from "axios"; 



const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
  const [auth, setAuth] = useState({
    token: "",
    user: null,
  });

  
  
  asiox.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    
    const data = localStorage.getItem("auth");
    if (data) {
      
      const parseData = JSON.parse(data);
      setAuth({
        ...auth, 
        user: parseData.user, 
        token: parseData.token, 
      });
    }
  }, []); 

  
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};



const useAuth = () => {
  
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
