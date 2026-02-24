export const scienceDebates = [
    {
        id: 'terraforming-mars',
        title: "Terraforming Mars",
        premise: "A coalition of space agencies has proposed a trillion-dollar, century-long project to make Mars habitable. Critics say the money should fix Earth first. You are arguing that humanity should invest in terraforming Mars as a backup planet.",
        setting: "the Global Space Agency Council",
        claimOptions: [
            { id: 'c1', text: "Mars is a cool planet and we should definitely go there.", correct: false, feedback: "This is an opinion, not a policy claim. A debate requires a specific, actionable proposal." },
            { id: 'c2', text: "The Global Space Agency must commit to a phased terraforming initiative on Mars to ensure humanity's long-term survival against extinction-level threats.", correct: true, feedback: "Excellent. A clear, specific policy claim tied to a concrete justification: species survival." },
            { id: 'c3', text: "We should abandon Earth entirely and move everyone to Mars as soon as possible.", correct: false, feedback: "Wildly impractical and unnecessary. You lose all credibility by suggesting we abandon a functioning planet." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Asteroid impacts, supervolcanic eruptions, and gamma-ray bursts are statistically inevitable over geological time, and any single-planet civilization faces a non-zero extinction risk.", type: 'strong' },
            { id: 'e2', text: "NASA's Mars atmospheric studies confirm that controlled greenhouse gas release could raise surface temperatures by 10 degrees Celsius within 50 years, making early-stage terraforming scientifically feasible.", type: 'strong' },
            { id: 'e3', text: "Historical precedent shows that large-scale exploration projects, from the Age of Sail to the Apollo program, generated enormous technological and economic returns far exceeding their initial costs.", type: 'strong' },
            { id: 'e4', text: "Since Elon Musk and other visionary billionaires have already committed personal fortunes to Mars colonization, it is clear that the private sector believes this project will succeed.", type: 'weak', feedback: "Logical Fallacy (Appeal to Authority). The financial decisions of wealthy individuals do not constitute scientific evidence. Billionaires invest in many ventures that fail; their confidence is not proof of feasibility." },
            { id: 'e5', text: "Earth's population is growing so rapidly that we will run out of space within 80 years, making a second planet an absolute necessity for human survival.", type: 'weak', feedback: "Logical Fallacy (Slippery Slope / Exaggeration). Population growth rates are actually declining globally, and Earth's carrying capacity depends on resource management, not just physical space. This overstates the urgency with misleading data." },
            { id: 'e6', text: "A recent international poll found that 72% of young people support Mars colonization, demonstrating that the next generation is ready to embrace this mission.", type: 'weak', feedback: "Logical Fallacy (Appeal to Popularity). Public enthusiasm does not validate scientific or economic feasibility. Policy decisions of this magnitude require expert analysis, not opinion polls." }
        ],
        counterArgument: {
            text: "Dr. Elena Vasquez, Head of Earth Sciences, argues: 'We cannot even solve climate change on our own planet! Pouring resources into terraforming a dead world while Earth burns is the height of irresponsibility.'",
            rebuttals: [
                { id: 'r1', text: "The technologies developed for terraforming, such as atmospheric carbon capture and closed-loop ecosystems, directly apply to solving climate change on Earth. This is not an either-or choice.", correct: true, feedback: "Outstanding. You turned her objection into a strength by showing the research benefits both planets simultaneously." },
                { id: 'r2', text: "Dr. Vasquez presents a false dilemma. Global science budgets are large enough to fund both climate research and Mars initiatives simultaneously without meaningful trade-offs between the two programs.", correct: false, feedback: "This sounds reasonable but fails to address her core point about urgency and priority. Simply claiming budgets are large enough does not prove it or show how dual funding would work in practice." },
                { id: 'r3', text: "If Earth is already struggling with environmental collapse as you suggest, that urgency is precisely why we need a backup planet to safeguard our species against the worst outcomes.", correct: false, feedback: "Logical Fallacy (Straw Man). She did not say Earth is collapsing; she said we should prioritize fixing it. Misrepresenting her argument weakens your position." }
            ]
        },
        pushback: {
            text: "Ambassador Okafor raises a concern: 'Developing nations are struggling with poverty and food insecurity right now. How can we justify spending trillions on a planet no one can live on yet?'",
            rebuttals: [
                { id: 'p1', text: "Ambassador Okafor's priorities are misguided. Every great civilization invested in exploration despite domestic challenges, and refusing to look beyond Earth guarantees long-term stagnation for everyone.", correct: false, feedback: "Too aggressive. Calling a diplomat's priorities 'misguided' is dismissive, and framing poverty as a minor domestic challenge alienates the council." },
                { id: 'p2', text: "You raise a valid point, and perhaps we should scale back the Mars timeline significantly until every nation has achieved basic food security and poverty reduction targets first.", correct: false, feedback: "Too concessive. Indefinitely delaying the project undermines your entire argument. You need to show both goals can be pursued together, not surrender your position." },
                { id: 'p3', text: "The terraforming initiative can be structured so that satellite technology, agricultural research, and water purification systems developed for Mars are deployed in developing nations first, making it a dual-purpose investment.", correct: true, feedback: "Excellent compromise. You directly addressed the concern by linking the Mars project to immediate humanitarian benefits on Earth." }
            ]
        },
        speechTemplate: {
            intro: "Distinguished members of the Council, humanity has always survived by looking beyond the horizon.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the threat to humanity',
                    options: [
                        { text: "existential risks that threaten our very survival as a species", strong: true },
                        { text: "catastrophic events that no single planet can withstand indefinitely", strong: true },
                        { text: "scary things that could happen to us someday", strong: false, feedback: "Vague and informal. A council of scientists and diplomats expects precise, authoritative language about specific threats." },
                        { text: "problems that make people nervous about the future", strong: false, feedback: "This focuses on feelings rather than facts. A strong opening identifies concrete dangers, not emotional states." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe what Mars represents',
                    options: [
                        { text: "an insurance policy for civilization itself", strong: true },
                        { text: "a proving ground for the technologies that will also heal our own world", strong: true },
                        { text: "a really exciting adventure for everyone", strong: false, feedback: "Too casual for a trillion-dollar policy debate. Frame Mars in terms of strategic necessity, not excitement." }
                    ]
                }
            ]
        }
    },
    {
        id: 'gene-editing-humans',
        title: "Gene Editing in Humans",
        premise: "CRISPR technology can now precisely edit human embryos to eliminate inherited diseases like sickle cell anemia and cystic fibrosis. Opponents fear it will lead to designer babies. You are arguing that CRISPR gene editing should be allowed to prevent inherited diseases.",
        setting: "the International Medical Ethics Board",
        claimOptions: [
            { id: 'c1', text: "CRISPR gene editing should be permitted under strict medical oversight to eliminate severe inherited diseases from the human gene pool.", correct: true, feedback: "Strong policy claim. It is specific, actionable, and includes a safeguard (strict medical oversight)." },
            { id: 'c2', text: "Gene editing is the future of medicine.", correct: false, feedback: "This is a prediction, not a debatable policy claim. You need to propose a specific course of action." },
            { id: 'c3', text: "Parents should be allowed to use CRISPR to customize any trait in their children, including intelligence, appearance, and athleticism.", correct: false, feedback: "This goes far beyond disease prevention and plays directly into the opposition's fears about designer babies. It will lose you the debate." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Over 10,000 known genetic disorders are caused by single-gene mutations, and CRISPR has demonstrated a 95% accuracy rate in correcting these mutations in laboratory trials.", type: 'strong' },
            { id: 'e2', text: "Children born with severe genetic diseases like Tay-Sachs face shortened lifespans and immense suffering that could be entirely prevented before birth.", type: 'strong' },
            { id: 'e3', text: "Existing regulatory frameworks for organ transplants and IVF prove that the medical community can successfully govern powerful technologies without sliding into abuse.", type: 'strong' },
            { id: 'e4', text: "Countries that ban gene editing will fall behind economically, as their citizens will travel abroad for the procedure anyway, creating an unregulated medical tourism industry.", type: 'weak', feedback: "Logical Fallacy (Appeal to Fear / Slippery Slope). The existence of potential medical tourism does not justify the technology itself. Policy should be based on medical merit, not fear of losing control." },
            { id: 'e5', text: "Since we already allow parents to select embryos through IVF screening, permitting CRISPR editing is simply the next logical step in the same process.", type: 'weak', feedback: "Logical Fallacy (False Equivalence). Selecting existing embryos and actively rewriting DNA are fundamentally different procedures with different risk profiles. One does not automatically justify the other." },
            { id: 'e6', text: "A consortium of 200 leading geneticists signed a letter supporting CRISPR research, which confirms that the scientific community has reached consensus on its safety.", type: 'weak', feedback: "Logical Fallacy (Appeal to Authority / Hasty Generalization). 200 geneticists, even prominent ones, do not represent the entire global scientific community. A signed letter is advocacy, not peer-reviewed evidence of safety." }
        ],
        counterArgument: {
            text: "Professor Hiroshi Tanaka, bioethicist, argues: 'Once we allow editing for diseases, there is no clear line. Wealthy families will demand enhancements, intelligence boosts, and cosmetic changes. We will create a genetic class divide.'",
            rebuttals: [
                { id: 'r1', text: "The line is clear: medical necessity. Regulatory boards already distinguish between therapeutic treatment and elective enhancement in every branch of medicine, from surgery to pharmaceuticals.", correct: true, feedback: "Powerful rebuttal. You demonstrated that a clear boundary already exists in medical practice, directly countering the 'slippery slope' fear." },
                { id: 'r2', text: "Wealth already determines access to the best healthcare, private education, and nutrition. Adding genetic editing to that list would not fundamentally change an inequality that already exists in society.", correct: false, feedback: "Logical Fallacy (Two Wrongs Make a Right). Existing inequality does not justify creating a new, permanent form of biological inequality. This argument normalizes the problem rather than solving it." },
                { id: 'r3', text: "Professor Tanaka is prioritizing hypothetical future risks over the real children suffering from genetic diseases today. His caution effectively condemns those families to preventable pain.", correct: false, feedback: "Logical Fallacy (Ad Hominem / Appeal to Emotion). Framing his legitimate ethical concern as indifference to suffering is manipulative and disrespectful to the board." }
            ]
        },
        pushback: {
            text: "Dr. Amara Osei, patient advocate, raises a concern: 'Many disability communities feel that gene editing sends a message that their lives are less valuable. How do you address this?'",
            rebuttals: [
                { id: 'p1', text: "The disability community's concerns, while understandable, cannot override the scientific imperative to eliminate preventable genetic suffering wherever our technology allows us to do so.", correct: false, feedback: "Too aggressive. Dismissing a community's lived experience as secondary to science is tone-deaf. The board includes patient advocates who will find this callous." },
                { id: 'p2', text: "That is a deeply important perspective. Perhaps we should pause clinical applications of CRISPR entirely until disability communities feel fully comfortable with how the technology is framed.", correct: false, feedback: "Too concessive. An indefinite pause based on community sentiment abandons your position. You can respect the concern without halting medical progress." },
                { id: 'p3', text: "Preventing suffering is not the same as devaluing those who live with it. We treat cancer without suggesting cancer survivors are lesser people. Gene editing targets the disease, not the person.", correct: true, feedback: "Beautifully stated. You drew a clear distinction between eliminating disease and devaluing people, using a relatable analogy that respects the concern." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Ethics Board, we hold in our hands a technology that can end generations of inherited suffering.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe what CRISPR can do',
                    options: [
                        { text: "precisely correct the genetic mutations that cause devastating hereditary diseases", strong: true },
                        { text: "give families hope where previously there was only a certainty of suffering", strong: true },
                        { text: "fix broken DNA and make people healthier", strong: false, feedback: "Oversimplified. 'Fix broken DNA' lacks the scientific precision this board expects. Use specific medical terminology to demonstrate expertise." },
                        { text: "change genes so kids don't get sick", strong: false, feedback: "Too casual for a medical ethics board. Your language should reflect the gravity and complexity of the technology you are advocating for." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the safeguard',
                    options: [
                        { text: "rigorous oversight and transparent regulatory frameworks", strong: true },
                        { text: "established medical ethics protocols that have governed innovation for decades", strong: true },
                        { text: "rules that scientists have to follow", strong: false, feedback: "Vague and unimpressive. The board wants to hear about specific, robust systems of accountability, not generic 'rules.'" }
                    ]
                }
            ]
        }
    },
    {
        id: 'ocean-vs-space-funding',
        title: "Ocean Exploration vs Space",
        premise: "Over 80% of Earth's ocean remains unexplored, yet ocean science receives a fraction of the budget allocated to space programs. You are arguing that ocean exploration should receive equal funding to space exploration.",
        setting: "the International Science Funding Committee",
        claimOptions: [
            { id: 'c1', text: "Space exploration is a waste of money and should be defunded.", correct: false, feedback: "Too extreme. You are arguing for equal funding, not the elimination of space programs. This will antagonize space scientists on the committee." },
            { id: 'c2', text: "The International Science Funding Committee must allocate equal research budgets to ocean exploration and space exploration to address critical gaps in our knowledge of Earth's own systems.", correct: true, feedback: "Perfect. Specific, balanced, and tied to a clear rationale: closing knowledge gaps about our own planet." },
            { id: 'c3', text: "The ocean is more interesting than space.", correct: false, feedback: "A subjective opinion, not a policy claim. Debates require proposals that can be supported with evidence and implemented through action." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Deep-sea organisms have already yielded compounds used in cancer treatments and antivirals, yet over 90% of marine species remain unclassified and unstudied.", type: 'strong' },
            { id: 'e2', text: "Ocean currents regulate global climate patterns, and improved deep-sea monitoring would dramatically enhance our ability to predict hurricanes, droughts, and sea-level rise.", type: 'strong' },
            { id: 'e3', text: "Rare earth minerals and polymetallic nodules on the ocean floor could supply critical materials for renewable energy technology without destructive land-based mining.", type: 'strong' },
            { id: 'e4', text: "We have better maps of the surface of Mars than we do of our own ocean floor, which proves that our funding priorities are fundamentally wrong.", type: 'weak', feedback: "Logical Fallacy (Non Sequitur). Having better maps of Mars reflects the different technical challenges of mapping each environment, not necessarily misaligned priorities. Mapping the deep ocean is harder due to water pressure and sonar limitations." },
            { id: 'e5', text: "Throughout history, civilizations that mastered the seas, like the British Empire and ancient Phoenicia, became the most powerful, suggesting that ocean investment leads to national dominance.", type: 'weak', feedback: "Logical Fallacy (False Cause / Misleading Analogy). Naval military and trade dominance in past centuries is not comparable to modern scientific ocean research. Historical empire-building does not justify a research budget." },
            { id: 'e6', text: "Since marine biologists report feeling consistently underfunded and underappreciated compared to their colleagues in astrophysics, the funding gap is clearly damaging morale across the scientific community.", type: 'weak', feedback: "Logical Fallacy (Appeal to Emotion). Researchers' feelings about their funding, while understandable, are not evidence for policy change. Budget allocation should be based on scientific potential and public benefit, not professional satisfaction." }
        ],
        counterArgument: {
            text: "Director Zhang Wei of the Space Division responds: 'Space exploration drives the most transformative innovations of our era, from GPS to satellite communications. Diverting funds to the ocean would slow technological progress for all of humanity.'",
            rebuttals: [
                { id: 'r1', text: "Ocean research drives equally transformative innovation, from sonar technology to underwater robotics to pressure-resistant materials. Equal funding means more total innovation across both frontiers, not less.", correct: true, feedback: "Excellent. You matched his examples with equally compelling ocean-derived innovations and reframed the debate as additive, not zero-sum." },
                { id: 'r2', text: "Space technology has largely plateaued in recent decades, with most major breakthroughs like GPS and satellites dating back to the twentieth century. The ocean offers fresher discovery potential now.", correct: false, feedback: "Factually incorrect and easily disproven. The James Webb Space Telescope and Mars rovers are recent, widely celebrated achievements. Making false claims destroys your credibility." },
                { id: 'r3', text: "Director Zhang naturally emphasizes space achievements because his department's entire budget depends on maintaining the current funding structure and its perceived importance.", correct: false, feedback: "Logical Fallacy (Ad Hominem). Attacking his motives instead of his argument is unprofessional and does not address the substance of his point about innovation." }
            ]
        },
        pushback: {
            text: "Committee Treasurer Dr. Priya Sharma warns: 'The total science budget is fixed. Equal ocean funding means cutting space budgets by 40%. How do you prevent this from crippling active space missions?'",
            rebuttals: [
                { id: 'p1', text: "The space program has operated with inflated budgets for decades. A forty percent reduction would simply force them to eliminate wasteful spending and prioritize their most essential missions.", correct: false, feedback: "Too aggressive. Claiming waste without evidence is dismissive and alienates the space scientists whose cooperation you need for any rebalancing effort." },
                { id: 'p2', text: "You are right that the math is difficult. Perhaps we should settle for a smaller increase to ocean funding this year and revisit the equal funding goal at a later date.", correct: false, feedback: "Too concessive. Abandoning your core position at the first sign of resistance undermines your credibility. You need a practical plan, not a retreat." },
                { id: 'p3', text: "The rebalancing can be phased over ten years, prioritizing joint ocean-space projects like Earth observation satellites and underwater-to-orbital communication systems, so no active missions are disrupted.", correct: true, feedback: "Smart and practical. A phased transition with joint projects shows you respect existing commitments while building toward equal funding." }
            ]
        },
        speechTemplate: {
            intro: "Colleagues, we pride ourselves on exploring the unknown, yet the greatest unknown lies beneath our own waves.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe what the ocean contains',
                    options: [
                        { text: "undiscovered species, life-saving medicines, and climate secrets", strong: true },
                        { text: "vast mineral wealth and ecosystems we have barely begun to understand", strong: true },
                        { text: "lots of fish and interesting creatures", strong: false, feedback: "Trivializes the ocean's scientific value. A funding committee needs to hear about strategic and medical potential, not general interest." },
                        { text: "things we haven't found yet", strong: false, feedback: "Extremely vague. You must be specific about what the ocean offers to justify billions in funding." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the goal of equal funding',
                    options: [
                        { text: "a balanced scientific agenda that serves humanity above and below the atmosphere", strong: true },
                        { text: "the knowledge we need to protect our planet while we reach for the stars", strong: true },
                        { text: "fairness for ocean scientists who deserve more respect", strong: false, feedback: "Framing this as a matter of professional fairness rather than scientific merit weakens your argument. Focus on what the research will achieve, not who feels undervalued." }
                    ]
                }
            ]
        }
    },
    {
        id: 'renewable-energy-transition',
        title: "Renewable Energy Transition",
        premise: "Global temperatures continue to rise, and fossil fuels remain the dominant energy source worldwide. A bold proposal demands that every nation commit to 100% renewable energy by 2040. You are arguing in favor of this commitment.",
        setting: "the International Energy Policy Council",
        claimOptions: [
            { id: 'c1', text: "All nations must sign a binding agreement to transition to 100% renewable energy by 2040, with phased milestones and international support mechanisms for developing economies.", correct: true, feedback: "Strong claim. It is specific, includes a timeline, and acknowledges the need for support, making it both ambitious and pragmatic." },
            { id: 'c2', text: "Fossil fuels are bad for the environment.", correct: false, feedback: "This is a widely accepted fact, not a debatable policy claim. A debate requires you to propose a specific action, not restate common knowledge." },
            { id: 'c3', text: "We should immediately shut down every coal plant and oil refinery in the world.", correct: false, feedback: "Logistically impossible and economically catastrophic. Immediate shutdown would cause energy crises, blackouts, and humanitarian disasters." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Solar and wind energy costs have dropped by over 85% in the past decade and are now cheaper than new coal plants in most regions of the world.", type: 'strong' },
            { id: 'e2', text: "The World Health Organization estimates that air pollution from fossil fuels causes 7 million premature deaths annually, a toll that renewables would dramatically reduce.", type: 'strong' },
            { id: 'e3', text: "Countries like Iceland, Costa Rica, and Norway already generate over 95% of their electricity from renewable sources, demonstrating that near-total transition is technically achievable.", type: 'strong' },
            { id: 'e4', text: "The renewable energy sector has created 12 million jobs globally, which is growing faster than any other industry, proving that the economic benefits outweigh the costs of transition.", type: 'weak', feedback: "Logical Fallacy (Red Herring / Incomplete Analysis). Job creation in renewables does not address the job losses in fossil fuel industries. Presenting only one side of the employment equation is misleading and avoids the real economic concern." },
            { id: 'e5', text: "Since Germany's Energiewende policy has been widely praised as a model for energy transition, other nations should simply replicate their approach to achieve similar results.", type: 'weak', feedback: "Logical Fallacy (Hasty Generalization). Germany's energy transition has faced significant challenges, including rising electricity costs and continued reliance on natural gas. Presenting it as an unqualified success ignores critical complications." },
            { id: 'e6', text: "Major oil companies like BP and Shell have started investing in renewable energy divisions, signaling that even the fossil fuel industry acknowledges the inevitable shift away from carbon.", type: 'weak', feedback: "Logical Fallacy (Appeal to Authority / Misinterpreted Evidence). Oil companies investing small fractions of their budget in renewables is often a public relations strategy, not a genuine endorsement of full transition. Their actions do not validate your policy timeline." }
        ],
        counterArgument: {
            text: "Energy Minister Petrov objects: 'Renewables are unreliable! The sun does not always shine and the wind does not always blow. You are asking nations to gamble their entire energy security on intermittent sources.'",
            rebuttals: [
                { id: 'r1', text: "Modern grid-scale battery storage, pumped hydro, and green hydrogen systems can store renewable energy for days or weeks. Intermittency is an engineering problem already being solved.", correct: true, feedback: "Excellent. You directly addressed the technical concern with specific, existing solutions rather than dismissing his worry." },
                { id: 'r2', text: "Fossil fuels have their own reliability problems, including volatile oil prices, pipeline failures, and supply chain disruptions from geopolitical conflicts that threaten energy security just as much.", correct: false, feedback: "Logical Fallacy (Whataboutism / Tu Quoque). Pointing out flaws in fossil fuels does not answer the specific question about renewable intermittency. You must address his concern directly." },
                { id: 'r3', text: "Critics raised identical reliability concerns about every major energy transition in history, from wood to coal to oil, and each time the new technology proved itself through adoption.", correct: false, feedback: "Logical Fallacy (Weak Analogy). Past fuel transitions involved continuous energy sources replacing other continuous sources. Solar and wind intermittency is a genuinely different technical challenge that this comparison ignores." }
            ]
        },
        pushback: {
            text: "Delegate Adeyemi from Nigeria states: 'My country just discovered massive natural gas reserves. You are asking us to leave billions of dollars in the ground while our people lack basic electricity. This timeline is unjust.'",
            rebuttals: [
                { id: 'p1', text: "Every nation must make equal sacrifices for the planet regardless of their economic situation. Nigeria cannot receive special treatment just because the timeline is inconvenient for its development.", correct: false, feedback: "Too aggressive. Telling a developing nation to sacrifice economic development without offering alternatives is neither fair nor persuasive. This ignores historical inequity in emissions." },
                { id: 'p2', text: "You make a compelling case. Perhaps nations with newly discovered fossil fuel reserves should be fully exempt from the 2040 deadline until they have achieved economic parity with developed nations.", correct: false, feedback: "Too concessive. A blanket exemption for any nation with fossil fuel reserves would gut the entire agreement. You need to offer support, not abandon the framework." },
                { id: 'p3', text: "The agreement should include a Green Development Fund that finances renewable infrastructure in nations like Nigeria, allowing you to leapfrog directly to clean energy and create lasting jobs without fossil fuel dependency.", correct: true, feedback: "Excellent diplomacy. You acknowledged the injustice, offered a concrete financial mechanism, and reframed renewables as an economic opportunity rather than a sacrifice." }
            ]
        },
        speechTemplate: {
            intro: "Council members, the science is unambiguous: our current energy path leads to a future none of us would choose.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the cost of inaction',
                    options: [
                        { text: "rising seas, collapsing ecosystems, and millions of climate refugees", strong: true },
                        { text: "an irreversible cascade of environmental and humanitarian crises", strong: true },
                        { text: "bad weather and pollution getting worse", strong: false, feedback: "Understates the severity. 'Bad weather' trivializes catastrophic climate events. A policy council expects language that reflects the true scale of the crisis." },
                        { text: "problems for future generations to deal with", strong: false, feedback: "Deflects urgency. Framing climate change as a future problem contradicts the scientific consensus that it is happening now." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the opportunity',
                    options: [
                        { text: "a cleaner, more stable, and more equitable global energy system", strong: true },
                        { text: "energy independence for every nation and a thriving green economy", strong: true },
                        { text: "saving the planet from destruction", strong: false, feedback: "Overly dramatic and vague. While emotionally powerful, it lacks the specificity that policy makers need. Describe tangible outcomes, not apocalyptic framing." }
                    ]
                }
            ]
        }
    }
];
