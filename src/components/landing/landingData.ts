export const templateData: Record<string, {
  title: string;
  dateStr: string;
  participants: string;
  sections: { title: string; lines: string[] }[];
}> = {
  customer_discovery: {
    title: 'Upstart Health - Customer discovery',
    dateStr: 'Today 12:20 AM',
    participants: '',
    sections: [
      { title: 'Pain points', lines: ['w-[80%]', 'w-[90%]', 'w-[75%]'] },
      { title: 'Current solutions', lines: ['w-[95%]', 'w-[100%]'] },
      { title: 'User thoughts', lines: ['w-[80%]'] }
    ]
  },
  '1on1': {
    title: 'Weekly Sync - 1 on 1',
    dateStr: 'Today 10:00 AM',
    participants: '',
    sections: [
      { title: 'Updates', lines: ['w-[90%]', 'w-[100%]', 'w-[60%]'] },
      { title: 'Blockers', lines: ['w-[85%]', 'w-[70%]'] }
    ]
  },
  user_interview: {
    title: 'Kallo - User interview',
    dateStr: 'Today 7:10 PM',
    participants: 'Jim, Michaela +5',
    sections: [
      { title: 'Goals and motivations', lines: ['w-[45%]', 'w-[55%]'] },
      { title: 'Pain points', lines: ['w-[40%]', 'w-[40%]', 'w-[35%]'] },
      { title: 'Current solutions', lines: ['w-[60%]', 'w-[65%]', 'w-[50%]'] },
      { title: 'User thoughts', lines: ['w-[40%]', 'w-[50%]'] },
      { title: 'User suggestions', lines: ['w-[25%]'] }
    ]
  },
  pitch: {
    title: 'Sequoia - Pitch',
    dateStr: 'Yesterday 2:30 PM',
    participants: '',
    sections: [
      { title: 'Introduction', lines: ['w-[80%]', 'w-[90%]'] },
      { title: 'Market Opportunity', lines: ['w-[100%]', 'w-[85%]', 'w-[95%]'] }
    ]
  },
  standup: {
    title: 'Engineering - Standup',
    dateStr: 'Today 9:30 AM',
    participants: '',
    sections: [
      { title: 'Done', lines: ['w-[75%]', 'w-[80%]', 'w-[60%]'] },
      { title: 'To Do', lines: ['w-[85%]', 'w-[50%]'] }
    ]
  }
};
