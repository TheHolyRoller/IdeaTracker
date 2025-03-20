import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(null);



  async function login(email, password) {
    try {
      await account.get();
      console.error('session found!! Logging you out first');
      await logout();
    } catch {
      console.log('no session found');
    }

    try {
      const loggedIn = await account.createEmailPasswordSession(
        email,
        password
      );
      setUser(loggedIn);
      window.location.replace('/');
    } catch (error) {
      console.error('could not login', error);
    }
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

   async function register(email, password) {
    try {
      try {
        await account.get();
        console.error('session found!! Logging you out first');
        await logout();
      } catch {
        console.log('no session found');
      }

      await account.create(ID.unique(), email, password);
      await login(email, password);
    } catch (error) {
      console.error('could not register', error);
    }
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
};
