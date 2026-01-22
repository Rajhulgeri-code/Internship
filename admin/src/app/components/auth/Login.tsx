import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import logoImage from "../../../assets/f1cde6c5104ecbae816e478f19f5461f26aa05c8.png";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  
  if (!email || !password) {
    setError('Please enter both email and password');
    return;
  }

  setLoading(true);

  try {
    console.log('Attempting login...');
    
    // Call the backend API through AuthContext
    const success = await login(email, password);
    
    console.log('Login result:', success);
    
    if (!success) {
      setError('Invalid email or password. Please try again.');
    }
    
  } catch (err: any) {
    console.error('Login error:', err);
    setError(err.message || 'Login failed. Please check your credentials.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto mb-2">
            <img src={logoImage} alt="InnoInfinite Solutions" className="w-full max-w-sm mx-auto" />
          </div>
          <CardTitle className="text-3xl">Admin Panel</CardTitle>
          <CardDescription className="text-base">
            Secure Login - Enterprise Management System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email / Username</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={loading}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember Me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot Password?
              </a>
            </div>

            <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </Button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Use your registered admin credentials
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}