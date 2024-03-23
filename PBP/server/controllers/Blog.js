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

exports.updateBlogs = async(req,res) => {
    try{
        const {id} = req.params;
        const {name,description,title} = req.body;

        
        if(!name || !title || !description)
        {
            return res.status(400).json({
                success:false,
                message:'All the details must be filled'
            })
        }

        const updatedBlog = await Blog.findByIdAndUpdate({_id:id},{
            name:name,
            title:title,
            description:description
        },{new:true});

        res.status(200).json({
            success:true,
            data:updatedBlog,
            message:'Blog updated successfully'
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.deleteBlog = async(req,res) => {
    try{
        const {id} = req.params;

        const blog = await Blog.findById({_id:id});

        if(!blog)
        {
            return res.status(404).json({
                success:false,
                message:'Blog not found'
            })
        }

        const deletedBlog = await Blog.findOneAndDelete(blog);

        res.status(200).json({
            success:true,
            data:deletedBlog,
            message:'Blog deleted successfully'
        })
    }catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}