const mongoose = require('mongoose');
const MongoURI = process.env.DB_URL
const MongoDB = async()=>{
    await mongoose.connect(MongoURI,{useNewUrlParser:true},async(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function(err,data){
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function(err,catData){
                    if(err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = catData
                    }
                })
            })
        }
    })
}
module.exports =  MongoDB;

