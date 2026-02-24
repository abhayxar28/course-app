import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code, Users } from "lucide-react"
import {Link} from 'react-router-dom';

export default function LandingComponent() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-white" />,
      title: "Expert Instructors",
      desc: "Learn from industry leaders and university professors with real-world experience.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <Code className="w-8 h-8 text-white" />,
      title: "Hands-On Projects",
      desc: "Apply what you learn with practical assignments and full-stack projects.",
      color: "from-green-400 to-teal-500"
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Global Community",
      desc: "Join millions of learners worldwide and collaborate in discussion forums.",
      color: "from-pink-500 to-rose-500"
    }
  ]

  return (
    <div className="bg-background text-foreground">

      <section className="relative overflow-hidden py-32 px-6 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 -z-10 bg-linear-to-br from-primary/20 via-purple-50/10 to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <Badge className="mb-4 animate-bounce">🎓 Featured Courses</Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Learn Skills That Matter
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mb-8">
            Access thousands of courses from top universities and industry experts.  
            Flexible learning anytime, anywhere.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row justify-center gap-6 mb-10"
          >
            <div className="bg-muted/30 p-4 rounded-lg shadow-md hover:scale-105 transition transform">
              <h3 className="font-semibold text-lg mb-1">📜 Verified Certificates</h3>
              <p className="text-sm text-muted-foreground">Earn recognized certificates to boost your resume.</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg shadow-md hover:scale-105 transition transform">
              <h3 className="font-semibold text-lg mb-1">💡 Expert Instructors</h3>
              <p className="text-sm text-muted-foreground">Learn from professionals and top-ranked educators.</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg shadow-md hover:scale-105 transition transform">
              <h3 className="font-semibold text-lg mb-1">⏱ Flexible Learning</h3>
              <p className="text-sm text-muted-foreground">Learn at your own pace with lifetime access to materials.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0,scale: 0}}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link to='/dashboard'>
              <Button size="lg" variant="secondary" className='bg-gray-900 hover:bg-gray-950 text-white cursor-pointer' >
                View Courses
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-24 px-6 lg:px-16 bg-muted/40">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-3 hover:scale-105 border border-transparent hover:border-primary">
                <CardContent className="flex flex-col items-center text-center space-y-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-linear-to-tr ${feature.color} animate-pulse`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 lg:px-16 bg-primary text-primary-foreground text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Learning Today
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-6">
            Explore courses, gain new skills, and advance your career.
          </p>
          <Link to='/dashboard'>
            <Button size="lg" variant="secondary" className='cursor-pointer'>
              View Courses
            </Button>
          </Link>
        </motion.div>
      </section>

    </div>
  )
}
