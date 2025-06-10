import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';

const AuthenticationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  console.log('AuthenticationScreen loaded');

  const handleLogin = () => {
    setError(null);
    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    // Simulate login
    if (email === "user@example.com" && password === "password123") {
      console.log('Login successful');
      navigate('/main-lobby');
    } else {
      setError("Invalid email or password.");
    }
  };

  const handleRegister = () => {
    setError(null);
    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password to register.");
      return;
    }
    // Simulate registration
    console.log('Registration successful (simulated)');
    navigate('/main-lobby'); // Navigate to lobby after registration
  };
  
  const handleGuestLogin = () => {
    console.log('Guest login');
    navigate('/main-lobby');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl bg-slate-800 border-slate-700 text-slate-50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Game Portal
          </CardTitle>
          <CardDescription className="text-slate-400">
            Sign in, create an account, or play as a guest.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive" className="bg-red-900/50 border-red-700">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertTitle className="text-red-300">Authentication Error</AlertTitle>
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-400 focus:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button variant="link" size="sm" className="text-purple-400 h-auto p-0" onClick={() => console.log("Forgot password clicked")}>
                Forgot password?
              </Button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-400 focus:ring-purple-500 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="space-y-3 pt-2">
            <Button onClick={handleLogin} className="w-full bg-purple-600 hover:bg-purple-700 text-slate-50">
              Sign In
            </Button>
            <Button onClick={handleRegister} variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300">
              Create Account
            </Button>
          </div>
          <div className="relative my-4">
            <Separator className="bg-slate-600" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 px-2 text-xs text-slate-400">
              OR
            </span>
          </div>
          <Button onClick={handleGuestLogin} variant="secondary" className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 border border-slate-600">
            Play as Guest
          </Button>
        </CardContent>
        <CardFooter className="text-center text-xs text-slate-500">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthenticationScreen;