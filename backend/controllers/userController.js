import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import User from "../models/userModel.js"

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
let spaceRegex = /^\S+$/

export const signUp = catchAsyncErrors(async (req, res, next) => {
    const { fullname, username, email, password } = req.body


    if (!fullname || !username || !email || !password) {
        return next(new ErrorHandler("Fill all the fields", 403))
    }

    if (!emailRegex.test(email)) {
        return next(new ErrorHandler("Invalid email address", 403))
    }

    if (!passwordRegex.test(password)) {
        return next(new ErrorHandler("Password should contain atleast one lowercase,uppercase and a numerical", 403))
    }

    if (!spaceRegex.test(username)) {
        return next(new ErrorHandler("username should not contain spaces", 403))
    }


    const user = new User({
        personal_info: {
            fullname, email, password, username
        }
    })

    await user.save()

    res.status(200).json({
        username: user.personal_info.username,
        message: "User Created"
    })

})