const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const connectDB=require('./Database/connect');

const buyerSignup=require('./routes/SignUp.routes');
const Login=require('./routes/Login.routes');
const sellerSignUp=require('./routes/becomeAChef.routes');
// const sellerProfile=require('./routes/SellerProfile.route');
const sellerItem=require('./routes/sellerAddItem.routes');
const getSellerItem=require('./routes/getSellerItem');
const getBakery=require('./routes/getBakery');
const getConfectionary=require('./routes/getConfectionary');
const getBeverages=require('./routes/getBeverages');
const getMealBoxes=require('./routes/getMealBoxes');
const getTraditional=require('./routes/getTraditionalDishes');
const getJams=require('./routes/getJams');
const getCustomOrders=require('./routes/getCustomOrders');
const order=require('./routes/order');


require('dotenv').config();
connectDB(process.env.MONGODB_URL);

const app=express();
const PORT=5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/buyerSignup',buyerSignup);
app.use('/Login',Login);
app.use('/becomeAChef',sellerSignUp);
// app.use('/sellerProfile',sellerProfile);
app.use('/sellerAddItem',sellerItem);
app.use('/getSellerItem',getSellerItem);
app.use('/getBakery',getBakery);
app.use('/getConfectionary',getConfectionary);
app.use('/getBeverages',getBeverages);
app.use('/getMealBoxes',getMealBoxes);
app.use('/getTraditonal',getTraditional);
app.use('/getJams',getJams);
app.use('/getCustomOrders',getCustomOrders);
app.use('/orders',order)

console.log(app._router.stack.filter(r => r.route).map(r => r.route.path));


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
});