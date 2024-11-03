import React from 'react'
import AuthPage from '@/components/custom/auth/AuthPage'

const page = () => {
    return (
        <section className='flex items-center h-screen justify-center'>

            <AuthPage type={"signup"} />

        </section>
    )
}

export default page