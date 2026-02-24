import { deleteMediaFromCloudinary, uploadMedia } from '../utils/cloudinary.js';
import { ApiError, asyncHandler } from '../middleware/error.middleware.js';
import { User } from '../models/user.model.js'
import { generateToken } from '../utils/generateToken.js';
import { createUserSchema } from '../validation/user.validation.js';

export const createUserAccount = asyncHandler(async(req, res)=>{
    const parsedInput = await createUserSchema.safeParseAsync(req.body);

    if (!parsedInput.success) {
        throw new ApiError( 
            "Validation failed",
            400
        );
    }

    const {email, name, role, bio, password} = parsedInput.data;

    const existingUser = await User.findOne({email: email.toLowerCase()})

    if(existingUser){
        throw new ApiError("User already exists", 400);
    }

    const avatar = await uploadMedia(req.file.path);

    if (!avatar?.url) {
        throw new ApiError(500, "Avatar upload failed");
    }

    const user = await User.create({
        name, 
        email: email.toLowerCase(),
        password,
        role,
        bio,
        avatar: avatar.url,
    })

    user.updateLastActive();
    return res.status(201).json({message: "User created successfully"});
})

export const authenticateUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User
        .findOne({ email: email.toLowerCase() })
        .populate("createdCourses")
        .select("+password");

    if (!user || !(await user.comparePassword(password))) {
        throw new ApiError("Invalid email or password", 401);
    }

    await user.updateLastActive();

    return generateToken(res, user, `Welcome back ${user.name}`);
});

export const signOutUser = asyncHandler(async (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Signed out successfully",
  });
});


export const getCurrentUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.userId).select("-password")

    if(!user){
        return res.status(400).json({message: "User not present"})
    }

    res.status(200).json({
        success: true,
        user
    })

})

export const updateUserProfile = asyncHandler(async(req, res)=>{
    const {name, email, bio} = req.body;

    const updateData = {name, email: email?.toLowerCase(), bio};
    
    if(req.file){
        const avatarResult = await uploadMedia(req.file.path);
        updateData.avatar = avatarResult.secure_url

        const user = await User.findById(req.id);
        if(user.avatar && user.avatar !== "default-avatar.png"){
            await deleteMediaFromCloudinary(user.avatar);
        }
    }

    const updatedUser = await User.findByIdAndUpdate(req.userId,
        updateData,
        {new: true, runValidators: true}
    )

    if(!updatedUser){
        throw new ApiError("User not found", 404);
    }

    return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser
    })
})

export const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.userId;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        return res.status(404).json({
            status: "fail",
            message: "User not found"
        });
    }

    return res
        .clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })
        .status(200)
        .json({
            status: "success",
            message: "User deleted successfully"
        });
});

export const allUser = asyncHandler(async(_req, res)=>{
    const users = await User.find().select("email role")

    return res.json(users);
})