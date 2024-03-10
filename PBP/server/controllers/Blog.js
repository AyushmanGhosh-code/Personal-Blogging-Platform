const Blog = require('../models/blog');

exports.createBlog = async(req,res) => {
    try{
        const{name,title,description} = req.body;

        if(!name || !title || !description)
        {
            return res.status(400).json({
                success:false,
                message:'All the details must be filled'
            })
        }

        const blog = await Blog.create({name:name,title:title,description:description});

        res.status(200).json({
            success:true,
            data:blog,
            message:'Blog created'
        })
    }catch(error){
          res.status(500).json({
            success:false,
            message:error.message
          })
    }
}

exports.showAllBlogs = async(req,res) => {
    try{
        const blogs = await Blog.find({});

        if(!blogs)
        {
            return res.status(404).json({
                success:false,
                message:"No blogs available"
            })
        }

        res.status(200).json({
            success:true,
            data:blogs,
            message:'Blogs fetched successfully'
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}