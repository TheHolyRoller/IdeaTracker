import './App.css'
import  {UserProvider } from './lib/context/user'; 
import  {IdeasProvider}  from './lib/context/ideas'; 
import Login from './pages/Login'
import Home from './pages/Home'; 
import { useUser } from './lib/context/user'; 



function App() {

  const isLogginPage = window.location.pathName = '/login'; 


  return (
    <>
    <div>
    <UserProvider>
    <IdeasProvider>

    <Navbar/>   
    
    <main>
      {isLogginPage ? <Login /> : <Home />}
    </main>
    </IdeasProvider>
    </UserProvider>
    </div>

    </>
  )
}


// Add in the navbar component here 

const Navbar = () => {

  const user = useUser(); 

  {user.current ? ( 

    <>
        <span>{user.current.email} </span>
        {/* Add in the logout button here */}
        <button
        type='button'
        onClick={() => {

            user.logout()


        }}
        >
        Logout

        </button>
    </>

) : (

    <a href='/login'>Login</a>


)}; 


}


export default App
