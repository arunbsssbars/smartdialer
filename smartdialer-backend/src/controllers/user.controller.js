import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
// import { User } from "../models/user.model.js"
// import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import { executeQuery } from "../db/queryHandler.js";
// import mongoose from "mongoose";

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    console.log(email, password);

    if (!email && !password) {
        throw new ApiError(400, "email or password is required")
    }


    // checking if it is a valid user 
    const queryUser = 'SELECT id, username, usertype, allowed_procss, dialing_dest, status FROM dialme WHERE username = ?';
    const [[user]] = await executeQuery(queryUser, [email]);

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    //  checking if it is a user with valid password
    const userValidationQuery = 'SELECT * FROM dialme WHERE id = ?';
    const [[validUser]] = await executeQuery(userValidationQuery, [user.id]);
    const isPasswordValid = validUser.passcode === password;

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    // Generate Access tokens
    const accessToken = jwt.sign({ id: validUser.id, username: validUser.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

    const loggedInUser = user; //from queryUser


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken
                },
                "User logged In Successfully"
            )
        )

})

// const logoutUser = asyncHandler(async (req, res) => {
//     await User.findByIdAndUpdate(
//         req.user._id,
//         {
//             $unset: {
//                 refreshToken: 1 // this removes the field from document
//             }
//         },
//         {
//             new: true
//         }
//     )

//     const options = {
//         httpOnly: true,
//         secure: true
//     }

//     return res
//         .status(200)
//         .clearCookie("accessToken", options)
//         .clearCookie("refreshToken", options)
//         .json(new ApiResponse(200, {}, "User logged Out"))
// })

// const refreshAccessToken = asyncHandler(async (req, res) => {
//     const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

//     if (!incomingRefreshToken) {
//         throw new ApiError(401, "unauthorized request")
//     }

//     try {
//         const decodedToken = jwt.verify(
//             incomingRefreshToken,
//             process.env.REFRESH_TOKEN_SECRET
//         )

//         const user = await User.findById(decodedToken?._id)

//         if (!user) {
//             throw new ApiError(401, "Invalid refresh token")
//         }

//         if (incomingRefreshToken !== user?.refreshToken) {
//             throw new ApiError(401, "Refresh token is expired or used")

//         }

//         const options = {
//             httpOnly: true,
//             secure: true
//         }

//         const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id)

//         return res
//             .status(200)
//             .cookie("accessToken", accessToken, options)
//             .cookie("refreshToken", newRefreshToken, options)
//             .json(
//                 new ApiResponse(
//                     200,
//                     { accessToken, refreshToken: newRefreshToken },
//                     "Access token refreshed"
//                 )
//             )
//     } catch (error) {
//         throw new ApiError(401, error?.message || "Invalid refresh token")
//     }

// })

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const query = 'SELECT * FROM sipusers';
        const [results] = await executeQuery(query);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { results },
                    "All Users Data Fetched successfully"
                )
            )
    } catch (error) {
        throw new ApiError(501, error?.message || "Internal Server Error")
    }

})

// const updateAccountDetails = asyncHandler(async (req, res) => {
//     const { fullName, email } = req.body

//     if (!fullName || !email) {
//         throw new ApiError(400, "All fields are required")
//     }

//     const user = await User.findByIdAndUpdate(
//         req.user?._id,
//         {
//             $set: {
//                 fullName,
//                 email: email
//             }
//         },
//         { new: true }

//     ).select("-password")

//     return res
//         .status(200)
//         .json(new ApiResponse(200, user, "Account details updated successfully"))
// });



export {
    loginUser,
    //     logoutUser,
    //     refreshAccessToken,    
    getAllUsers,
    //     updateAccountDetails,
}