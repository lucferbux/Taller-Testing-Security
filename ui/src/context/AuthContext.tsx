import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { User } from "../model/user";
import {
  getCurrentUser,
  isUserActive,
  setLogoutIfExpiredHandler,
  login as loginService,
  logout as logoutService,
} from "../utils/auth";

const AuthContext = createContext<any>({
  user: undefined,
});

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | undefined>(getCurrentUser());

  const loadUser = useCallback(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    if (isUserActive()) {
      setLogoutIfExpiredHandler();
      loadUser();
    } else {
      try {
        logoutService();
        setUser(undefined);
      } catch (e) {
        console.log(e);
      }
    }
  }, [loadUser]);

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        await loginService(username, password);
        loadUser();
      } catch (apiError) {
        throw new Error();
      }
    },
    [loadUser]
  );

  const logout = useCallback(() => {
    try {
      logoutService();
      setUser(undefined);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
