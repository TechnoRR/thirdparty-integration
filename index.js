const express = require('express')
const Razorpay = require('razorpay')

let app = express()

const razorpay = new Razorpay({
    key_id:'rzp_test_pKe5YRGmwrqWGu',
    key_secret:'EKrOEBixBbCLgNi0ErmuGj0y',
})

app.set('views', 'views')
app.set ('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.get('/',(req,res)=>
{
    res.render('razorpay.ejs')
})

app.post('/order',(req,res)=>{
    var options ={
        amount: 50000,
        currency:"INR",
    
    };
    razorpay.orders.create(options,function(err,order){
        console.log(order)
        res.json(order)

    });
})

app.post('/is-order-complete',(req,res)=>{
razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument)=>{
    if(paymentDocument.status =='captured'){
        res.send('Payment Successful')
    }
    else{
        res.redirect('/')
    }
})


})

app.listen(8000);
