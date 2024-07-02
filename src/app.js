require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose')
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const filePath = path.join(__dirname,'/public/images')
const bodyParser = require('body-parser');

/* -------------------- Middlewares -------------------- */
app.use(cors());
app.use(express.json());  
app.use(morgan('dev'));

/* -------------------- Image Routes -------------------- */
app.use('src/public/images',express.static(filePath));
const appliRoutes = require('./routes/admin/index.routes')
const appRoutes = require('./routes/user/index.routes');




/* -------------------- Application Routes -------------------- */
app.use('/apis/app',appRoutes);
app.use('/apis/app',appliRoutes);




/* -------------------- Server & DB Connection -------------------- */
app.listen(port, async() =>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB is connected..."))
    .catch((error) => console.log(error));
    console.log(`Server is listening on http://locahost:${port}`);
})