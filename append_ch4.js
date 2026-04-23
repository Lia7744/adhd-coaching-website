const fs = require('fs');

let pageContent = fs.readFileSync('src/app/workbook/page.tsx', 'utf8');

const injectionPoint = `          <div className="absolute bottom-10 right-14 text-[24px] font-black opacity-30 tracking-widest pointer-events-none" style={{ color: C.charcoal }}>19</div>
        </section>
      </div>
    </div>
  );
}`;

const newChapterHtml = `          <div className="absolute bottom-10 right-14 text-[24px] font-black opacity-30 tracking-widest pointer-events-none" style={{ color: C.charcoal }}>19</div>
        </section>

        {/* --- PAGE 20: CHAPTER 4 TITLE --- */}
        <section className="print:break-after-page min-h-[970px] relative p-20 flex flex-col justify-center items-center text-center chapter-cover" style={{ backgroundColor: C.cream }}>
          <h1 className={\`\${caveat.className} text-[110px] leading-none mb-10 tracking-wide drop-shadow-md\`} style={{ color: C.charcoal }}>
            CHAPTER 4
          </h1>
          <h2 className={\`\${radley.className} text-[72px] drop-shadow-sm px-8 relative\`} style={{ color: C.sage }}>
            Tricking Myself Into Starting
          </h2>
          <svg className="mt-12 w-48 h-12" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 20 Q 50 5, 100 20 T 195 20" stroke={C.gold} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </section>

        {/* --- PAGE 21: CHAPTER 4 CONTENT - THE BIT --- */}
        <section className="print:break-after-page min-h-[970px] relative p-20 bg-white">
          <div className="space-y-4 text-[21px] leading-[1.7]">
            <h2 className={\`\${radley.className} text-[35px] mb-10 border-b-4 inline-block font-bold\`} style={{ color: C.sage, borderColor: C.sage }}>THE BIT</h2>
            <p>Tell me if this sounds familiar…I will sit on the couch for 45 minutes thinking about a task that takes 5 minutes. And I'm not thinking about the task in a productive way. I'm not planning. I'm not strategizing. I'm just... aware of it. It's sitting there. I'm sitting here. We're both very still. Neither of us is making the first move.</p>
            
            <p>It’s the world’s most ridiculous standoff. I call this one the Frozen Starter — and before you ask, no, that’s not a clinical term. It’s just what I started calling it after dealing with it so many times that I literally felt like a frozen block of ice sitting on my couch. You’re not avoiding the task. You’re not distracted. You’re frozen in front of it.</p>
            
            <p>And the whole time, there’s a running narration in my head that goes something like: "I should start that. I'm going to start that. I'll start that in a minute. Okay, after this episode. Okay, after I refill my water. Okay, after I check one thing on my phone." And then it's 10pm and the task is still sitting there and now it's too late, which honestly feels like a relief, because at least I don't have to think about starting it anymore. I can just feel guilty about it instead.</p>

            <div className="my-10 p-8 rounded-3xl text-center shadow-md border-[3px]" style={{ backgroundColor: '#ebf2ed', borderColor: C.sageLight }}>
              <p className={\`\${radley.className} font-bold text-[30px] leading-relaxed\`} style={{ color: C.charcoal }}>
                If someone told me to "just do it," I would simply explode. "Just do it" is not advice. It's a Nike slogan.
              </p>
            </div>
            
            <p>It works for people whose brains already have a reliable, easy to use start button. An ADHD brain however, has a start button, but requires a series of circumstances so specific and unpredictable that it might as well be a secret combination that you don't know. Ugh.</p>
          </div>

          <div className="absolute bottom-10 right-14 text-[24px] font-black opacity-30 tracking-widest pointer-events-none" style={{ color: C.charcoal }}>20</div>
        </section>

        {/* --- PAGE 22: CHAPTER 4 CONTENT - THE REAL TALK --- */}
        <section className="print:break-after-page min-h-[970px] relative p-20" style={{ backgroundColor: C.cream }}>
          <div className="space-y-4 text-[20px] leading-[1.6]">
            <h2 className={\`\${radley.className} text-[35px] mb-10 border-b-4 inline-block font-bold\`} style={{ color: C.sage, borderColor: C.sage }}>THE REAL TALK</h2>
            <p>So here's what's going on when you're glued to the couch staring at the thing you need to do. Your brain isn't being lazy. It's stuck. And not in a "I don't feel like it" way. In a "my body will not move and I don't know why" way. If you've ever wanted to do something, known exactly how to do it, had the time to do it, and still just... not done it, you know what I'm talking about.</p>

            <p>The research backs this up. Barkley's work shows that ADHD is fundamentally a disorder of self-regulation, not just attention. It starts with a deficit in behavioral inhibition that cascades into problems with working memory, managing emotions and motivation, internal self-talk, and putting ideas together. Basically, the mental tools you need to get yourself to do things aren't firing reliably <span className="uppercase text-xs opacity-60 tracking-wider font-bold">(Barkley, 1997)</span>. That's why you can care deeply about something and still not be able to make yourself start it.</p>

            <p>In chemistry (don't worry, this is NOT turning into a chemistry book) there's a concept called activation energy: the minimum amount of energy required to start a chemical reaction. Once the reaction starts, it sustains itself with way less energy. Psychologist Shawn Achor uses this same metaphor in his book, The Happiness Advantage to explain why starting is the hardest part of any behavior change. He wanted to build a habit of playing guitar every day, and kept failing. When he looked at why, he realized the guitar was in his closet, and those 20 seconds of effort it took to walk over and pull it out were enough to stop him every time. So he bought a cheap guitar stand and put it in the middle of his living room. He played for 21 days straight.</p>

            <div className="my-8 p-6 rounded-2xl shadow-sm border-l-[6px]" style={{ backgroundColor: '#ffffff', borderColor: C.gold }}>
              <p className="font-bold text-[22px] leading-snug text-gray-800">
                His 20-Second Rule argues that reducing the effort to begin by even a tiny amount can be the difference between doing something and not doing it <span className="uppercase text-[12px] opacity-60 tracking-wider font-bold">(Achor, 2010)</span>.
              </p>
            </div>

            <p>Now, Achor wasn't talking about ADHD specifically. But if 20 seconds of extra effort can stop a neurotypical person from picking up a guitar, imagine what it does to a brain that's already low on the fuel it needs to get started.</p>

            <p>There's also an emotional piece to this that doesn't get talked about enough. A 2023 research review found that emotion dysregulation is increasingly recognized as a core component of ADHD. Adults with ADHD consistently scored lower on emotion regulation measures and tended to use less effective strategies for managing their emotional responses <span className="uppercase text-xs opacity-60 tracking-wider font-bold">(Soler-Gutiérrez et al., 2023)</span>. This shows up in task initiation all the time. It's not just that the task is hard or boring. It's that the task comes with feelings (dread, shame, overwhelm, perfectionism), and those feelings become their own barrier to starting.</p>
          </div>

          <div className="absolute bottom-10 right-14 text-[24px] font-black opacity-30 tracking-widest pointer-events-none" style={{ color: C.charcoal }}>21</div>
        </section>

        {/* --- PAGE 23: CHAPTER 4 CONTENT - REAL TALK CONT. / MANIPULATION --- */}
        <section className="print:break-after-page min-h-[970px] relative p-20 bg-white">
          <div className="space-y-4 text-[20px] leading-[1.6]">
            
            <p>And then there's the delay problem. A study looking at ADHD and procrastination found exactly what you'd expect: people with more ADHD symptoms procrastinate more. But here's the interesting part. The researchers found that two things helped explain why. The first is impulsiveness, which in this context means how much you discount future outcomes in favor of what's right in front of you. The second is low expectancy, which basically means not feeling confident that you can actually complete the task successfully <span className="uppercase text-xs opacity-60 tracking-wider font-bold">(Netzer Turgeman & Pollak, 2023)</span>.</p>
            
            <p>For example, that thing that's due in three weeks that you cannot make yourself start even though you know you'll panic about it later? The outcome is too far away and some part of you isn't convinced you can do it well anyway. So your brain just... doesn't.</p>

            <p className="font-bold px-6 py-6 rounded-xl shadow-sm my-8" style={{ backgroundColor: '#ebf2ed', color: C.charcoal }}>
              So no. You are not lazy, or whatever else you've been calling yourself. Your brain requires more activation energy to start, and it's getting less fuel than it needs. The manipulation is about making the start so small, so easy, and so low-cost that your brain just shrugs and goes, "can't argue with that."
            </p>

            <h2 className={\`\${radley.className} text-[35px] mt-16 mb-10 border-b-4 inline-block font-bold\`} style={{ color: C.sage, borderColor: C.sage }}>THE MANIPULATION</h2>
            
            <p>The most important thing I can tell you about starting is this: you do not need to feel ready. You do not need to wait for motivation to show up on its own. But you do need to give your brain something it can work with. If you read Chapter 2, you already know your brain runs on interest, novelty, challenge, passion and urgency, not on "I should." So the trick isn't forcing yourself to start with nothing. It's making the first action so small, or the environment around it appealing enough, that your brain has just enough buy-in to take that first step.</p>

            <div className="my-8 p-6 rounded-2xl shadow-sm border-[3px]" style={{ borderColor: C.sageLight, backgroundColor: '#ffffff' }}>
               <p className={\`\${radley.className} text-[22px] font-bold tracking-wide leading-relaxed text-center\`} style={{ color: C.charcoal }}>
                 Not "clean the kitchen." Put one plate in the sink.<br/>
                 Not "write the report." Open the document.<br/>
                 Not "do your taxes." Find the folder.
               </p>
            </div>

            <p>That's it. That's the trick. You're not committing to finishing anything. You're just starting. And once you start, your brain often keeps going, because continuing requires significantly less activation energy than initiating did. The reaction is already happening. You just needed the spark.</p>
            
          </div>

          <div className="absolute bottom-10 right-14 text-[24px] font-black opacity-30 tracking-widest pointer-events-none" style={{ color: C.charcoal }}>22</div>
        </section>

        {/* --- PAGE 24: CHAPTER 4 CONTENT - MANIPULATION CONT --- */}
        <section className="print:break-after-page min-h-[970px] relative p-20" style={{ backgroundColor: C.cream }}>
          <div className="space-y-4 text-[20px] leading-[1.6]">
            
            <p>If even the smallest step feels impossible, check your environment. Are you trying to start from the couch? Move to the room where the task lives. Are you trying to start in silence? Put something on in the background. Sometimes the issue isn't the task at all. It's that you're trying to initiate from a location or a state your brain associates with rest, and the transition cost is too high. Changing your physical position can be the 20 seconds that makes the difference.</p>

            <div className="my-8 p-8 rounded-3xl shadow-sm border-[3px]" style={{ backgroundColor: '#ffffff', borderColor: C.sageLight }}>
              <p className="font-bold text-[18px] mb-4 uppercase tracking-widest text-center" style={{ color: C.sage }}>A brief note on body doubling:</p>
              <p className="text-[19px] leading-relaxed text-gray-800 text-center font-medium">
                If you can get someone, anyone, in the same room (or on a video call, or even a "Study With Me" livestream on YouTube), that presence alone can lower the activation energy enough to start. You don't need them to help. You don't need them to care. You just need them to exist near you.
              </p>
            </div>

            <p>And one more thing. If you try a strategy and it doesn't work, that's information, not failure. ADHD brains are novelty-seeking, which means the trick that worked on Tuesday might not work on Thursday. That's normal. Build a list of starting strategies so you have options. Which is exactly what the next exercise is for.</p>
            
          </div>

          <div className="absolute bottom-10 right-14 text-[24px] font-black opacity-30 tracking-widest pointer-events-none" style={{ color: C.charcoal }}>23</div>
        </section>
      </div>
    </div>
  );
}`;

if (pageContent.includes(injectionPoint)) {
   pageContent = pageContent.replace(injectionPoint, newChapterHtml);
   fs.writeFileSync('src/app/workbook/page.tsx', pageContent);
   console.log('Chapter 4 successfully appended!');
} else {
   console.log('Error: Could not find injection point!');
}
