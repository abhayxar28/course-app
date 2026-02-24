import mongoose from "mongoose";
import { Schema } from "mongoose";

const videoSchema = new Schema({
    videoTitle: {
        type: String,
        required: [true, "Title is required"],
    },
    videoUrl: {
        type: String,
        required: [true, "Video URL is required"],
    },
    order: {
        type: Number,
        required: [true, "Lecture order is required"]
    },
    duration:{
        type: Number,
        default: 0
    },
    publicId: {
        type: String,
        required: [true, "Public ID is required for video management"]
    },
    lecture: {
      type: Schema.Types.ObjectId,
      ref: "Lecture",
      required: true
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true
    }
}, {
    timestamps: true
});

export const Video = mongoose.model("Video", videoSchema);