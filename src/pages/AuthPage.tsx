
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  // Form errors
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear errors on change
    if (loginErrors[name]) {
      setLoginErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setRegisterForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear errors on change
    if (registerErrors[name]) {
      setRegisterErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateLoginForm = () => {
    const errors: Record<string, string> = {};
    
    if (!loginForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!loginForm.password) {
      errors.password = "Password is required";
    }
    
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRegisterForm = () => {
    const errors: Record<string, string> = {};
    
    if (!registerForm.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!registerForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!registerForm.password) {
      errors.password = "Password is required";
    } else if (registerForm.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    if (!registerForm.terms) {
      errors.terms = "You must agree to the terms";
    }
    
    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLoginForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Logged in successfully",
        description: "Welcome back to NepX!",
      });
      navigate("/");
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate register API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created successfully",
        description: "Welcome to NepX!",
      });
      navigate("/");
    }, 1500);
  };

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <Link to="/" className="inline-block">
          <span className="text-2xl font-bold tracking-tight text-nepx-primary">
            Nep<span className="text-nepx-secondary">X</span>
          </span>
        </Link>
        <h1 className="text-2xl font-bold mt-6">Welcome to NepX</h1>
        <p className="text-gray-500 mt-2">The premier marketplace for sneakers and collectibles in Nepal</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  className={loginErrors.email ? "border-red-500" : ""}
                />
                {loginErrors.email && (
                  <p className="text-red-500 text-sm">{loginErrors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="login-password">Password</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-nepx-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="login-password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  className={loginErrors.password ? "border-red-500" : ""}
                />
                {loginErrors.password && (
                  <p className="text-red-500 text-sm">{loginErrors.password}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  name="remember"
                  checked={loginForm.remember}
                  onCheckedChange={(checked) => 
                    setLoginForm(prev => ({ ...prev, remember: checked as boolean }))
                  }
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-nepx-primary hover:bg-nepx-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
              
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" disabled={isLoading}>
                  Google
                </Button>
                <Button variant="outline" type="button" disabled={isLoading}>
                  Facebook
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input
                  id="register-name"
                  name="name"
                  placeholder="John Doe"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  className={registerErrors.name ? "border-red-500" : ""}
                />
                {registerErrors.name && (
                  <p className="text-red-500 text-sm">{registerErrors.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  className={registerErrors.email ? "border-red-500" : ""}
                />
                {registerErrors.email && (
                  <p className="text-red-500 text-sm">{registerErrors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  className={registerErrors.password ? "border-red-500" : ""}
                />
                {registerErrors.password && (
                  <p className="text-red-500 text-sm">{registerErrors.password}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-confirmPassword">Confirm Password</Label>
                <Input
                  id="register-confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterChange}
                  className={registerErrors.confirmPassword ? "border-red-500" : ""}
                />
                {registerErrors.confirmPassword && (
                  <p className="text-red-500 text-sm">{registerErrors.confirmPassword}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  name="terms"
                  checked={registerForm.terms}
                  onCheckedChange={(checked) => 
                    setRegisterForm(prev => ({ ...prev, terms: checked as boolean }))
                  }
                  className={registerErrors.terms ? "border-red-500" : ""}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-nepx-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-nepx-primary hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {registerErrors.terms && (
                <p className="text-red-500 text-sm">{registerErrors.terms}</p>
              )}
              
              <Button
                type="submit"
                className="w-full bg-nepx-primary hover:bg-nepx-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
              
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" disabled={isLoading}>
                  Google
                </Button>
                <Button variant="outline" type="button" disabled={isLoading}>
                  Facebook
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
