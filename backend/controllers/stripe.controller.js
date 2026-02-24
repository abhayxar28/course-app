import Stripe from "stripe"
import { Course } from "../models/course.model.js"
import { CoursePurchase } from "../models/coursePurchase.model.js"
import { asyncHandler } from "../middleware/error.middleware.js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const createStripePayOrder = asyncHandler(async (req, res) => {
  const userId = req.userId
  const { courseId } = req.body

  const course = await Course.findById(courseId)

  if (!course) {
    return res.status(404).json({ message: "Course not found" })
  }

  if (course.instructor.toString() === userId) {
    return res.status(400).json({
      message: "You cannot purchase your own course",
    })
  }

  const alreadyPurchased = await CoursePurchase.findOne({
    user: userId,
    course: courseId,
    status: "completed",
  })

  if (alreadyPurchased) {
    return res.status(400).json({
      message: "You already purchased this course",
    })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "INR",
          product_data: {
            name: course.title,
            images: [course.thumbnail],
          },
          unit_amount: course.price * 100, 
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
    metadata: {
      userId,
      courseId: course._id.toString(),
    },
  })

  res.status(200).json({
    success: true,
    url: session.url,
  })
})


export const verifyStripeSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.body

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  if (!session || session.payment_status !== "paid") {
    return res.status(400).json({
      success: false,
      message: "Payment not completed",
    })
  }

  const { userId, courseId } = session.metadata

  let purchase = await CoursePurchase.findOne({
    paymentId: sessionId,
  })

  if (!purchase) {
    purchase = await CoursePurchase.create({
      user: userId,
      course: courseId,
      amount: session.amount_total / 100,
      currency: session.currency.toUpperCase(),
      paymentMethod: "card",
      paymentProvider: "stripe",
      paymentId: session.id,
      status: "completed",
    })

    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledStudents: userId },
    })
  }

  res.json({
    success: true,
    courseId,
  })
})

