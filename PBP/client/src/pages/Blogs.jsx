import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { IoCreate } from "react-icons/io5";

export default function Blogs()
{
    const[blogs,setBlogs] = useState([]);
    const url = 'http://localhost:4000/api/v1';
    const navigate = useNavigate();

    async function fetchBlogs()
    {
        const response = await fetch(`${url}/show`,{
            method:'GET',
            headers:{
                'Content-type':'Application/json'
            }
        })

        const result = await response.json();

        console.log(result.data);
        setBlogs(result.data)
    }

    useEffect(() => {
        fetchBlogs();
    },[blogs])
  return(
    <div className="w-full">
        <div className="max-w-[1080px] w-11/12 mx-auto pt-14 pb-7">
                <div className="w-full flex justify-between items-center">
                <h1 className="font-bold text-3xl tracking-wide">Your Blogs</h1>
                <button className="bg-blue-500 text-white py-3 px-4 rounded-md font-bold flex items-center justify-between gap-x-3" onClick={() => navigate('/create-blog')}><span>Create a Blog</span><span><IoCreate/></span></button>
                </div>
               <div className="flex flex-col gap-6 mt-[3rem]">
                   {
                    blogs.map((blog) => (
                        <div className="max-w-[500px] w-11/12">
                            <p className="font-bold text-[14px]">{blog.name}</p>
                            <p className="font-bold text-xl mt-1">{blog.title}</p>
                            <p className="text-gray-500 mt-1">{blog.description}</p>
                            <p className="mt-4 text-[14px] text-gray-500">{blog.publishedAt}</p>
                        </div>
                    ))
                   }
                </div>
        </div>
    </div>
  )  
}

