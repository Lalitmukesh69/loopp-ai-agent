import React from 'react';

/**
 * Global styles used across the pricing page.
 * Rendered as an inline <style> tag.
 */
export default function PricingStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
      .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      .newsreader-italic { font-family: 'Raleway', sans-serif; font-style: italic; }
      .loop-serif { font-family: 'Raleway', sans-serif; letter-spacing: -0.01em; }
      .loop-watermark { font-family: 'Raleway', sans-serif; font-weight: 800; font-size: 20rem; color: #f1f1ef; letter-spacing: -0.05em; pointer-events: none; }
      .tweet-card { break-inside: avoid; margin-bottom: 16px; background: #fff; border: 1px solid #e5e5e5; border-radius: 16px; padding: 20px; transition: box-shadow 0.2s ease, border-color 0.2s ease; cursor: default; }
      .tweet-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.06); border-color: #d0d0d0; }
      .tweet-avatar { width: 44px; height: 44px; border-radius: 50%; background: #e8e8e8; flex-shrink: 0; overflow: hidden; }
      .tweet-avatar img { width: 100%; height: 100%; object-fit: cover; }
      .tweet-name { font-weight: 700; font-size: 15px; color: #0f1419; display: flex; align-items: center; gap: 3px; line-height: 1.2; }
      .tweet-verified { width: 18px; height: 18px; flex-shrink: 0; }
      .tweet-handle { font-size: 13px; color: #536471; line-height: 1.2; }
      .tweet-handle .follow-link { color: #1d9bf0; cursor: pointer; font-weight: 500; }
      .tweet-handle .follow-link:hover { text-decoration: underline; }
      .tweet-close { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; color: #536471; opacity: 0.5; cursor: pointer; border-radius: 50%; transition: background 0.15s, opacity 0.15s; flex-shrink: 0; }
      .tweet-close:hover { background: rgba(29,155,240,0.1); opacity: 1; color: #1d9bf0; }
      .tweet-body { font-size: 15px; color: #0f1419; line-height: 1.45; margin-top: 12px; word-break: break-word; }
      .tweet-body .mention { color: #1d9bf0; cursor: pointer; }
      .tweet-body .mention:hover { text-decoration: underline; }
      .tweet-timestamp { font-size: 13px; color: #536471; margin-top: 12px; }
      .tweet-actions { display: flex; align-items: center; gap: 0; margin-top: 12px; border-top: 1px solid #eff3f4; padding-top: 12px; }
      .tweet-action { display: flex; align-items: center; gap: 5px; font-size: 13px; color: #536471; cursor: pointer; padding: 4px 12px 4px 0; border-radius: 9999px; transition: color 0.15s; white-space: nowrap; }
      .tweet-action:hover { color: #1d9bf0; }
      .tweet-action.heart:hover { color: #f91880; }
      .tweet-action svg { width: 18px; height: 18px; flex-shrink: 0; }
      .tweet-replies-link { display: inline-block; font-size: 13px; color: #1d9bf0; cursor: pointer; margin-top: 8px; font-weight: 400; }
      .tweet-replies-link:hover { text-decoration: underline; }
      .tweet-embedded-img { margin-top: 12px; border-radius: 12px; overflow: hidden; border: 1px solid #e5e5e5; }
      .tweet-embedded-img img { width: 100%; display: block; }
      .tweet-repost-label { font-size: 12px; color: #536471; margin-bottom: 6px; display: flex; align-items: center; gap: 4px; }
      .tweets-masonry { columns: 3; column-gap: 16px; }
      @media (max-width: 900px) { .tweets-masonry { columns: 2; } }
      @media (max-width: 600px) { .tweets-masonry { columns: 1; } }
      .read-more-x { display: inline-flex; align-items: center; gap: 4px; font-size: 13px; color: #1d9bf0; cursor: pointer; margin-top: 8px; padding: 6px 0; }
      .read-more-x:hover { text-decoration: underline; }
    `}</style>
  );
}
