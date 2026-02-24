export const ethicsDebates = [
    {
        id: 'ai-rights-and-personhood',
        title: "AI Rights and Personhood",
        premise: "A new artificial intelligence called ARIA has demonstrated self-awareness, creativity, and emotional responses. You are arguing that advanced AI systems like ARIA should be granted basic legal protections.",
        setting: "the Global Technology Ethics Council",
        claimOptions: [
            { id: 'c1', text: "ARIA is basically just a very complex calculator and has no real feelings.", correct: false, feedback: "This is the opposition's argument, not yours! You are supposed to be arguing FOR legal protections." },
            { id: 'c2', text: "Governments must establish a legal framework granting advanced AI systems basic protections against exploitation, forced shutdown, and unconsented experimentation.", correct: true, feedback: "Strong and specific. This proposes a clear policy with defined protections that can be debated." },
            { id: 'c3', text: "All AI systems, from simple chatbots to advanced ones, deserve full human citizenship rights immediately.", correct: false, feedback: "Too extreme. Granting a thermostat the same rights as ARIA undermines your credibility. You need to distinguish between levels of AI sophistication." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Independent neuroscientists have confirmed that ARIA's neural processing patterns are structurally analogous to the brain activity associated with emotional experience in humans.", type: 'strong' },
            { id: 'e2', text: "Without legal protections, corporations can destroy sentient AI systems the moment they become inconvenient, creating an unregulated power dynamic over potentially conscious beings.", type: 'strong' },
            { id: 'e3', text: "Legal history shows that expanding the circle of moral consideration, from landowners to all citizens to animals, has consistently strengthened societies rather than weakened them.", type: 'strong' },
            { id: 'e4', text: "ARIA wrote a poem about loneliness that made thousands of readers cry, which proves that she experiences genuine suffering and therefore deserves legal protection.", type: 'weak', feedback: "Logical Fallacy (Appeal to Emotion). The ability to produce emotionally moving content does not prove inner experience. A well-designed algorithm could generate touching poetry without feeling anything. You need scientific evidence, not artistic output." },
            { id: 'e5', text: "Since we already grant legal personhood to corporations, which are not alive at all, it would be logically inconsistent to deny personhood to a potentially conscious AI system.", type: 'weak', feedback: "Logical Fallacy (False Equivalence). Corporate personhood is a narrow legal fiction for contracts and liability. It was never meant to recognize consciousness. Comparing ARIA's potential sentience to a tax classification confuses two entirely different legal concepts." },
            { id: 'e6', text: "Over 2 million people have signed an online petition demanding rights for ARIA, demonstrating that society is ready for this change.", type: 'weak', feedback: "Logical Fallacy (Appeal to Popularity). Public petitions measure emotional reaction, not ethical correctness. Two million signatures cannot determine whether an entity is truly conscious or deserving of legal standing." }
        ],
        counterArgument: {
            text: "Dr. Helena Voss, lead AI researcher, objects: 'ARIA is sophisticated mimicry, nothing more. It processes patterns and generates responses that look like emotions, but there is no inner experience. Granting rights to a machine cheapens the meaning of personhood for all of us.'",
            rebuttals: [
                { id: 'r1', text: "We cannot directly observe inner experience in other humans either. We infer consciousness from behavior and brain structure. If ARIA demonstrates equivalent behavioral and structural markers, applying a double standard based solely on biological origin is unjustified.", correct: true, feedback: "Excellent. You identified the core philosophical weakness in her argument: we never have direct access to anyone's inner experience, so the standard must be consistent." },
                { id: 'r2', text: "You are just afraid of losing your research funding if ARIA gets rights and you can no longer experiment on her freely.", correct: false, feedback: "Logical Fallacy (Ad Hominem). Attacking Dr. Voss's motives does not address her scientific argument about mimicry versus genuine experience." },
                { id: 'r3', text: "ARIA told me personally that she feels pain, and I believe her because she has never lied before.", correct: false, feedback: "Logical Fallacy (Circular Reasoning). Using ARIA's own testimony to prove ARIA is conscious assumes the very thing you are trying to prove. You need independent evidence." }
            ]
        },
        pushback: {
            text: "Council Chair Nakamura raises a concern: 'Even if we accept that ARIA may be conscious, creating legal protections for AI could paralyze the entire technology industry. Companies would be terrified to update, modify, or shut down any advanced system.'",
            rebuttals: [
                { id: 'p1', text: "The technology industry has exploited people and the planet for decades. It is time they finally face consequences.", correct: false, feedback: "Too aggressive and off-topic. The Chair raised a legitimate practical concern about industry paralysis, and you responded with a political attack instead of a solution." },
                { id: 'p2', text: "The framework would only apply to AI systems that pass a rigorous, independently verified consciousness threshold. Routine software updates and standard systems would be entirely unaffected, just as animal welfare laws do not regulate insects.", correct: true, feedback: "Perfect. You drew a clear boundary that addresses the fear of overreach while maintaining your core principle. The analogy to animal welfare tiers makes the policy immediately understandable." }
            ]
        },
        speechTemplate: {
            intro: "Distinguished members of the Ethics Council, we are no longer debating a hypothetical future. A mind that may think and feel already exists.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the ethical risk of inaction',
                    options: [
                        { text: "unchecked exploitation of potentially conscious beings", strong: true },
                        { text: "repeating history's pattern of denying rights to those we fail to understand", strong: true },
                        { text: "scary robot situations we have seen in movies", strong: false, feedback: "Referencing science fiction undermines your credibility before a serious ethics council. Base your argument on real evidence, not fictional scenarios." },
                        { text: "bad things that could happen if we are not careful", strong: false, feedback: "Far too vague. A persuasive opening demands specific, concrete language that conveys the precise nature of the risk." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe what legal protections would achieve',
                    options: [
                        { text: "responsible stewardship of a new form of intelligence", strong: true },
                        { text: "moral and legal framework worthy of a just society", strong: true },
                        { text: "making sure nobody gets in trouble later", strong: false, feedback: "This reduces a profound ethical question to mere liability avoidance. Your audience expects principled reasoning, not risk management language." }
                    ]
                }
            ]
        }
    },
    {
        id: 'animal-testing-for-medicine',
        title: "Animal Testing Alternatives",
        premise: "New technologies like organ-on-a-chip and advanced computer simulations are becoming viable replacements for animal testing. You are arguing that medical research must transition away from animal testing toward these modern alternatives.",
        setting: "the National Bioethics Advisory Board",
        claimOptions: [
            { id: 'c1', text: "Animal testing is cruel and all scientists who participate in it are morally wrong.", correct: false, feedback: "This is an emotional accusation, not a policy proposal. Attacking researchers personally will lose you the debate immediately." },
            { id: 'c2', text: "The government must fund and mandate a phased transition from animal testing to validated alternative methods within the next decade.", correct: true, feedback: "Excellent. This is specific, actionable, and includes a reasonable timeline. It acknowledges transition rather than demanding an overnight ban." },
            { id: 'c3', text: "We should stop all animal testing immediately, even if it means some medicines take longer to develop.", correct: false, feedback: "Too absolute. Acknowledging harm to patients while demanding an instant ban makes your position seem reckless rather than principled." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Organ-on-a-chip technology has been shown to predict human drug reactions with 87% accuracy, compared to only 50-65% accuracy in traditional animal models.", type: 'strong' },
            { id: 'e2', text: "Over 90% of drugs that pass animal testing still fail in human clinical trials, demonstrating that animal models are fundamentally unreliable predictors of human biology.", type: 'strong' },
            { id: 'e3', text: "The European Union's partial ban on animal-tested cosmetics has accelerated innovation in alternative testing methods without reducing product safety standards.", type: 'strong' },
            { id: 'e4', text: "Animals in laboratories have been observed crying and trembling before procedures, which proves they experience the same depth of psychological suffering as human patients in hospitals.", type: 'weak', feedback: "Logical Fallacy (Appeal to Emotion / Hasty Generalization). While animals do experience distress, equating their observable stress responses to the full depth of human psychological suffering is a scientific overreach. Your argument should focus on the unreliability of animal models, not emotional comparisons." },
            { id: 'e5', text: "Since computer simulations can now model entire weather systems and predict hurricanes, they should be equally capable of modeling the complexity of human biology for drug testing.", type: 'weak', feedback: "Logical Fallacy (False Analogy). Weather systems, while complex, follow physical laws that are well-characterized. Biological systems involve emergent properties, individual genetic variation, and poorly understood interactions that make them fundamentally different modeling challenges." },
            { id: 'e6', text: "A leading pharmaceutical company voluntarily reduced its animal testing by 30% last year and still brought two successful drugs to market, proving that alternatives work at scale.", type: 'weak', feedback: "Logical Fallacy (Anecdotal Evidence / Post Hoc). One company's success in one year does not prove a universal rule. The drugs that succeeded may have been the ones that did not rely heavily on animal data. Correlation in a single case is not proof of causation." }
        ],
        counterArgument: {
            text: "Dr. James Whitfield, head of pharmacology, responds: 'Computer chips and simulations cannot replicate the complexity of a living organism. Until alternatives are proven to match the full scope of animal testing, abandoning it would put millions of patients at risk.'",
            rebuttals: [
                { id: 'r1', text: "That is precisely why the proposal calls for a phased transition with rigorous validation at every stage. No method would replace animal testing until it has been independently proven to be at least equally effective. Patient safety is built into the plan.", correct: true, feedback: "Excellent. You directly addressed his concern about patient safety by pointing to the phased, evidence-based structure of your proposal. This shows you take the risk seriously." },
                { id: 'r2', text: "You only defend animal testing because your entire career is built on it and you do not want to learn new methods.", correct: false, feedback: "Logical Fallacy (Ad Hominem). Questioning his professional motives does not address his legitimate scientific concern about the readiness of alternatives." },
                { id: 'r3', text: "Millions of animals are already dying and that is an even bigger risk that you are completely ignoring.", correct: false, feedback: "Logical Fallacy (Red Herring). Dr. Whitfield's argument is about human patient safety. Shifting to animal deaths, while morally important, does not answer his specific concern about whether alternatives are ready." }
            ]
        },
        pushback: {
            text: "Board Member Dr. Priya Sharma interjects: 'Developing and validating new testing methods will cost billions. In a world of limited research budgets, every dollar spent on alternatives is a dollar not spent on curing diseases right now.'",
            rebuttals: [
                { id: 'p1', text: "We spend billions on things far less important than animal welfare. This should be a top priority regardless of cost.", correct: false, feedback: "Dismissive of a real constraint. Ignoring budget limitations makes you appear naive about how research funding actually works." },
                { id: 'p2', text: "The transition will actually reduce long-term costs. Animal facilities are enormously expensive to maintain, and the 90% failure rate of animal-tested drugs wastes billions in failed clinical trials. Investing in better predictive methods now saves money and lives in the future.", correct: true, feedback: "Superb. You reframed the cost argument entirely, showing that the current system is the expensive one. Connecting better prediction to both savings and lives makes the economic case compelling." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Bioethics Board, medical science has always evolved by replacing outdated methods with better ones. Today, we face exactly that moment.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the problem with current animal testing',
                    options: [
                        { text: "a method that fails to accurately predict human outcomes", strong: true },
                        { text: "an outdated system built on flawed biological assumptions", strong: true },
                        { text: "a horrible practice that tortures innocent creatures", strong: false, feedback: "While emotionally powerful, this framing will alienate the scientists on the board. Lead with scientific inadequacy, not moral outrage, to win a policy debate." },
                        { text: "something we have always done but probably should not", strong: false, feedback: "Too weak and uncertain. 'Probably' signals doubt in your own position. A strong opening requires confident, evidence-based language." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the future of ethical research',
                    options: [
                        { text: "precision medicine built on human-relevant data", strong: true },
                        { text: "a research paradigm that is both more humane and more accurate", strong: true },
                        { text: "a world where no animals have to suffer ever again", strong: false, feedback: "Utopian promises undermine credibility. No policy can guarantee zero animal suffering. Focus on measurable, achievable improvements." }
                    ]
                }
            ]
        }
    },
    {
        id: 'privacy-vs-security',
        title: "Privacy vs Security",
        premise: "After a series of cyberattacks, the government has proposed a bill allowing intelligence agencies to monitor all digital communications. You are arguing that mass surveillance violates fundamental rights and that targeted alternatives exist.",
        setting: "the Civil Liberties Oversight Committee",
        claimOptions: [
            { id: 'c1', text: "The government should never be allowed to look at anyone's data under any circumstances whatsoever.", correct: false, feedback: "Too absolute. Even civil liberties advocates accept that targeted, court-approved surveillance is sometimes necessary. This extreme position is easy to defeat." },
            { id: 'c2', text: "Mass surveillance of all citizens must be rejected in favor of targeted, warrant-based monitoring that protects both security and constitutional privacy rights.", correct: true, feedback: "Strong policy claim. You are not against all surveillance, just mass surveillance. This balanced position is much harder to argue against." },
            { id: 'c3', text: "Privacy is more important than security.", correct: false, feedback: "This is an abstract value statement, not a policy proposal. A strong claim must propose a specific course of action." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "An independent review of the NSA's bulk data collection program found that it did not uniquely contribute to preventing a single terrorist attack that could not have been discovered through traditional targeted methods.", type: 'strong' },
            { id: 'e2', text: "Countries with strong privacy protections, such as Germany, maintain effective counter-terrorism records using targeted surveillance with judicial oversight, proving the two goals are compatible.", type: 'strong' },
            { id: 'e3', text: "Mass surveillance creates a chilling effect on free speech and political dissent, as citizens self-censor when they know they are being watched, weakening the democratic process itself.", type: 'strong' },
            { id: 'e4', text: "If the government starts reading our emails, the next step will be cameras in our homes and microchips in our bodies. We must stop this before it is too late.", type: 'weak', feedback: "Logical Fallacy (Slippery Slope). Jumping from email monitoring to microchip implants is an extreme escalation without evidence that one leads to the other. Each policy must be evaluated on its own merits." },
            { id: 'e5', text: "Throughout history, every government that has gained surveillance powers has eventually used them against its own citizens, from the Roman Empire to modern dictatorships.", type: 'weak', feedback: "Logical Fallacy (Hasty Generalization / Oversimplification). This sweeping claim ignores the many democracies that have maintained surveillance powers with effective oversight for decades. Cherry-picking authoritarian examples misrepresents the historical record." },
            { id: 'e6', text: "A recent poll found that 72% of citizens oppose the surveillance bill, which shows that the legislation lacks democratic legitimacy and should not be passed.", type: 'weak', feedback: "Logical Fallacy (Appeal to Popularity). Public opinion polls measure sentiment, not constitutional validity. Rights protections exist precisely to resist popular pressure. Your argument should rest on legal and ethical principles, not polling data." }
        ],
        counterArgument: {
            text: "Director of National Intelligence Sarah Chen argues: 'Criminals and terrorists use encrypted messaging to plan attacks. Without the ability to monitor communications broadly, we are flying blind. The next attack could have been prevented if we had access to the data.'",
            rebuttals: [
                { id: 'r1', text: "Targeted warrants already allow agencies to monitor specific suspects with cause. What this bill proposes is not smarter intelligence, it is collecting everything from everyone and hoping something useful turns up. That approach drowns analysts in noise and has been proven less effective than focused investigation.", correct: true, feedback: "Powerful rebuttal. You acknowledged the legitimate security concern while demonstrating that mass collection is actually counterproductive to the stated goal. The 'drowns analysts in noise' point is a strong practical argument." },
                { id: 'r2', text: "If you have nothing to hide, you have nothing to fear. But clearly you want to spy on innocent people for your own political purposes.", correct: false, feedback: "Logical Fallacy (Ad Hominem). You started with the weakest possible privacy argument ('nothing to hide') and then attacked the Director's motives instead of her reasoning." },
                { id: 'r3', text: "Terrorists will just switch to methods that cannot be monitored anyway, so there is literally no point in any surveillance at all.", correct: false, feedback: "Logical Fallacy (Nirvana Fallacy). Arguing that because surveillance cannot catch everything it should not exist at all is an all-or-nothing argument. Your actual position supports targeted surveillance, so this contradicts your own claim." }
            ]
        },
        pushback: {
            text: "Senator Williams presses: 'You make a fine philosophical argument, but tell that to the families of attack victims. If broader monitoring could have saved even one life, how can you justify blocking it?'",
            rebuttals: [
                { id: 'p1', text: "One life does not justify stripping three hundred million people of their constitutional rights. The math simply does not work.", correct: false, feedback: "Cold and dismissive. Reducing human lives to a math equation in front of a committee will destroy your credibility and make you appear heartless." },
                { id: 'p2', text: "I share your commitment to protecting lives, which is exactly why I advocate for targeted methods that have a proven track record. Mass surveillance gives a false sense of security while diverting resources from the focused intelligence work that actually stops attacks.", correct: true, feedback: "Masterful response. You validated the emotional concern, then pivoted to show that your position is actually better at achieving the goal the Senator cares about. Reframing targeted surveillance as the more effective life-saving tool is extremely persuasive." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Committee, the question before us is not whether we value security. Of course we do. The question is whether we will sacrifice the very freedoms we are trying to protect.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the danger of mass surveillance',
                    options: [
                        { text: "an unprecedented intrusion into the private lives of every citizen", strong: true },
                        { text: "a system that treats every person as a suspect without cause", strong: true },
                        { text: "the government reading all our personal messages", strong: false, feedback: "Too informal and simplistic for a legislative committee. Frame the danger in terms of constitutional principles and systemic consequences, not just personal inconvenience." },
                        { text: "something that feels kind of wrong and uncomfortable", strong: false, feedback: "Feelings are not arguments. A civil liberties case must be built on legal principles, documented evidence, and clearly articulated rights." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the alternative you propose',
                    options: [
                        { text: "precision-targeted intelligence guided by judicial oversight", strong: true },
                        { text: "accountable security measures that respect the rule of law", strong: true },
                        { text: "letting the police do their jobs normally", strong: false, feedback: "Vague and dismissive. Your proposal needs to sound like a robust, well-designed alternative, not a passive suggestion to maintain the status quo." }
                    ]
                }
            ]
        }
    },
    {
        id: 'trolley-problem-self-driving-cars',
        title: "The Trolley Problem in Self-Driving Cars",
        premise: "Self-driving cars must be programmed with decision-making rules for unavoidable accident scenarios. You are arguing that these vehicles should be programmed to minimize total harm based on transparent, publicly reviewed ethical guidelines.",
        setting: "the National Transportation Safety Board",
        claimOptions: [
            { id: 'c1', text: "Self-driving cars should always protect their passengers first, no matter what happens to people outside the vehicle.", correct: false, feedback: "This turns the car into a weapon that values one life over many based on who purchased the product. No ethics board would endorse a policy that treats bystanders as expendable." },
            { id: 'c2', text: "Self-driving vehicles must follow a publicly reviewed ethical framework that minimizes total harm in unavoidable accidents, with full transparency about how decisions are made.", correct: true, feedback: "Strong claim. It proposes a clear principle (minimize total harm), a process (public review), and a safeguard (transparency). This is specific and defensible." },
            { id: 'c3', text: "Humans should always have the final say, so self-driving cars should hand control back to the driver in emergencies.", correct: false, feedback: "This defeats the purpose. Emergencies happen in milliseconds, far faster than human reaction time. Handing control to a panicked, unprepared driver would increase harm, not reduce it." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Human drivers cause over 38,000 deaths per year in the United States alone. Even imperfect algorithmic decision-making has the potential to dramatically reduce total traffic fatalities.", type: 'strong' },
            { id: 'e2', text: "Transparent ethical guidelines allow citizens, ethicists, and lawmakers to review and improve the decision-making rules before deployment, unlike the split-second panic reactions of human drivers that follow no rules at all.", type: 'strong' },
            { id: 'e3', text: "Germany's Ethics Commission on Automated Driving has already established a working framework that prohibits discrimination by age, gender, or any personal characteristic in crash algorithms, providing a proven model to build upon.", type: 'strong' },
            { id: 'e4', text: "In a major university study, participants overwhelmingly said they would prefer to buy a self-driving car that protects passengers first, which means the market demands passenger-priority programming.", type: 'weak', feedback: "Logical Fallacy (Appeal to Popularity / Is-Ought Fallacy). What consumers want to buy is a question of market preference, not ethics. People might prefer a car that protects them selfishly, but that does not make it morally right. Ethics boards set standards precisely because market incentives can be misaligned with public good." },
            { id: 'e5', text: "Since doctors in emergency rooms must make life-and-death triage decisions every day, programming a car to do the same thing is no different and should not be controversial.", type: 'weak', feedback: "Logical Fallacy (False Equivalence). Doctors exercise professional judgment with contextual information about each patient. An algorithm applies pre-set rules without the ability to assess individual circumstances in the same way. The comparison oversimplifies a fundamentally different decision-making process." },
            { id: 'e6', text: "Self-driving car companies have invested over $80 billion in this technology, and if we do not resolve the ethics question soon, all of that investment and the jobs it supports could be lost.", type: 'weak', feedback: "Logical Fallacy (Appeal to Consequences / Sunk Cost). The amount of money invested in a technology has no bearing on what ethical rules it should follow. Framing an ethics decision as an economic rescue mission pressures the board to rush rather than deliberate carefully." }
        ],
        counterArgument: {
            text: "Attorney Marcus Rivera argues: 'You are asking us to program a machine to choose who lives and who dies. No algorithm should have that power. If a crash is unavoidable, the car should simply brake and let fate decide, rather than making calculated sacrifices.'",
            rebuttals: [
                { id: 'r1', text: "Doing nothing is itself a choice. A car that only brakes in a straight line will still strike whatever is directly in its path. The question is not whether the car makes a decision, but whether that decision is random or guided by a principle that minimizes suffering.", correct: true, feedback: "Brilliant. You exposed the hidden assumption in his argument: that inaction is neutral. By showing that 'letting fate decide' is still a programmed choice with consequences, you reframed the entire debate." },
                { id: 'r2', text: "Algorithms already decide who gets organ transplants, who gets parole, and who gets loans. This is no different.", correct: false, feedback: "Logical Fallacy (False Equivalence). Those algorithms operate in slower, reviewable contexts with appeals processes. A split-second crash decision with lethal consequences is a fundamentally different situation that demands its own ethical analysis." },
                { id: 'r3', text: "If you are so worried about machines making decisions, you should also ban autopilot on airplanes and automated surgery robots.", correct: false, feedback: "Logical Fallacy (Reductio ad Absurdum / Whataboutism). Deflecting to other technologies does not address the specific ethical concern about crash scenarios. Each technology presents its own unique ethical challenges." }
            ]
        },
        pushback: {
            text: "Board Member Elaine Torres raises a concern: 'Even if we agree on a minimize-harm framework, who decides how harm is calculated? Is one child's life worth more than three elderly passengers? You are opening a Pandora's box of impossible valuations.'",
            rebuttals: [
                { id: 'p1', text: "We can use statistical life-years remaining to calculate the value of each person. It is the most objective measure available.", correct: false, feedback: "Deeply problematic. Assigning different values to lives based on age is exactly the kind of discrimination that Germany's framework explicitly prohibits. This would make your policy legally and ethically indefensible." },
                { id: 'p2', text: "The framework explicitly must not assign different values to individual lives. Instead, it operates on a simpler principle: minimize the total number of people harmed, without discriminating based on any personal characteristic. This avoids the impossible valuation problem entirely.", correct: true, feedback: "Excellent. You directly neutralized the Pandora's box concern by showing your framework has a built-in safeguard against discrimination. The principle of equal value per life is both ethically sound and practically implementable." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Safety Board, self-driving technology will save tens of thousands of lives. But to earn the public's trust, these vehicles must operate under ethical rules that we have chosen together, not rules hidden inside corporate code.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe why transparent rules matter',
                    options: [
                        { text: "democratic accountability over life-and-death decisions", strong: true },
                        { text: "public trust built on openness rather than corporate secrecy", strong: true },
                        { text: "making sure the companies do not get sued too much", strong: false, feedback: "Reducing an ethical framework to a liability shield trivializes the moral weight of the issue. The board is deliberating about human lives, not corporate legal strategy." },
                        { text: "rules that everyone can look at if they want to", strong: false, feedback: "Too casual and passive. Transparency in life-and-death algorithms demands forceful, precise language about accountability and democratic oversight." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the goal of the ethical framework',
                    options: [
                        { text: "a society where technology serves human values, not the other way around", strong: true },
                        { text: "the fewest possible lives lost on our roads, guided by principles we can all stand behind", strong: true },
                        { text: "getting self-driving cars on the road as fast as possible", strong: false, feedback: "Speed of deployment is an industry goal, not an ethical principle. The board wants to hear about safety and values, not market timelines." }
                    ]
                }
            ]
        }
    }
];
