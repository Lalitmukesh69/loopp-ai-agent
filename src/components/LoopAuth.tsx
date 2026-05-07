import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// --- Custom Brand & Provider SVGs ---

const LoopSwirlLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}>
    <path d="M12 12c0-1.5-1-2-2-2s-2 .5-2 2 1 3 3 3 4-1 4-4-2-5-5-5-6 2-6 6 3 8 8 8 9-4 9-10" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const MicrosoftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
    <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
    <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
    <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
  </svg>
);

// --- Loading Spinner ---
const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-[#666666]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

export default function LoginScreen() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Check if user is already logged in & listen for auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate('/home');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate('/home');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Google OAuth sign-in handler
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/home`,
          scopes: 'https://www.googleapis.com/auth/calendar.readonly',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('An error occurred during sign in');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] font-sans selection:bg-[#BAC66E] selection:text-black flex items-center justify-center p-6">
      
      {/* Main Login Card */}
      <div 
        className={`w-full max-w-[460px] bg-white rounded-[24px] border border-[#E5E5E5] shadow-[0_12px_40px_rgba(0,0,0,0.04)] p-10 md:p-12 flex flex-col items-center transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        
        {/* Logo */}
        <div className="w-12 h-12 mb-6 text-[#1A1A1A] animate-[pulse_3s_ease-in-out_infinite]">
          <LoopSwirlLogo className="w-full h-full" />
        </div>

        {/* Headings */}
        <h1 className="text-[32px] md:text-[36px] font-serif text-[#1A1A1A] tracking-tight mb-3">
          Welcome to Loop
        </h1>
        <p className="text-[14px] md:text-[15px] text-[#666666]">
          Choose your <strong className="font-bold text-[#1A1A1A]">work account</strong> to get started.
        </p>

        {/* Action Buttons */}
        <div className="w-full mt-10 flex flex-col gap-3.5 relative">
          
          {/* Google Button — wired to Supabase OAuth */}
          <div className="relative group">
            <button 
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className={`w-full h-[52px] rounded-full border border-[#E5E5E5] flex items-center justify-center gap-3 text-[14.5px] font-semibold text-[#1A1A1A] hover:border-[#C2C2C2] hover:bg-[#FAFAFA] transition-all duration-200 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#BAC66E] focus-visible:ring-offset-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <GoogleIcon />
                  Sign in with Google
                </>
              )}
            </button>
            {/* Last Used Badge */}
            <div className="absolute -top-3 -right-2 md:-right-4 bg-[#84963C] text-white text-[10.5px] font-bold px-3 py-1 rounded-full shadow-sm z-10 pointer-events-none transform transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 group-hover:rotate-2">
              Last used
            </div>
          </div>

          {/* Microsoft Button */}
          <button className="w-full h-[52px] rounded-full border border-[#E5E5E5] flex items-center justify-center gap-3 text-[14.5px] font-semibold text-[#1A1A1A] hover:border-[#C2C2C2] hover:bg-[#FAFAFA] transition-all duration-200 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#BAC66E] focus-visible:ring-offset-2">
            <MicrosoftIcon />
            Sign in with Microsoft
          </button>

          {/* SSO Button */}
          <button className="w-full h-[52px] rounded-full border border-[#E5E5E5] flex items-center justify-center gap-3 text-[14.5px] font-semibold text-[#1A1A1A] hover:border-[#C2C2C2] hover:bg-[#FAFAFA] transition-all duration-200 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#BAC66E] focus-visible:ring-offset-2">
            Sign in with SSO
          </button>

        </div>

        {/* Footer / Terms Checkbox */}
        <div className="mt-12 w-full flex justify-center">
          <label className="flex items-start gap-3 cursor-pointer group">
            
            {/* Custom Animated Checkbox */}
            <div className="relative flex items-center justify-center mt-[3px] shrink-0">
              <input 
                type="checkbox" 
                className="peer sr-only"
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
              />
              <div 
                className={`w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center transition-all duration-300 ${
                  agreedToTerms 
                    ? 'bg-[#1A1A1A] border-[#1A1A1A]' 
                    : 'bg-white border-[#C2C2C2] group-hover:border-[#808080]'
                }`}
              >
                <svg 
                  className={`w-3 h-3 text-white transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    agreedToTerms ? 'scale-100' : 'scale-0'
                  }`} 
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>

            {/* Terms Text */}
            <span className="text-[13px] text-[#666666] leading-[1.5] select-none text-left">
              I agree to the <a href="#" className="text-[#666666] underline decoration-[#D1D1D1] hover:text-[#1A1A1A] hover:decoration-[#1A1A1A] underline-offset-[3px] transition-colors">Terms of Service</a> and <a href="#" className="text-[#666666] underline decoration-[#D1D1D1] hover:text-[#1A1A1A] hover:decoration-[#1A1A1A] underline-offset-[3px] transition-colors">Privacy Policy</a>.
            </span>
          </label>
        </div>

      </div>

    </div>
  );
}