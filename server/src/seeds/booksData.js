const booksData = [
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self Help',
    publicationDate: '2018-10-16',
    description:
      'A practical guide to building good habits, breaking bad ones, and mastering tiny behaviors that lead to remarkable results.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    totalCopies: 8,
    availableCopies: 8,
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    genre: 'Productivity',
    publicationDate: '2016-01-05',
    description:
      'Explores the value of focused work in a distracted world and explains how to cultivate concentration.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    totalCopies: 6,
    availableCopies: 6,
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    publicationDate: '1988-01-01',
    description:
      'A philosophical novel about a shepherd boy’s journey to discover treasure and his personal legend.',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
    totalCopies: 7,
    availableCopies: 7,
  },
  {
    title: 'Ikigai',
    author: 'Héctor García',
    genre: 'Self Help',
    publicationDate: '2016-09-29',
    description:
      'A thoughtful look into the Japanese concept of ikigai and how purpose contributes to a meaningful life.',
    coverImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    totalCopies: 5,
    availableCopies: 5,
  },
  {
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    genre: 'Finance',
    publicationDate: '1997-04-01',
    description:
      'A personal finance classic that contrasts two mindsets around money, assets, and financial independence.',
    coverImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80',
    totalCopies: 9,
    availableCopies: 9,
  },
  {
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    genre: 'Finance',
    publicationDate: '2020-09-08',
    description:
      'Discusses how behavior and emotions shape financial decisions more than spreadsheets and formulas.',
    coverImage: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80',
    totalCopies: 6,
    availableCopies: 6,
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    genre: 'Psychology',
    publicationDate: '2011-10-25',
    description:
      'Explains the two systems of thought that drive human judgment, decisions, and biases.',
    coverImage: 'https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=800&q=80',
    totalCopies: 4,
    availableCopies: 4,
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    genre: 'History',
    publicationDate: '2011-01-01',
    description:
      'A sweeping history of humankind from the Stone Age to the modern technological era.',
    coverImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80',
    totalCopies: 7,
    availableCopies: 7,
  },
  {
    title: 'Homo Deus',
    author: 'Yuval Noah Harari',
    genre: 'History',
    publicationDate: '2015-01-01',
    description:
      'Examines the future of humanity, technology, artificial intelligence, and global systems.',
    coverImage: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=800&q=80',
    totalCopies: 5,
    availableCopies: 5,
  },
  {
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    genre: 'Spirituality',
    publicationDate: '1997-01-01',
    description:
      'Encourages readers to focus on the present moment and reduce suffering caused by mental overactivity.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    totalCopies: 5,
    availableCopies: 5,
  },
  {
    title: 'Can’t Hurt Me',
    author: 'David Goggins',
    genre: 'Motivation',
    publicationDate: '2018-11-15',
    description:
      'A memoir and mindset book about discipline, mental toughness, and pushing beyond self-imposed limits.',
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80',
    totalCopies: 6,
    availableCopies: 6,
  },
  {
    title: 'Start With Why',
    author: 'Simon Sinek',
    genre: 'Leadership',
    publicationDate: '2009-10-29',
    description:
      'Explains how great leaders inspire action by starting with purpose rather than process.',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    totalCopies: 4,
    availableCopies: 4,
  },
  {
    title: 'Leaders Eat Last',
    author: 'Simon Sinek',
    genre: 'Leadership',
    publicationDate: '2014-01-07',
    description:
      'Shows how trust, empathy, and safety create stronger teams and better organizations.',
    coverImage: 'https://images.unsplash.com/photo-1496104679561-38b2b4e3d4fb?auto=format&fit=crop&w=800&q=80',
    totalCopies: 5,
    availableCopies: 5,
  },
  {
    title: 'The 5 AM Club',
    author: 'Robin Sharma',
    genre: 'Self Help',
    publicationDate: '2018-12-04',
    description:
      'A self-improvement book focused on morning routines, productivity, and personal growth.',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
    totalCopies: 5,
    availableCopies: 5,
  },
  {
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    genre: 'Self Help',
    publicationDate: '2016-09-13',
    description:
      'A blunt and humorous take on focusing energy on what truly matters in life.',
    coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=800&q=80',
    totalCopies: 7,
    availableCopies: 7,
  },
  {
    title: 'The Mountain Is You',
    author: 'Brianna Wiest',
    genre: 'Self Help',
    publicationDate: '2020-06-01',
    description:
      'A reflective guide to self-sabotage, emotional resilience, and personal transformation.',
    coverImage: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80',
    totalCopies: 5,
    availableCopies: 5,
  },
  {
    title: 'Zero to One',
    author: 'Peter Thiel',
    genre: 'Business',
    publicationDate: '2014-09-16',
    description:
      'A startup and innovation book about building unique companies and creating the future.',
    coverImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    totalCopies: 5,
    availableCopies: 5,
  },
  {
    title: 'The Lean Startup',
    author: 'Eric Ries',
    genre: 'Business',
    publicationDate: '2011-09-13',
    description:
      'Introduces lean principles for testing business ideas rapidly and building sustainable startups.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    totalCopies: 6,
    availableCopies: 6,
  },
  {
    title: 'Hooked',
    author: 'Nir Eyal',
    genre: 'Business',
    publicationDate: '2014-11-04',
    description:
      'Explains how products build user habits through triggers, actions, rewards, and investment.',
    coverImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80',
    totalCopies: 4,
    availableCopies: 4,
  },
  {
    title: 'Mindset',
    author: 'Carol S. Dweck',
    genre: 'Psychology',
    publicationDate: '2006-02-28',
    description:
      'A well-known book on the difference between fixed and growth mindsets in learning and achievement.',
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80',
    totalCopies: 7,
    availableCopies: 7,
  },
  {
    title: 'Rework',
    author: 'Jason Fried',
    genre: 'Business',
    publicationDate: '2010-03-09',
    description:
      'Challenges conventional business advice and promotes a simpler way to build and run a company.',
    coverImage: 'https://images.unsplash.com/photo-1496104679561-38b2b4e3d4fb?auto=format&fit=crop&w=800&q=80',
    totalCopies: 5,
    availableCopies: 5,
  },
  {
    title: 'The One Thing',
    author: 'Gary Keller',
    genre: 'Productivity',
    publicationDate: '2013-04-01',
    description:
      'A productivity book about focusing on the single most important task that drives results.',
    coverImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80',
    totalCopies: 6,
    availableCopies: 6,
  },
  {
    title: 'Essentialism',
    author: 'Greg McKeown',
    genre: 'Productivity',
    publicationDate: '2014-04-15',
    description:
      'Teaches the disciplined pursuit of less by focusing only on what is essential.',
    coverImage: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80',
    totalCopies: 4,
    availableCopies: 4,
  },
  {
    title: 'Make Time',
    author: 'Jake Knapp',
    genre: 'Productivity',
    publicationDate: '2018-09-25',
    description:
      'Offers practical strategies to create time for what matters in a distracted digital world.',
    coverImage: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=800&q=80',
    totalCopies: 5,
    availableCopies: 5,
  },
  {
    title: 'Do Epic Shit',
    author: 'Ankur Warikoo',
    genre: 'Motivation',
    publicationDate: '2021-12-27',
    description:
      'A collection of personal lessons on success, failure, self-awareness, and building a fulfilling life.',
    coverImage: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80',
    totalCopies: 8,
    availableCopies: 8,
  }
]

export default booksData