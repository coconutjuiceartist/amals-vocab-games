export const technologyDebates = [
    {
        id: 'social-media-age-limits',
        title: "Social Media Age Limits",
        premise: "A growing body of research links early social media use to anxiety and cyberbullying. You are arguing that platforms should enforce a minimum age of 16 for all social media accounts.",
        setting: "the National Digital Safety Committee",
        claimOptions: [
            { id: 'c1', text: "Social media is bad for children and should be banned entirely.", correct: false, feedback: "Too extreme. A total ban is unenforceable and ignores the educational benefits of digital platforms." },
            { id: 'c2', text: "Social media platforms must implement verified age-gating systems and restrict full account access to users aged 16 and older.", correct: true, feedback: "Strong policy claim. It is specific, actionable, and targets enforcement rather than making a vague moral statement." },
            { id: 'c3', text: "Children under 16 are exposed to harmful content online.", correct: false, feedback: "This is a factual observation, not a debatable policy proposal. A claim must argue for a specific action." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "A longitudinal study by the American Psychological Association found that adolescents who begin using social media before age 16 are 30% more likely to report symptoms of anxiety and depression.", type: 'strong' },
            { id: 'e2', text: "Countries like France and Australia that have introduced age-verification requirements have seen a measurable decrease in reported cyberbullying incidents among minors.", type: 'strong' },
            { id: 'e3', text: "Neuroscience research confirms that the prefrontal cortex, which governs impulse control and risk assessment, is not sufficiently developed in children under 16 to navigate manipulative algorithmic feeds.", type: 'strong' },
            { id: 'e4', text: "A recent poll showed that 74% of parents support raising the social media age limit to 16, indicating that society is clearly ready for this policy change.", type: 'weak', feedback: "Logical Fallacy (Appeal to Popularity). The number of parents who support a policy does not prove that the policy is effective or well-designed. Popular opinion is not evidence of good governance." },
            { id: 'e5', text: "Since childhood obesity rates have also risen alongside social media usage over the past decade, restricting social media access would likely improve children's physical health as well.", type: 'weak', feedback: "Logical Fallacy (Correlation Does Not Imply Causation). Two trends occurring simultaneously does not mean one caused the other. Obesity has many independent causes unrelated to social media." },
            { id: 'e6', text: "Several prominent tech executives, including former engineers at major platforms, do not allow their own children to use social media, proving that even insiders know these products are harmful to young people.", type: 'weak', feedback: "Logical Fallacy (Appeal to Authority / Anecdotal Evidence). The personal parenting choices of a few executives do not constitute scientific evidence. Their reasons may be private and unrelated to public policy." }
        ],
        counterArgument: {
            text: "A tech industry representative argues: 'Age restrictions will simply push children toward unregulated platforms and encrypted messaging apps where there is zero moderation. You will make the problem worse, not better.'",
            rebuttals: [
                { id: 'r1', text: "That is precisely why the policy must include mandatory interoperability standards, requiring all platforms operating in our jurisdiction to implement age verification. Combined with digital literacy education, we reduce both the supply and the demand.", correct: true, feedback: "Excellent. You acknowledged the concern and closed the loophole with a comprehensive policy response." },
                { id: 'r2', text: "The tech industry only cares about profits, so of course you would say that.", correct: false, feedback: "Logical Fallacy (Ad Hominem). Attacking the representative's motives does not address the legitimate concern about platform migration." },
                { id: 'r3', text: "Children will always find ways around rules, so we just have to do our best and hope it works.", correct: false, feedback: "This concedes the opponent's point entirely. A strong debater offers solutions to enforcement challenges, not resignation." }
            ]
        },
        pushback: {
            text: "A committee member raises a concern: 'What about young people who rely on social media for community, especially those in rural areas or marginalized groups who have no other outlet? Are we not isolating them further?'",
            rebuttals: [
                { id: 'p1', text: "Those are edge cases and we cannot design national policy around exceptions.", correct: false, feedback: "Dismissive. Vulnerable populations are not edge cases, and ignoring them weakens your credibility before the committee." },
                { id: 'p2', text: "That is a vital concern. The policy should include supervised access provisions and exemptions for verified educational and community platforms, ensuring vulnerable young people retain safe digital spaces while still being protected from exploitative algorithms.", correct: true, feedback: "Strong pivot. You validated the concern, offered a concrete accommodation, and maintained your core argument." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Digital Safety Committee, our children are navigating a digital world that was never designed with their wellbeing in mind.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the core problem',
                    options: [
                        { text: "algorithmic manipulation targeting developing minds", strong: true },
                        { text: "unchecked exposure to addictive platform design", strong: true },
                        { text: "scary things kids see on their phones", strong: false, feedback: "Too vague and informal for a policy committee. Use precise language that identifies the specific mechanism of harm." },
                        { text: "problems that social media causes", strong: false, feedback: "Extremely vague. A compelling speech needs to name the specific dangers, not gesture broadly at undefined problems." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the proposed solution',
                    options: [
                        { text: "enforceable age-verification standards", strong: true },
                        { text: "evidence-based digital protection framework", strong: true },
                        { text: "banning kids from the internet", strong: false, feedback: "This misrepresents your own policy. You are arguing for age limits on social media, not a total internet ban. Precision matters in a closing statement." }
                    ]
                }
            ]
        }
    },
    {
        id: 'internet-access-human-right',
        title: "Internet Access as a Human Right",
        premise: "Billions of people remain disconnected from the internet, limiting their access to education, healthcare, and economic opportunity. You are arguing that internet access should be declared a fundamental human right.",
        setting: "a United Nations Human Rights Panel",
        claimOptions: [
            { id: 'c1', text: "The internet is really useful and everyone should have it.", correct: false, feedback: "This is a casual opinion, not a formal policy claim. A UN resolution requires precise, actionable language." },
            { id: 'c2', text: "The United Nations must formally recognize internet access as a fundamental human right and establish a global framework requiring member nations to provide affordable connectivity to all citizens.", correct: true, feedback: "Precise and actionable. It names the governing body, the right, and the obligation." },
            { id: 'c3', text: "Governments that deny internet access to their citizens should face immediate economic sanctions.", correct: false, feedback: "Too aggressive for an initial resolution. Starting with punitive measures before establishing the right itself puts the cart before the horse." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "The United Nations already recognizes that freedom of expression extends to digital spaces, creating a strong legal foundation for classifying internet access itself as a prerequisite right.", type: 'strong' },
            { id: 'e2', text: "During the global pandemic, students without internet access fell an average of 1.5 grade levels behind their connected peers, demonstrating that connectivity is now essential to the right to education.", type: 'strong' },
            { id: 'e3', text: "Telemedicine programs in sub-Saharan Africa have reduced maternal mortality by 22% in connected regions, proving that internet access directly supports the existing right to health.", type: 'strong' },
            { id: 'e4', text: "Estonia declared internet access a legal right in 2000, and the country now has one of the strongest economies in Eastern Europe, proving that internet access directly causes economic prosperity.", type: 'weak', feedback: "Logical Fallacy (Post Hoc Ergo Propter Hoc). Estonia's economic growth is the result of many coordinated reforms, not solely internet policy. Attributing national prosperity to a single factor is a causal oversimplification." },
            { id: 'e5', text: "Since clean water, food, and shelter are already recognized as human rights, and the internet is equally important in the modern world, it logically follows that it must also be a human right.", type: 'weak', feedback: "Logical Fallacy (False Equivalence). Internet access, while important, serves a fundamentally different survival function than water, food, and shelter. You need to argue its importance on its own terms, not equate it with biological necessities." },
            { id: 'e6', text: "Over 4.5 billion people worldwide now use the internet daily, which demonstrates that global society has already accepted it as an essential service and the UN is simply behind the times.", type: 'weak', feedback: "Logical Fallacy (Appeal to Common Practice / Bandwagon). Widespread usage does not establish a legal or moral right. Many widely used services are not classified as human rights. The argument must rest on the nature of the right, not its popularity." }
        ],
        counterArgument: {
            text: "Ambassador Chen objects: 'Declaring internet access a human right places an impossible financial burden on developing nations. You are essentially mandating that the poorest countries build expensive infrastructure they cannot afford, while wealthy nations face no new obligations.'",
            rebuttals: [
                { id: 'r1', text: "The framework must include a tiered implementation plan with international funding mechanisms. Wealthier nations would contribute to a global connectivity fund, and developing nations would receive technical assistance and subsidized infrastructure, just as we already do with vaccination programs.", correct: true, feedback: "Strong rebuttal. You directly addressed the funding concern with a concrete, precedented mechanism." },
                { id: 'r2', text: "Developing nations already waste money on military spending, so they can afford to redirect those funds to internet infrastructure instead.", correct: false, feedback: "Logical Fallacy (Red Herring). Military budgets are a separate policy debate. This deflection does not address the legitimate infrastructure cost concern." },
                { id: 'r3', text: "If developing nations cannot afford it, then private tech companies should be forced to provide free internet everywhere.", correct: false, feedback: "This shifts the burden without addressing feasibility. Forcing private companies raises its own legal and economic complications that you have not accounted for." }
            ]
        },
        pushback: {
            text: "A panel member raises a concern: 'In some nations, the government controls the internet and uses it for surveillance and propaganda. By making internet access a right, are we not legitimizing state-controlled digital environments?'",
            rebuttals: [
                { id: 'p1', text: "That is a problem with those governments, not with the internet itself. We cannot let authoritarian regimes dictate global policy.", correct: false, feedback: "While partially true, this dismisses the concern without offering a safeguard. The panel needs to hear how your proposal addresses the risk." },
                { id: 'p2', text: "That is exactly why the resolution must pair the right to access with robust protections for digital privacy and freedom of expression. Access without freedom is not a right; it is a tool of control. The framework must include independent oversight provisions.", correct: true, feedback: "Excellent. You transformed the objection into a strengthening amendment for your proposal, showing the resolution addresses both access and freedom." }
            ]
        },
        speechTemplate: {
            intro: "Distinguished delegates, in a world where opportunity increasingly flows through digital channels, billions remain locked out.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe what the disconnected lose',
                    options: [
                        { text: "access to education, healthcare, and economic participation", strong: true },
                        { text: "the ability to exercise their existing human rights in a digital age", strong: true },
                        { text: "the chance to watch videos and use apps", strong: false, feedback: "Trivializing language that reduces a human rights argument to entertainment. Focus on fundamental needs like education and healthcare." },
                        { text: "things that people in rich countries take for granted", strong: false, feedback: "Vague and emotionally manipulative without being specific. A UN resolution requires precise identification of the rights at stake." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the vision for the future',
                    options: [
                        { text: "universal and equitable digital participation", strong: true },
                        { text: "a connected world where no one is left behind by geography or poverty", strong: true },
                        { text: "giving everyone free Wi-Fi", strong: false, feedback: "Oversimplifies a complex infrastructure challenge into a slogan. A closing statement should articulate a principle, not a product." }
                    ]
                }
            ]
        }
    },
    {
        id: 'self-driving-cars-public-roads',
        title: "Self-Driving Cars on Public Roads",
        premise: "Autonomous vehicle technology has advanced rapidly, but fatal accidents during testing have raised public alarm. You are arguing that fully self-driving cars should be permitted on public roads under a regulated framework.",
        setting: "the National Transportation Safety Committee",
        claimOptions: [
            { id: 'c1', text: "Self-driving cars are the future and there is no point resisting progress.", correct: false, feedback: "This is an appeal to inevitability, not a policy argument. A committee needs to hear why and how to regulate, not that resistance is futile." },
            { id: 'c2', text: "The Department of Transportation must establish a phased regulatory framework that allows certified autonomous vehicles on public roads, with mandatory safety benchmarks and real-time incident reporting.", correct: true, feedback: "Excellent. Specific, measured, and actionable with clear accountability mechanisms." },
            { id: 'c3', text: "Human drivers cause more accidents than machines, so we should ban human driving entirely.", correct: false, feedback: "Wildly disproportionate. Banning human driving is politically and practically impossible, and alienates the entire committee." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Human error accounts for 94% of all serious traffic accidents according to the National Highway Traffic Safety Administration, and autonomous systems eliminate the most common causes: distraction, fatigue, and impairment.", type: 'strong' },
            { id: 'e2', text: "Waymo's autonomous fleet has now driven over 20 million miles on public roads with a collision rate significantly lower than the national average for human drivers in comparable conditions.", type: 'strong' },
            { id: 'e3', text: "A phased rollout, beginning with highway driving and controlled urban zones, allows regulators to gather real-world safety data before expanding to complex environments like school zones and rural roads.", type: 'strong' },
            { id: 'e4', text: "Since airplane autopilot systems have been trusted for decades and have made flying the safest form of travel, it follows that vehicle autopilot will similarly make road travel the safest form of ground transportation.", type: 'weak', feedback: "Logical Fallacy (False Analogy). Air travel occurs in controlled, obstacle-free corridors with professional operators, while road driving involves unpredictable pedestrians, cyclists, weather, and countless variables. The comparison obscures critical differences." },
            { id: 'e5', text: "Major automakers including Tesla, GM, and Mercedes have invested over $80 billion in autonomous driving technology, which shows that the industry itself has determined this technology is safe enough for public roads.", type: 'weak', feedback: "Logical Fallacy (Appeal to Authority / Conflation of Investment with Safety). Corporate investment reflects profit potential, not safety certification. Companies invest heavily in products that later fail safety reviews. Financial commitment does not equal safety evidence." },
            { id: 'e6', text: "Surveys show that younger generations are far more comfortable with autonomous vehicles than older generations, suggesting that resistance to self-driving cars is simply a generational attitude that will naturally fade.", type: 'weak', feedback: "Logical Fallacy (Appeal to Novelty / Dismissal by Demographics). Comfort levels do not determine safety. Dismissing safety concerns as generational bias ignores legitimate technical and ethical questions that apply regardless of age." }
        ],
        counterArgument: {
            text: "Councilwoman Reeves argues: 'When a self-driving car kills someone, who goes to prison? The software engineer? The CEO? Nobody? Until we solve the liability question, these vehicles have no business on our roads.'",
            rebuttals: [
                { id: 'r1', text: "That is a critical question, and the regulatory framework must address it directly. The proposal includes a tiered liability model: manufacturers bear responsibility for software failures, operators bear responsibility for maintenance neglect, and a federal compensation fund covers edge cases, similar to how vaccine injury courts function.", correct: true, feedback: "Outstanding. You treated the liability question as solvable rather than disqualifying, and provided a concrete, precedented model." },
                { id: 'r2', text: "Nobody goes to prison when a human driver kills someone in an accident either, so this is a double standard.", correct: false, feedback: "Factually inaccurate. Human drivers absolutely face criminal charges for vehicular manslaughter. This response damages your credibility." },
                { id: 'r3', text: "The technology companies should handle liability privately through their own insurance policies. The government does not need to get involved.", correct: false, feedback: "This removes public accountability from a public safety issue. A committee will not accept self-regulation as a substitute for legal frameworks." }
            ]
        },
        pushback: {
            text: "A committee member presses: 'What about the millions of truck drivers, taxi drivers, and delivery workers who will lose their jobs? Your policy will devastate working families across the country.'",
            rebuttals: [
                { id: 'p1', text: "Technology always displaces jobs, but new ones always emerge. That is simply how progress works.", correct: false, feedback: "Too dismissive. Telling displaced workers that progress is inevitable does not address their immediate economic reality." },
                { id: 'p2', text: "The framework must include a transition fund financed by autonomous vehicle licensing fees, providing retraining programs and income support for displaced workers. We can phase deployment to give industries time to adapt, rather than allowing an overnight disruption.", correct: true, feedback: "Strong policy response. You acknowledged the human cost and embedded worker protections directly into the regulatory framework." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Transportation Safety Committee, every year over 40,000 people die on American roads, the vast majority due to preventable human error.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the opportunity',
                    options: [
                        { text: "a proven technology that eliminates the leading causes of fatal crashes", strong: true },
                        { text: "a regulated path toward dramatically safer public roads", strong: true },
                        { text: "really cool robot cars that drive themselves", strong: false, feedback: "Informal and trivializing language. A safety committee expects you to frame autonomous vehicles as a public health solution, not a novelty." },
                        { text: "something that will eventually happen anyway", strong: false, feedback: "Appeals to inevitability rather than merit. The committee wants to hear why this policy is good, not that it is unstoppable." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the regulatory approach',
                    options: [
                        { text: "careful, phased deployment with continuous safety oversight", strong: true },
                        { text: "transparent accountability standards that protect the public", strong: true },
                        { text: "letting the car companies figure it out", strong: false, feedback: "This undermines your entire argument for a regulatory framework. The committee's role is public oversight, not corporate deference." }
                    ]
                }
            ]
        }
    },
    {
        id: 'right-to-repair-electronics',
        title: "Right to Repair Electronics",
        premise: "Major electronics companies design products that are nearly impossible to repair independently, forcing consumers to pay for expensive manufacturer services or replace devices entirely. You are arguing that companies must be legally required to allow customers to repair their own devices.",
        setting: "the Consumer Protection Board",
        claimOptions: [
            { id: 'c1', text: "Companies should be required by law to provide repair manuals, diagnostic tools, and replacement parts to consumers and independent repair shops at fair market prices.", correct: true, feedback: "Clear, specific, and enforceable. It defines exactly what companies must provide and to whom." },
            { id: 'c2', text: "Companies that make unrepairable products are greedy and should be punished.", correct: false, feedback: "This is an emotional accusation, not a policy proposal. A legal board needs to hear specific regulatory requirements." },
            { id: 'c3', text: "People should just learn to fix their own things like they used to.", correct: false, feedback: "This ignores the structural problem. The issue is not consumer skill; it is that companies actively prevent repair through design choices and part restrictions." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "The average American household spends over $1,400 per year replacing electronics that could have been repaired for a fraction of the cost, according to the Consumer Financial Protection Bureau.", type: 'strong' },
            { id: 'e2', text: "Electronic waste is the fastest-growing waste stream globally, with 50 million tons generated annually. Repairable design would significantly extend device lifespans and reduce environmental damage.", type: 'strong' },
            { id: 'e3', text: "Independent repair shops create local jobs and serve low-income communities who cannot afford manufacturer service centers. Right-to-repair legislation would strengthen small businesses and reduce economic inequality in tech access.", type: 'strong' },
            { id: 'e4', text: "The automotive industry has operated under right-to-repair laws for decades and remains highly profitable, which proves that electronics companies will also remain profitable under similar legislation.", type: 'weak', feedback: "Logical Fallacy (False Equivalence). The automotive and electronics industries have fundamentally different profit structures, product cycles, and intellectual property concerns. Success in one industry does not guarantee the same outcome in another." },
            { id: 'e5', text: "A viral social media campaign called #FixItMovement gained over 2 million followers in just three months, demonstrating overwhelming public demand for right-to-repair legislation.", type: 'weak', feedback: "Logical Fallacy (Appeal to Popularity / Bandwagon). Social media followership does not constitute a mandate for legislation. Viral trends reflect engagement, not informed policy support." },
            { id: 'e6', text: "Since manufacturers already repair devices at their own service centers using the same parts and tools they deny to consumers, their refusal to share these resources is purely anti-competitive and therefore clearly illegal under existing antitrust law.", type: 'weak', feedback: "Logical Fallacy (Begging the Question / Hasty Legal Conclusion). Whether restricting repair access violates antitrust law is the very question under debate. Declaring it 'clearly illegal' assumes the conclusion you are trying to prove, and existing courts have not consistently ruled this way." }
        ],
        counterArgument: {
            text: "A manufacturer's representative argues: 'Opening our devices to untrained consumers creates serious safety risks. Lithium batteries can explode, waterproof seals can be compromised, and improperly reassembled devices can cause electrical fires. We restrict repair access to protect our customers.'",
            rebuttals: [
                { id: 'r1', text: "Safety is best addressed through clear repair guidelines and certified training programs, not through blanket restrictions that force consumers to discard repairable devices. The legislation should require manufacturers to provide safety documentation alongside repair tools, just as power tool companies include safety manuals.", correct: true, feedback: "Excellent. You reframed safety as a solvable documentation problem rather than accepting it as a reason to block repair entirely." },
                { id: 'r2', text: "People repair far more dangerous things at home all the time, like plumbing and electrical wiring. A phone battery is nothing compared to rewiring a house.", correct: false, feedback: "Logical Fallacy (False Equivalence). Home electrical and plumbing work actually does require permits and licensed professionals in most jurisdictions. This comparison undermines rather than supports your position." },
                { id: 'r3', text: "You only claim it is about safety because you want to keep charging people $300 for a $20 repair.", correct: false, feedback: "Logical Fallacy (Ad Hominem / Attacking Motive). Even if profit motives exist, the safety concern is real and must be addressed on its own terms." }
            ]
        },
        pushback: {
            text: "A board member questions: 'What about intellectual property? If companies are forced to share schematics and diagnostic tools, competitors can reverse-engineer their proprietary designs. Are we not undermining innovation?'",
            rebuttals: [
                { id: 'p1', text: "Innovation that depends on trapping consumers is not worth protecting.", correct: false, feedback: "Too aggressive. Intellectual property is a legitimate legal concern, and dismissing it alienates board members who must balance consumer and corporate interests." },
                { id: 'p2', text: "The legislation can include intellectual property safeguards. Repair manuals can be provided under restricted-use licenses, diagnostic tools can be purpose-limited, and trade secrets unrelated to basic repair can remain protected. We are asking for repair access, not full design disclosure.", correct: true, feedback: "Precise and reassuring. You drew a clear boundary between repair access and full IP disclosure, addressing the concern without conceding your position." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Consumer Protection Board, the device in your pocket was designed to be replaced, not repaired, and consumers are paying the price.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the harm to consumers',
                    options: [
                        { text: "deliberate design barriers that force unnecessary spending", strong: true },
                        { text: "a manufactured dependency on costly manufacturer services", strong: true },
                        { text: "companies being mean to their customers", strong: false, feedback: "Informal and emotional. A consumer protection board expects precise language about market practices and consumer harm." },
                        { text: "phones that break too easily", strong: false, feedback: "This misidentifies the problem. The issue is not fragility but the inability to repair. Precision in framing is essential." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe what the legislation achieves',
                    options: [
                        { text: "consumer autonomy and a competitive repair marketplace", strong: true },
                        { text: "reduced waste and genuine accountability from manufacturers", strong: true },
                        { text: "making companies share all their secrets", strong: false, feedback: "This misrepresents the legislation and plays directly into the opposition's intellectual property fears. You are advocating for repair access, not full disclosure." }
                    ]
                }
            ]
        }
    }
];
