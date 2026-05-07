import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DodoPayments } from "dodopayments-checkout";
import { 
  X, 
  Sparkles, 
  Check, 
  Upload, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// --- Custom Logo ---
const LoopSwirlLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}>
    <path d="M12 12c0-1.5-1-2-2-2s-2 .5-2 2 1 3 3 3 4-1 4-4-2-5-5-5-6 2-6 6 3 8 8 8 9-4 9-10" />
  </svg>
);

// --- Lightweight Custom Confetti Component ---
const Confetti = () => {
  const [pieces, setPieces] = useState<any[]>([]);

  useEffect(() => {
    const colors = ['#CDE267', '#5A6B31', '#D3A1A1', '#F4DD77', '#CA88E0', '#34A853', '#36C5F0', '#ECB22E'];
    const newPieces = Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 0.5}s`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() > 0.5 ? '50%' : '4px', // Mix of circles and rounded squares
      rotation: Math.random() * 360,
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[400] overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-20px] w-2.5 h-2.5"
          style={{
            left: p.left,
            backgroundColor: p.backgroundColor,
            borderRadius: p.shape,
            transform: `rotate(${p.rotation}deg)`,
            animation: `fall ${p.animationDuration} ${p.animationDelay} linear forwards`,
          }}
        />
      ))}
    </div>
  );
};

export default function TrialEndedModal() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    try {
      DodoPayments.Initialize({
        mode: "test",
        displayType: "overlay",
        onEvent: (event) => {
          console.log("Checkout event:", event);
        },
      });
    } catch (e) {
      console.error('DodoPayments init error:', e);
    }
  }, []);

  const handleUpgrade = async (planName: string, productId: string) => {
    if (!productId) {
      setToastMessage(`Contacting sales for ${planName}...`);
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    
    try {
      setToastMessage(`Starting checkout...`);
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { 
          productId: productId,
          email: user?.email 
        }
      });

      if (error) throw error;
      
      if (data?.url) {
        DodoPayments.Checkout.open({ checkoutUrl: data.url });
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setToastMessage('Error starting checkout');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleYearlySelect = () => {
    if (billingCycle !== 'yearly') {
      setBillingCycle('yearly');
      setShowConfetti(true);
      // Remove confetti after animation completes
      setTimeout(() => setShowConfetti(false), 4500); 
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg) scale(1); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg) scale(0.5); opacity: 0; }
        }
      `}} />

      {showConfetti && <Confetti />}

      {/* Global Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[250] transition-all duration-300 flex items-center gap-2.5 bg-[#1A1A1A] text-white px-5 py-3 rounded-full shadow-lg ${toastMessage ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
        <CheckCircle2 className="w-4 h-4 text-[#CDE267]" />
        <span className="text-[14px] font-medium tracking-wide">{toastMessage}</span>
      </div>

      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-[4px] animate-in fade-in duration-300">
        <div className="scale-[0.7] origin-center w-full flex justify-center">
          <div className="bg-[#FCFBF8] rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] max-w-[960px] w-full relative overflow-hidden animate-in zoom-in-95 duration-300 max-h-[130vh] flex flex-col border border-white/50">
           
           {/* Header Section */}
           <div className="p-8 pb-4 text-center relative shrink-0">
             <div className="w-16 h-16 bg-[#F3F5E9] rounded-[20px] flex items-center justify-center mx-auto mb-5 shadow-sm border border-[#E2E8CE]">
               <LoopSwirlLogo className="w-8 h-8 text-[#5A6B31]" />
             </div>
             
             <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] mb-3 tracking-tight">Your free trial has ended</h2>
             <p className="text-gray-500 text-[15px] sm:text-[16px] max-w-[500px] mx-auto leading-relaxed mb-6">
               We hope you enjoyed exploring Loops! Choose a plan to continue capturing, sharing, and organizing your meeting notes seamlessly.
             </p>

             {/* Billing Toggle */}
             <div className="flex justify-center">
               <div className="bg-[#EBE9E0]/50 p-1.5 rounded-full inline-flex items-center relative border border-gray-200/50 shadow-sm">
                 <button
                   onClick={() => setBillingCycle('monthly')}
                   className={`px-6 py-2 rounded-full text-[14px] font-medium transition-all ${billingCycle === 'monthly' ? 'bg-white text-[#1A1A1A] shadow-[0_2px_8px_rgba(0,0,0,0.06)]' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   Monthly
                 </button>
                 <button
                   onClick={handleYearlySelect}
                   className={`px-5 py-2 rounded-full text-[14px] font-medium transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white text-[#1A1A1A] shadow-[0_2px_8px_rgba(0,0,0,0.06)]' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   Yearly
                   <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider uppercase transition-colors ${billingCycle === 'yearly' ? 'bg-[#5A6B31] text-white' : 'bg-[#E2E8CE] text-[#5A6B31]'}`}>
                     Save 20%
                   </span>
                 </button>
               </div>
             </div>
           </div>

           {/* Pricing Options Section */}
           <div className="p-6 sm:p-8 pt-4 bg-[#FCFBF8] overflow-y-auto custom-scroll">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
               
               {/* Basic Plan Card */}
               <div className="bg-white border border-gray-200 rounded-[24px] p-6 flex flex-col hover:border-gray-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
                 <div className="flex-1">
                   <h3 className="text-2xl font-serif text-[#1A1A1A] mb-1">Basic</h3>
                   <div className="mb-6 pb-6 border-b border-gray-100">
                     <div className="flex items-baseline gap-1">
                       <span className="text-3xl font-serif text-[#1A1A1A]">
                         ${billingCycle === 'yearly' ? '15' : '19'}
                       </span>
                       <span className="text-sm text-gray-500 whitespace-nowrap">
                         /user/mo
                       </span>
                     </div>
                     {billingCycle === 'yearly' && (
                       <div className="text-[12px] text-gray-400 mt-1">Billed $180 annually</div>
                     )}
                   </div>
                   <ul className="space-y-3.5 mb-8">
                     <li className="flex gap-3 items-start text-[14px] text-gray-600 leading-snug">
                       <Check className="w-4 h-4 text-[#5A6B31] mt-0.5 shrink-0 stroke-[2.5]" /> 1 user included
                     </li>
                     <li className="flex gap-3 items-start text-[14px] text-gray-600 leading-snug">
                       <Check className="w-4 h-4 text-[#5A6B31] mt-0.5 shrink-0 stroke-[2.5]" /> 130+ languages support
                     </li>
                     <li className="flex gap-3 items-start text-[14px] text-gray-600 leading-snug">
                       <Check className="w-4 h-4 text-[#5A6B31] mt-0.5 shrink-0 stroke-[2.5]" /> Unlimited meeting notes & AI chat
                     </li>
                     <li className="flex gap-3 items-start text-[14px] text-gray-600 leading-snug">
                       <Check className="w-4 h-4 text-[#5A6B31] mt-0.5 shrink-0 stroke-[2.5]" /> 30 days history
                     </li>
                   </ul>
                 </div>
                 <button 
                   onClick={() => handleUpgrade('Basic', billingCycle === 'yearly' ? 'pdt_0Ne4ASfuiMtIlD1jjIfhH' : 'pdt_0Ne4ASd09ENvPyjiE0rgm')} 
                   className="w-full py-3 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-[14px] font-medium transition-colors text-gray-800"
                 >
                   Select Basic
                 </button>
               </div>

               {/* Pro Plan Card (Highlighted) */}
               <div className="bg-[#F3F5E9] border border-[#E2E8CE] rounded-[24px] p-6 flex flex-col shadow-sm relative md:-translate-y-2 transform transition-transform hover:-translate-y-3 hover:shadow-md">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#5A6B31] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm whitespace-nowrap">
                   Most Popular
                 </div>
                 <div className="flex-1 mt-2">
                   <h3 className="text-2xl font-serif text-[#1A1A1A] mb-1">Pro</h3>
                   <div className="mb-6 pb-6 border-b border-[#E2E8CE]/60">
                     <div className="flex items-baseline gap-1">
                       <span className="text-3xl font-serif text-[#1A1A1A]">
                         ${billingCycle === 'yearly' ? '39' : '49'}
                       </span>
                       <span className="text-sm text-gray-600 whitespace-nowrap">
                         /mo total
                       </span>
                     </div>
                     {billingCycle === 'yearly' && (
                       <div className="text-[12px] text-[#5A6B31] opacity-80 mt-1">Billed $468 annually</div>
                     )}
                   </div>
                   <ul className="space-y-3.5 mb-8">
                     <li className="flex gap-3 items-start text-[14px] text-gray-800 font-medium leading-snug">
                       <Check className="w-4 h-4 text-[#5A6B31] mt-0.5 shrink-0 stroke-[2.5]" /> Up to 5 users
                     </li>
                     <li className="flex gap-3 items-start text-[14px] text-gray-800 font-medium leading-snug">
                       <Check className="w-4 h-4 text-[#5A6B31] mt-0.5 shrink-0 stroke-[2.5]" /> Unlimited history & notes
                     </li>
                     <li className="flex gap-3 items-start text-[14px] text-gray-800 font-medium leading-snug">
                       <Check className="w-4 h-4 text-[#5A6B31] mt-0.5 shrink-0 stroke-[2.5]" /> Custom layouts
                     </li>
                     <li className="flex gap-3 items-start text-[14px] text-gray-800 font-medium leading-snug">
                       <Check className="w-4 h-4 text-[#5A6B31] mt-0.5 shrink-0 stroke-[2.5]" /> Priority support & All integrations
                     </li>
                   </ul>
                 </div>
                 <button 
                   onClick={() => handleUpgrade('Pro', billingCycle === 'yearly' ? 'pdt_0Ne4ASlalRUH5FcYxD1TX' : 'pdt_0Ne4ASj0aTLDvBsmnSNJI')} 
                   className="w-full py-3 rounded-full bg-[#5A6B31] hover:bg-[#4d5c29] text-white text-[14px] font-medium transition-all shadow-md flex items-center justify-center gap-2 group"
                 >
                   Upgrade to Pro <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </button>
               </div>

               {/* Enterprise Plan Card */}
               <div className="bg-white border border-gray-200 rounded-[24px] p-6 flex flex-col hover:border-gray-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
                 <div className="flex-1">
                   <h3 className="text-2xl font-serif text-[#1A1A1A] mb-1">Enterprise</h3>
                   <div className="mb-6 pb-6 border-b border-gray-100 flex h-[62px] items-center">
                     <div className="flex items-baseline gap-1">
                       <span className="text-xl font-serif text-[#1A1A1A]">Custom pricing</span>
                     </div>
                   </div>
                   <ul className="space-y-3.5 mb-8">
                     <li className="flex gap-3 items-start text-[14px] text-gray-600 leading-snug">
                       <Check className="w-4 h-4 text-[#5A6B31] mt-0.5 shrink-0 stroke-[2.5]" /> Admin controls
                     </li>
                     <li className="flex gap-3 items-start text-[14px] text-gray-600 leading-snug">
                       <Check className="w-4 h-4 text-[#5A6B31] mt-0.5 shrink-0 stroke-[2.5]" /> Enterprise API access
                     </li>
                     <li className="flex gap-3 items-start text-[14px] text-gray-600 leading-snug">
                       <Check className="w-4 h-4 text-[#5A6B31] mt-0.5 shrink-0 stroke-[2.5]" /> SSO for teams 50+
                     </li>
                     <li className="flex gap-3 items-start text-[14px] text-gray-600 leading-snug">
                       <Check className="w-4 h-4 text-[#5A6B31] mt-0.5 shrink-0 stroke-[2.5]" /> Priority support
                     </li>
                   </ul>
                 </div>
                 <button 
                   onClick={() => handleUpgrade('Enterprise', '')} 
                   className="w-full py-3 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-[14px] font-medium transition-colors text-gray-800"
                 >
                   Contact Sales
                 </button>
               </div>

             </div>
             
             {/* Footer Note */}
             <div className="text-center mt-6">
               <p className="text-xs text-gray-400">
                 By upgrading, you agree to Loops' Terms of Service and Privacy Policy.
               </p>
             </div>
           </div>
         </div>
        </div>
      </div>
    </>
  );
}
