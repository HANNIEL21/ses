import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Tabs defaultValue="login" className='w-full max-w-md'>
        <TabsList className='w-full mb-4 px-3'>
          <TabsTrigger value="login">Student Login</TabsTrigger>
          <TabsTrigger value="admin">Admin Login</TabsTrigger>
        </TabsList>

        {/* Login */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Student Login</CardTitle>
              <CardDescription>Enter your matric number</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="mat-no">Mat Number</Label>
                <Input id="mat-no" placeholder='De.xxxx/xxxx' autoFocus />
              </div>
            </CardContent>
            <CardFooter className='flex justify-end'>
              <Button onClick={()=> navigate('/user')}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Admin */}
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>Enter your admin credentials</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" placeholder='John.Doe' />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder='Enter Password' />
              </div>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <a href="/forgot-password" className="text-sm underline-offset-4 hover:underline">Forgot your password?</a>
              <Button onClick={()=> navigate('/dashboard')}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Login