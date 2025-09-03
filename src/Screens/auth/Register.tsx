import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from "axios"
import { Toast } from '@/components/Toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { AppDispatch } from '@/store/store'
import { loginSuccess } from '@/store/features/auth/AuthSlice'
import Mood from '@/components/Mood'
import { ChevronLeft } from 'lucide-react'

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const baseUrl = import.meta.env.VITE_BASE_URI;

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { firstname, lastname, email, password, confirmPassword } = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    if (password !== confirmPassword) {
      Toast.fire({ icon: "error", title: "Passwords do not match" });
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/api/register`,
        { firstname, lastname, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      Toast.fire({ icon: "success", title: response.data?.message });

      dispatch(
        loginSuccess({ user: response.data.user, token: response.data.token })
      );

      navigate("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          Toast.fire({ icon: "error", title: err.response.data?.error || "Registration failed" });
        } else if (err.request) {
          Toast.fire({ icon: "error", title: "No response from server. Please try again." });
        } else {
          Toast.fire({ icon: "error", title: err.message });
        }
      } else {
        Toast.fire({ icon: "error", title: "An unexpected error occurred" });
      }
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4">
      <div className='absolute top-5 right-5'>
        <Mood />
      </div>

      <div className='absolute top-5 left-5'>
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}> <ChevronLeft/> </Button>
      </div>


      <Card className="w-full max-w-lg shadow-lg">
        <form onSubmit={handleRegister} className="flex flex-col space-y-4">
          <CardHeader>
            <CardTitle className="font-bold">Get Started</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to setup your account
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-4 px-6">
            <div className="grid gap-2">
              <Label htmlFor="firstname">First Name</Label>
              <Input id="firstname" type="text" name="firstname" placeholder="John" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input id="lastname" type="text" name="lastname" placeholder="Doe" />
            </div>
            <div className="grid col-span-2 gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder="john@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" placeholder="••••••••" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" name="confirmPassword" placeholder="••••••••" />
            </div>
          </CardContent>

          <CardFooter className="px-6 pb-6">
            <Button type="submit" className="w-full">Register</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
