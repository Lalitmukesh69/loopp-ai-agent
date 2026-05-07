import React from 'react';

export const LandingStyles: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
    
    .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
    .text-balance { text-wrap: balance; }
    .bg-dots { background-image: radial-gradient(#4b6319 0.5px, transparent 0.5px); background-size: 14px 14px; }
    .newsreader-italic { font-family: 'Raleway', sans-serif; font-style: italic; }
    .loop-watermark {
        font-family: 'Raleway', sans-serif;
        font-weight: 800;
        font-size: 20rem;
        color: #f1f1ef;
        letter-spacing: -0.05em;
        pointer-events: none;
    }
    .loop-serif {
        font-family: 'Raleway', sans-serif;
        letter-spacing: -0.01em;
    }
    .loop-serif-bold {
        font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
        font-weight: 600;
        letter-spacing: -0.01em;
    }
    .loop-serif-display {
        font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
        letter-spacing: -0.015em;
    }
  `}</style>
);
