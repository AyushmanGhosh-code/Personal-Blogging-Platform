import {useNavigate, useParams} from 'react-router-dom'
import { useState } from 'react';
import toast from 'react-hot-toast'

export default function Update()
{
    const navigate = useNavigate();
    const url = 'http://localhost:4000/api/v1';
    const {id} = useParams();
    const[formData,setFormData] = useState({
        name:'',
        title:'',
        description:''
    });

    function handleChange(e)
    {
        const{name,value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]:value
        }))
    }

    async function updateBlog()
    {
        try{
            const response = await fetch(`${url}/update/${id}`,{
                method:"PUT",
                headers:{
                    'Content-type':'Application/json'
                },

                body:JSON.stringify(formData)
            });

            const data = await response.json();

            if(data.success)
            {
                navigate('/blogs');
                toast.success('Blog edited successfully');
            }

            else{
                toast.error('Please fill all the details correctly');
            }

        }catch(error){
            console.error(error);
        }
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        updateBlog();
    }
    return(
        <div className="w-full">
            <div className="max-w-[1080px] w-11/12 mx-auto pt-16">
            <h1 className="text-3xl font-bold mb-8 text-center">Edit your post</h1>
               <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col w-full gap-y-7">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="name" className="text-xl font-bold">Add a name</label>
                        <input type='text' className="border-2 py-2 px-4 rounded-md" name='name' value={formData.name} onChange={handleChange} autoComplete='off'></input>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="title" className="text-xl font-bold">Add a title</label>
                        <input type='text' className="border-2 py-2 px-4 rounded-md" name='title' value={formData.title} onChange={handleChange} autoComplete='off'></input>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="description" className="text-xl font-bold">Add a description</label>
                        <textarea className="border-2 py-2 px-4 rounded-md" name='description' rows={6} value={formData.description} onChange={handleChange} autoComplete='off'></textarea>
                    </div>

                    <button className="bg-blue-500 text-white py-2 px-5 rounded-md text-lg font-bold tracking-wide">Edit</button>
                </div>
               </form>
            </div>
        </div>
    )
}