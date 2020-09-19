const mongoose = require('mongoose');
const validator = require('validator')
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHgAbwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAgUBAwYEB//EADYQAAICAQIDBgEKBwEAAAAAAAABAgMRBBITITEFQVFTYZKhFCIjMlJxkbHB0RUzQmKBguEk/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD7iAAAAAAGm/VU6fHFnhvourA3A8Mu1NMly3t+G0hDtapzxKucV49QLEGqm+q7+VNS9O82gAAAAAAAAAABVa7tGyF0q6MLa8OWM5ZXXWzunvtluljGTFkt1k5eMmyJQAARKE5VyUoNxkujRd9n6xamO2XKyPVePqUR6uzZ7NbX65T/AAIq/AAAAAAAAMPoZAHLAndHbdZHwk18SBUAAANuleNTU/71+ZqN2jju1VS/vQHRgAigAAAAAa793Bs4bxPa8P1NgA5Ztybk+bfN5Bs1EHXfZBrGJM1lQAAAlU5qyPDbU84TRE9PZ0HPWVYXJPL9AL9dOfUyARQAAAAAAAFZ21X9HXYl0eGVJ0uoqjdTKuXRr8DmgAAKgXfZENulUsc5tvPoU9FfFuhXnG6SR0kIqEFGKwksIipAAAAAABC22FUd1klFerAmRnOMIuU5KMV3tlZqe1Xzjp4/7S/YrrbZ2y3WScn6gWmp7UhFONC3v7T6FQAVAAASrm65xnHrF5RcabtOqxJW/Ry9en4lKAOojJSScWmn3oyc1TfbQ81za9O5llp+1Yy+bfHa/tR6EVZgjCcZxUoSTT70yQHi12vjp/mQSlb4eBTXWzunusk5P8iVqusslOVdmZPP1WR4Vnlz9rAgCXDs8uftY4dnlz9rKiIJcOzy5+1jh2eXP2sCIJcOzy5+1meFZ5c/awIAlw7PLn7WOHZ5c/awIglw7PLn7WOHZ5c/awqen1FmnlurljxXcy60WrhqYfZmvrRyUfCs8uftZs07uoujZGuzln+lkHRAADw6n+IO/wD8/CVSWfnLm3h8uvjjw/yeeb7Yc8xVSxFYjhNN4ee/xwZAE5fxTEMcHnhzxHGOme/v5/uQT7XcI7o0Kaw3jo+bz3+GMfoABO+XaeZ/J66Uv6d33L1+/wCBtr+X8Kze6HZu+je1pbc96z1x8QANOth2lLU50lm2rMeUtvrn9P8ApCVXacVZttlLNctv1Vtlubjz7+WE/uMgA4dptzTm0nZZtlHbyi09vJ+Dx8TfoI61WP5XLMeHHly+tzz+n4AAe4AAf//Z"
    },
    followers:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }],
    following:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }]
})



const User = mongoose.model("User",userSchema);
module.exports = User;