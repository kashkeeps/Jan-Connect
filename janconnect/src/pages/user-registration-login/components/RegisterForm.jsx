import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    constituency: '',
    userType: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpData, setOtpData] = useState({
    otp: '',
    isOtpSent: false,
    resendTimer: 0
  });

  const constituencies = [
    { value: 'delhi-central', label: 'Delhi Central' },
    { value: 'mumbai-north', label: 'Mumbai North' },
    { value: 'bangalore-south', label: 'Bangalore South' },
    { value: 'kolkata-east', label: 'Kolkata East' },
    { value: 'chennai-central', label: 'Chennai Central' },
    { value: 'hyderabad-west', label: 'Hyderabad West' },
    { value: 'pune-northeast', label: 'Pune Northeast' },
    { value: 'ahmedabad-east', label: 'Ahmedabad East' }
  ];

  const userTypes = [
    { value: 'citizen', label: 'Citizen', description: 'Report issues and track progress' },
    { value: 'official', label: 'Government Official', description: 'Manage and resolve citizen issues' }
  ];

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

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }
    
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.constituency) {
      newErrors.constituency = 'Please select your constituency';
    }
    
    if (!formData.userType) {
      newErrors.userType = 'Please select user type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number and special character';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;
    
    const strengthMap = {
      0: { label: 'Very Weak', color: 'bg-destructive' },
      1: { label: 'Weak', color: 'bg-destructive' },
      2: { label: 'Fair', color: 'bg-warning' },
      3: { label: 'Good', color: 'bg-warning' },
      4: { label: 'Strong', color: 'bg-success' },
      5: { label: 'Very Strong', color: 'bg-success' }
    };
    
    return { strength, ...strengthMap[strength] };
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    if (!validateStep1()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call to check if user exists
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentStep(2);
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    
    setIsLoading(true);
    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOtpData(prev => ({ ...prev, isOtpSent: true, resendTimer: 60 }));
      setCurrentStep(3);
      
      // Start countdown timer
      const timer = setInterval(() => {
        setOtpData(prev => {
          if (prev.resendTimer <= 1) {
            clearInterval(timer);
            return { ...prev, resendTimer: 0 };
          }
          return { ...prev, resendTimer: prev.resendTimer - 1 };
        });
      }, 1000);
    } catch (error) {
      setErrors({ general: 'Failed to send OTP. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    if (!otpData.otp || otpData.otp.length !== 6) {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' });
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate OTP verification (mock OTP: 123456)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (otpData.otp === '123456') {
        // Store user session
        localStorage.setItem('janconnect_user', JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          userType: formData.userType,
          constituency: formData.constituency,
          registrationTime: new Date().toISOString()
        }));
        
        navigate('/citizen-issue-dashboard');
      } else {
        setErrors({ otp: 'Invalid OTP. Please use 123456 for demo.' });
      }
    } catch (error) {
      setErrors({ otp: 'OTP verification failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOtpData(prev => ({ ...prev, resendTimer: 60 }));
      
      // Start countdown timer
      const timer = setInterval(() => {
        setOtpData(prev => {
          if (prev.resendTimer <= 1) {
            clearInterval(timer);
            return { ...prev, resendTimer: 0 };
          }
          return { ...prev, resendTimer: prev.resendTimer - 1 };
        });
      }, 1000);
    } catch (error) {
      setErrors({ general: 'Failed to resend OTP. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength();

  if (currentStep === 1) {
    return (
      <form onSubmit={handleStep1Submit} className="space-y-6">
        {errors.general && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="AlertCircle" size={20} className="text-destructive" />
              <p className="text-destructive text-sm">{errors.general}</p>
            </div>
          </div>
        )}

        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleInputChange}
          error={errors.fullName}
          required
        />

        <Input
          label="Mobile Number"
          type="tel"
          name="mobileNumber"
          placeholder="Enter 10-digit mobile number"
          value={formData.mobileNumber}
          onChange={handleInputChange}
          error={errors.mobileNumber}
          required
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
        />

        <Select
          label="Constituency"
          placeholder="Select your constituency"
          options={constituencies}
          value={formData.constituency}
          onChange={(value) => handleSelectChange('constituency', value)}
          error={errors.constituency}
          required
          searchable
        />

        <Select
          label="User Type"
          placeholder="Select user type"
          options={userTypes}
          value={formData.userType}
          onChange={(value) => handleSelectChange('userType', value)}
          error={errors.userType}
          required
        />

        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue
        </Button>

        <div className="text-center">
          <span className="text-text-secondary text-sm">Already have an account? </span>
          <Button
            type="button"
            variant="link"
            onClick={onSwitchToLogin}
            className="text-sm p-0"
          >
            Sign In
          </Button>
        </div>
      </form>
    );
  }

  if (currentStep === 2) {
    return (
      <form onSubmit={handleStep2Submit} className="space-y-6">
        <div className="flex items-center space-x-2 mb-6">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setCurrentStep(1)}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back
          </Button>
          <div className="flex-1">
            <h3 className="font-medium text-text-primary">Set Password</h3>
            <p className="text-sm text-text-secondary">Create a secure password for your account</p>
          </div>
        </div>

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Create a strong password"
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

        {formData.password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Password Strength:</span>
              <span className={`text-sm font-medium ${
                passwordStrength.strength >= 4 ? 'text-success' : 
                passwordStrength.strength >= 2 ? 'text-warning' : 'text-destructive'
              }`}>
                {passwordStrength.label}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-8"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
          </Button>
        </div>

        <div className="space-y-4">
          <Checkbox
            label="I agree to the Terms and Conditions"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            error={errors.agreeToTerms}
            required
          />
          
          <Checkbox
            label="I agree to the Privacy Policy"
            name="agreeToPrivacy"
            checked={formData.agreeToPrivacy}
            onChange={handleInputChange}
            error={errors.agreeToPrivacy}
            required
          />
        </div>

        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          iconName="UserPlus"
          iconPosition="left"
        >
          Create Account
        </Button>
      </form>
    );
  }

  if (currentStep === 3) {
    return (
      <form onSubmit={handleOtpSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Smartphone" size={32} className="text-primary" />
          </div>
          <h3 className="font-medium text-text-primary mb-2">Verify Your Account</h3>
          <p className="text-sm text-text-secondary">
            We've sent a 6-digit OTP to your mobile number ending with ****{formData.mobileNumber.slice(-2)}
          </p>
          <p className="text-xs text-text-secondary mt-2 bg-muted p-2 rounded">
            Demo OTP: <span className="font-mono font-medium">123456</span>
          </p>
        </div>

        <Input
          label="Enter OTP"
          type="text"
          name="otp"
          placeholder="Enter 6-digit OTP"
          value={otpData.otp}
          onChange={(e) => setOtpData(prev => ({ ...prev, otp: e.target.value }))}
          error={errors.otp}
          maxLength={6}
          required
        />

        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Didn't receive OTP?</span>
          {otpData.resendTimer > 0 ? (
            <span className="text-sm text-text-secondary">
              Resend in {otpData.resendTimer}s
            </span>
          ) : (
            <Button
              type="button"
              variant="link"
              onClick={handleResendOtp}
              disabled={isLoading}
              className="text-sm"
            >
              Resend OTP
            </Button>
          )}
        </div>

        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          iconName="CheckCircle"
          iconPosition="left"
        >
          Verify & Complete Registration
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={() => setCurrentStep(2)}
          fullWidth
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Password Setup
        </Button>
      </form>
    );
  }
};

export default RegisterForm;