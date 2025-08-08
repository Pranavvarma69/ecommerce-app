const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');

dotenv.config();

const userRoutes=require('./routes/userRoutes');
const productRoutes=require('./routes/productRoutes');

const app=express();

app.use(cors({
  origin: "http://localhost:3000", // ✅ only your frontend
  credentials: true                // ✅ allow cookies or headers
}));
app.use(express.json());

app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes)

app.get('/',(req,res)=>{
    res.send('API is running...');
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));
