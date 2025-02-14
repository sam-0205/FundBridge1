"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDb"
import User from "@/models/User"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()
    let user = await User.findOne({username: to_username})
    const secret = user.razorpaysecret
    const rid = user.razorpayid
    let instance = new Razorpay({ key_id: rid, key_secret: secret })

    instance.orders.create({
    amount: 5000,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
        key1: "value3",
        key2: "value2"
    }
    })

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)
    console.log(x);
    await Payment.create({oid: x.id, amount: amount/100, to_user: to_username, name: paymentform.name, message: paymentform.message})

    return x
}

export const fetchuser = async (username) => {
    await connectDB()
    let u = await User.findOne({username: username})
    // console.log(u);
    let user = u.toObject({flattenObjectIds: true})
    // console.log(user);
    return user;
}

export const fetchpayments = async (username) => {
    await connectDB()
    let p = await Payment.find({to_user: username, done: true}).sort({amount: -1}).lean()
    p = p.map(payment => ({
        ...payment,
        _id: payment._id.toString(),  // Convert ObjectId to string
        createdAt: payment.createdAt.toISOString(),  // Convert Date to ISO string
        updateddAt: payment.updateddAt.toISOString()  // Convert Date to ISO string
      }));
    return p;
}



export const updateProfile =async (data, oldusername) => {
    await connectDB()
    let ndata = Object.fromEntries(data)
    if(oldusername !== ndata.username){
        let u = await User.findOne({username: ndata.username})
        if(u){
            return {error: "Username already exists"}
        }
        await User.updateOne({email: ndata.email}, ndata)
        // Now update all the username in Payment table
        await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
    }
    else{
        await User.updateOne({email: ndata.email}, ndata)
    }
}