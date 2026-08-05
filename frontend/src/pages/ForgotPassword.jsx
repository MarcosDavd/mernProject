import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setisSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setError("");
    try {
      setIsLoading(true);
      const res = await axios.post(`http://localhost:5000/user/forgot-password`, {
        email
      });
      if (res.data.success) {
        setisSubmitted(true)
        console.log("dkndsndsdn")
        toast.success(res.data.message)
        setEmail("")
        navigate(`/verify-otp/${email}`)
      }
    } catch (error) {
      const message = error.response?.data?.message || "No se pudo enviar el email, intentá de nuevo";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className='relative w-full h-[760px] bg-green-100 overflow-hidden' >
      <div className='min-h-screen flex flex-col'>
        <div className='flex-1 flex items-center justify-center p-4'>
          <div className='w-full max-w-md space-y-6'>
            <div className='text-center space-y-2'>
              <h1 className='text-3x1 font-bold tracking-tight text-green-600'>Reset your password</h1>
              <p className='text-muted-foreground'>Enter your email and we'll send you instructions to reset your password</p>
            </div>
            <Card className='bg-white'>
              <CardHeader className='space-y-1'>
                <CardTitle className='text-2x1 text-center text-green-600'> Forgot Password</CardTitle>
                <CardDescription className='text-center'>
                  {
                    isSubmitted ?
                      "Check your email for reset instructions"
                      : "Enter your email adress to recieve a password reset link "
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {
                  error && (<Alert variant='destructive'>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>)
                }
                {
                  isSubmitted ? (
                    <div className=' py-6 flex flex-col items-center justify-center text-center space-y-4'>
                      <div className=' bg-primary/10 rounded-full p-3'>
                        <CheckCircle className='h-6 w-6 text-primary' />
                      </div>
                      <div className='space-y-2'>
                        <h3 className='font-medium text-lg'> Check your inbox</h3>
                        <p className='text-muted-foreground'> We've sent a password reset to <span className='font-medium text-foreground'>{email}</span></p>
                        <p>
                          If your don't see the email, check your spam folder or{" "}
                          <button className='text-primary hover:underline font-medium' onClick={() => setisSubmitted(false)}>
                            try again
                          </button>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleForgotPassword} className='space-y-4'>
                      <div className='space-y-2 relative text-gray-800'>
                        <Label>Email</Label>
                        <Input
                          type='email'
                          placeholder="Enter your email adress"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <Button type="submit" className='w-full bg-green-600 text-white relative hover:bg-green-500 cursor-pointer'>
                        {
                          isLoading ? (
                            <>
                              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                              Sending reset link...
                            </>
                          ) : ("Send reset link")
                        }
                      </Button>
                    </form>
                  )
                }
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
