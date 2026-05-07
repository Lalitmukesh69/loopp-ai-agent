/* ───── Twitter Testimonials Data ───── */

export interface TweetData {
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
  body: string;
  timestamp: string;
  likes: string;
  replies: string;
}

export const tweetsData: TweetData[] = [
  {
    name: 'Nat Friedman',
    handle: '@natfriedman',
    avatar: 'https://avatars.githubusercontent.com/nat',
    verified: true,
    body: 'Been using <span class="mention">loop.io</span> a bit lately: it generates the best meeting notes of anything I\'ve tried so far. Not sure how they did that.',
    timestamp: '1:15 PM · Jun 20, 2024',
    likes: '558',
    replies: 'Read 25 replies',
  },
  {
    name: 'Soleio',
    handle: '@soleio',
    avatar: 'https://avatars.githubusercontent.com/soleio',
    verified: false,
    body: 'I get uncharacteristically excited about group Zoom meetings now<br/><br/>Why? Because the payoff is seeing <span class="mention">@meetloop</span> really work its magic and generate incredible meeting notes seconds after we adjourn',
    timestamp: '1:36 PM · Aug 8, 2024',
    likes: '43',
    replies: 'Read 2 replies',
  },
  {
    name: 'Guillermo Rauch',
    handle: '@rauchg',
    avatar: 'https://avatars.githubusercontent.com/rauchg',
    verified: true,
    body: 'Write bare notes → ai enhances them<br/>Very clever ai-native ux: <span class="mention">loop.so</span>',
    timestamp: '7:42 PM · May 22, 2024',
    likes: '1.6K',
    replies: 'Read 47 replies',
  },
  {
    name: 'Dan Shipper',
    handle: '@danshipper',
    avatar: 'https://avatars.githubusercontent.com/dshipper',
    verified: true,
    body: 'If you aren\'t using <span class="mention">@meetloop</span> for your meetings you are seriously missing out.<br/><br/>Incredible product.',
    timestamp: '9:03 PM · Jun 3, 2024',
    likes: '36',
    replies: 'Read 4 replies',
  },
  {
    name: 'Ryan Hoover',
    handle: '@rrhoover',
    avatar: 'https://avatars.githubusercontent.com/rrhoover',
    verified: true,
    body: 'Loop is so good.<br/><br/>I hope they introduce a marketplace of one-click integrations. I got use cases! :)',
    timestamp: '6:41 PM · Mar 11, 2025',
    likes: '171',
    replies: 'Read 11 replies',
  },
  {
    name: 'Des Traynor',
    handle: '@destraynor',
    avatar: 'https://avatars.githubusercontent.com/destraynor',
    verified: true,
    body: 'I don\'t think I\'ve ever gotten more thanks from people recommending an app than I have for <span class="mention">@meetloop</span>.<br/><br/>Everyone thinks they have a good meeting notes app, but it\'s only once they use Loop they realise what they\'ve been missing.',
    timestamp: '9:10 PM · Apr 3, 2025',
    likes: '364',
    replies: 'Read 14 replies',
  },
];

export interface SocialProofCompany {
  name: string;
  opacity: string;
  size: string;
  weight: string;
}

export const socialProofCompanies: SocialProofCompany[] = [
  { name: 'Linear', opacity: 'text-[#b0b0b0]', size: 'text-[20px]', weight: 'font-medium' },
  { name: 'Index Ventures', opacity: 'text-[#a0a0a0]', size: 'text-[18px]', weight: 'font-medium' },
  { name: 'Brex', opacity: 'text-[#1a1c1b]', size: 'text-[24px]', weight: 'font-bold' },
  { name: 'replit', opacity: 'text-[#1a1c1b]', size: 'text-[24px]', weight: 'font-bold' },
  { name: 'Vercel', opacity: 'text-[#1a1c1b]', size: 'text-[24px]', weight: 'font-bold' },
];
