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

    // Check if the user is already logged in here 
    const session = await account.get(); 

    if(session){

      console.error('session found!! Logging you out first'); 
      await logout(); 

    }

    console.log('this is the session check in login function', session); 
    try{
      
      const loggedIn = await account.createEmailPasswordSession(email, password);
      setUser(loggedIn);
      window.location.replace("/");
    }
    catch(error){

      console.error('could not login', error); 
    }


  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  async function register(email, password) {
    
    try{

      // Check if there is already a session and a logged in user here 
      const session = await account.get(); 

      if(session){

        console.log('User already logged in. Logging out first'); 
        await logout(); 

        console.log("Logged out now you can login or register "); 
      }

      await account.create(ID.unique(), email, password);
      await login(email, password);

    }
    catch(error){
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
