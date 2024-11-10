import axios from "axios"
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../utils/firebase"

const handleError = (error, get) => {
    get().setErrorMessage(error.response ? error.response.data.message : error.message)
    get().setIsloading(false)
}

export const userSlice = (set, get) => ({

    signedUser: null,
    user: null,
    isAuthenticated: false,
    verifiedUser: false,

    //handle go back
    goBack: () => {
        set({ signedUser: null })
    },

    //signup
    signUpAction: async (fullname, username, email, password) => {
        get().setIsloading(true)
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/signup`, { fullname, username, email, password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            get().setMessage(data.message)
            set({ signedUser: data.username })
            get().setIsloading(false)

        } catch (error) {
            handleError(error, get)
        }
    },

    //verify otp
    verifyOtpAction: async (otp, user, type) => {
        get().setIsloading(true)
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/verify-otp`, { otp, user, type }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            if (type === "forgot") {
                set({ verifiedUser: true, isAuthenticated: false, signedUser: data.user })
                get().setMessage(data.message)
                get().setIsloading(false)
            } else {
                get().setMessage(data.message)
                set({ user: data, isAuthenticated: true, signedUser: null })
                get().setIsloading(false)
            }

        } catch (error) {
            handleError(error, get)
        }
    },


    //resend otp
    resendOtp: async (user) => {
        get().setIsloading(true)
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/resend-otp`, { user }, {
                headers: {
                    "Content-Type": "application/json"
                },
            })

            get().setMessage(data.message)
            get().setIsloading(false)
            set({ signedUser: data.user })
        } catch (error) {
            handleError(error, get)
        }
    },


    //Login
    loginAction: async (user, password) => {
        get().setIsloading(true)
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/login`, { user, password }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            })

            set({ user: data, isAuthenticated: true, signedUser: null })
            get().setMessage(data.message)
            get().setIsloading(false)

        } catch (error) {
            handleError(error, get)
        }
    },

    //reset password
    resetPasswordAction: async (user, password, confirmPassword) => {
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/reset-password`, { user, password, confirmPassword }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            get().setMessage(data.message)
            set({ signedUser: null, verifiedUser: null })
            get().setIsloading(false)
        } catch (error) {
            handleError(error, get)
        }
    },


    //GOOGLE SIGNIN
    googleSignUP: async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            const idToken = await result.user.getIdToken()

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/v1/google-signup`, { idToken }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            set({ user: data, isAuthenticated: true, signedUser: null })
            get().setMessage(data.message)
            get().setIsloading(false)

        } catch (error) {
            handleError(error, get)
        }
    }

})



