import axios from "axios"

export const userSlice = (set, get) => ({
    signUpAction: async (fullname, username, email, password) => {
    
        try {
            const { data } = await axios.post(`http://localhost:5050/api/v1/signup`, { fullname, username, email, password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            console.log(data)
           
        } catch (error) {
            console.log(error)
        }
    },
})