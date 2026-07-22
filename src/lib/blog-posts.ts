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
  }
];
