export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  coverImage?: string; // Optional custom cover image
  content: string; // HTML string containing the post body
  references?: string[]; // Academic/scientific citations
  emailCapture?: {
    source: string;
    fileDownloadUrl: string;
    ctaText: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-is-adhd-coaching-benefits",
    title: "What is ADHD Coaching and What Exactly Are the Benefits?",
    description: "ADHD coaching can feel like a vague concept. Let's break down exactly what it is, how it differs from therapy, what to expect in a session, and how it helps you build systems for your unique brain.",
    date: "July 20, 2026",
    readTime: "6 min read",
    category: "ADHD Basics",
    coverImage: "/blog/what-is-coaching.jpg",
    content: `
      <p>So you've probably heard about ADHD coaching and are maybe wondering… but what actually IS ADHD Coaching and what are the actual benefits? Let's break it down.</p>

      <h2>What is ADHD coaching, really?</h2>
      <p>Coaching is a partnership between you and your coach, part thinking partnership, part accountability. It's the process of figuring out what you actually want, breaking it down into doable steps, and checking in and addressing challenges along the way, to keep you moving toward it.</p>
      <p>A coach won't hand you a to-do list or tell you what your life should look like. It's about asking the right questions, at the right time, so you can figure out what actually works for you, and then holding that space with you as you go do it.</p>
      <p>ADHD coaching takes that same foundation and builds it around how the ADHD brain works. It's a collaborative partnership with a coach who brings ADHD-specific knowledge and tools, helping you build self-awareness around how your ADHD shows up day to day, along with the acceptance and strategies to manage it.</p>
      <p>Coaching is forward-focused and action-oriented. We're not digging into "why" something happened in your childhood. We're working with where you are right now and where you want to go next.</p>

      <h2>What does a session actually look like?</h2>
      <p>I get it, "coaching" can feel like a vague concept until you've actually sat in a session. So here's what we typically do.</p>
      <p>We start by looking back at the action steps from your last session: what went well, and what was a challenge. We approach this part with curiosity, not judgment. If something didn't happen, we're not here to figure out why you "failed." We're here to figure out what actually got in the way, and find a way around it. This, in my opinion, is where we tend to uncover the true culprit of why you're stuck! It's also a place where we start to discover your strengths.</p>
      <p>From there, we move into the main part of the session: a topic of your choosing. Maybe it's a project you're stuck on, a pattern you keep running into, or something that's been sitting in the back of your mind. We explore it together.</p>
      <p>By the end of the session, you'll walk away with action steps for the week ahead, concrete next moves that keep you pointed toward the bigger goals we've set together.</p>

      <h2>What can I work on in coaching?</h2>
      <p>Honestly? Anything. Coaching isn't limited to one subject, whatever is showing up for you is fair game.</p>
      <p>That said, most people come to coaching to work through ADHD-related challenges like:</p>
      <ul>
        <li>Getting work done and staying on top of deadlines</li>
        <li>Creating and sticking to healthy habits</li>
        <li>Staying on top of schoolwork</li>
        <li>Setting up systems to manage your day-to-day</li>
        <li>Task initiation (getting started on things, especially the boring or overwhelming ones)</li>
        <li>Hyperfocus and how to manage it</li>
        <li>Decision paralysis</li>
        <li>Time management</li>
        <li>Emotional regulation, including rejection sensitive dysphoria (RSD)</li>
        <li>Organization and clutter, at home or digitally</li>
        <li>Forgetfulness and staying on top of commitments</li>
        <li>Finances, like impulsive spending or avoiding bills</li>
        <li>Burnout and recovering from years of masking or overperforming</li>
        <li>Relationships and communication</li>
        <li>Shame and self-esteem around ADHD</li>
      </ul>
      <p>And that's really just a starting point. If it's something you're navigating and it feels connected to how your brain works, it's something we can bring into a session.</p>

      <h2>What coaching isn't</h2>
      <p>Coaching is not:</p>
      <ul>
        <li><strong>Consulting.</strong> A consultant tells you what to do based on their expertise. A coach helps you find what works based on your expertise on your own life.</li>
        <li><strong>Advising.</strong> I'm not going to hand you a list of rules to follow. We're figuring out your systems together. Yes, there may be some suggested strategies to try out to manage various challenges that come with ADHD, but a coach's role isn't to tell you what to do.</li>
        <li><strong>Therapy.</strong> Therapy looks backward, at the roots of things: processing past experiences, working through trauma, or treating a mental health condition. Coaching looks forward, at what you're going to do next.</li>
      </ul>
      <p>That last one trips people up the most, so let's dig into it a little more.</p>

      <h2>ADHD coaching vs. therapy</h2>
      <p>Both are valuable, and honestly, a lot of my clients do both at the same time. They're not competing with each other.</p>
      <p>Therapy tends to focus on the "why": processing emotions, working through past experiences, and treating mental health conditions. It's often necessary, especially since anxiety and depression commonly show up alongside ADHD.</p>
      <p>Coaching focuses on the "what now": building the systems, strategies, and self-awareness you need to move forward, right now, with the brain you have. If something comes up in a session that feels like it needs deeper emotional processing, I'll always encourage (and support) you in also working with a therapist. Coaching and therapy work well together, they're just not the same tool.</p>

      <h2>The benefits of ADHD coaching</h2>
      <p>ADHD coaching gives you a structure that works with your brain instead of against it. But the biggest benefit is deeper self-understanding. Working with a certified ADHD coach helps you draw the map to your own brain, so you're no longer navigating life with blinders on. That map lets you build your life around your ADHD, instead of trying to morph into a life that was never built for it.</p>
      <p>Some of the benefits clients experience:</p>
      <ul>
        <li>Systems and strategies built for your brain, ADHD-proof (or as close as possible)</li>
        <li>An accountability structure that keeps you moving, even when motivation isn't there</li>
        <li>A deeper understanding of how your ADHD shows up for you specifically</li>
        <li>Less shame around the things you "should" be doing but aren't</li>
        <li>A space to problem-solve out loud with someone who isn't going to judge you for where you're starting from</li>
        <li>Real, sustainable progress toward goals that matter to you</li>
      </ul>
      <p>This isn't just anecdotal, either. A 2013 study (Field et al.) found college students who received ADHD coaching showed statistically significant improvements in executive functioning, with moderate to large effect sizes. A separate study (Prevatt & Yelland, 2015) found the biggest individual gains were in time management and concentration. Research on ADHD coaching is still growing, but the findings consistently point the same direction: it works.</p>

      <h2>Do you need an ADHD diagnosis to work with an ADHD coach?</h2>
      <p>Nope. You don't need a formal diagnosis to start ADHD coaching.</p>
      <p>We're not focused on the label, we're focused on the challenges: things like executive functioning struggles, time blindness, trouble starting tasks, or emotional overwhelm. That said, we do approach all of it through an ADHD lens, exploring how these patterns show up for you and what's actually going on underneath them, whether or not you have an official diagnosis in hand.</p>

      <h2>How do you know if coaching is right for you?</h2>
      <p>Honestly, all you need to be coachable is an open mind and a willingness to be honest, with yourself and with your coach.</p>
      <p>In my experience, the clients who benefit the most, and see the most success, are the ones who keep showing up: even on the weeks they're feeling stuck, or didn't get around to the things they said they would.</p>
      <p>Shame is often the #1 thing standing in the way of progress. If you're coming into a session feeling ashamed because you didn't touch your goals since the last call, tell your coach. That's exactly what coaching is for: working through it together so you can get past it and back on track toward where you're headed.</p>

      <h2>Ready to get started?</h2>
      <p>If you're ready to dive in, book a free discovery call and let's talk about what coaching could look like for you.</p>
      <p>Not ready for 1:1 coaching yet, but want a taste of what this work looks like? Check out my workbook, <a href="/shop">Manipulating Myself to Do Stuff</a>, a great low-pressure way to start building some of these tools on your own.</p>
    `,
    references: [
      "Field, S., Parker, D. R., Sawilowsky, S., & Rolands, L. (2013). Assessing the impact of ADHD coaching services on university students' learning skills, self-regulation, and well-being. Journal of Postsecondary Education and Disability, 26(1), 67–81.",
      "Prevatt, F., & Yelland, S. (2015). An empirical evaluation of ADHD coaching in college students. Journal of Attention Disorders, 19(8), 666–677."
    ]
  },
  {
    slug: "why-just-do-it-doesnt-work-adhd-incup",
    title: "Why \"just do it\" doesn't work for ADHD brains",
    description: "You know the task matters. You know the deadline is real. You still can't make yourself start. Let's talk about the interest-based nervous system and the INCUP framework.",
    date: "August 17, 2026",
    readTime: "5 min read",
    category: "ADHD Basics",
    coverImage: "/blog/incup-cover.jpg",
    emailCapture: {
      source: "incup_worksheet",
      fileDownloadUrl: "/blog/INCUP_Worksheet.pdf",
      ctaText: "Want a printable version of this framework to keep on hand? Download the free INCUP guide and I'll send it straight to your inbox."
    },
    content: `
      <p>You know the task matters. You know the deadline is real. You still can't make yourself start. Meanwhile you'll happily lose 6 hours to a hobby nobody's paying you for.</p>
      <p>If that sounds familiar, you're not alone. Your brain runs on a different motivation system than a neurotypical brain does. Let's talk about what that system actually is, and how to work with it instead of fighting it.</p>

      <h2>First, let's talk dopamine</h2>
      <p>ADHD gets described a lot as "low dopamine," but that's not quite the full picture. Research points to differences in how dopamine is regulated, not simply having less of it. In practice, that often means there's less dopamine available in the moment to fuel motivation, especially for tasks that don't already feel exciting or stimulating.</p>
      <p>Dopamine plays a huge role in motivation, reward, and working memory. When a task doesn't generate enough of a dopamine signal, your brain doesn't get the "go ahead" to activate, even when you know, logically, that the task matters. That's not a willpower problem. That's neurology.</p>
      <p>This is where Dr. William Dodson's work comes in.</p>

      <h2>You have an interest-based nervous system</h2>
      <p>Dr. William Dodson is a psychiatrist who's spent decades working with adults with ADHD, and he coined a term that reframed how a lot of us think about ADHD motivation: the interest-based nervous system.</p>
      <p>Here's the idea. Neurotypical brains tend to run on what Dodson calls an importance-based nervous system. If something is important, has consequences, or has a deadline attached, that's usually enough to get a neurotypical brain moving.</p>
      <p>ADHD brains don't run on importance. Knowing something matters isn't enough to reliably create action. Instead, ADHD brains are wired to respond to interest. If something is interesting, novel, challenging, urgent, or tied to something you're passionate about, your brain engages. If it's none of those things, even if it's genuinely important, your brain can struggle to start, no matter how much you want it to.</p>

      <h2>What does this look like in action?</h2>
      <p>Almost every ADHDer knows this pattern:</p>
      <ul>
        <li>You can hyperfocus on a hobby for hours, but can't start the report that's due in two days, even though, logically, you know it's important.</li>
        <li>A deadline feels non-existent, until it becomes urgent, and then somehow you finish the whole project the night before.</li>
        <li>You'll deep clean the entire house right before someone comes over, but can't, for the life of you, do the dishes on a regular Tuesday.</li>
        <li>You'll happily help a friend with any task, but can't get yourself to run your own errands or do your own tasks.</li>
      </ul>
      <p>None of this is about caring less. It's about what your nervous system is actually responding to.</p>

      <h2>The INCUP framework: how to use it</h2>
      <p>This is often referred to as the INCUP, or PINCH framework, built out of Dodson's ideas about what activates the ADHD brain: Interest, Novelty, Challenge, Urgency, and Passion. These are the five drivers that reliably get an ADHD brain moving. When a task feels impossible, the fix usually isn't more willpower, it's finding a way to add one or more of these five ingredients.</p>

      <h3>Interest</h3>
      <p>If something isn't naturally interesting, you can often build interest into it.</p>
      <ul>
        <li>Tie the task to something that matters to you. Hate laundry but love an organized closet? Focus on the outcome you actually want.</li>
        <li>Get clear on your "why." Not your boss's why, not society's why, yours.</li>
        <li>Pair a boring task with something you already enjoy, like a favorite podcast or a call with a friend while you fold laundry.</li>
        <li>Turn it into a question you're curious about: "How fast can I actually get through this stack of mail?"</li>
      </ul>

      <h3>Novelty</h3>
      <p>Novelty tricks your brain into treating something familiar as new again. New = exciting and therefore, interesting.</p>
      <ul>
        <li>Change your environment: a coffee shop, a different room, outside.</li>
        <li>Add a new sensory element: light a candle, switch up your lighting, play new sounds or music, try a new scent.</li>
        <li>Use new tools: a new notebook, a new pen, a new app.</li>
        <li>Do the task in a different order or a different way than you normally would.</li>
      </ul>

      <h3>Challenge</h3>
      <p>Turn the task into a game and your brain gets a reason to show up.</p>
      <ul>
        <li>Race against a clock: how much of this list can you get done in one hour?</li>
        <li>Compete against yourself: try to beat your own time from last time.</li>
        <li>Bring in a body double or a friendly competitor.</li>
        <li>Set a weird constraint just to make it more interesting, like only using one hand or racing a song to see if you can finish before it ends.</li>
      </ul>

      <h3>Urgency</h3>
      <p>This isn't a place we want to live 100% of the time, but let's be honest: it's hella effective. Think about the last time you waited until the absolute last minute and suddenly had a fire lit under you. That's urgency in action.</p>
      <p>Fake, self-imposed deadlines rarely work on their own. What does work is bringing someone else into it. Tell a colleague or friend, "I'm going to get X done by the end of the day, can you check in with me later?" That kind of external accountability creates real urgency, even without a built-in deadline.</p>
      <ul>
        <li>Loop someone else in and ask them to check on your progress.</li>
        <li>Use a visible countdown timer instead of a vague sense of time passing.</li>
        <li>Attach the task to something with a real, external deadline, like prepping for a meeting that's already on the calendar.</li>
      </ul>

      <h3>Passion</h3>
      <p>Is this something you're actually passionate about? If not, the goal is to borrow passion from somewhere else and connect it to the task.</p>
      <ul>
        <li>Tie the task to a bigger goal or value you care about. Ask yourself, "if I finish this, what does it let me do next?"</li>
        <li>Connect it to the person it impacts. Who benefits when this gets done?</li>
        <li>Visualize how you'll feel once it's finished, not just that it's finished.</li>
        <li>If the task itself has zero passion attached, pair it with a project or person you do feel passionate about, so some of that energy carries over. For example, you might not be passionate about cleaning the bathrooms BUT you may be passionate about teaching your children how to maintain cleanliness in a home.</li>
      </ul>

      <h2>You don't need all five at once</h2>
      <p>You don't need to stack all five motivators every time. Often, adding just one is enough to shift a task from "impossible" to "doable." The more familiar you get with INCUP, the faster you'll be able to notice, in the moment, which driver is missing and which one to pull.</p>

      <hr />
      <h2>Need more personalized support?</h2>
      <p>If you're looking for help applying these frameworks to your specific life, <a href="https://calendar.app.google/MFSVFkCLgbNfhPNo9" target="_blank" rel="noopener noreferrer">book a free consultation with me</a> to explore how ADHD coaching can get you unstuck.</p>
    `
  }
];
