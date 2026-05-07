import React from 'react';

export default function ChatFooter() {
  return (
    <>
      {/* CTA Section */}
          <section className="max-w-[1200px] mx-auto px-6 py-20">
            <div className="bg-[#9aaa4a] rounded-[2.5rem] p-3 md:p-4 relative overflow-hidden">
              {/* White Inner Card */}
              <div className="bg-white rounded-[2rem] px-10 md:px-16 pt-10 pb-14 md:pt-14 md:pb-20 relative">
                {/* Window Dots - Top Left */}
                <div className="flex gap-1.5 mb-12 md:mb-16">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ec6a5e]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f4bf4f]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#61c554]"></div>
                </div>

                {/* Left-aligned Content */}
                <h2 className="font-headline text-4xl md:text-[4.2rem] font-medium mb-6 leading-[1.1] max-w-2xl text-[#1a1c1b]">
                  Ready for <span className="newsreader-italic">calmer</span>, more productive meetings?
                </h2>
                <p className="text-[#1a1c1b]/50 text-[17px] mb-10 max-w-xl">Try Loop for a few meetings today. It's free to get started.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => window.location.href = '/auth'} className="bg-[#4b6319] text-white px-7 py-3.5 rounded-full font-semibold text-[15px] flex items-center justify-center gap-2.5 transition-all hover:bg-[#3d5014] active:scale-[0.98] shadow-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801"/>
                    </svg>
                    Try Loop
                  </button>
                  <button className="bg-[#e8e8e0] text-[#1a1c1b] px-7 py-3.5 rounded-full font-semibold text-[15px] flex items-center justify-center gap-2.5 transition-all hover:bg-[#deded6] active:scale-[0.98] border border-[#d5d5cd]">
                    <svg width="13" height="16" viewBox="0 0 384 512" fill="currentColor" opacity="0.7">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                    </svg>
                    Download for iPhone
                  </button>
                </div>
              </div>
            </div>
          </section>
      {/* Footer */}
        <footer className="bg-[#fafafa] pt-24 pb-12 px-6 relative overflow-hidden">
          {/* Huge Watermark Background */}
          <div 
            className="absolute bottom-[-10%] left-[-2%] w-[110%] pointer-events-none select-none z-0"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(180px, 22vw, 320px)',
              color: 'rgba(0,0,0,0.035)',
              letterSpacing: '-0.04em',
              lineHeight: 0.85,
              whiteSpace: 'nowrap',
            }}
          >
            loop
          </div>

          {/* Footer Content */}
          <div className="max-w-[1200px] mx-auto relative z-10">
            {/* Top: Logo + Link Columns */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-0">
              {/* Logo Column */}
              <div className="md:w-[18%] flex-shrink-0">
                <a href="#" className="inline-block transition-opacity hover:opacity-70">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a1c1b]">
                    <path d="M12 2A10 10 0 1 0 22 12"></path>
                    <path d="M12 6A6 6 0 1 0 18 12"></path>
                    <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
                  </svg>
                </a>
              </div>

              {/* Links Grid */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
                {/* Features Column */}
                <div>
                  <h5 className="text-[15px] font-medium text-[#1a1c1b]/80 mb-5">Features</h5>
                  <ul className="space-y-3">
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">Notepad</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">Chat</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">Mobile</a></li>
                  </ul>
                </div>

                {/* Product Column */}
                <div>
                  <h5 className="text-[15px] font-medium text-[#1a1c1b]/80 mb-5">Product</h5>
                  <ul className="space-y-3">
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">Pricing</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">Enterprise</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">AI-notepad vs note-taker</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">For sales</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">For product management</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">Explore more...</a></li>
                  </ul>
                </div>

                {/* Company Column */}
                <div>
                  <h5 className="text-[15px] font-medium text-[#1a1c1b]/80 mb-5">Company</h5>
                  <ul className="space-y-3">
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">Careers</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">Press</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">Events</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">Startup program</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">Student program</a></li>
                  </ul>
                </div>

                {/* Resources Column */}
                <div>
                  <h5 className="text-[15px] font-medium text-[#1a1c1b]/80 mb-5">Resources</h5>
                  <ul className="space-y-3">
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="/blog">Blog</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">Security</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">Help Center</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">Status</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">Affiliates</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">Contact us</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">Terms</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">Privacy</a></li>
                    <li><a className="text-[14px] text-[#1a1c1b]/55 hover:text-[#1a1c1b] hover:underline transition-colors" href="#">License</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Social Icons + Copyright */}
            <div className="mt-32 pt-0 flex flex-col md:flex-row justify-between items-center relative z-10">
              {/* Social Icons */}
              <div className="flex items-center gap-5 mb-4 md:mb-0">
                {/* LinkedIn */}
                <a href="#" className="text-[#1a1c1b]/50 hover:text-[#1a1c1b] transition-colors" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                {/* X (Twitter) */}
                <a href="#" className="text-[#1a1c1b]/50 hover:text-[#1a1c1b] transition-colors" aria-label="X">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="#" className="text-[#1a1c1b]/50 hover:text-[#1a1c1b] transition-colors" aria-label="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>

              {/* Copyright */}
              <div className="text-[13px] text-[#1a1c1b]/40 font-normal">
                © Loop, Inc. 2026
              </div>
            </div>
          </div>
        </footer>
    </>
  );
}
