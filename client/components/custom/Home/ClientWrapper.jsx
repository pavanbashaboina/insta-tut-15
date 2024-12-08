"use client"

import React from 'react'
import SideBar from './SideBar'


const ClientWrapper = ({ children }) => {
  return (
    <div className='flex min-h-screen'>
      <SideBar />
      <main className='flex-1 md:pl-20 overflow-x-hidden'>
        {children}
      </main>
    </div>
  )  
}

export default ClientWrapper