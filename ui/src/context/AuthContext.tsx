import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { User } from '../model/user';
import {
  getCurrentUser,
  isUserActive,
  setLogoutIfExpiredHandler,
  login as loginService,
  logout as logoutService
} from '../utils/auth';

type AuthContextType = {
  user: User | undefined;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isLoading: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  loadUser: () => {}
});

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | undefined>(getCurrentUser());
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setIsLoading(true);
      try {
        await loginService(username, password);
        loadUser();
      } catch (apiError) {
        throw new Error();
      } finally {
        setIsLoading(false);
      }
    },
    [loadUser]
  );

  const logout = useCallback(async () => {
    try {
      await logoutService();
      setUser(undefined);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
