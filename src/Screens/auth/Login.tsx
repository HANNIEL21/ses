import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { log } from 'console'
import { Toast } from '@/components/Toast'

const Login = () => {

  const navigate = useNavigate();

  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        // withCredentials: true, // uncomment if using cookies
      });

      console.log("Login successful:", response.data);
      Toast.fire({
        icon: 'success',
        title: response.data.message,
      });


      // Optionally store token or user info
      // localStorage.setItem("token", response.data.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response) {
        console.error("Login failed:", error.response.data);
        Toast.fire({
          icon: 'error',
          title: error.response.data.error,
        })
      } else {
        console.error("Network error:", error.message);
        Toast.fire({
          icon: 'error',
          title: "Network error",
        })
      }
    }
  };


  const handleStudentLogin = () => {

  }

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
              <Button onClick={() => navigate('/user')}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Admin */}
        <TabsContent value="admin">
          <Card>
            <form onSubmit={handleAdminLogin}>
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Enter your admin credentials</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="text" name="email" placeholder='john@example.com' />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" name="password" placeholder='Enter Password' />
                </div>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <a href="/forgot-password" className="text-sm underline-offset-4 hover:underline">Forgot your password?</a>
                <Button type='submit'>Login</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Login