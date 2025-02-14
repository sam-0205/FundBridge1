// "use client"
// import React, { useEffect, useState } from 'react'
// import { useSession, signIn, signOut } from "next-auth/react"
// import { useRouter } from 'next/navigation'
// import { fetchuser, updateProfile } from '@/actions/useractions'
import Dashboard from '../components/Dashboard'

const page = () => {
    return <>
        <Dashboard/>
    </>
    
}
export default page
export const metadata = {
    title: "Dashboard - FundBridge",
  }


import React from 'react'


