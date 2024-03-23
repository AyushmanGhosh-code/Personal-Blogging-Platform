import { useEffect, useState } from "react"
import { useNavigate,Link, useParams } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

export default function Blogs()
{
    const[blogs,setBlogs] = useState([]);
    const url = 'http://localhost:4000/api/v1';
    const navigate = useNavigate();
    const {id} = useParams();

    async function fetchBlogs()
    {
        const response = await fetch(`${url}/show`,{
            method:'GET',
            headers:{
                'Content-type':'Application/json'
            }
        })

        const result = await response.json();
        setBlogs(result.data)
    }

    async function deleteBlog(id)
    {
        try{
                const response = await fetch(`${url}/delete/${id}`,{
                    method:'DELETE',
                    headers:{
                        'Content-type':'Application/JSON'
                    }
                })

        }catch(err){
            console.log(err);
        }
    }

    function handleDelete(id)
    {
        deleteBlog(id);
        toast.success('Blog deleted successfully');
        const filteredBlog = blogs.filter((blog) => blog._id !== id);
        setBlogs(filteredBlog);
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
            <div>
                {
                    blogs.length === 0 ? (
                        <div className="flex justify-center items-center">
                            <p className="text-3xl mt-[20vh]">No blogs available!</p>
                        </div>
                    ) 
                    : 
                    (   
                    <div className="flex flex-col gap-6 mt-[3rem]">
                        {
                            blogs.map((blog,index) => (
                               <div className="flex justify-between items-baseline">
                                    <div className="max-w-[500px] w-11/12"  key={index}>
                                            <p className="font-bold text-[14px]">{blog.name}</p>
                                            <p className="font-bold text-xl mt-1">{blog.title}</p>
                                            <p className="text-gray-500 mt-1">{blog.description}</p>
                                            <p className="mt-4 text-[14px] text-gray-500">{blog.publishedAt}</p>
                                        </div>
                                    <div className="flex gap-5">
                                       <Link to={`/update/${blog._id}`}>
                                            <button className="bg-black py-2 px-4 rounded-md text-white flex justify-center items-center gap-x-3">
                                                    <span>Edit</span>
                                                    <div><MdEdit/></div>
                                                </button>
                                       </Link>
                                    
                                            <button className="bg-red-500 py-2 px-4 rounded-md text-white flex justify-center items-center gap-x-3" onClick={() => handleDelete(blog._id)}>
                                                    <span>Delete</span>
                                                    <div><MdDelete/></div>
                                                </button>
                                    </div>
                               </div>
                            ))
                        }
                </div>)
                }
            </div>
        </div>
    </div>
  )  
}

