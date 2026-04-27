import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing ideas to avoid duplicates during development
  await prisma.contentIdea.deleteMany({});

  const ideas = [
    // --- TECH ---
    {
      title: "5 AI Tools That Feel Illegal to Know",
      description: "A curated list of under-the-radar AI tools for productivity.",
      hook: "I found 5 AI tools that feel like cheating. Here's why.",
      caption: "Forget ChatGPT. These 5 tools are actually changing the game in 2026:\n\n1. [Tool Name] for Research\n2. [Tool Name] for Coding\n3. [Tool Name] for Design\n\nComment 'TOOLS' and I'll DM you the list! 🔥 #tech #aitools #productivity",
      niche: "Tech",
      type: "Reel",
      isPremium: true,
    },
    {
      title: "My 2026 Minimalist Desk Setup",
      description: "A breakdown of a high-productivity workspace.",
      hook: "Your desk setup is killing your focus. Here's how to fix it.",
      caption: "A clean space = a clean mind. Here's everything on my desk right now that actually helps me work faster.\n\n- The Monitor: [Model]\n- The Keyboard: [Model]\n- The Hack: Under-desk cable management.\n\nSave this for your office glow-up! 💻 #workspace #setup #techlife",
      niche: "Tech",
      type: "Post",
      isPremium: false,
    },
    {
      title: "How to Build an App with 0 Code",
      description: "The ultimate guide to no-code development.",
      hook: "You don't need to learn Python to build your first app.",
      caption: "The 'No-Code' revolution is here. I built a functional app in 4 hours using these 3 tools.\n\nWeek 1: Logic in Bubble\nWeek 2: Data in Airtable\nWeek 3: Design in Figma\n\nFull roadmap in the bio! 🚀 #nocode #startup #tech",
      niche: "Tech",
      type: "Reel",
      isPremium: true,
    },

    // --- BUSINESS ---
    {
      title: "How I'd Make $10k/Month Starting from $0",
      description: "A realistic roadmap for modern service-based businesses.",
      hook: "If I lost everything today, here's exactly how I'd make $10k next month.",
      caption: "No fluff, just the blueprint:\n\nStep 1: Identify a high-ticket skill (Ghostwriting, Ads, etc.)\nStep 2: Outreach to 50 people/day on X\nStep 3: Offer a free sample to close the first 3 clients\nStep 4: Scale with referrals.\n\nWho's starting with me? 💼 #entrepreneur #sidehustle #business",
      niche: "Business",
      type: "Reel",
      isPremium: true,
    },
    {
      title: "The 'Invisible' Marketing Strategy",
      description: "How to sell without being 'salesy'.",
      hook: "Stop selling your product. Start selling the transformation.",
      caption: "People don't buy drills; they buy the hole in the wall. Here's how to shift your marketing message to focus on outcomes, not features.\n\nRead the carousel to see the 3-step framework. ➡️ #marketingtips #branding #businessgrowth",
      niche: "Business",
      type: "Post",
      isPremium: false,
    },
    {
      title: "3 Books That Changed My Financial Life",
      description: "Essential reading for aspiring millionaires.",
      hook: "I read 50+ business books, but only these 3 actually made me money.",
      caption: "Skip the noise. These 3 books are the foundation of everything I know about wealth:\n\n1. [Book 1]\n2. [Book 2]\n3. [Book 3]\n\nHave you read any of these? Let's discuss in the comments! 📚 #wealth #moneyhacks #readinglist",
      niche: "Business",
      type: "Story",
      isPremium: false,
    },

    // --- FITNESS ---
    {
      title: "The 15-Minute 'No-Gym' Fat Burner",
      description: "High-intensity bodyweight workout for busy professionals.",
      hook: "No gym? No time? No excuses. Try this 15-minute burner.",
      caption: "You don't need 2 hours to get a great workout. Set your timer for 15 mins:\n\n- 40s Mountain Climbers\n- 40s Air Squats\n- 40s Burpees\n- 20s Rest\n\nRepeat 5 times. Save this for later! 🏃‍♂️ #fitnessmotivation #homeworkout #fatloss",
      niche: "Fitness",
      type: "Reel",
      isPremium: false,
    },
    {
      title: "Why You're Not Seeing Muscle Growth",
      description: "The 3 most common mistakes in the gym.",
      hook: "You're lifting heavy but not growing? Here's the hidden reason.",
      caption: "It's not always about the weight. Are you focusing on:\n\n1. Time Under Tension?\n2. Progressive Overload?\n3. Sleep and Recovery?\n\nStop wasting your sets. Follow for more lifting science! 💪 #gymtips #musclebuild #bodybuilding",
      niche: "Fitness",
      type: "Post",
      isPremium: true,
    },
    {
      title: "My Full Day of Eating (3000 Calories)",
      description: "A clean bulk meal plan breakdown.",
      hook: "Eating 3000 calories without feeling bloated. Here's the menu.",
      caption: "Meal 1: Oats + Protein\nMeal 2: Chicken + Rice + Avocado\nMeal 3: Salmon + Sweet Potato\n\nFull macros and grocery list for Pro members in the library! 🥗 #mealprep #bulking #fitnessjourney",
      niche: "Fitness",
      type: "Story",
      isPremium: true,
    },

    // --- FASHION ---
    {
      title: "5 Color Combos That Look Expensive",
      description: "Styling tips for a more sophisticated look.",
      hook: "You don't need designer clothes to look like a millionaire.",
      caption: "It's all in the color theory. Try these combos to instantly elevate your look:\n\n- Navy + Cream\n- Forest Green + Tan\n- Charcoal + Black\n\nWhich one are you wearing this weekend? ✨ #stylehacks #mensfashion #luxurylook",
      niche: "Fashion",
      type: "Reel",
      isPremium: false,
    },
    {
      title: "The Ultimate Sneaker Guide for 2026",
      description: "What's in and what's out in the world of footwear.",
      hook: "Stop wearing [Trend Name]. These are the sneakers for 2026.",
      caption: "Sneaker trends move fast. This year, we're seeing a shift towards [Trend]. Here are my top 3 picks for every budget.\n\nSwipe to see the list! 👟 #sneakerhead #fashiontrends #streetwear",
      niche: "Fashion",
      type: "Post",
      isPremium: true,
    },

    // --- FOOD ---
    {
      title: "The Best 10-Minute Pasta You'll Ever Make",
      description: "Quick, gourmet-style dinner for busy weeknights.",
      hook: "Tired of frozen meals? Make this 10-minute pasta instead.",
      caption: "Garlic, Chilli, Lemon, and Parsley. That's all you need for the perfect Aglio e Olio. 🍝\n\nFull recipe steps in the caption below! #cookinghacks #easyrecipes #foodie",
      niche: "Food",
      type: "Reel",
      isPremium: false,
    },
    {
      title: "Is Organic Actually Better? The Truth.",
      description: "A science-backed look at organic vs. conventional food.",
      hook: "Stop overpaying for organic food until you read this.",
      caption: "We analyzed the nutritional data. Here's which foods you SHOULD buy organic and which ones you're just wasting money on.\n\nThe 'Dirty Dozen' list updated for 2026 is in the bio! 🍎 #nutrition #healthyeating #foodscience",
      niche: "Food",
      type: "Post",
      isPremium: true,
    },

    // --- NEW IDEAS ---
    {
      title: "The Psychology of a High-Converting Hook",
      description: "Deep dive into why people stop scrolling.",
      hook: "I analyzed 1,000 viral videos. This is the hook formula they all use.",
      caption: "It's called the 'Pattern Interrupt.' You have 1.5 seconds to break their scroll. Here are 3 ways to do it today.\n\nPro members: Download my 50 Viral Hook Templates in the dashboard! 📈 #contentcreation #socialmediamarketing #viral",
      niche: "Business",
      type: "Reel",
      isPremium: true,
    },
    {
      title: "How to Read 1 Book a Week (Without Speed Reading)",
      description: "Practical habits for consistent reading.",
      hook: "I used to read 1 book a year. Now I read 50. Here's the trick.",
      caption: "It's not about reading faster. It's about reading smarter.\n\n- Rule 1: The 50-page test.\n- Rule 2: Audiobooks while commuting.\n- Rule 3: Digital detox before bed.\n\nWhat are you reading right now? 📖 #booktok #learning #habits",
      niche: "Business",
      type: "Post",
      isPremium: false,
    },
    {
      title: "Morning Habit: The 3-2-1 Rule",
      description: "A simple productivity system for better sleep and focus.",
      hook: "If you wake up tired, you're missing the 3-2-1 rule.",
      caption: "3 hours before bed: No food.\n2 hours before bed: No work.\n1 hour before bed: No screens.\n\nTry this for 7 days and watch your energy explode. ⚡ #productivity #wellness #biohacking",
      niche: "Business",
      type: "Story",
      isPremium: false,
    },
    {
      title: "Top 5 High-Paying Skills to Learn in 2026",
      description: "Future-proofing your career in the age of AI.",
      hook: "Your job might be automated, but these 5 skills will never be.",
      caption: "The world is changing. Focus on these 5 areas to stay indispensable:\n\n1. AI Prompt Engineering\n2. High-Ticket Sales\n3. Personal Branding\n4. Data Storytelling\n5. Human-Centric Design\n\nWhich one are you learning? 💡 #career #futureofwork #skills",
      niche: "Business",
      type: "Post",
      isPremium: true,
    },
    {
      title: "Building a $1M Personal Brand",
      description: "Strategies for long-term influence and monetization.",
      hook: "Your personal brand is your new resume. Here's how to build it.",
      caption: "Consistency over intensity. Niche down until it hurts. Be the 'Go-To' person for ONE thing.\n\nFull case study in the Pro library! 👑 #branding #personalbrand #entrepreneurship",
      niche: "Business",
      type: "Reel",
      isPremium: true,
    }
  ];

  console.log("Starting seed...");

  for (const idea of ideas) {
    await prisma.contentIdea.create({
      data: idea,
    });
  }

  const total = await prisma.contentIdea.count();
  console.log(`Seeding completed! Created ${total} high-value ideas.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
