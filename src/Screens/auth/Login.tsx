import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { Toast } from '@/components/Toast'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/store/store'
import { loginSuccess } from '@/store/features/auth/AuthSlice'

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()

  const baseUrl = import.meta.env.VITE_BASE_URI;

  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        // withCredentials: true,
      });

      console.log("Login successful:", response.data);
      Toast.fire({
        icon: 'success',
        title: response.data?.message,
      });

      dispatch(loginSuccess({ user: response.data.user, token: response.data.token }))

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

  const handleStudentLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const matno = formData.get("matno") as string;

    try {
      const response = await axios.post(`${baseUrl}/visitor`, {
        matno,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        // withCredentials: true,
      });

      console.log("Login successful:", response.data);
      Toast.fire({
        icon: 'success',
        title: response.data?.message,
      });

      dispatch(loginSuccess({ user: response.data.user, token: response.data.token }))

      // Redirect to user interface
      navigate("/user");
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
            <form onSubmit={handleStudentLogin}>
              <CardHeader>
                <CardTitle>Student Login</CardTitle>
                <CardDescription>Enter your matric number</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="matno">Mat Number</Label>
                  <Input id="matno" name='matno' placeholder='De.xxxx/xxxx' autoFocus />
                </div>
              </CardContent>
              <CardFooter className='flex justify-end pt-5'>
                <Button type='submit'>Login</Button>
              </CardFooter>
            </form>
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
              <CardFooter className='flex justify-between pt-5'>
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