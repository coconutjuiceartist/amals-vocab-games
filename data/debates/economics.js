export const economicsDebates = [
    {
        id: 'universal-basic-income',
        title: "Universal Basic Income",
        premise: "Poverty and automation are threatening millions of jobs. You are arguing that every citizen should receive a guaranteed monthly income from the government to ensure basic needs are met.",
        setting: "the National Economic Policy Council",
        claimOptions: [
            { id: 'c1', text: "Poverty is a serious problem that affects many families.", correct: false, feedback: "This is a statement of fact, not a debatable policy proposal. You need to argue for a specific solution." },
            { id: 'c2', text: "The government must implement a universal basic income of $1,000 per month for every adult citizen to eliminate extreme poverty and cushion the impact of automation.", correct: true, feedback: "Strong and specific. A clear policy claim with measurable details that can be debated." },
            { id: 'c3', text: "We should abolish all taxes and let people keep every penny they earn.", correct: false, feedback: "This contradicts funding a basic income and is an entirely different economic philosophy." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "A two-year UBI pilot in Stockton, California showed that recipients were more likely to find full-time employment, with the employment rate rising from 28% to 40%.", type: 'strong' },
            { id: 'e2', text: "Automation is projected to displace 85 million jobs globally by 2030 according to the World Economic Forum, and current retraining programs reach fewer than 10% of affected workers.", type: 'strong' },
            { id: 'e3', text: "Emergency room visits and mental health crises decline significantly in communities with guaranteed income programs, reducing public healthcare costs by an estimated 15-20%.", type: 'strong' },
            { id: 'e4', text: "Finland's basic income experiment showed that participants reported feeling happier and less stressed, demonstrating that UBI improves overall quality of life for everyone.", type: 'weak', feedback: "Logical Fallacy (Hasty Generalization). A small trial with 2,000 unemployed participants in one Nordic country cannot be generalized to prove UBI works 'for everyone' in all economic contexts." },
            { id: 'e5', text: "Since Alaska has distributed oil dividends to residents since 1982 and remains a functioning state, a nationwide UBI would clearly work at the federal level.", type: 'weak', feedback: "Logical Fallacy (False Equivalence). Alaska's dividend averages $1,600 per year funded by oil revenue, which is vastly different from a $12,000 annual UBI funded by general taxation across an entire nation." },
            { id: 'e6', text: "Throughout history, every society that failed to care for its poorest citizens eventually collapsed, so implementing UBI is necessary to prevent civilizational decline.", type: 'weak', feedback: "Logical Fallacy (Slippery Slope / False Cause). Civilizations collapse for complex reasons. Claiming that the absence of one specific policy leads to societal collapse is an enormous logical leap." }
        ],
        counterArgument: {
            text: "Economist Dr. Hargrove objects: 'A universal basic income will destroy the incentive to work. If people receive money for doing nothing, productivity will plummet and the economy will shrink.'",
            rebuttals: [
                { id: 'r1', text: "Multiple pilot programs show the opposite: when basic needs are secured, people pursue education, start small businesses, and take productive risks they previously couldn't afford.", correct: true, feedback: "Excellent. You directly countered the assumption with real-world evidence showing that security enables productivity rather than discouraging it." },
                { id: 'r2', text: "You just want poor people to suffer because it benefits the wealthy.", correct: false, feedback: "Logical Fallacy (Ad Hominem). Attacking the economist's motives does not address the legitimate concern about work incentives." },
                { id: 'r3', text: "People already don't want to work, so it doesn't matter either way.", correct: false, feedback: "This actually concedes the opponent's point and insults working citizens. It undermines your entire argument." }
            ]
        },
        pushback: {
            text: "Council Treasurer Ms. Okoro raises her hand: 'The annual cost would exceed $3 trillion. Where exactly does this money come from without crippling the national debt?'",
            rebuttals: [
                { id: 'p1', text: "Money is just a social construct anyway, the government can print as much as it needs.", correct: false, feedback: "Dangerously oversimplified. Unlimited money printing causes hyperinflation and would destroy the very income you're proposing." },
                { id: 'p2', text: "UBI would replace many existing welfare programs, recovering roughly $700 billion. The remainder can be funded through a combination of a modest value-added tax and savings from reduced emergency services and incarceration costs.", correct: true, feedback: "Strong practical answer. You acknowledged the cost concern and presented a multi-pronged funding strategy with specific numbers." }
            ]
        },
        speechTemplate: {
            intro: "Distinguished members of the Council, we are witnessing a historic transformation in how economies create and distribute wealth.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the economic challenge',
                    options: [
                        { text: "accelerating automation and widening inequality", strong: true },
                        { text: "structural shifts that leave millions without stable income", strong: true },
                        { text: "robots taking all the jobs", strong: false, feedback: "Oversimplified and informal. A policy council expects precise economic language, not casual generalizations." },
                        { text: "problems with money and stuff", strong: false, feedback: "Extremely vague. A persuasive opening must name the specific challenge to establish credibility." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe what UBI provides',
                    options: [
                        { text: "a reliable foundation for economic security and opportunity", strong: true },
                        { text: "a proven mechanism to reduce poverty while empowering citizens", strong: true },
                        { text: "free money for everyone", strong: false, feedback: "This framing plays directly into opponents' criticisms. Describing UBI as 'free money' undermines the serious policy case you are building." }
                    ]
                }
            ]
        }
    },
    {
        id: 'child-labor-supply-chains',
        title: "Child Labor in Global Supply Chains",
        premise: "Reports reveal that millions of children work in dangerous conditions to produce goods sold internationally. You are arguing that countries should ban imports from nations that permit child labor.",
        setting: "the International Trade and Human Rights Committee",
        claimOptions: [
            { id: 'c1', text: "Child labor is wrong and should not exist anywhere in the world.", correct: false, feedback: "While morally true, this is a statement of values, not a specific trade policy proposal that the committee can vote on." },
            { id: 'c2', text: "Nations must impose import bans on goods produced using child labor, enforced through mandatory supply chain audits and trade penalties.", correct: true, feedback: "Excellent. A specific, enforceable policy with clear mechanisms for implementation." },
            { id: 'c3', text: "We should immediately cut off all trade with any developing nation until they modernize completely.", correct: false, feedback: "Far too extreme. Cutting off all trade would devastate innocent populations and is not targeted at the actual problem." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "The International Labour Organization estimates 160 million children are in child labor globally, with 79 million in hazardous work that directly harms their health and development.", type: 'strong' },
            { id: 'e2', text: "Countries that adopted the Harkin Bill trade restrictions saw a 30% increase in school enrollment within five years, as families redirected children toward education when labor demand dropped.", type: 'strong' },
            { id: 'e3', text: "Companies that implemented verified child-labor-free supply chains, such as Patagonia and IKEA, maintained profitability while improving brand trust and consumer loyalty.", type: 'strong' },
            { id: 'e4', text: "A recent consumer poll found that 89% of shoppers in wealthy nations say they would pay more for child-labor-free products, proving that import bans would have broad public support.", type: 'weak', feedback: "Logical Fallacy (Appeal to Popularity / Intention-Action Gap). What people say in surveys rarely matches purchasing behavior. Stated willingness to pay more is not evidence that bans would succeed economically." },
            { id: 'e5', text: "Since the abolition of slavery required strong trade restrictions in the 19th century, the same approach will naturally work to end child labor in the 21st century.", type: 'weak', feedback: "Logical Fallacy (False Analogy). Slavery abolition involved fundamentally different legal, economic, and political conditions. Child labor in developing economies has distinct root causes like poverty and lack of schools that require different solutions." },
            { id: 'e6', text: "Bangladesh removed children from garment factories after Western pressure, and those children then went to school, showing that trade pressure always leads to positive outcomes for children.", type: 'weak', feedback: "Logical Fallacy (Cherry-Picked Evidence / Incomplete Picture). Studies actually showed many displaced child workers in Bangladesh moved to more dangerous, unregulated industries like brick-breaking. Presenting only the positive outcome is misleading." }
        ],
        counterArgument: {
            text: "Ambassador Osei argues: 'These bans are economic imperialism. In many developing nations, a child's income is the only thing keeping a family from starvation. You would punish the very children you claim to protect.'",
            rebuttals: [
                { id: 'r1', text: "That is precisely why the ban must be paired with transition funds: a percentage of trade revenue redirected to build schools and provide family income support in affected communities.", correct: true, feedback: "Powerful. You acknowledged the legitimate concern and proposed a concrete support mechanism that addresses the root cause." },
                { id: 'r2', text: "If those countries managed their economies better, their children wouldn't need to work in the first place.", correct: false, feedback: "Logical Fallacy (Oversimplification / Victim Blaming). This ignores centuries of colonial exploitation and structural global inequality that created these conditions." },
                { id: 'r3', text: "Children in wealthy countries work part-time jobs too, so this is not exclusively a developing world problem.", correct: false, feedback: "Logical Fallacy (False Equivalence). A teenager's weekend job at a bookshop is fundamentally different from a seven-year-old mining cobalt. This deflection weakens your argument." }
            ]
        },
        pushback: {
            text: "Trade Analyst Mr. Chen warns: 'Import bans will raise consumer prices dramatically and could trigger trade wars that hurt our own economies. Is the committee prepared for those consequences?'",
            rebuttals: [
                { id: 'p1', text: "If people can't afford slightly higher prices, that is their problem. Human rights are more important than cheap goods.", correct: false, feedback: "Too dismissive. Ignoring economic impacts on ordinary families makes your proposal seem impractical and elitist." },
                { id: 'p2', text: "The bans can be implemented in phases, starting with the most hazardous industries, and paired with tariff adjustments that spread costs gradually. This gives markets time to adapt while sending an immediate signal.", correct: true, feedback: "Excellent pragmatism. A phased approach addresses the economic concern while maintaining the moral urgency of the policy." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Committee, the products on our shelves carry a hidden cost that no price tag can capture.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe what is happening to children',
                    options: [
                        { text: "the exploitation of millions of children in hazardous industries", strong: true },
                        { text: "a systematic denial of childhood, education, and safety", strong: true },
                        { text: "kids working in bad places overseas", strong: false, feedback: "Informal and vague. Before an international committee, you must use precise language that conveys the severity of the crisis." },
                        { text: "sad situations that make people upset", strong: false, feedback: "Emotional vagueness weakens your credibility. Name the specific injustice rather than describing a general feeling." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe what trade policy should achieve',
                    options: [
                        { text: "accountable supply chains that protect vulnerable workers", strong: true },
                        { text: "enforceable standards that make exploitation economically unviable", strong: true },
                        { text: "rules so companies stop being greedy", strong: false, feedback: "Oversimplified and accusatory. Effective policy language focuses on systemic solutions, not moral blame directed at an entire sector." }
                    ]
                }
            ]
        }
    },
    {
        id: 'fair-trade-certification',
        title: "Fair Trade Certification",
        premise: "Small-scale farmers in developing countries often receive a fraction of the retail price for their goods. You are arguing that fair trade certification should be mandatory for all imported agricultural products.",
        setting: "the International Trade Standards Board",
        claimOptions: [
            { id: 'c1', text: "Farmers in developing countries deserve better pay.", correct: false, feedback: "A moral sentiment, not a policy claim. The board needs a specific, actionable proposal to debate." },
            { id: 'c2', text: "All imported agricultural goods must carry mandatory fair trade certification, guaranteeing minimum prices for producers and verified ethical labor standards.", correct: true, feedback: "Clear, specific, and enforceable. This gives the board a concrete policy to evaluate." },
            { id: 'c3', text: "We should stop importing food entirely and only eat locally grown produce.", correct: false, feedback: "Economically impractical and would devastate the very farmers you are trying to help by eliminating their export markets." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Fair trade coffee cooperatives in Colombia report 25% higher household incomes and significantly greater investment in children's education compared to non-certified farms.", type: 'strong' },
            { id: 'e2', text: "Without price floors, global commodity price crashes regularly push small farmers into debt cycles, with cocoa farmers earning as little as $0.50 per day despite chocolate being a $130 billion industry.", type: 'strong' },
            { id: 'e3', text: "Certified fair trade supply chains require environmental standards that have reduced pesticide use by 40% in participating regions, creating measurable public health benefits.", type: 'strong' },
            { id: 'e4', text: "Fair trade chocolate sales grew by 12% last year while conventional chocolate sales remained flat, indicating that the market is already moving in this direction and mandatory certification simply accelerates the inevitable.", type: 'weak', feedback: "Logical Fallacy (Appeal to the Bandwagon / Hasty Generalization). One year of sales growth in one product category does not prove a universal market trend. Mandatory policy requires stronger evidence than a single sales figure." },
            { id: 'e5', text: "Since European nations with higher fair trade adoption also rank highest on the Human Development Index, fair trade clearly contributes to national well-being.", type: 'weak', feedback: "Logical Fallacy (Correlation vs. Causation). Wealthy nations buy more fair trade products because they can afford to, not necessarily because fair trade makes nations more developed. The causation likely runs in the opposite direction." },
            { id: 'e6', text: "Major corporations like Nestlé and Starbucks have launched their own ethical sourcing programs, demonstrating that the private sector already recognizes the value of fair practices without government mandates.", type: 'weak', feedback: "Logical Fallacy (Red Herring). This actually argues against your position. If corporations are already self-regulating, opponents could use this to claim mandatory certification is unnecessary." }
        ],
        counterArgument: {
            text: "Trade Representative Ms. Wallace objects: 'Mandatory certification would create enormous bureaucratic costs. Small farmers who cannot afford the certification process would be locked out of export markets entirely.'",
            rebuttals: [
                { id: 'r1', text: "The certification cost can be borne by importers, not producers. A fund financed by a small levy on imports would subsidize certification for smallholder cooperatives, ensuring no farmer is excluded.", correct: true, feedback: "Excellent. You directly addressed the cost barrier with a specific funding mechanism that protects the farmers the policy is designed to help." },
                { id: 'r2', text: "If farmers cannot afford certification, they probably shouldn't be exporting in the first place.", correct: false, feedback: "This is elitist and directly contradicts your goal of helping small-scale farmers access fair markets." },
                { id: 'r3', text: "Bureaucracy is a small price to pay for justice, and anyone who complains about paperwork doesn't truly care about farmers.", correct: false, feedback: "Logical Fallacy (False Dilemma / Ad Hominem). You are dismissing a legitimate practical concern and attacking the motives of anyone who raises it." }
            ]
        },
        pushback: {
            text: "Board Member Mr. Tanaka cautions: 'Many producing nations view mandatory certification as a trade barrier in disguise, a way for wealthy nations to restrict imports under the cover of ethics. How do you respond to that accusation?'",
            rebuttals: [
                { id: 'p1', text: "If those nations actually treated their farmers fairly, they wouldn't have anything to worry about.", correct: false, feedback: "Dismissive and confrontational. This ignores the legitimate geopolitical concern and will alienate developing nations on the board." },
                { id: 'p2', text: "That concern is valid, which is why certification standards must be developed jointly with producing nations, not imposed unilaterally. A collaborative framework ensures the standards reflect local realities rather than serving as disguised protectionism.", correct: true, feedback: "Excellent diplomacy. You validated the concern and proposed inclusive governance that builds trust between trading partners." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Board, every cup of coffee and bar of chocolate we enjoy is the product of someone's labor, yet the people who grow these goods rarely share in the profits.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the current problem for farmers',
                    options: [
                        { text: "exploitative pricing that traps producers in cycles of poverty", strong: true },
                        { text: "a global trading system that systematically undervalues agricultural labor", strong: true },
                        { text: "companies not paying enough money", strong: false, feedback: "Too vague and informal for a trade standards board. Specify the structural problem rather than making a generic complaint." },
                        { text: "unfair things happening in other countries", strong: false, feedback: "Lacks specificity and sounds detached. Name the economic mechanisms causing harm to demonstrate expertise." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe what mandatory certification achieves',
                    options: [
                        { text: "transparent, enforceable standards that guarantee producer livelihoods", strong: true },
                        { text: "a structural floor beneath commodity prices that prevents exploitation", strong: true },
                        { text: "making sure everyone plays nice", strong: false, feedback: "Childish phrasing that undermines your authority. Policy language must be precise and professional to persuade a standards board." }
                    ]
                }
            ]
        }
    },
    {
        id: 'four-day-work-week',
        title: "The Four-Day Work Week",
        premise: "Studies show that overwork reduces productivity and harms employee well-being. You are arguing that companies should be required by law to offer a four-day work week with no reduction in pay.",
        setting: "the National Labor Policy Council",
        claimOptions: [
            { id: 'c1', text: "People are tired and overworked and deserve more rest.", correct: false, feedback: "A sympathetic observation, but not a specific policy claim. The council needs a proposal with clear terms to debate." },
            { id: 'c2', text: "The government must mandate a 32-hour, four-day work week at current full-time pay for all companies with more than 20 employees, phased in over three years.", correct: true, feedback: "Specific, measurable, and includes a realistic implementation timeline. A strong policy claim." },
            { id: 'c3', text: "Nobody should have to work at all if they don't feel like it.", correct: false, feedback: "This is not a serious policy proposal and would immediately lose credibility before a labor council." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Microsoft Japan's 2019 trial of a four-day week saw productivity increase by 40%, while electricity costs dropped by 23% and paper printing fell by 59%.", type: 'strong' },
            { id: 'e2', text: "Iceland's nationwide trial from 2015 to 2019, covering over 2,500 workers across diverse sectors, found that productivity remained the same or improved, and 86% of workers transitioned to shorter hours.", type: 'strong' },
            { id: 'e3', text: "Chronic overwork is linked to a 35% higher risk of stroke and 17% higher risk of heart disease according to the World Health Organization, creating preventable public health costs exceeding $300 billion annually.", type: 'strong' },
            { id: 'e4', text: "A survey of office workers found that 94% support a four-day work week, which shows that the workforce is ready for this transition and companies should listen to their employees.", type: 'weak', feedback: "Logical Fallacy (Appeal to Popularity). Employees naturally prefer fewer hours. Their preference, while understandable, is not economic evidence that the policy is viable for businesses and the broader economy." },
            { id: 'e5', text: "Since France mandated a 35-hour work week in 2000 and still has the world's seventh-largest economy, reducing hours clearly does not harm economic output.", type: 'weak', feedback: "Logical Fallacy (Post Hoc / Oversimplification). France's economic position depends on countless factors. The 35-hour law also faced significant criticism and required numerous exemptions, making it a more complex case than presented." },
            { id: 'e6', text: "Companies that care about their employees already offer flexible schedules voluntarily, so mandating a four-day week simply brings reluctant employers in line with what the best companies are already doing.", type: 'weak', feedback: "Logical Fallacy (Begging the Question). This assumes that voluntary flexibility is equivalent to a mandated four-day week, and that companies resisting the mandate are simply inferior. The argument is circular." }
        ],
        counterArgument: {
            text: "Business Council Chair Mr. Dawson responds: 'Small businesses operate on razor-thin margins. Paying the same wages for fewer hours will force layoffs or drive companies into bankruptcy. This mandate would destroy the very jobs it claims to improve.'",
            rebuttals: [
                { id: 'r1', text: "The evidence consistently shows that compressed schedules increase hourly productivity, meaning businesses produce the same output in fewer hours. Paired with a phased rollout and tax incentives for small businesses during transition, the policy protects both workers and employers.", correct: true, feedback: "Strong. You cited evidence, addressed the small business concern directly, and offered a concrete support mechanism." },
                { id: 'r2', text: "If a business cannot survive paying fair hours, it deserves to fail.", correct: false, feedback: "Callous and economically reckless. Dismissing small business concerns alienates a major constituency and ignores real-world consequences for workers who lose jobs." },
                { id: 'r3', text: "Big corporations make billions in profit, so they can easily absorb the cost, and small businesses will figure it out eventually.", correct: false, feedback: "Logical Fallacy (Hasty Generalization / Dismissal). Lumping all businesses together ignores the vast differences between a tech giant and a family restaurant. 'Figure it out' is not a policy solution." }
            ]
        },
        pushback: {
            text: "Council Member Dr. Patel interjects: 'What about essential services like hospitals, emergency responders, and factories with continuous operations? You cannot simply shut down a hospital ward one day per week.'",
            rebuttals: [
                { id: 'p1', text: "Those workers chose demanding careers, so they should accept longer hours as part of the job.", correct: false, feedback: "Dismissive and unfair. Essential workers already face burnout and deserve the same protections. This response undermines your entire argument about worker well-being." },
                { id: 'p2', text: "Essential services would operate on rotating schedules rather than a fixed day off, ensuring continuous coverage while still guaranteeing each worker a 32-hour week. This is already how shift-based industries manage holidays and leave.", correct: true, feedback: "Practical and well-reasoned. You showed that the policy is adaptable to different industries using systems that already exist." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Council, for decades we have measured economic success by hours worked rather than value created, and our workforce is paying the price.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the cost of overwork',
                    options: [
                        { text: "rising burnout, declining productivity, and preventable health crises", strong: true },
                        { text: "a workforce stretched beyond sustainable limits", strong: true },
                        { text: "people being really tired all the time", strong: false, feedback: "Too casual for a policy council. Tiredness is a symptom; name the systemic costs like productivity loss and health expenditures." },
                        { text: "bad vibes in the workplace", strong: false, feedback: "Slang has no place in formal policy advocacy. Use measurable terms that demonstrate the economic and human impact." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the benefit of the four-day week',
                    options: [
                        { text: "a sustainable model that boosts productivity while protecting health", strong: true },
                        { text: "an evidence-based reform that aligns working hours with actual output", strong: true },
                        { text: "more time to relax and hang out", strong: false, feedback: "This frames the policy as leisure rather than productivity reform. Opponents will use this to argue you are prioritizing comfort over economic responsibility." }
                    ]
                }
            ]
        }
    }
];
