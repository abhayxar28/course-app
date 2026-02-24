import { useSession } from "@/hooks/user/useSession"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProfileComponent() {
  const { user } = useSession()
  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      
      {/* Profile Header */}
      <Card className="shadow-md">
        <CardContent className="flex flex-col md:flex-row items-center gap-6 p-8">
          
          <Avatar className="w-24 h-24">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="text-2xl">
              {user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-muted-foreground">{user?.email}</p>

            <Badge className="mt-2 capitalize">
              {user?.role}
            </Badge>
          </div>

          <Button variant="outline">
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Account Details */}
      <Card className="mt-8 shadow-sm">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Full Name</span>
            <span className="font-medium">{user?.name}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium">{user?.email}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Role</span>
            <span className="font-medium capitalize">{user?.role}</span>
          </div>

        </CardContent>
      </Card>

    </div>
  )
}
