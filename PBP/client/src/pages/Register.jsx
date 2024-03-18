import { useState } from "react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

export default function Register()
{
    const [showPassword,setShowPassword] = useState(false);
    const url = 'http://localhost:4000/api/v1';
    const navigate = useNavigate();
    const[formData,setFormData] = useState({
        name:"",
        email:"",
        password:""
    })

    function handleChange(e)
    {
        const{name,value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]:value
        }))
    }

    async function register()
    {
        try{
            const response = await fetch(`${url}/register`,{
                method:'POST',
                headers:{
                    'Content-type':'Application/json'
                },
                body:JSON.stringify(formData)
            })

            const data = await response.json();

            if(data.success)
            {
              navigate('/login');
              toast.success('Registered successfully');
            }

            else{
                toast.error('User already registered');
            }
        }catch(error){
             console.error(error);
        }
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        register();
    }

    return(
        <div className="w-full">
            <div className="max-w-[1080px] mx-auto w-11/12 flex justify-center items-center pt-20">
                <div className="w-[700px] border-2 py-9 px-8 rounded-md shadow-lg">
                  <h1 className="text-center text-3xl">Join MindMingle.</h1>


                  <form className="w-full mt-10" onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col gap-y-5">
                    <div className="flex flex-col gap-y-2">
                            <label htmlFor="name" className="font-bold text-xl">Name</label>
                            <input type='text' placeholder='Enter your name' className="py-2 px-4 rounded-md border-2" value={formData.name} name="name" onChange={handleChange} autoComplete="off"></input>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="email" className="font-bold text-xl">Email</label>
                            <input type='email' placeholder='Enter your email' className="py-2 px-4 rounded-md border-2" value={formData.email} name="email" onChange={handleChange} autoComplete="off"></input>
                        </div>

                        <div className="flex flex-col gap-y-2 relative">
                            <label htmlFor="password" className="font-bold text-xl">Password</label>
                            <input type={showPassword ? 'text' : 'password'} placeholder='Enter your password' className="py-2 px-4 rounded-md border-2" value={formData.password} name="password" onChange={handleChange} autoComplete="off"></input>
                            <span className="absolute right-[10px] bottom-[14px] text-[18px]" onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ? (<FaEye/>) : (<FaEyeSlash/>)
                                }
                            </span>
                        </div>

                        <button type="submit" className="bg-black text-white py-2 px-4 rounded-md mt-5">Get Started</button>
                    </div>
                  </form>
                </div>
            </div>
        </div>
    )
}
