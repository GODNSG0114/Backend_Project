import { asynHandler } from "../utils/asynHandler.js"
import { ApiError } from "../utils/API_error.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import ApiResponse from "../utils/Api_response.js"
import fs from "fs"
const registerUser = asynHandler(async (req, res) => {
    /*    1. get user detail from frontend
          2. Validation - not empty
          3. check in DB isPresent - email or username
          4. if yes login
              a. check for images and avatar
              b. upload on cloudinary, character
              c. create user object - create entry in DB
              d. check for user creation 
              e. remove password and refresh token field from responce
              f. return res 

           5. else signup   */

    const { fullname, email, username, password } = req.body
    console.log("email: ", email)

    // Validation
    if (fullname === "" || email === "" || username === "" || password === "") {
        throw new ApiError(400, "Full name is required")
    }
    if (!email.includes("@")) {
        throw new ApiError(400, "Email is not valid")
    }
    if (username.length < 3) {
        throw new ApiError(400, "Username must be at least 3 characters long")
    }

    //authentication
    const exestedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (exestedUser) {
        fs.unlinkSync(req.files?.avatar[0]?.path)
        if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
            fs.unlinkSync(req.files.coverImage[0].path)
        }
        throw new ApiError(400, "user with email or username already exists")
    }
    // check for images and avatar
    const avatarLocalPath = req.files?.avatar[0]?.path
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = await req.files.coverImage[0].path
    }
    if (!avatarLocalPath) throw new ApiError(400, "avatar file is required")    // if avatar is not exist then trow error beacause avatar is compulsory

    // upload on cloudinary

    const avatarOnCloudinary = await uploadOnCloudinary(avatarLocalPath)
    const coverImageOnCloudinary = await uploadOnCloudinary(coverImageLocalPath)
    if (!avatarOnCloudinary) throw new ApiError(400, "avatar file is required")

    // entry in MongooDB dataset
    const user = await User.create({
        fullname,
        avatar: avatarOnCloudinary.url,
        coverImage: coverImageOnCloudinary?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // check user created or not also remove password and refresh token field from responce

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering a user")
    }
    // send response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Register Successfuly")
    )
})

export { registerUser };