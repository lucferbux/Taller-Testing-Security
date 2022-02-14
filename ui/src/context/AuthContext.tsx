import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import createApiClient from "../api/api-client-factory";
import { User } from "../model/user";
import {
  getCurrentUser,
  isUserActive,
  setLogoutIfExpiredHandler,
  logout as logoutService,
  setUserToken,
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
      setLogoutIfExpiredHandler(setUser);
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
      const api = createApiClient();
      try {
        const result = await api.token(username, password);
        setUserToken(result.token);
        setLogoutIfExpiredHandler(setUser);
        loadUser();
      } catch (apiError) {
        throw new Error();
      }
    },
    [setUser, loadUser]
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
