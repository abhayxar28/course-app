import mongoose, { Schema } from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Course title is required"],
        trim: true,
        maxLength: [100, "Course title cannot exceed 100 characters"]
    },
    subtitle: {
        type: String,
        trim: true,
        maxLength: [200, "Course subtitle cannot exceed 200 characters"]
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        enum: {
            values: ["Web Development", "AI/ML", "Data Science", "Programming", "Data Analytics"],
            message: "Please select a valid course categorys"
        },
        trim: true
    },
    levels: {
        type: String,
        enum: {
            values: ["beginner", "intermediate", "advanced"],
            message: "Please select a valid course level"
        },
        default: "beginner"
    },
    price: {
        type: Number,
        required: [true, "Course price is required"],
        min: [0, "Course price must be a non-negative number"]
    },
    thumbnail: {
        type: String,
        required: [true, "Course thumbnail is required"]
    },
    enrolledStudents:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    lectures: [{
        type: Schema.Types.ObjectId,
        ref: "Lecture"
    }],
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Course instructor is required"]
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    totalDuration: {
        type: Number,
        default: 0
    },
    totalLectures: {
        type: Number,
        default: 0
    },
    ratings: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        }
        
    }]
},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})


courseSchema.pre("save", function () {
  this.totalLectures = this.lectures?.length || 0;
});

export const Course = mongoose.model("Course", courseSchema);