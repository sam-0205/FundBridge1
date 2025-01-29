"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { initiate, fetchuser, fetchpayments } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { notFound } from 'next/navigation'


const PaymentPage = ({ username }) => {
    // const username = (await params).username
    // const { data: session } = useSession();
    const [paymentform, setpaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setpayments] = useState([])
    // const router = useRouter()
    // const searchparams = useSearchParams()

    useEffect(() => {
        getdata()
    }, [])
    // useEffect(()=>{
    //     if(searchparams.get("paymentdone")=="true"){
    //         router.push(`/${username}`)
    //     }
    // })

    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getdata = async (params) => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayment = await fetchpayments(username)
        setpayments(dbpayment)
        console.log(u, dbpayment)
    }
    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform)


        let orderId = a.id;
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "got the fund", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();

    }

    
    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className="cover w-full bg-red-800 relative">
                <img className="object-cover w-full h-72" src={currentUser.coverpic}
                    alt="cover.img" />
                <div className="absolute -bottom-12 right-[44%] border border-black rounded-[10px]">
                    <img className="rounded-[10px]" width={150} height={150} src={currentUser.profilepic} alt="" />
                </div>
            </div>
            <div className="info flex flex-col justify-center items-center my-16">
                @{username}
                <div className="text-slate-400">
                    lets help {username} get a fund 
                </div>
                <div className="text-slate-100">
                    {payments.length} Payments .  ₹{payments.reduce((a,b)=> a + b.amount , 0)} raised
                </div>
                <div className="payment flex gap-3 w-[80%] m-2" >
                    <div className="suppoters w-1/2 bg-slate-800 p-6 rounded-lg">
                        <h2 className="text-lg font-bold text-center">Suppoters</h2>
                        <ul>
                            {payments.length==0 &&<li> No payments yet</li>}
                            {payments.map((p, i) => {
                                return <li className="my-2 flex items-center gap-2">
                                    <img className="rounded-full" src="user.jpg" alt="user.jpg" width={25} height={25} />
                                    {p.name} donated <span className="font-bold">₹{p.amount}</span> with a message {p.message}
                                </li>
                            })}


                        </ul>
                    </div>
                    <div className="makePayment w-1/2 bg-slate-900 text-white p-6 rounded-lg">
                        <h2 className="text-lg font-bold mb-2 ml-2">Make a Payment</h2>
                        <div className="flex gap-2 m-2">
                            <input onChange={handleChange} value={paymentform.name} type="text" name='name' className="w-1/2 p-3 rounded-lg bg-slate-800" placeholder="Enter Name" />
                            <input onChange={handleChange} value={paymentform.message} name='message' type="text" className="w-1/2 p-3 rounded-lg bg-slate-800" placeholder="Enter Message" />
                        </div>
                        <div className="flex gap-2 m-2">
                            <input onChange={handleChange} value={paymentform.amount} name='amount' type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter Amount" />
                            <button onClick={()=>pay(Number.parseInt(paymentform.amount)*100)} type="button" className="text-white bg-gradient-to-r from-blue-800 via-blue-900 to-black hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-800 dark:focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pay</button>
                        </div>
                        <div className="flex gap-2 m-2 mt-5 ">
                            <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
