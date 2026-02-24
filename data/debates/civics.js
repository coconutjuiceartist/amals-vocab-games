export const civicsDebates = [
    {
        id: 'lowering-voting-age',
        title: "Lowering the Voting Age to 16",
        premise: "A proposal has been introduced to lower the national voting age from 18 to 16. You are arguing in favor of granting 16-year-olds the right to vote in all elections.",
        setting: "a Congressional Committee on Electoral Reform",
        claimOptions: [
            { id: 'c1', text: "Teenagers care about politics more than adults do.", correct: false, feedback: "This is a vague, unprovable comparison, not a clear policy claim. You need to argue for a specific change." },
            { id: 'c2', text: "Congress should lower the voting age to 16 because civic participation at a younger age strengthens democracy and produces lifelong voters.", correct: true, feedback: "Strong claim! It names a specific policy change and connects it to a clear democratic benefit." },
            { id: 'c3', text: "Everyone of any age should be allowed to vote, including children.", correct: false, feedback: "Too extreme. Arguing for no age limit at all makes your position impossible to defend and easy to dismiss." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Countries like Austria, which lowered the voting age to 16 in 2007, have seen higher long-term voter turnout among young citizens compared to countries that kept the age at 18.", type: 'strong' },
            { id: 'e2', text: "At 16, citizens can already work, pay taxes, and drive in most states, meaning they are directly affected by government policies without having a voice in choosing their representatives.", type: 'strong' },
            { id: 'e3', text: "Research from developmental psychology shows that by age 16, the brain regions responsible for logical reasoning and weighing evidence are sufficiently mature to make informed civic decisions.", type: 'strong' },
            { id: 'e4', text: "A survey of high school students found that 78% said they would vote if allowed, which proves that lowering the voting age would dramatically increase overall national turnout.", type: 'weak', feedback: "Logical Fallacy (Misleading Statistics). What people say they would do in a hypothetical survey is very different from what they actually do. Self-reported intentions cannot prove real-world turnout outcomes." },
            { id: 'e5', text: "Since 16-year-olds are trusted to operate two-ton vehicles on public highways, they are clearly mature enough to make complex political decisions about economic policy and foreign affairs.", type: 'weak', feedback: "Logical Fallacy (False Equivalence). The ability to pass a driving test measures a completely different skill set than evaluating political candidates and policy platforms. These require different types of judgment." },
            { id: 'e6', text: "Many of history's greatest activists, including Malala Yousafzai, were teenagers when they changed the world, demonstrating that young people possess the wisdom needed to vote responsibly.", type: 'weak', feedback: "Logical Fallacy (Anecdotal Evidence). A few extraordinary individuals do not represent the general readiness of all 16-year-olds. Policy must be based on broad evidence, not exceptional outliers." }
        ],
        counterArgument: {
            opponent: { name: "Representative Davis", title: "House Representative", emoji: "\u{1F3DB}\u{FE0F}" },
            text: "Sixteen-year-olds are still in high school, living under their parents' roofs. They will simply vote however their parents tell them to, making this nothing more than giving adults extra votes.",
            reactions: {
                correct: "Representative Davis shifts uncomfortably in his chair and flips through his notes, searching for a comeback. You just dismantled his core assumption with hard data from real countries — and the committee members are nodding because evidence from Austria and Scotland is difficult to argue against. He wanted this to be about gut feelings, but you made it about facts.",
                wrong: "Representative Davis leans back with a slight smile, sensing you took the bait. The committee needed to hear proof that teens think for themselves, but instead you gave them an argument that either sidesteps the question or accidentally supports his point. Several committee members are already writing notes — and not in your favor."
            },
            rebuttals: [
                { id: 'r1', text: "Studies from Austria and Scotland show that young voters research candidates independently through school programs and social media, and frequently vote differently from their parents.", correct: true, feedback: "Excellent. You countered the assumption with real-world data showing independent decision-making among young voters." },
                { id: 'r2', text: "Adults are also heavily influenced by partisan media and peer pressure, so singling out teenagers for being susceptible to influence applies an unfair double standard to younger voters.", correct: false, feedback: "Logical Fallacy (Tu Quoque / Whataboutism). Pointing out that adults are also influenced does not address whether teens specifically vote independently." },
                { id: 'r3', text: "Family discussions about politics are actually a healthy part of civic education, and shared household values can help young voters develop informed positions on complex policy issues.", correct: false, feedback: "This actually supports the opponent's argument that teen votes would just mirror their parents. You need to show independence, not endorse dependence." }
            ]
        },
        pushback: {
            opponent: { name: "Senator Williams", title: "Senate Elections Committee", emoji: "\u{1F5F3}\u{FE0F}" },
            text: "Even if we agree in principle, our election infrastructure is not set up for this. Schools would need voter education programs, registration systems would need updating, and the costs would be enormous.",
            reactions: {
                correct: "Senator Williams pauses and taps her pen against the table, recalculating her approach. She came armed with a logistics argument designed to stall the proposal indefinitely — but your phased rollout plan just showed the committee that implementation is practical, not impossible. The room's energy shifts because you turned her roadblock into a road map.",
                wrong: "Senator Williams exchanges a knowing glance with a colleague across the table. You either dismissed her concerns or agreed to delay your own proposal — either way, she wins. The committee needed to hear that this is doable right now, and instead you handed her exactly the opening she was looking for to table the discussion."
            },
            rebuttals: [
                { id: 'p1', text: "Every meaningful expansion of voting rights in our history faced logistical pushback, and those concerns were always used as excuses to delay progress on fundamental democratic principles.", correct: false, feedback: "Too aggressive. Dismissing legitimate logistical concerns as mere excuses makes you seem unprepared and unwilling to engage with practical realities." },
                { id: 'p2', text: "You raise fair points about infrastructure challenges, and perhaps we should wait until every system is perfectly ready before moving forward, even if that means delaying the rights of young citizens indefinitely.", correct: false, feedback: "Too concessive. Agreeing to wait indefinitely undermines your entire argument and hands the opponent a reason to shelve the proposal permanently." },
                { id: 'p3', text: "We can implement this in phases, starting with pilot programs in states that already have strong civics curricula, and use existing school infrastructure for voter registration drives at minimal additional cost.", correct: true, feedback: "Smart approach. You acknowledged the practical challenge and offered a phased, cost-conscious solution." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Committee, democracy grows stronger when more citizens have a voice in shaping their future.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe what 16-year-olds currently lack',
                    options: [
                        { text: "meaningful representation in the decisions that shape their education, environment, and economic future", strong: true },
                        { text: "a democratic voice despite bearing the responsibilities of taxpaying, working citizens", strong: true },
                        { text: "the chance to pick their favorite politicians", strong: false, feedback: "Too casual and trivializes voting as a preference rather than a civic right. Use language that conveys the seriousness of democratic participation." },
                        { text: "stuff that older people get to have", strong: false, feedback: "Extremely vague. A persuasive speech requires precise, substantive language, not informal generalizations." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the benefit to democracy',
                    options: [
                        { text: "a more engaged and representative electorate", strong: true },
                        { text: "a generation of informed, lifelong civic participants", strong: true },
                        { text: "more young people doing political things", strong: false, feedback: "Vague and informal. Your closing must paint a compelling, specific vision of the democratic benefit." }
                    ]
                }
            ]
        }
    },
    {
        id: 'mandatory-school-uniforms',
        title: "Mandatory School Uniforms",
        premise: "A proposal requires all public schools in the district to adopt mandatory uniforms. You are arguing in favor of the uniform policy as a way to promote equality and reduce distractions.",
        setting: "the District School Board",
        claimOptions: [
            { id: 'c1', text: "School uniforms look nicer than regular clothes.", correct: false, feedback: "This is a subjective opinion about fashion, not a policy argument with evidence-based reasoning." },
            { id: 'c2', text: "The school board should implement mandatory uniforms because they reduce socioeconomic bullying, minimize daily distractions, and create a more focused learning environment.", correct: true, feedback: "Excellent claim! It identifies a specific policy and provides three clear, debatable reasons to support it." },
            { id: 'c3', text: "Students should not be allowed to choose what they wear anywhere, including outside of school.", correct: false, feedback: "Wildly overreaching. Extending dress codes beyond school grounds would be unenforceable and violate personal freedoms." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "A five-year study across 40 public schools found that schools with uniform policies reported a 23% decrease in bullying incidents related to clothing and appearance.", type: 'strong' },
            { id: 'e2', text: "Families in uniform schools spend an average of $150 less per year on school clothing compared to families in non-uniform schools, reducing financial strain on low-income households.", type: 'strong' },
            { id: 'e3', text: "Teachers in uniform schools report spending significantly less class time addressing dress code violations, allowing more instructional minutes per day.", type: 'strong' },
            { id: 'e4', text: "Japan and South Korea, two of the highest-performing countries in international academic rankings, both require school uniforms, showing that uniforms contribute to academic excellence.", type: 'weak', feedback: "Logical Fallacy (Correlation Does Not Imply Causation). These countries also have very different cultures, funding models, and teaching methods. The uniforms are one of thousands of variables and cannot be credited for the academic results." },
            { id: 'e5', text: "Since professional workplaces like law firms and hospitals require dress codes, schools should prepare students for this reality by requiring uniforms from a young age.", type: 'weak', feedback: "Logical Fallacy (False Equivalence). Adult professional dress codes serve different purposes than school uniforms. Children in educational settings have different developmental needs than adults in workplaces." },
            { id: 'e6', text: "A poll of parents in the district showed that 62% support uniforms, demonstrating that the community is clearly in favor of this policy change.", type: 'weak', feedback: "Logical Fallacy (Appeal to Popularity). Majority opinion does not make a policy educationally sound. You need evidence about outcomes for students, not a popularity contest among parents." }
        ],
        counterArgument: {
            opponent: { name: "Mrs. Chen", title: "Parent Council President", emoji: "\u{1F454}" },
            text: "Clothing is a form of self-expression, which is protected speech. Forcing children into uniforms suppresses their individuality and teaches them to conform rather than think independently.",
            reactions: {
                correct: "Mrs. Chen's hands tighten on her notes as she realizes what just happened. She came prepared to argue that uniforms suppress identity — but you reframed the policy as an equity tool that protects the students she claims to advocate for. The board members are watching her now, waiting to see if she can counter without looking like she opposes fairness.",
                wrong: "Mrs. Chen straightens up with renewed confidence, sensing that you just conceded her central point. The board needed to hear that uniforms expand individuality rather than restrict it, but your response treated self-expression as something worth sacrificing. Two board members are already nodding along with her, and you can feel the momentum shifting away from your position."
            },
            rebuttals: [
                { id: 'r1', text: "Uniforms free students to express individuality through ideas, creativity, and achievements rather than through brand names and expensive clothing that often reinforces social hierarchies.", correct: true, feedback: "Strong rebuttal. You reframed individuality as something deeper than clothing, turning her argument into a strength for your position." },
                { id: 'r2', text: "Personal expression through clothing is a core developmental need, but the school environment should prioritize academic focus, so limiting that expression during school hours is a reasonable tradeoff.", correct: false, feedback: "This concedes the opponent's main point that uniforms do suppress individuality. A strong rebuttal should challenge that premise rather than accept it as a necessary sacrifice." },
                { id: 'r3', text: "Schools already regulate speech in many ways, from banning disruptive behavior to restricting offensive language, so adding a uniform policy is simply one more reasonable institutional boundary.", correct: false, feedback: "Comparing uniforms to banning disruptive behavior frames clothing choice as a problem to control. This reinforces the opponent's concern about suppressing expression rather than addressing it." }
            ]
        },
        pushback: {
            opponent: { name: "Board Member Torres", title: "School Board Member", emoji: "\u{1F4CB}" },
            text: "What about our low-income families who cannot afford to buy a whole new set of uniform clothing? This policy could actually hurt the families it claims to help.",
            reactions: {
                correct: "Board Member Torres leans back and folds his arms, clearly surprised you had a funding plan ready. He expected the cost question to expose a fatal flaw in your proposal, but instead you showed the board a working model from other districts. The superintendent is already jotting down the subsidy fund idea — a sign that your solution landed where it mattered most.",
                wrong: "Board Member Torres raises an eyebrow and glances at the other members, his point still standing unchallenged. The room needed a concrete financial solution, and you either attacked his motives or agreed to an indefinite delay. Either way, the families he is asking about still do not have an answer, and the board now has a reason to vote no."
            },
            rebuttals: [
                { id: 'p1', text: "If the board truly cared about low-income families, it would have addressed clothing inequality years ago instead of using cost concerns now as a convenient reason to block meaningful reform.", correct: false, feedback: "Too aggressive. Questioning the board's sincerity is confrontational and does nothing to solve the legitimate financial concern that was raised." },
                { id: 'p2', text: "You make a compelling point about affordability, and we should probably delay implementation until we can guarantee that no family faces any additional expense, however long that process takes.", correct: false, feedback: "Too concessive. Agreeing to an open-ended delay effectively kills the proposal. You need to show the problem is solvable now, not push it to an uncertain future." },
                { id: 'p3', text: "The district can establish a uniform subsidy fund and partner with local businesses for donations, ensuring that every family receives uniforms at no cost if needed. Several districts have done this successfully.", correct: true, feedback: "Excellent. You directly addressed the financial concern with a specific, proven solution that protects vulnerable families." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Board, every student deserves to walk into school focused on learning, not worried about what they are wearing.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the problem uniforms solve',
                    options: [
                        { text: "visible economic inequality that leads to social exclusion and bullying", strong: true },
                        { text: "daily distractions caused by clothing competition and dress code conflicts", strong: true },
                        { text: "kids wearing weird outfits to school", strong: false, feedback: "Judgmental and trivial. A policy speech should focus on systemic problems, not mock students' clothing choices." },
                        { text: "bad fashion decisions by teenagers", strong: false, feedback: "Dismissive and irrelevant to educational outcomes. Focus on how clothing disparities affect learning and inclusion." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the outcome of the policy',
                    options: [
                        { text: "a school culture built on achievement rather than appearance", strong: true },
                        { text: "classrooms where every student feels they belong equally", strong: true },
                        { text: "students who all look the same and follow the rules", strong: false, feedback: "This sounds authoritarian and reinforces the opponent's argument about conformity. Emphasize belonging and equality, not uniformity." }
                    ]
                }
            ]
        }
    },
    {
        id: 'jury-duty-for-teenagers',
        title: "Jury Duty for Teenagers",
        premise: "A judicial reform proposal would allow 16 and 17-year-olds to serve on juries. You are arguing that including older teenagers on juries would improve the justice system and strengthen civic engagement.",
        setting: "a Judicial Reform Committee",
        claimOptions: [
            { id: 'c1', text: "Teenagers are smart enough to serve on juries.", correct: false, feedback: "This is a vague claim about intelligence, not a specific policy proposal with clear reasoning for reform." },
            { id: 'c2', text: "The justice system should allow 16 and 17-year-olds to serve on juries because it produces more representative panels and builds civic responsibility before adulthood.", correct: true, feedback: "Strong claim! It specifies the age group, the policy change, and two clear benefits to the justice system." },
            { id: 'c3', text: "The minimum age for all civic duties, including military service and signing contracts, should be lowered to 16.", correct: false, feedback: "Too broad. Bundling jury service with military and contract law makes your argument impossible to defend in this committee." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Current jury pools skew heavily toward retirees and older adults because working-age people seek exemptions, meaning the perspective of younger community members is systematically excluded.", type: 'strong' },
            { id: 'e2', text: "Pilot programs in select U.S. counties that included 17-year-olds on juries found no difference in verdict quality, but juror satisfaction surveys showed the younger members asked more clarifying questions during deliberation.", type: 'strong' },
            { id: 'e3', text: "Developmental research confirms that by age 16, individuals can understand complex testimony, weigh conflicting evidence, and distinguish fact from opinion at levels comparable to adults.", type: 'strong' },
            { id: 'e4', text: "Since teenagers are already tried as adults in serious criminal cases, it would only be fair and consistent to also let them serve as jurors who decide such cases.", type: 'weak', feedback: "Logical Fallacy (False Equivalence). Being a defendant in the justice system involves very different rights and responsibilities than being a juror who determines guilt. Fairness in one context does not automatically transfer to the other." },
            { id: 'e5', text: "A national survey found that 71% of teenagers said they would take jury duty seriously, indicating that young people are mature enough to handle the responsibility.", type: 'weak', feedback: "Logical Fallacy (Misleading Statistics / Self-Report Bias). Self-reported intentions about hypothetical responsibility cannot serve as evidence of actual maturity. People tend to overestimate their own seriousness in surveys." },
            { id: 'e6', text: "Countries with lower ages for civic participation tend to have more stable democracies overall, suggesting that earlier civic involvement leads to better governance.", type: 'weak', feedback: "Logical Fallacy (Correlation Does Not Imply Causation). Democratic stability depends on hundreds of factors including economic strength, institutional history, and education systems. You cannot attribute it to a single age policy." }
        ],
        counterArgument: {
            opponent: { name: "Judge Harrison", title: "Circuit Court Judge", emoji: "\u{2696}\u{FE0F}" },
            text: "Jury deliberations involve graphic crime scene evidence, disturbing testimony, and enormous pressure. Exposing minors to this material is irresponsible and could cause psychological harm.",
            reactions: {
                correct: "Judge Harrison removes his glasses and sets them on the table — a subtle sign that he is reconsidering. He expected you to argue that teens are tough enough to handle anything, which would have made you look reckless in front of a judicial committee. Instead, your screening proposal showed him you take minor welfare as seriously as he does. The committee counsel is already asking the clerk to pull records from the pilot programs you referenced.",
                wrong: "Judge Harrison shakes his head slowly, and you can see several committee members writing something down — likely a note that your side has no answer for child welfare concerns. A sitting judge just raised the issue of psychological harm to minors, and you either minimized it or turned it into a life lesson. In a room full of people who work in the justice system, that response cost you credibility."
            },
            rebuttals: [
                { id: 'r1', text: "The program can include screening guidelines that exempt minors from cases involving extreme violence or sexual crimes, while allowing them to serve on civil and non-violent cases.", correct: true, feedback: "Excellent. You acknowledged the legitimate concern about harmful content and offered a specific, protective compromise." },
                { id: 'r2', text: "Teenagers already encounter graphic content regularly through news media and online platforms, so exposure to courtroom evidence would not present a significantly different psychological challenge for them.", correct: false, feedback: "This normalizes harmful content exposure instead of addressing the valid concern. It also undermines the seriousness of judicial proceedings." },
                { id: 'r3', text: "The emotional weight of jury service is precisely what makes it a powerful civic lesson, and shielding teenagers from difficult realities only delays their preparation for responsible adult citizenship.", correct: false, feedback: "This dismisses the psychological harm concern by reframing it as educational. A judge raising welfare concerns about minors needs a protective solution, not a philosophical argument about growth." }
            ]
        },
        pushback: {
            opponent: { name: "Committee Member Alvarez", title: "Judiciary Committee Member", emoji: "\u{1F4DC}" },
            text: "High school students have classes, exams, and extracurriculars. Pulling them out for days or weeks of jury service would seriously disrupt their education.",
            reactions: {
                correct: "Committee Member Alvarez uncrosses her arms and tilts her head, clearly not expecting a scheduling solution that also earns academic credit. She strategically framed jury duty and education as enemies, but you just turned them into allies — and the committee chair is visibly intrigued by the summer session idea. Her disruption argument just lost its teeth because you showed that service and school can work together.",
                wrong: "Committee Member Alvarez glances at the committee chair with a look that says 'I rest my case.' She put a straightforward logistical problem on the table — teens have school — and you either called education a low priority or watered down your own proposal into something meaningless. The committee members who are also parents are clearly siding with her, and you can feel the room cooling on your reform."
            },
            rebuttals: [
                { id: 'p1', text: "If we keep prioritizing convenience over civic responsibility, young people will never learn that democracy requires personal sacrifice and active participation from every generation.", correct: false, feedback: "Too aggressive. Framing education as mere convenience before a reform committee is dismissive and fails to address the real scheduling conflict." },
                { id: 'p2', text: "That is a valid concern, and perhaps jury service for teenagers should remain entirely voluntary and only available when students have no academic conflicts to worry about.", correct: false, feedback: "Too concessive. Making it fully voluntary and conflict-free effectively makes teen jury service so rare it becomes meaningless, undermining your entire proposal." },
                { id: 'p3', text: "Teen jurors could serve during summer sessions or school breaks, and for shorter trials only. Schools could also count the experience as civic education credit, turning service into learning.", correct: true, feedback: "Smart solution. You addressed the scheduling concern while turning jury service into an educational benefit." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Committee, a jury is meant to represent the full community, yet an entire generation is excluded from this cornerstone of justice.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the current problem with juries',
                    options: [
                        { text: "systematically unrepresentative panels that exclude younger perspectives", strong: true },
                        { text: "a civic institution that fails to reflect the diversity of the communities it serves", strong: true },
                        { text: "old people making all the decisions", strong: false, feedback: "Disrespectful to current jurors and undermines your credibility. Frame the issue as a structural gap, not a generational attack." },
                        { text: "an unfair system that nobody likes", strong: false, feedback: "Vague and unsupported. A strong opening must identify the specific problem you are solving with precise language." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe what teen jury service would achieve',
                    options: [
                        { text: "a stronger, more representative justice system and a generation prepared for civic life", strong: true },
                        { text: "verdicts that better reflect the values and experiences of the entire community", strong: true },
                        { text: "teenagers finally getting to be in charge of something important", strong: false, feedback: "This frames jury service as a power grab rather than a civic responsibility. Focus on justice system improvement, not teen empowerment." }
                    ]
                }
            ]
        }
    },
    {
        id: 'term-limits-for-politicians',
        title: "Term Limits for Politicians",
        premise: "A proposal mandates that all elected officials at the federal level may serve no more than 12 years in any single office. You are arguing in favor of term limits to promote fresh leadership and reduce corruption.",
        setting: "a Governance Reform Council",
        claimOptions: [
            { id: 'c1', text: "Politicians are corrupt and should all be replaced.", correct: false, feedback: "This is a sweeping generalization, not a structured policy argument. You need to propose a specific mechanism for reform." },
            { id: 'c2', text: "Federal elected officials should be limited to 12 years in any single office to prevent power consolidation, encourage new leadership, and ensure government remains responsive to the people.", correct: true, feedback: "Excellent claim! It specifies the exact limit, the offices affected, and three clear reasons for the reform." },
            { id: 'c3', text: "Elections should be abolished and replaced with random citizen lotteries.", correct: false, feedback: "This abandons democratic elections entirely. The debate is about improving the current system, not replacing it with something untested." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Incumbents in Congress win re-election over 90% of the time, largely due to name recognition and fundraising advantages, making it nearly impossible for new candidates with fresh ideas to compete.", type: 'strong' },
            { id: 'e2', text: "Research shows that politicians who have served more than three terms are significantly more likely to prioritize donor relationships over constituent needs, as their re-election machinery becomes self-sustaining.", type: 'strong' },
            { id: 'e3', text: "The presidency already has a two-term limit established by the 22nd Amendment, and the regular transfer of executive power is widely regarded as a strength of American democracy, not a weakness.", type: 'strong' },
            { id: 'e4', text: "A poll conducted last year found that 82% of Americans support congressional term limits, which clearly proves that this is the right policy for the country.", type: 'weak', feedback: "Logical Fallacy (Appeal to Popularity). Public support for an idea does not make it constitutionally sound or practically effective. Policy decisions require evidence about outcomes, not opinion polls." },
            { id: 'e5', text: "Since corporate CEOs frequently rotate to bring in fresh perspectives and boost company performance, the same principle should apply to elected officials running the government.", type: 'weak', feedback: "Logical Fallacy (False Analogy). Corporations are private institutions with boards and shareholders. Democratic government operates under entirely different principles of accountability, and CEO turnover is often involuntary, not term-limited." },
            { id: 'e6', text: "Several long-serving politicians have been convicted of corruption in recent years, demonstrating that extended time in office inevitably leads to ethical violations.", type: 'weak', feedback: "Logical Fallacy (Hasty Generalization). Some corrupt long-serving politicians does not prove that long service inevitably causes corruption. Many long-serving officials have exemplary ethical records." }
        ],
        counterArgument: {
            opponent: { name: "Senator Whitfield", title: "Senior Senator", emoji: "\u{1F3DB}\u{FE0F}" },
            text: "Term limits would strip voters of their right to choose. If my constituents want to keep re-electing me because I do a good job, who are you to tell them they cannot?",
            reactions: {
                correct: "Senator Whitfield's jaw tightens as she realizes you just used the Constitution's own precedent against her. She framed term limits as anti-democratic, but you pointed out that America already limits the presidency — and nobody calls that undemocratic. The council members are murmuring to each other because her 'voter choice' argument now has a glaring hole she cannot easily patch.",
                wrong: "Senator Whitfield adjusts her microphone with the calm confidence of someone who has been in office for decades. She posed a simple, powerful question about voter choice, and your response either got personal or accidentally proved that the system is too broken for term limits to fix. The council is exchanging glances — you just made her look like the reasonable one in the room."
            },
            rebuttals: [
                { id: 'r1', text: "Voters already accept limits on choice through age requirements, citizenship rules, and presidential term limits. This ensures structural advantages of incumbency do not make elections meaningless.", correct: true, feedback: "Strong rebuttal. You used existing, accepted limits as precedent and reframed the issue as one of fair competition rather than restricted choice." },
                { id: 'r2', text: "You only oppose term limits because you personally benefit from the current system, which is exactly the kind of self-interested thinking that proves why we need this reform immediately.", correct: false, feedback: "Logical Fallacy (Ad Hominem / Circumstantial). Attacking the Senator's motives instead of her argument makes you look personal rather than principled." },
                { id: 'r3', text: "The reality is that most voters lack meaningful choices because incumbency advantages in fundraising and name recognition make competitive elections nearly impossible in most districts nationwide.", correct: false, feedback: "This undermines your own position. If elections are fundamentally broken by structural advantages, term limits alone will not fix the deeper problem you have just identified." }
            ]
        },
        pushback: {
            opponent: { name: "Council Member Park", title: "City Council Member", emoji: "\u{1F3D9}\u{FE0F}" },
            text: "Experienced legislators understand complex policy, build crucial relationships, and know how to negotiate effectively. Term limits would create a Congress full of inexperienced newcomers who cannot govern.",
            reactions: {
                correct: "Council Member Park sets down his pen and nods slowly — not in agreement, but in recognition that you answered his hardest question. He wanted to paint twelve years as too short to master governance, but you flipped the math and showed it is actually three full terms with structural support built in. The council chair is leaning forward now because your mentorship and research office proposal means institutional knowledge survives even when individual leaders rotate out.",
                wrong: "Council Member Park shakes his head and turns to address the rest of the council directly, a move that signals he no longer sees you as the person to convince. He raised a practical governance question, and you either insulted career public servants or offered to gut your own proposal with exemptions. The council members who have spent years building policy expertise are clearly offended or unimpressed — neither of which helps your cause."
            },
            rebuttals: [
                { id: 'p1', text: "The so-called expertise of career politicians mostly consists of knowing how to trade favors with lobbyists, and replacing them with fresh citizens would restore genuine accountability to government.", correct: false, feedback: "Too aggressive. Dismissing all legislative expertise as corruption alienates reasonable observers and ignores the real skills needed to govern effectively." },
                { id: 'p2', text: "You raise a strong point about institutional knowledge, and perhaps we should consider extending the limit beyond twelve years or creating broad exemptions for legislators in key committee leadership positions.", correct: false, feedback: "Too concessive. Extending the limit or creating exemptions guts the core of your own proposal and signals that you do not fully believe in the reform you are advocating." },
                { id: 'p3', text: "A twelve-year limit still provides ample time to develop expertise. We can also strengthen nonpartisan policy research offices and mentorship programs so institutional knowledge is preserved as leaders rotate.", correct: true, feedback: "Excellent response. You showed that 12 years is substantial experience while proposing structural solutions to preserve institutional knowledge." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Council, the framers of our Constitution envisioned citizen legislators, not career politicians who hold power for decades.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the current problem with long-serving politicians',
                    options: [
                        { text: "entrenched incumbents who are nearly impossible to challenge due to structural advantages", strong: true },
                        { text: "a political class increasingly disconnected from the everyday concerns of the people they represent", strong: true },
                        { text: "greedy politicians who refuse to give up their jobs", strong: false, feedback: "Emotionally charged and unsupported. A reform argument needs structural analysis, not personal attacks on an entire profession." },
                        { text: "people who have been in office for a really long time", strong: false, feedback: "Purely descriptive with no argument attached. You need to explain why long tenure is problematic, not just state that it exists." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the future with term limits',
                    options: [
                        { text: "a government that regularly renews itself with leaders who reflect the evolving will of the people", strong: true },
                        { text: "a democracy where public service is a chapter of a citizen's life, not a lifelong career", strong: true },
                        { text: "finally getting rid of all the bad politicians", strong: false, feedback: "Oversimplified and assumes all current politicians are bad. A strong closing should paint a positive vision, not just express frustration." }
                    ]
                }
            ]
        }
    }
];
