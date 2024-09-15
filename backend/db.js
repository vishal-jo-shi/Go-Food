const mongoose = require('mongoose');
const { Await } = require('react-router-dom');
const mongoURL='mongodb://localhost:27017/local'
const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('Connected to MongoDB');
        const fetched_data= await mongoose.connection.db.collection("food_item");
        const data = await fetched_data.find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("food_category");
        const catData=await foodCategory.find({}).toArray();
        global.food_items = data;
        global.food_category = catData;
    } catch (error) {
        console.log('Connection failed', error);
    }
};

module.exports = mongoDB;