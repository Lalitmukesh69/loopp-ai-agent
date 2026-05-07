import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white p-8 md:p-24 font-sans text-[#1D1D1F]">
      <div className="max-w-3xl mx-auto">
        <Link to="/auth" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#0071E3] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sign In
        </Link>
        
        <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
          <p className="text-lg leading-relaxed">
            Last updated: December 29, 2025
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using Loop's services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">2. Intellectual Property</h2>
            <p>
              The Service and its original content, features and functionality are and will remain the exclusive property of Loop and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">3. User Accounts</h2>
            <p>
              When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">4. Termination</h2>
            <p>
              We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-4">5. Limitation of Liability</h2>
            <p>
              In no event shall Loop, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
