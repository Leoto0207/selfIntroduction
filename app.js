const express = require('express');
const dotenv = require('dotenv');
const app = express();
const path = require('path');
const connectdb = require('./server/database/connection');
const Contactdb = require('./model/model');

dotenv.config({path:'config.env'});

connectdb();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


app.get('/', (req, res)=> {
    res.render('index');
});

app.post('/add_contact', async (req, res) => {

    try{
        const {name, company, email, contact} = req.body;
        const newContact = new Contactdb({name, company, email, contact});
        await newContact.save();
        res.render('/');
    }catch(e){
        console.log("Error", e);
        res.redirect('/');
    }
});


app.listen(3000, function(){
    console.log('the app started at port 3000');
})