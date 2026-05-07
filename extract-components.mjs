import fs from 'fs';
import path from 'path';

const landingFile = path.join(process.cwd(), 'src/components/LoopLanding.tsx');
const content = fs.readFileSync(landingFile, 'utf-8');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};
ensureDir(path.join(process.cwd(), 'src/components/chat'));

// Extract Navbar
const navStart = content.indexOf('{/* TopNavBar */}');
const navEnd = content.indexOf('</motion.nav>', navStart) + '</motion.nav>'.length;
let navBarHTML = content.substring(navStart, navEnd);
// Add closing div that was missing in the extraction
navBarHTML += '\n        </div>';

// Update Nav Links
navBarHTML = navBarHTML.replace(/href="#"(\s*)\n(\s*)onClick=\{\(e\) => \{ e\.preventDefault\(\); setMegaMenuOpen\(!megaMenuOpen\); \}\}(\s*)>\n(\s*)Chat/g, 'href="/chat"\n$1onClick={(e) => { e.preventDefault(); setMegaMenuOpen(!megaMenuOpen); }}\n$3>\n$4Chat');

// Extract Social Proof
const socialStart = content.indexOf('{/* Social Proof */}');
const socialEnd = content.indexOf('</section>', socialStart) + '</section>'.length;
const socialHTML = content.substring(socialStart, socialEnd);

// Extract CTA
const ctaStart = content.indexOf('{/* CTA Section */}');
const ctaEnd = content.indexOf('</section>', ctaStart) + '</section>'.length;
const ctaHTML = content.substring(ctaStart, ctaEnd);

// Extract Footer
const footerStart = content.indexOf('{/* Footer */}');
const footerEnd = content.indexOf('</footer>', footerStart) + '</footer>'.length;
let footerHTML = content.substring(footerStart, footerEnd);

const navComponent = `import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatNavbar({ scrolled }: { scrolled: boolean }) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFeaturesEnter = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    setMegaMenuOpen(true);
  };
  const handleFeaturesLeave = () => {
    megaMenuTimeout.current = setTimeout(() => setMegaMenuOpen(false), 250);
  };
  const handleMenuEnter = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
  };
  const handleMenuLeave = () => {
    megaMenuTimeout.current = setTimeout(() => setMegaMenuOpen(false), 250);
  };

  return (
    ${navBarHTML}
  );
}
`;

fs.writeFileSync(path.join(process.cwd(), 'src/components/chat/ChatNavbar.tsx'), navComponent);

const testimonialsComponent = `import React from 'react';

export default function ChatTestimonials() {
  return (
    <>
      ${socialHTML}
    </>
  );
}
`;

fs.writeFileSync(path.join(process.cwd(), 'src/components/chat/ChatTestimonials.tsx'), testimonialsComponent);

const footerComponent = `import React from 'react';

export default function ChatFooter() {
  return (
    <>
      ${ctaHTML}
      ${footerHTML}
    </>
  );
}
`;
fs.writeFileSync(path.join(process.cwd(), 'src/components/chat/ChatFooter.tsx'), footerComponent);
