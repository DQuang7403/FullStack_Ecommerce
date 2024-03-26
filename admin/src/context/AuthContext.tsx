import {
  createContext,
  useContext,
  useState,
  useEffect,
  FormEvent,
} from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
type ContextProps = {
  children: React.ReactNode;
};
type AuthContextType = {
  url: string;
  user: any;
  loginUser: (e: FormEvent) => void;
  logoutUser: () => void;
  setUrl: (url: string) => void
};
type AuthTokenType = {
  access_token: string;
  refresh_token: string;
};
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: ContextProps) {
  const [url, setUrl] = useState<string>(window.location.pathname);
  const navigate = useNavigate();
  const localAuth = localStorage.getItem("authTokens");
  const [user, setUser] = useState(() => {
    return localAuth ? jwtDecode(localAuth) : null;
  });
  const [authToken, setAuthToken] = useState(() => {
    return localAuth ? JSON.parse(localAuth) : null;
  });
  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    let res = await fetch("http://localhost:5000/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: (e.target as HTMLFormElement).email.value,
        password: (e.target as HTMLFormElement).password.value,
      }),
    });
    const data = await res.json();
    if (res.status === 200) {
      setAuthToken(data);
      setUser(jwtDecode(data.access_token));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
      setUrl("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please check your credentials ",
      });
    }
  };
  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    setUrl("/login");
    navigate("/login");
  };
  const updateToken = async () => {
    let response = await fetch(`http://127.0.0.1:5000/admin/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken?.refresh_token}`,
      },
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthToken((prev: AuthTokenType) => {
        return { ...prev, access_token: data.access_token };
      });
      setUser(jwtDecode(data.access_token));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
  };
  useEffect(() => {
    const expires = 1000 * 60 * 30;
    const interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, expires);
    return () => clearInterval(interval);
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ url, user, loginUser, logoutUser, setUrl }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuthContext() {
  const value = useContext(AuthContext);
  if (value === null) {
    throw new Error("AuthContext must be used within AuthProvider");
  }
  return value;
}
