const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mongoose-test');
const validator = require("validator");
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator: function(val){
                // if(!val.includes('@')) throw new Error("This is not an Email")
                if(!validator.isEmail(val))
                    throw new Error("This is not an Email")
            },
        },
    },
    age:{
        type:Number,
        required:true,
        default:0,
    }
});

const User2 = mongoose.model("User2", userSchema) //괄호안 첫번쨰인자가 몽고디비/데이터베이스 mongoose-test/컬렉션 user2 임. 대문자로 첫번쨰 인자 설정해도 소문자로 들어감

// const newUser = new User2({name:"Chuchu", email: "chuchu@gmail.com", password:"  abcde", age:32});
// newUser.save().then(val => console.log(val))

// User.find().then(val => console.log("all data", val))
User2.find({name: 'Chuchu'})
.select("name -_id")
.then(val => console.log("all data", val))