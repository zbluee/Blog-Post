import mongoose from 'mongoose'
import {cred} from './credentials.js'

const password = encodeURIComponent(cred.password)
const url = `mongodb+srv://admin-blue:${password}@cluster0.il2bjzs.mongodb.net/blogDB`

try{
    mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true},
    ()=>console.log('Successfully Connected'))
}catch(e){
    console.log('failed');
}

const blogSchema = {
    title : {
        type : String,
        required : true
    },
    post : {
        type : String,
        required : true
    }
}

export const Blog = mongoose.model('Blog', blogSchema)

const homePageStartIn = new Blog({
    title : "Home",
    post : "Home Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean libero dui, pellentesque vitae egestas ac, molestie quis mauris. Duis tristique est ut orci vestibulum porta. Nullam sed leo at enim tristique luctus vitae eget est. Mauris auctor pellentesque ipsum, eu commodo sapien fringilla in. Phasellus tempor sagittis tellus, quis lobortis justo rhoncus quis. Aliquam vitae mauris a nisl feugiat egestas in sed metus. Nam ac libero at augue tincidunt bibendum nec vel tortor. Curabitur accumsan ornare velit in ultricies. Sed pulvinar mi nec ante varius blandit.Quisque pulvinar gravida enim et eleifend. Integer consectetur, mi dignissim molestie consectetur, justo risus ullamcorper odio, vel malesuada mi ligula eu nibh. Ut vel ipsum volutpat dui interdum ultricies nec ac enim. Proin vestibulum purus nibh, quis placerat magna mattis eget. Nullam mattis commodo sapien aliquet vestibulum. Duis maximus sem eget turpis egestas, at euismod ex ultrices. Vivamus id efficitur purus, sit amet volutpat nisi. Fusce at efficitur nulla.Suspendisse potenti. Vestibulum sed porta ipsum, eu tincidunt turpis. Morbi turpis nunc, congue sit amet nulla sed, rhoncus suscipit ipsum. Aenean sed sollicitudin orci, quis auctor purus. Vivamus est magna, placerat eu mattis a, rutrum et dolor. Mauris dignissim vestibulum erat, pulvinar scelerisque urna vestibulum et. Sed non sagittis lectus. Aliquam tristique erat ipsum, nec pharetra ante tincidunt quis. Maecenas at est in nisl convallis gravida ut nec velit."
})

const aboutPageStartIn = new Blog({
    title : "About",
    post : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean libero dui, pellentesque vitae egestas ac, molestie quis mauris. Duis tristique est ut orci vestibulum porta. Nullam sed leo at enim tristique luctus vitae eget est. Mauris auctor pellentesque ipsum, eu commodo sapien fringilla in. Phasellus tempor sagittis tellus, quis lobortis justo rhoncus quis. Aliquam vitae mauris a nisl feugiat egestas in sed metus. Nam ac libero at augue tincidunt bibendum nec vel tortor. Curabitur accumsan ornare velit in ultricies. Sed pulvinar mi nec ante varius blandit."
})

const constactPageStartIn = new Blog({
    title : "Contact",
    post : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean libero dui, pellentesque vitae egestas ac, molestie quis mauris. Duis tristique est ut orci vestibulum porta. Nullam sed leo at enim tristique luctus vitae eget est. Mauris auctor pellentesque ipsum, eu commodo sapien fringilla in. Phasellus tempor sagittis tellus, quis lobortis justo rhoncus quis. Aliquam vitae mauris a nisl feugiat egestas in sed metus. Nam ac libero at augue tincidunt bibendum nec vel tortor. Curabitur accumsan ornare velit in ultricies. Sed pulvinar mi nec ante varius blandit."
})

const defualtPageContents = [homePageStartIn, aboutPageStartIn, constactPageStartIn]

Blog.find({}, (err, foundBlogs)=>{
    if(!err && foundBlogs.length == 0){
        Blog.insertMany(defualtPageContents, (err)=>{
            if(!err){
                console.log('Successfully inserted');
            }
        })
    }else{
        console.log('already inserted');
    }
})


