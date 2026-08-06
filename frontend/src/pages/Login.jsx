import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from 'sonner'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getData } from '@/context/userContext'
const Login = () => {
  const navigate = useNavigate();
  const { setUser } = getData();
  const handleSubmit = async (e) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        toast.error("Ingresá un email válido");
        return;
    }
    try {
      setIsLoading(true)
      const res = await axios.post(`http://localhost:5000/user/login`, formData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("accessToken", res.data.accessToken)
        navigate('/home')
        toast.success(res.data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Algo salió mal, intentá de nuevo";
      toast.error(message);
    } finally {
      setIsLoading(false)
    }
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,// me guarda los cambios del form en caso de actualizaciones
      [e.target.name]: e.target.value // concatenacion tipo nombre : valor de quien disparo el evntos
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    email: ''
  });
  return (
    <div className='relative w-full h-screen md:h-[760px] bg-green-100 overflow-hidden'>
      <div className='min-h-screen flex flex-col to-muted/20'>
        <div className='flex-1 flex items-center justify-center p-4'>
          <div className='w-full max-w-md space-y-6'>
            <div className='text-center space-y-2'>
              <h1 className='text-3xl font-bold tracking-tight text-green-600 '>Login your account </h1>
              <p className='text-green-600'>Start organizing yours thoughts and ideas today</p>
            </div>
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Login your account</CardTitle>
                <CardDescription>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link to="/forgot-password">Forgot your password?</Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button onClick={handleSubmit} type="submit" className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className='mr-2 h4 w-4 animate-spin' />
                      Login in to your account..
                    </>) : "Login"}
                </Button>
                <Button onClick={()=>{navigate('/signup')}} type="submit" className="w-full bg-chart-3">
                  SignUp
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
