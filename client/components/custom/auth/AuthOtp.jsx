import React, { useEffect, useState } from 'react'
import InputOtpBox from './InputOtpBox'
import { Button } from '@/components/ui/button'
import LoadSpinner from '@/lib/utils/LoadSpinner'
import manageStore from '@/lib/store/store'


const AuthOtp = ({ type }) => {

  const { loading, goBack, verifyOtpAction, signedUser ,resendOtp} = manageStore()
  const [otpValue, setOtpValue] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault()

    verifyOtpAction(otpValue, signedUser, type)
  }


    const handleResend = () => {
      resendOtp(signedUser)
  }
  

  const handleGoBack = () => {
    goBack()
  }


  return (
    <div className=' px-12 py-5'>
      <h1 className='text-center pb-3'>Email Verification</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <InputOtpBox otpValue={otpValue} setOtpValue={setOtpValue} />
        <div className='flex items-center pb-5 justify-between'>
          <p onClick={handleGoBack} className='text-blueInstadark-0 font-semibold cursor-pointer text-sm ' title='on clicking you cannot signup with same email within 10 minutes'>Go back</p>
          <p onClick={handleResend} className='text-blueInstadark-0 font-semibold cursor-pointer text-sm ' title='resend otp to signed up email'>Resend</p>
        </div>
        {/* Submit Button */}
        <div className="text-center">
          <Button type="submit" className="bg-blueInstaLight-0 hover:bg-blueInstadark-0 duration-300" >{loading ? <LoadSpinner /> : "Submit OTP"}</Button>
        </div>
      </form>
    </div>
  )
}

export default AuthOtp