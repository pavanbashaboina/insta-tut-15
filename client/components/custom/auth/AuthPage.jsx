"use client"

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { InstaLogoText } from '@/lib/utils/helper'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import googlePng from "../../../public/google.png"
import Image from 'next/image'
import manageStore from '@/lib/store/store'
import LoadSpinner from '@/lib/utils/LoadSpinner'
import AuthOtp from './AuthOtp'
import { useRouter } from 'next/navigation'

const AuthPage = ({ type }) => {

    const { signUpAction, signedUser, loading, isAuthenticated, loginAction,googleSignUP } = manageStore()

    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [passwordShow, setPasswordShow] = useState(false);
    const [password, setPassword] = useState("")
    const [otpState, setOtpState] = useState(false)

    const router = useRouter()

    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault()

        if (type === "signup") {
            signUpAction(fullname, username, email, password)
        } else {
            loginAction(email, password)
        }
    }

    const handleGoogleSignup = () => {
        googleSignUP()
    }

    useEffect(() => {
        if (signedUser) {
            setOtpState(true)
        } else {
            setOtpState(false)
        }

        if (isAuthenticated) {
            router.push("/")
        }

    }, [signedUser, isAuthenticated])

    return (
        <div className=' px-2 py-10 flex flex-col items-center rounded-3xl w-full max-w-[400px] border border-input'>
            <div className='mb-4'>
                {InstaLogoText}
            </div>
            {
                type === "signup" && otpState ?
                    <AuthOtp type="signup" />
                    : (
                        <form onSubmit={handleSubmit} className='w-[90%] max-w-[95%]'>
                            {
                                type === "signup" && (
                                    <>
                                        <Input className="mb-5 py-5" placeholder="username" type="text" onChange={(e) => setUsername(e.target.value)} />
                                        <Input className="mb-5 py-5" placeholder="fullname" type="text" onChange={(e) => setFullname(e.target.value)} />
                                    </>
                                )
                            }
                            <Input className="mb-5 py-5" placeholder={`${type === "signup" ? "email" : "email or username"}`} type={`${type === "signup" ? "email" : "text"}`} onChange={(e) => setEmail(e.target.value)} />
                            <div className='relative'>
                                <Input className=" mb-5 py-5" placeholder="password" onChange={(e) => setPassword(e.target.value)} type={passwordShow ? "text" : "password"} />
                                <i className={`fi ${!passwordShow ? "fi-sr-eye" : "fi-sr-eye-crossed"} absolute right-4 cursor-pointer top-0 translate-y-1/2`} onClick={() => setPasswordShow(!passwordShow)}></i>
                            </div>
                            {type === "signin" && (
                                <Link href={"/forgotpassword"} className='text-blueInstadark-0 font-semibold text-[15px]'>Forgot Password</Link>
                            )}
                            <Button type="submit" className="w-full my-5 duration-300 font-semibold bg-blueInstaLight-0 hover:bg-blueInstaLight-0"  >
                                {
                                    loading ?
                                        <LoadSpinner />
                                        :
                                        (type === "signup" ? "Sign up" : "Sign in")
                                }
                            </Button>
                            <div className='flex gap-2 items-center justify-center w-full'>
                                <hr className='w-1/2 border-input' />
                                <p className='text-[12px]'>OR</p>
                                <hr className='border-input w-1/2' />
                            </div>
                            <p onClick={handleGoogleSignup} className="w-full border border-input rounded-full py-2 cursor-pointer flex items-center justify-center gap-1 my-5">
                                <Image alt='google' src={googlePng} className='w-5 mr-2' />
                                Sign in with Google
                            </p>
                            {type === "signup" ? (
                                <p className='text-[15px]'>Already have an account? <Link className='text-blueInstadark-0 font-bold' href="/signin">Sign in</Link></p>
                            ) : (
                                <p className='text-[15px]'>Don't have an account? <Link className='text-blueInstadark-0 font-bold' href="/signup">Sign up</Link></p>
                            )}
                        </form>
                    )
            }
        </div>
    )
}

export default AuthPage