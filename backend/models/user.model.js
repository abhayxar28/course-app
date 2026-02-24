import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from 'crypto';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [50, "Name can't exceed 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, "Please provide a valid email"]    
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be atleast 6 characters long"],
        select: false
    },
    role:{
        type: String,
        enum: {
            values: ["student", "instructor", "admin"],
            message: "Please select the valid role"
        },
        default: "student"
    },
    avatar: {
        type: String,
        default: "default-avatar.png",
    },
    bio:{
        type: String,
        maxLength: [200, "Bio cannot exceed 200 characters."]
    },
    enrolledCourses: [{
        course:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        },
        enrolledAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    lastActive: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})


userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.getResetPasswordToken = function() {
    const token = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest('hex')
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
    return token
}

userSchema.methods.updateLastActive = async function () {
    this.lastActive = Date.now();
    return this.save({ validateBeforeSave: false });
};

userSchema.virtual("totalEnrolledCourses").get(function(){
    if (!this.enrolledCourses) return 0;
    return this.enrolledCourses.length;
})


export const User = mongoose.model("User", userSchema);