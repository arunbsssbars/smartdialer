import { Router } from "express";
import {
       loginUser,
//     logoutUser,
//     registerUser,
//     refreshAccessToken,
//     changeCurrentPassword,
//     getCurrentUser,
       getAllUsers,
//     updateUserAvatar,
//     updateUserCoverImage,
//     getUserChannelProfile,
//     getWatchHistory,
//     updateAccountDetails
} from "../controllers/user.controller.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";


const userRouter = Router()


userRouter.route("/login").post(loginUser)

//secured routes

// router.route("/logout").post(verifyJWT, logoutUser)
userRouter.route("/getAllUsers").get(getAllUsers)
// router.route("/refresh-token").post(refreshAccessToken)
// router.route("/change-password").post(verifyJWT, changeCurrentPassword)
// router.route("/current-user").get(verifyJWT, getCurrentUser)

// router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
// router.route("/history").get(verifyJWT, getWatchHistory)

export default userRouter