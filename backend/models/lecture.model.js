import mongoose, { Schema } from "mongoose";

const lectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Lecture title is required"],
        trim: true,
        maxLength: [100, "Lecture title cannot exceed 100 characters"]
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, "Lecture description cannot exceed 500 characters"]
    },
    video: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    order: {
        type: Number,
        required: [true, "Lecture order is required"]
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }
},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

lectureSchema.pre("save", function(){
    if (this.duration) {
        this.duration = Math.round(this.duration * 100) / 100;
    }
})

export const Lecture = mongoose.model("Lecture", lectureSchema)