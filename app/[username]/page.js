import React from "react"
import PaymentPage from "../components/PaymentPage"
import { notFound } from "next/navigation"
import connectDB from "@/db/connectDb"
import User from "@/models/User"

export default async function Username({ params }) {
    const username = (await params).username
    
    const checkuser = async ()=>{
        
        await connectDB()
        let u = await User.findOne({username: username})
        if(!u){
            return notFound()
        }
    }
    await checkuser()
    return <>
        <PaymentPage username={username}/>
    </>
}

export async function generateMetadata({ params }) {
    return {
      title: `${(await params).username} - FundBridge`,
    }
}
