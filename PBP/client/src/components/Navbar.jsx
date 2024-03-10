import toast from "react-hot-toast"
import { NavLink } from "react-router-dom"

export default function Navbar({isLoggedIn,setIsLoggedIn})
{
  function loginHandler()
  {
    toast.success('Signed out successfully');
    setIsLoggedIn(false);
  }
    return(
        <nav className="w-full py-4 px-8 border-b-2">
           <div className="max-w-[1080px] w-11/12 mx-auto flex justify-between items-center">
                <div>
                   <NavLink to='/'>
                    <p className="text-xl tracking-wide">Mind<span className="font-bold">Mingle</span></p>
                   </NavLink>
                </div>

                <div className="list-none flex justify-center items-center gap-x-6">
                  <NavLink to='/blogs'>
                  {
                    isLoggedIn && (<li>My Blogs</li>)
                  }
                  </NavLink>

                    <NavLink to='/login'>
                        {
                            !isLoggedIn && (<li>Sign in</li>)
                        }
                    </NavLink>
                   
                   <NavLink to='/register'>
                  {
                    !isLoggedIn && (<button className="bg-black rounded-full py-2 px-6 text-white font-bold">Get Started</button>)
                  }
                   </NavLink>

                   <NavLink to='/'>
                    {
                        isLoggedIn && (<button className="bg-black rounded-full py-2 px-6 text-white font-bold" onClick={loginHandler}>Sign out</button> )
                    }
                   </NavLink>
                </div>
           </div>
        </nav>
    )
}