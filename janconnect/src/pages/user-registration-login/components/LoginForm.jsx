import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrMobile: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = {
    citizen: { email: 'citizen@janconnect.gov.in', password: 'Citizen@123' },
    official: { email: 'official@janconnect.gov.in', password: 'Official@123' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.emailOrMobile.trim()) {
      newErrors.emailOrMobile = 'Email or mobile number is required';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.emailOrMobile) && 
               !/^[6-9]\d{9}$/.test(formData.emailOrMobile)) {
      newErrors.emailOrMobile = 'Please enter a valid email or 10-digit mobile number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      const isValidCitizen = formData.emailOrMobile === mockCredentials.citizen.email && 
                            formData.password === mockCredentials.citizen.password;
      const isValidOfficial = formData.emailOrMobile === mockCredentials.official.email && 
                             formData.password === mockCredentials.official.password;
      
      if (isValidCitizen || isValidOfficial) {
        // Store user session
        localStorage.setItem('janconnect_user', JSON.stringify({
          email: formData.emailOrMobile,
          userType: isValidCitizen ? 'citizen' : 'official',
          loginTime: new Date().toISOString()
        }));
        
        // Redirect based on user type
        navigate('/citizen-issue-dashboard');
      } else {
        setErrors({
          general: `Invalid credentials. Use:\nCitizen: ${mockCredentials.citizen.email} / ${mockCredentials.citizen.password}\nOfficial: ${mockCredentials.official.email} / ${mockCredentials.official.password}`
        });
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset link would be sent to your registered email/mobile');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-destructive mt-0.5" />
            <div>
              <p className="text-destructive font-medium text-sm">Login Failed</p>
              <pre className="text-destructive text-xs mt-1 whitespace-pre-wrap font-mono">
                {errors.general}
              </pre>
            </div>
          </div>
        </div>
      )}

      <Input
        label="Email or Mobile Number"
        type="text"
        name="emailOrMobile"
        placeholder="Enter email or 10-digit mobile"
        value={formData.emailOrMobile}
        onChange={handleInputChange}
        error={errors.emailOrMobile}
        required
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-8"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleInputChange}
        />
        
        <Button
          type="button"
          variant="link"
          onClick={handleForgotPassword}
          className="text-sm"
        >
          Forgot Password?
        </Button>
      </div>

      <Button
        type="submit"
        variant="default"
        loading={isLoading}
        fullWidth
        iconName="LogIn"
        iconPosition="left"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;