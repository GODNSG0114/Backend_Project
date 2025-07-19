import { asynHandler } from "../utils/asynHandler.js"
import { ApiError } from "../utils/API_error.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import fs from "fs"
import  jwt  from "jsonwebtoken"
import apiResponse from "../utils/Api_response.js"
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken() 

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false });
        //    console.log("generateModule" , userAccessToken)
        //   console.log("generateModule" ,userRefreshToken)
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access token")
    }
}


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
        new apiResponse(200, createdUser, "User Register Successfuly")
    )
})

const loginUser = asynHandler(async (req, res) => {
    /* 
      1. took email and password from req.body 
         a. if email or password is empty then throw error
      2. find user in DB 
      3. password check
      4. else throw error
      5.if password matched then generate access and refress token 
      6. send cookie (cookie contain access and refresh token)
    */

    const { email, username, password } = req.body
    if (email === "" && username === "") {
        throw new ApiError(400, "username or password is required")
    }
    // checking user present in DB or not 
    const user = await User.findOne({
        $or: [{ email }, { username }]
    })
    if (!user) throw new ApiError(400, "User does not exist")
    // checking password 
    const ispasswordvalid = await user.isPasswordCorrect(password)
    if (!ispasswordvalid) {
        throw new ApiError(400, "Wrong password")
    }

    //  make access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")


    // send through cookies
    const option = {
        httpOnly: true,   // cookies are modifiable bidefault 
        secure: true     // but due to this two options it only modifiable in backend
    }
    return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new apiResponse(200, {
                user: loggedInUser, accessToken, refreshToken
            },
                "user logged in successfully"
            )
        )

})

const logoutUser = asynHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined }
        },
        {
            new: true
        }
    )
    const option = {
        httpOnly: true,   // cookies are modifiable bidefault 
        secure: true     // but due to this two options it only modifiable in backend
    }
    return res
        .status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(
            new apiResponse(200, {}, "Logout successfully")
        )
})

const refreshAccessToken = asynHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request")
    }

    const decodedToken =  jwt.verify(incomingRefreshToken, REFRESH_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id)
    if (!user) {
        throw new ApiError(401, "Invalid refresh token")
    }

    if (incomingRefreshToken !== user?.refreshToken) {
        throw new apiResponse(401, "refresh token is expired or used");
    }

    //  make access and refresh token
    const { accessToken,newrefreshToken } = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    // send through cookies
    const option = {
        httpOnly: true,   // cookies are modifiable bidefault 
        secure: true     // but due to this two options it only modifiable in backend
    }
    return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", newrefreshToken, option)
        .json(
            new apiResponse(200, {
                user: loggedInUser, accessToken, refreshToken
            },
                "Access token refreshed succesfully"
            )
        )


})
export {
    registerUser,
    loginUser,
    logoutUser,
   refreshAccessToken

};