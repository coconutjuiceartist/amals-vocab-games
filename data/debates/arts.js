export const artsDebates = [
    {
        id: 'book-banning-libraries',
        title: "Book Banning in School Libraries",
        premise: "Several parents have filed complaints demanding that certain novels be removed from school libraries for containing mature themes. You are arguing that schools should not remove books based on content complaints alone.",
        setting: "the District Library Oversight Committee",
        claimOptions: [
            { id: 'c1', text: "Some books have bad words in them and that is a problem.", correct: false, feedback: "This is a vague observation, not a policy claim. A strong debater proposes a specific course of action." },
            { id: 'c2', text: "The school district must adopt a formal review process that prioritizes educational value and student access over individual content complaints.", correct: true, feedback: "Strong policy claim! It proposes a specific system and clearly states your position on how book challenges should be handled." },
            { id: 'c3', text: "Parents should have absolutely no say in what books are available in schools.", correct: false, feedback: "Too extreme. Completely excluding parents from the conversation makes your position impossible to defend and alienates the committee." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Research from the American Library Association shows that students with access to diverse reading materials score higher on reading comprehension and critical thinking assessments.", type: 'strong' },
            { id: 'e2', text: "Historically, many books that were once banned, such as 'To Kill a Mockingbird' and 'The Diary of Anne Frank,' are now considered essential educational texts that teach empathy and historical awareness.", type: 'strong' },
            { id: 'e3', text: "Schools with formal review committees that include librarians, educators, and parents report fewer repeated challenges and greater community trust in the process.", type: 'strong' },
            { id: 'e4', text: "A survey of 200 students at Jefferson Middle School found that 85% said they enjoyed having a wide selection of library books, which proves that book banning harms student wellbeing.", type: 'weak', feedback: "Logical Fallacy (Non Sequitur). Students enjoying book selection does not prove that removing specific titles harms their wellbeing. Enjoyment of variety and psychological harm from removal are two completely different claims." },
            { id: 'e5', text: "Countries with strict government censorship of literature, like authoritarian regimes, also ban books in schools, which means that any school book removal is a step toward censorship and tyranny.", type: 'weak', feedback: "Logical Fallacy (Slippery Slope / False Equivalence). A parent filing a complaint at a local school is fundamentally different from government censorship. Comparing the two exaggerates the situation and weakens your credibility." },
            { id: 'e6', text: "Since Nobel Prize-winning author Toni Morrison's books have been challenged in multiple school districts, banning books clearly targets the most important and valuable literature.", type: 'weak', feedback: "Logical Fallacy (Hasty Generalization). One famous author's books being challenged does not prove that all challenged books are the most important ones. Many different books are challenged for many different reasons." }
        ],
        counterArgument: {
            text: "Mrs. Patterson, a concerned parent, argues: 'As parents, we have the right to protect our children from content they are not ready for. Some of these books contain violence and themes that are simply inappropriate for eleven-year-olds.'",
            rebuttals: [
                { id: 'r1', text: "You are absolutely right that parents should guide their own children's reading. That is why a review process allows parents to opt their child out of specific titles without removing access for every student in the school.", correct: true, feedback: "Excellent. You validated her concern while drawing a clear line between individual parental choice and school-wide censorship." },
                { id: 'r2', text: "Parents who have not read the full book in its educational context are not qualified to judge whether its themes are appropriate for classroom use.", correct: false, feedback: "Dismissive and condescending. Questioning parents' qualifications to make judgments about their own children will alienate the committee and shut down productive dialogue." },
                { id: 'r3', text: "Children are exposed to far worse content on the internet and social media every single day, so focusing this much energy on a few library books seems misplaced.", correct: false, feedback: "Logical Fallacy (Relative Privation / Two Wrongs). The existence of worse content elsewhere does not address whether specific books are appropriate. Each issue deserves its own consideration." }
            ]
        },
        pushback: {
            text: "Committee Chair Dr. Reeves raises a concern: 'Even with a review process, we will face enormous pressure from vocal community groups. How do we prevent the process from becoming a political battleground?'",
            rebuttals: [
                { id: 'p1', text: "Political pressure is unavoidable, so the committee should firmly reject all external input and let trained librarians make every decision without community interference.", correct: false, feedback: "Too aggressive. Completely shutting out community voices will create more conflict and make the committee appear authoritarian rather than professional." },
                { id: 'p2', text: "You raise a fair point, and honestly the committee may just need to accept that some politicization is inevitable and do its best to handle complaints as they arise.", correct: false, feedback: "Too concessive. Accepting political pressure as unavoidable without proposing structural safeguards leaves the committee exactly where it started with no solution." },
                { id: 'p3', text: "The review committee should include trained librarians, educators, and rotating parent representatives, with published criteria focused on educational merit that keep decisions grounded in professional standards.", correct: true, feedback: "Strong practical solution. You addressed the concern by proposing a structured, transparent system that reduces the influence of political pressure." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Library Oversight Committee, the freedom to read is the foundation of every student's education.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe what book removal does to students',
                    options: [
                        { text: "silences diverse perspectives and limits intellectual growth", strong: true },
                        { text: "denies students the chance to develop critical thinking through challenging material", strong: true },
                        { text: "makes kids feel sad about the library", strong: false, feedback: "Vague emotional language lacks the specificity needed to persuade a formal committee. Name the actual educational consequences." },
                        { text: "is unfair and mean to readers", strong: false, feedback: "Informal language undermines your credibility. A committee expects precise, professional arguments about educational impact." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe what a proper review process ensures',
                    options: [
                        { text: "accountability, transparency, and respect for both parents and students", strong: true },
                        { text: "decisions grounded in educational value rather than individual discomfort", strong: true },
                        { text: "that nobody ever complains again", strong: false, feedback: "Unrealistic promise. No process eliminates all complaints. Overpromising undermines your proposal's credibility." }
                    ]
                }
            ]
        }
    },
    {
        id: 'government-arts-funding',
        title: "Government Funding for the Arts",
        premise: "The national budget committee is considering a proposal to cut arts funding by 60% and redirect the money to STEM programs. You are arguing that arts funding should be maintained or increased, not slashed.",
        setting: "the National Budget Committee",
        claimOptions: [
            { id: 'c1', text: "Art is beautiful and makes people happy.", correct: false, feedback: "This is a personal opinion, not a policy argument. A budget committee needs to hear about measurable outcomes and public benefit." },
            { id: 'c2', text: "The government must maintain robust arts funding because the arts drive economic growth, strengthen communities, and develop critical skills that complement STEM education.", correct: true, feedback: "Excellent claim! It addresses the budget committee directly with three concrete reasons tied to public interest." },
            { id: 'c3', text: "STEM funding should be cut instead so the arts get more money.", correct: false, feedback: "Proposing to cut STEM makes you an enemy of the other side's priorities. A smart debater argues that both can coexist, not that one must be destroyed." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "The Bureau of Economic Analysis reports that arts and cultural industries contribute over $1 trillion annually to the national economy and support 5.2 million jobs.", type: 'strong' },
            { id: 'e2', text: "Multiple longitudinal studies show that students who participate in arts education demonstrate stronger problem-solving abilities, higher graduation rates, and improved performance in math and reading.", type: 'strong' },
            { id: 'e3', text: "Community arts programs in underserved neighborhoods have been linked to reduced youth crime rates and increased civic engagement, providing measurable social returns on public investment.", type: 'strong' },
            { id: 'e4', text: "Steve Jobs credited his calligraphy class at Reed College with inspiring Apple's revolutionary design philosophy, which proves that arts education creates innovation in technology fields.", type: 'weak', feedback: "Logical Fallacy (Anecdotal Evidence). One famous entrepreneur's personal story, however inspiring, cannot prove a general causal link between arts education and tech innovation. You need systematic evidence, not celebrity anecdotes." },
            { id: 'e5', text: "European countries like France and Germany spend significantly more on arts funding per capita than the United States, and they have richer cultural traditions, showing that higher funding directly creates cultural greatness.", type: 'weak', feedback: "Logical Fallacy (Correlation vs. Causation). These countries' cultural traditions developed over centuries due to many complex factors. You cannot attribute their cultural richness solely to current funding levels." },
            { id: 'e6', text: "Since every ancient civilization, from Egypt to Greece to China, invested heavily in the arts, cutting arts funding means abandoning a practice that has defined human progress throughout all of history.", type: 'weak', feedback: "Logical Fallacy (Appeal to Tradition). Ancient civilizations also practiced slavery and conquest. Something being historically common does not automatically make it the right policy choice today. Argue on current merits." }
        ],
        counterArgument: {
            text: "Senator Williams argues: 'In a competitive global economy, every dollar must go toward science and technology. The arts are a luxury we simply cannot afford when we are falling behind in engineering and computer science.'",
            rebuttals: [
                { id: 'r1', text: "The arts are not a luxury competing with STEM but rather a partner. Design thinking, creative problem-solving, and visual communication are skills that technology companies actively recruit for and depend on.", correct: true, feedback: "Powerful rebuttal. You reframed the arts as essential to STEM success rather than accepting the false choice between them." },
                { id: 'r2', text: "Focusing exclusively on STEM would produce technically skilled graduates who lack the creative and communication abilities that employers consistently rank among their most desired qualifications.", correct: false, feedback: "This attacks STEM rather than defending the arts. Instead of framing STEM graduates as deficient, show how arts funding strengthens the overall workforce alongside STEM." },
                { id: 'r3', text: "Other countries are investing heavily in both arts and STEM simultaneously, so following the senator's approach of choosing one over the other risks falling behind nations with more balanced strategies.", correct: false, feedback: "Logical Fallacy (Bandwagon / Appeal to Popularity). What other countries do is not a reason in itself. You need to argue why arts funding benefits our country specifically on its own merits." }
            ]
        },
        pushback: {
            text: "Budget Director Chen presses: 'Even if arts funding has benefits, our deficit is growing. Every program claims to be essential. How do you justify arts spending when hospitals and infrastructure also need money?'",
            rebuttals: [
                { id: 'p1', text: "The deficit exists because of wasteful military spending and corporate tax breaks, not because we fund the arts. The committee should redirect its scrutiny toward those far larger budget items instead.", correct: false, feedback: "Too aggressive. Attacking other budget areas without being asked deflects from the question and will antagonize committee members who support those programs." },
                { id: 'p2', text: "You make a fair point about competing priorities, and perhaps arts organizations should explore more private funding sources rather than relying so heavily on public dollars during tight budget years.", correct: false, feedback: "Too concessive. Suggesting that arts funding should shift to private sources essentially concedes the opponent's argument that public money should go elsewhere." },
                { id: 'p3', text: "Arts funding represents less than 0.004% of the federal budget yet generates measurable economic returns and social benefits. Rather than cutting one of the smallest and most efficient investments, we should evaluate all programs by return per dollar.", correct: true, feedback: "Masterful response. You put the spending in perspective with hard numbers and redirected the efficiency argument in your favor." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Budget Committee, cutting arts funding is not fiscal responsibility; it is a false economy that costs us far more than it saves.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe what the arts provide to society',
                    options: [
                        { text: "economic vitality, educational excellence, and stronger communities", strong: true },
                        { text: "measurable returns in jobs, student achievement, and civic engagement", strong: true },
                        { text: "pretty paintings and nice music for everyone", strong: false, feedback: "Trivializing the arts undermines your own argument. A budget committee needs to hear about measurable impact, not aesthetic descriptions." },
                        { text: "things that make our country special", strong: false, feedback: "Too vague for a budget discussion. The committee needs specific, quantifiable benefits to justify spending." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the relationship between arts and STEM',
                    options: [
                        { text: "complementary disciplines that together produce well-rounded innovators", strong: true },
                        { text: "interconnected fields where creative thinking drives scientific breakthroughs", strong: true },
                        { text: "equally important subjects that both deserve money", strong: false, feedback: "Saying both 'deserve money' is a weak assertion, not an argument. Explain specifically how they strengthen each other." }
                    ]
                }
            ]
        }
    },
    {
        id: 'graffiti-public-art',
        title: "Graffiti as Public Art",
        premise: "Several street artists have petitioned the city to designate public walls for legal murals. Critics call it vandalism; supporters call it community expression. You are arguing that the city should provide designated walls for street artists.",
        setting: "the City Council",
        claimOptions: [
            { id: 'c1', text: "Graffiti is cool and people should be allowed to spray paint wherever they want.", correct: false, feedback: "This is not a serious policy proposal. Allowing painting 'wherever' ignores property rights entirely and will alienate the council." },
            { id: 'c2', text: "The city should establish a designated public mural program with permitted walls, an application process, and community input to transform street art from vandalism into a civic asset.", correct: true, feedback: "Excellent claim! It proposes a structured program with specific components, showing you have thought about implementation." },
            { id: 'c3', text: "Graffiti is an ancient art form and therefore must be protected.", correct: false, feedback: "Being ancient does not automatically justify a modern policy. The council needs practical reasons, not historical appeals." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Cities like Philadelphia, Melbourne, and Bogota that have implemented legal mural programs have seen measurable reductions in illegal graffiti and property damage in surrounding areas.", type: 'strong' },
            { id: 'e2', text: "A study by the National Endowment for the Arts found that public art installations increase local foot traffic by up to 30%, boosting revenue for nearby small businesses.", type: 'strong' },
            { id: 'e3', text: "Legal mural programs provide at-risk youth with mentorship opportunities, creative outlets, and portfolio-building experiences that can lead to careers in design, illustration, and architecture.", type: 'strong' },
            { id: 'e4', text: "The world-famous artist Banksy started as an illegal graffiti writer and is now worth over $50 million, proving that street art is a legitimate and valuable art form that deserves public support.", type: 'weak', feedback: "Logical Fallacy (Anecdotal Evidence / Survivorship Bias). One artist becoming wealthy does not prove that street art programs benefit communities. Thousands of graffiti writers never achieve fame or financial success. Policy should be based on broad outcomes, not rare exceptions." },
            { id: 'e5', text: "In a recent town survey, 72% of residents aged 18-35 said they would support a public mural program, demonstrating overwhelming community demand for designated art walls.", type: 'weak', feedback: "Logical Fallacy (Cherry-Picked Data / Misleading Statistics). Surveying only residents aged 18-35 excludes older taxpayers and homeowners who may have different views. Presenting one age group's opinion as 'overwhelming community demand' is misleading." },
            { id: 'e6', text: "Since property owners already have the right to commission murals on their own buildings, it would be logically inconsistent for the city to refuse to allow murals on public property as well.", type: 'weak', feedback: "Logical Fallacy (False Equivalence). Private property rights and public property management involve completely different legal frameworks and accountability structures. A private owner's choice does not obligate the city to do the same." }
        ],
        counterArgument: {
            text: "Councilwoman Torres objects: 'Designated walls will become eyesores that attract more vandalism, not less. Once you invite graffiti in, you lose control of it entirely.'",
            rebuttals: [
                { id: 'r1', text: "Philadelphia's Mural Arts Program manages over 4,000 murals and has reduced illegal tagging in participating neighborhoods by 60 percent. Structured oversight creates community pride, not chaos.", correct: true, feedback: "Strong evidence-based rebuttal. You countered her fear with a specific, real-world example and concrete statistics." },
                { id: 'r2', text: "Concerns about vandalism reflect an outdated perspective that fails to recognize how street art culture has evolved into a respected and professionally managed discipline worldwide.", correct: false, feedback: "Dismissive of a legitimate concern. Telling a council member her perspective is outdated will make her defensive rather than open to your proposal." },
                { id: 'r3', text: "Even if some additional tagging occurs near designated walls, the overall community benefits of the program would still outweigh those minor maintenance costs in the long run.", correct: false, feedback: "This concedes her core point that designated walls attract vandalism. Admitting the program might create mess undermines your entire proposal when evidence says otherwise." }
            ]
        },
        pushback: {
            text: "City Manager Davis adds: 'Who pays for wall maintenance, paint removal, and the staff to manage applications? Our parks budget is already stretched thin.'",
            rebuttals: [
                { id: 'p1', text: "The parks budget is mismanaged as it stands, and the council should conduct a full audit before claiming there is no room for a program that clearly benefits the community.", correct: false, feedback: "Too aggressive. Accusing the city manager of mismanagement without evidence is inflammatory and shifts the conversation away from your proposal entirely." },
                { id: 'p2', text: "That is a reasonable concern, and perhaps the program should start very small with just one or two walls until the city can determine whether it is financially sustainable over time.", correct: false, feedback: "Too concessive. Scaling back to one or two walls before even launching undermines confidence in your proposal and lets budget concerns dictate the program's ambition." },
                { id: 'p3', text: "The program can be funded through local business sponsorships, arts foundation grants, and a modest artist application fee. Similar programs in other cities have become revenue-neutral within two years.", correct: true, feedback: "Excellent practical answer. You provided multiple specific funding sources and a realistic timeline, directly addressing the budget concern." }
            ]
        },
        speechTemplate: {
            intro: "Council members, every blank wall in this city is a missed opportunity to strengthen our neighborhoods and empower our residents.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe what illegal graffiti currently causes',
                    options: [
                        { text: "property damage, community frustration, and wasted enforcement spending", strong: true },
                        { text: "a cycle of vandalism that reactive policing alone cannot solve", strong: true },
                        { text: "ugly tags that nobody likes looking at", strong: false, feedback: "Informal and subjective. The council needs to hear about measurable costs and systemic problems, not aesthetic complaints." },
                        { text: "problems that make our city look bad", strong: false, feedback: "Too vague. Specify the actual consequences: economic costs, enforcement burden, community impact." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe what a mural program creates',
                    options: [
                        { text: "community pride, economic activity, and creative pathways for young people", strong: true },
                        { text: "a structured alternative that channels artistic energy into civic improvement", strong: true },
                        { text: "cool art that tourists will want to photograph", strong: false, feedback: "While tourism can be a benefit, reducing the program to photo opportunities trivializes its deeper community impact." }
                    ]
                }
            ]
        }
    },
    {
        id: 'ai-art-competitions',
        title: "Digital Art and AI Creativity",
        premise: "An artist recently won a major competition using an AI image generator, sparking outrage among traditional and digital artists. You are arguing that AI-generated art should be eligible for competitions and exhibitions, but in a separate, clearly labeled category.",
        setting: "the Metropolitan Arts Commission",
        claimOptions: [
            { id: 'c1', text: "AI art is not real art and should be banned from all competitions permanently.", correct: false, feedback: "Too absolute. Refusing to engage with new technology makes your position rigid and easy to dismiss as the art world evolves." },
            { id: 'c2', text: "The Arts Commission should create a distinct 'AI-Assisted Art' category for competitions and exhibitions, with transparent disclosure requirements, to fairly include this emerging medium without undermining traditional artists.", correct: true, feedback: "Strong, balanced policy claim. It embraces innovation while protecting traditional artists through clear boundaries and transparency." },
            { id: 'c3', text: "AI can make art faster and better than humans, so it should be treated exactly the same.", correct: false, feedback: "This dismisses the legitimate concerns of human artists and ignores the fundamental differences in creative process. The commission will not accept such a one-sided claim." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Photography was once rejected as 'not real art' but is now a respected category in every major competition. Creating a dedicated category allows the art world to evaluate AI art on its own terms while the medium matures.", type: 'strong' },
            { id: 'e2', text: "AI art tools still require significant human decision-making: selecting prompts, curating outputs, editing compositions, and making aesthetic choices that reflect the creator's artistic vision.", type: 'strong' },
            { id: 'e3', text: "A transparent labeling requirement protects audiences and fellow artists from deception while encouraging honest experimentation with new creative tools.", type: 'strong' },
            { id: 'e4', text: "Over 15 million people used AI art generators last year, making it one of the fastest-growing creative movements in history, which means art institutions must accept it or become irrelevant.", type: 'weak', feedback: "Logical Fallacy (Appeal to Popularity / Bandwagon). The number of users does not determine artistic legitimacy. Millions of people use photo filters too, but that does not make every filtered photo competition-worthy. Popularity is not a measure of merit." },
            { id: 'e5', text: "Since digital artists already use software tools like Photoshop and drawing tablets that assist the creative process, there is no meaningful difference between those tools and AI generators.", type: 'weak', feedback: "Logical Fallacy (False Equivalence). Photoshop executes specific commands chosen by the artist, while AI generators produce entire compositions from text descriptions. The degree of human control is fundamentally different, and ignoring that distinction weakens your argument." },
            { id: 'e6', text: "Art historians note that every major technological shift, from oil paints to the printing press to digital cameras, initially faced resistance before being accepted, suggesting that opposition to AI art is simply the latest cycle of irrational fear.", type: 'weak', feedback: "Logical Fallacy (Faulty Analogy / Dismissal). While the historical pattern is real, each technology raised unique ethical concerns that were resolved differently. Dismissing all current criticism as 'irrational fear' avoids addressing legitimate issues like consent, copyright, and artistic labor." }
        ],
        counterArgument: {
            text: "Renowned painter Maria Chen argues: 'I spent 20 years mastering my craft. AI lets someone with no training type a sentence and produce something that competes with my life's work. Putting it in the same exhibition cheapens what real artists do.'",
            rebuttals: [
                { id: 'r1', text: "Your mastery is exactly why a separate category matters. Human-created art would be judged on skill, technique, and personal expression, while AI art is evaluated by entirely different criteria in its own space.", correct: true, feedback: "Respectful and effective. You honored her expertise while showing how your proposal specifically protects artists like her." },
                { id: 'r2', text: "The art world has always evolved alongside new tools, and artists who resist technological change risk becoming irrelevant to the broader cultural conversation about creativity's future.", correct: false, feedback: "Dismissive and insulting to a lifelong professional. Implying she will become irrelevant alienates every traditional artist on the commission." },
                { id: 'r3', text: "AI art actually requires considerable skill in prompt engineering, curation, and iterative refinement, so the creative effort involved is more substantial than most traditional artists currently recognize.", correct: false, feedback: "Comparing prompt engineering to 20 years of painting mastery is tone-deaf in this context. Even if prompt craft has value, this is not the moment to equate the two disciplines." }
            ]
        },
        pushback: {
            text: "Commissioner Park raises a concern: 'Even with a separate category, how do we verify what is AI-generated? Artists could secretly use AI and enter the traditional category. Enforcement seems nearly impossible.'",
            rebuttals: [
                { id: 'p1', text: "Anyone caught misrepresenting their work should face permanent disqualification and public disclosure, which would create enough deterrence to prevent most artists from even considering fraud.", correct: false, feedback: "Too aggressive. Leading with harsh punishment without addressing detection methods does not solve the verification problem the commissioner raised." },
                { id: 'p2', text: "That is a valid concern, and since detection technology is still developing, perhaps we should delay creating the separate category until reliable verification tools are widely available and tested.", correct: false, feedback: "Too concessive. Delaying the entire proposal indefinitely because enforcement is imperfect surrenders your position and lets the perfect become the enemy of the good." },
                { id: 'p3', text: "Artists can submit process documentation like sketches, progress photos, or screen recordings alongside their work. Combined with AI-detection tools and clear penalties for misrepresentation, this creates meaningful accountability.", correct: true, feedback: "Practical and honest. You proposed specific verification methods while acknowledging no system is flawless, which builds trust with the commission." }
            ]
        },
        speechTemplate: {
            intro: "Commissioners, the question before us is not whether AI art is real art. The question is whether this institution will lead the conversation or be left out of it entirely.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe what ignoring AI art risks',
                    options: [
                        { text: "ceding the conversation to unregulated spaces with no standards or protections for artists", strong: true },
                        { text: "falling behind as other institutions set the rules for how this technology intersects with art", strong: true },
                        { text: "looking old-fashioned and out of touch with young people", strong: false, feedback: "Appealing to trend-following rather than principled leadership undermines your argument. The commission should act on merit, not fear of seeming outdated." },
                        { text: "missing out on the cool new technology everyone is using", strong: false, feedback: "Casual language and appeal to popularity weakens a serious policy argument. Focus on institutional responsibility, not trends." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe what a separate AI category achieves',
                    options: [
                        { text: "a framework that protects traditional artists while embracing responsible innovation", strong: true },
                        { text: "transparency, fairness, and institutional leadership in an evolving creative landscape", strong: true },
                        { text: "a way to make everyone happy about AI art", strong: false, feedback: "Overpromising universal satisfaction is unrealistic. Strong policy acknowledges trade-offs rather than promising to please everyone." }
                    ]
                }
            ]
        }
    }
];
