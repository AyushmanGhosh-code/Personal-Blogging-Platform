import { useEffect, useState } from 'react';
import blog from '../assets/blog.jpg'
import axios from 'axios'
import { NavLink } from 'react-router-dom';

export default function Home()
{
    const API_KEY = '423ab32d2eab4b7381534786ed59cc33';
    const url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`

    const[blogs,setBlogs] = useState([]);

    async function fetchBlogs()
    {
        const response = await axios.get(url);
        console.log(response.data);

        setBlogs(response.data.articles);
    }

    useEffect(() => {
        fetchBlogs();
    },[]);
    return(
        <div className="w-full pt-2 relative">
             <div className='w-full border-b-2 border-black'>
                <div className="max-w-[1080px] w-11/12 mx-auto">
                        <div className="flex flex-col justify-center items-center mt-[6rem] gap-y-11">
                            <h1 className="text-3xl font-bold w-[850px] text-center">
                            Empower Your Voice: Explore, Share, and Connect on Our Blogging Platform
                            </h1>
                           
                           <NavLink to='/login'>
                           <button className="bg-black rounded-full py-2 px-6 text-white font-bold">Start Writing</button>
                           </NavLink>
                        </div>

                        <div>
                            <img src={blog} className='h-[600px] mx-auto' loading='lazy'></img>
                        </div>

                </div>
             </div>

            <div className='max-w-[1080px] w-11/12 mx-auto py-5'>
                <div className='w-full flex justify-between items-center mt-9'></div>
                <div className='flex gap-7 justify-center items-center flex-wrap'>
                    {
                        blogs.map((blog) => (
                            <div className='max-w-[500px] w-11/12 flex flex-col justify-center items-center'>
                               <div>
                                <p className='font-bold text-[14px]'>{blog.author}</p>
                                <p className='font-bold text-xl mt-1'>{blog.title}</p>
                                <p className='text-gray-500 mt-1'>{blog.description}</p>
                               </div>

                               <div>
                                <img src={blog.urlToImage} className='mt-3 aspect-video' loading='lazy'></img>
                                <p className='mt-4 text-[14px] text-gray-500'>{blog.publishedAt}</p>
                               </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}