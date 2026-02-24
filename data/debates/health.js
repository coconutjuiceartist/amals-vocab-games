export const healthDebates = [
    {
        id: 'sugar-tax-on-beverages',
        title: "Sugar Tax on Beverages",
        premise: "Childhood obesity rates have doubled in the last two decades. You are arguing before a public health board that the government should impose a tax on sugary drinks to help reverse this trend.",
        setting: "the National Public Health Board",
        claimOptions: [
            { id: 'c1', text: "Sugary drinks are unhealthy and children should stop drinking them.", correct: false, feedback: "This is a statement of opinion, not an actionable policy proposal. A strong claim needs a specific government action." },
            { id: 'c2', text: "The government must impose a graduated tax on beverages exceeding 5 grams of added sugar per serving, with revenue directed toward childhood nutrition programs.", correct: true, feedback: "Excellent! A specific, actionable policy with a clear mechanism and purpose." },
            { id: 'c3', text: "All sugary drinks should be completely banned from stores nationwide.", correct: false, feedback: "Too extreme. An outright ban is nearly impossible to enforce and will alienate the board before you even begin." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Mexico's 2014 sugar tax led to a 12% reduction in sugary drink purchases within its first year, with the largest drops among low-income households most affected by obesity.", type: 'strong' },
            { id: 'e2', text: "The American Heart Association reports that sugary beverages are the single largest source of added sugar in children's diets, contributing an average of 143 extra calories per day.", type: 'strong' },
            { id: 'e3', text: "Berkeley, California's penny-per-ounce soda tax resulted in a 21% decrease in sugary drink consumption in low-income neighborhoods over four years.", type: 'strong' },
            { id: 'e4', text: "Since cigarette taxes successfully reduced smoking rates over several decades, a sugar tax will naturally produce the same dramatic health improvements for obesity.", type: 'weak', feedback: "Logical Fallacy (False Equivalence). Cigarettes and sugary drinks have fundamentally different addiction mechanisms, usage patterns, and health effects. Success in one area does not guarantee identical results in another." },
            { id: 'e5', text: "A recent online poll found that 72% of parents support taxing sugary drinks, demonstrating that the public is ready for this policy change.", type: 'weak', feedback: "Logical Fallacy (Appeal to Popularity / Misleading Statistics). An online poll has significant self-selection bias and does not represent the broader population. Public opinion polls are not evidence that a policy will be effective." },
            { id: 'e6', text: "Countries with higher sugar consumption consistently rank lower on global happiness indexes, suggesting that reducing sugar intake would improve overall national well-being.", type: 'weak', feedback: "Logical Fallacy (Correlation vs. Causation). Many factors affect both sugar consumption and happiness rankings, including poverty and healthcare access. You cannot conclude that sugar causes unhappiness from this correlation." }
        ],
        counterArgument: {
            text: "Beverage industry representative Diana Torres argues: 'This tax unfairly punishes low-income families who rely on affordable drinks. It is a regressive tax that hurts the people you claim to protect!'",
            rebuttals: [
                { id: 'r1', text: "That is precisely why the tax revenue must be reinvested directly into free nutrition programs and subsidized healthy beverages in underserved communities, turning a regressive tax into a progressive health investment.", correct: true, feedback: "Strong rebuttal. You acknowledged the valid concern about equity and offered a concrete solution that redirects revenue to help those most affected." },
                { id: 'r2', text: "The beverage industry only cares about profits, so your concern for low-income families is clearly fake.", correct: false, feedback: "Logical Fallacy (Ad Hominem). Attacking the representative's motives does not address the legitimate economic concern about regressive taxation." },
                { id: 'r3', text: "Low-income families will just switch to water, which is free, so the tax will not cost them anything.", correct: false, feedback: "Oversimplification. Access to clean drinking water varies significantly, and ignoring the real economic impact on families weakens your credibility." }
            ]
        },
        pushback: {
            text: "Board Member Dr. Patel raises a concern: 'Even if we pass this tax, companies will simply reformulate drinks with artificial sweeteners, which may carry their own health risks. Are we just trading one problem for another?'",
            rebuttals: [
                { id: 'p1', text: "Artificial sweeteners are perfectly safe according to the FDA, so that concern is irrelevant.", correct: false, feedback: "Too dismissive. Ongoing scientific debate about artificial sweeteners makes this an oversimplification that ignores a legitimate concern." },
                { id: 'p2', text: "That is a fair point, which is why the tax should be paired with clear labeling requirements and ongoing health monitoring. Reformulation toward lower sugar content is actually a win, and we can address artificial sweetener concerns through separate regulatory review.", correct: true, feedback: "Excellent. You validated the concern, offered an additional policy layer, and reframed reformulation as a positive outcome rather than a loophole." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Board, our children are facing a health crisis fueled by what they drink every single day.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the current problem',
                    options: [
                        { text: "preventable epidemic of childhood obesity", strong: true },
                        { text: "rising tide of diet-related disease among young people", strong: true },
                        { text: "kids drinking too much soda", strong: false, feedback: "Too casual for a formal public health board. Use precise, authoritative language that conveys the seriousness of the issue." },
                        { text: "bad eating habits everywhere", strong: false, feedback: "Vague and unfocused. Your speech should specifically address sugary beverages, not eating habits in general." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the goal of the tax',
                    options: [
                        { text: "evidence-based intervention that protects our most vulnerable citizens", strong: true },
                        { text: "proven strategy to reduce consumption and fund healthier alternatives", strong: true },
                        { text: "way to punish companies that sell junk", strong: false, feedback: "Framing the tax as punishment sounds vindictive rather than constructive. Policy arguments should focus on positive outcomes, not retribution." }
                    ]
                }
            ]
        }
    },
    {
        id: 'contact-sports-safety-youth',
        title: "Contact Sports Safety for Youth",
        premise: "New research has linked repeated head impacts in youth sports to long-term brain injuries. You are arguing that tackle football should be banned for children under 14 to protect developing brains.",
        setting: "the National Youth Athletics Commission",
        claimOptions: [
            { id: 'c1', text: "Football is dangerous and kids get hurt playing it.", correct: false, feedback: "This is a general observation, not a specific policy proposal. A strong claim must state exactly what action should be taken." },
            { id: 'c2', text: "The Commission must ban tackle football for children under 14 and mandate flag football as the standard youth format until high school.", correct: true, feedback: "Clear, specific, and actionable. It names the age threshold and offers an alternative." },
            { id: 'c3', text: "All contact sports, including soccer, basketball, and hockey, should be banned for anyone under 18.", correct: false, feedback: "Wildly overbroad. Lumping all sports together will lose the commission's support immediately and is not supported by the evidence." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Boston University's CTE Center found that athletes who began tackle football before age 12 showed cognitive and behavioral problems an average of 13 years earlier than those who started later.", type: 'strong' },
            { id: 'e2', text: "Children's skulls and neck muscles are not fully developed until the mid-teens, making their brains significantly more vulnerable to rotational forces during tackles.", type: 'strong' },
            { id: 'e3', text: "USA Football's Rookie Tackle pilot program found that switching to flag football for under-14 players reduced head impacts by 76% while maintaining comparable athletic skill development.", type: 'strong' },
            { id: 'e4', text: "Since professional NFL players who played tackle football as children have higher rates of depression, banning youth tackle football will eliminate the mental health crisis among future athletes.", type: 'weak', feedback: "Logical Fallacy (Hasty Generalization / Overstated Conclusion). While the correlation is concerning, claiming that one policy change will 'eliminate' a complex mental health crisis is a dramatic overreach that weakens your credibility." },
            { id: 'e5', text: "Several prominent retired NFL quarterbacks have publicly stated they would not let their own children play tackle football before high school, showing that even insiders recognize the danger.", type: 'weak', feedback: "Logical Fallacy (Appeal to Authority). Personal parenting choices of famous athletes, no matter how well-known, are not scientific evidence. Their individual opinions do not constitute data about youth brain safety." },
            { id: 'e6', text: "Youth tackle football participation has declined by 20% over the past decade, indicating that parents are already voting with their feet and the commission should follow their lead.", type: 'weak', feedback: "Logical Fallacy (Appeal to Popularity / Bandwagon). A trend in participation does not constitute evidence for a policy mandate. Parents may be leaving for many reasons, including cost or scheduling, not just safety." }
        ],
        counterArgument: {
            text: "Coach Marcus Williams protests: 'Tackle football teaches discipline, teamwork, and toughness. If kids don't learn proper tackling technique early, they will be MORE likely to get injured when they start in high school with no experience!'",
            rebuttals: [
                { id: 'r1', text: "Flag football develops the same teamwork and discipline, while proper tackling technique can be introduced at 14 when the brain and body are more developed to handle it safely, just as we teach driving at 16, not 10.", correct: true, feedback: "Excellent. You preserved the values the coach cares about while using a clear analogy to justify the age threshold." },
                { id: 'r2', text: "You only care about winning games, not about children's safety.", correct: false, feedback: "Logical Fallacy (Ad Hominem). Attacking the coach's character ignores his legitimate point about technique development and alienates a key stakeholder." },
                { id: 'r3', text: "Kids are tough and resilient. A few bumps and bruises never hurt anyone.", correct: false, feedback: "Dangerously dismissive. This contradicts your own position and ignores the neurological evidence about brain injuries in developing children." }
            ]
        },
        pushback: {
            text: "Commissioner Angela Rhodes interjects: 'Many rural and low-income communities depend on youth football programs for scholarships and opportunities. Banning tackle football could cut off a vital pathway out of poverty for these kids.'",
            rebuttals: [
                { id: 'p1', text: "Scholarships should not come at the cost of brain damage. If the sport is dangerous, it does not matter what opportunities it provides.", correct: false, feedback: "Too absolute. Dismissing the economic reality of underserved communities without offering an alternative makes you appear out of touch." },
                { id: 'p2', text: "That is an important concern. The ban should be paired with expanded funding for flag football leagues and scholarship pathways in underserved areas, ensuring that no community loses access to opportunity while we protect children's health.", correct: true, feedback: "Strong response. You acknowledged the socioeconomic reality and proposed a concrete support system to accompany the policy change." }
            ]
        },
        speechTemplate: {
            intro: "Commissioners, we have a responsibility to protect the developing minds of every young athlete who steps onto the field.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe what the evidence shows',
                    options: [
                        { text: "mounting scientific evidence of irreversible brain damage", strong: true },
                        { text: "clear neurological risks that no helmet can fully prevent", strong: true },
                        { text: "some studies about head injuries", strong: false, feedback: "Weak and noncommittal. Saying 'some studies' undermines the strength of a growing body of research. Be definitive." },
                        { text: "scary brain problems from football", strong: false, feedback: "Too informal for a formal commission hearing. Use medical and scientific language to establish authority." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the proposed solution',
                    options: [
                        { text: "age-appropriate transition from flag to tackle football", strong: true },
                        { text: "developmentally responsible approach to youth athletics", strong: true },
                        { text: "getting rid of the dangerous parts of football", strong: false, feedback: "Vague and imprecise. Your proposal needs to sound structured and well-planned, not like a casual simplification." }
                    ]
                }
            ]
        }
    },
    {
        id: 'mental-health-days-from-school',
        title: "Mental Health Days from School",
        premise: "Student anxiety and depression rates are at record highs. You are arguing that students should be allowed to take mental health days as excused absences, just like sick days for physical illness.",
        setting: "the School Wellness Committee",
        claimOptions: [
            { id: 'c1', text: "Students are stressed and need more breaks from school.", correct: false, feedback: "Too vague. This does not propose a specific policy and sounds more like a complaint than a policy argument." },
            { id: 'c2', text: "The district must formally recognize mental health days as excused absences, with a limit of three per semester, and connect students who use them to school counseling resources.", correct: true, feedback: "Specific, balanced, and includes a support mechanism. This is a well-structured policy claim." },
            { id: 'c3', text: "Students should be able to stay home whenever they feel like it without any questions asked.", correct: false, feedback: "No structure or accountability. This would be impossible for the committee to support and invites abuse of the system." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "The American Academy of Pediatrics reports that one in three adolescents now meets criteria for an anxiety disorder, yet most schools only recognize physical illness as a valid reason for absence.", type: 'strong' },
            { id: 'e2', text: "Oregon's 2019 mental health day law led to a 15% increase in students voluntarily seeking school counseling services, suggesting the policy reduces stigma around asking for help.", type: 'strong' },
            { id: 'e3', text: "Research from the Journal of School Psychology shows that students who attend school while experiencing acute anxiety retain 40% less information than their peers, meaning forced attendance during mental health crises is academically counterproductive.", type: 'strong' },
            { id: 'e4', text: "Since physical sick days are already excused without a doctor's note in most districts, it would be logically inconsistent and therefore discriminatory not to extend the same courtesy to mental health.", type: 'weak', feedback: "Logical Fallacy (False Equivalence). Physical illness and mental health have different verification challenges and treatment pathways. Logical consistency alone does not make two policies equivalent in practice." },
            { id: 'e5', text: "Teen suicide rates have risen 60% over the past two decades, and without mental health days, schools are essentially forcing vulnerable students into environments that could push them over the edge.", type: 'weak', feedback: "Logical Fallacy (Slippery Slope / Appeal to Fear). While suicide statistics are real, claiming that attending school without mental health days could directly cause suicide is an extreme leap that exploits fear rather than building a reasoned argument." },
            { id: 'e6', text: "A viral social media campaign with over two million shares demanded that schools recognize mental health days, proving there is overwhelming grassroots support for this policy.", type: 'weak', feedback: "Logical Fallacy (Appeal to Popularity / Bandwagon). Social media engagement does not equal informed policy support. Viral campaigns are driven by algorithms and emotion, not by careful analysis of educational policy." }
        ],
        counterArgument: {
            text: "Vice Principal Hartley objects: 'If we allow mental health days, students will abuse the system to skip tests and avoid homework. We will see attendance plummet and academic performance collapse.'",
            rebuttals: [
                { id: 'r1', text: "That is exactly why the policy includes a three-per-semester cap and a required check-in with a school counselor. The structure prevents abuse while still giving students a lifeline when they genuinely need it.", correct: true, feedback: "Strong. You directly addressed the concern with the built-in safeguards of your own proposal." },
                { id: 'r2', text: "If students are skipping school to avoid tests, that itself is a sign of a mental health problem that we should be addressing, not punishing.", correct: false, feedback: "While partially insightful, this does not address the practical concern about attendance and academic performance. The committee needs structural reassurance, not a philosophical reframe." },
                { id: 'r3', text: "Students already skip school anyway, so at least this way we would know about it.", correct: false, feedback: "This concedes that the policy might increase absences and frames it as merely tracking a problem rather than solving one. It undermines your own argument." }
            ]
        },
        pushback: {
            text: "Parent representative Mrs. Chen worries: 'How are parents supposed to verify a mental health day? With a physical illness, you can see symptoms. This puts parents in an impossible position of judging their child's invisible pain.'",
            rebuttals: [
                { id: 'p1', text: "Parents should just trust their children. If a kid says they need a day off, that should be enough.", correct: false, feedback: "Too simplistic. It ignores the real difficulty parents face and offers no framework for making these decisions." },
                { id: 'p2', text: "You raise a valid concern. The policy should include a simple parent guide developed with school counselors, outlining warning signs and conversation starters, so families feel equipped rather than put on the spot.", correct: true, feedback: "Excellent. You validated the parent's worry and proposed a practical support tool that strengthens the policy rather than dismissing the concern." }
            ]
        },
        speechTemplate: {
            intro: "Committee members, we would never ask a student with a broken arm to run laps, yet every day we expect students in emotional crisis to sit through seven periods and perform.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the gap in current policy',
                    options: [
                        { text: "dangerous blind spot in our attendance policies", strong: true },
                        { text: "failure to treat mental health with the same seriousness as physical health", strong: true },
                        { text: "unfair rules about absences", strong: false, feedback: "Too vague and informal. The committee needs to hear precisely what gap exists in current policy, not a general complaint about fairness." },
                        { text: "problem that makes students sad", strong: false, feedback: "Oversimplified and patronizing. Mental health encompasses far more than sadness, and this language lacks the gravity the topic demands." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe what the policy achieves',
                    options: [
                        { text: "structured safety net that catches students before they fall", strong: true },
                        { text: "compassionate policy backed by clear accountability measures", strong: true },
                        { text: "way to let kids take days off when they need to", strong: false, feedback: "Restating the basic idea without emphasizing structure or accountability makes the policy sound unserious. Highlight the safeguards." }
                    ]
                }
            ]
        }
    },
    {
        id: 'mandatory-nutrition-education',
        title: "Mandatory Nutrition Education",
        premise: "Diet-related diseases are now the leading cause of preventable death. You are arguing that cooking and nutrition should be a required subject in all schools, not just an elective.",
        setting: "the National Education Standards Board",
        claimOptions: [
            { id: 'c1', text: "Kids don't know how to cook and that is a problem.", correct: false, feedback: "This is an observation, not a policy claim. A strong argument needs to state exactly what the board should mandate and why." },
            { id: 'c2', text: "The Board must add cooking and nutrition as a core required subject from grades 5 through 10, teaching students practical meal preparation and evidence-based dietary science.", correct: true, feedback: "Specific grade range, clear content scope, and actionable mandate. This is a strong policy claim." },
            { id: 'c3', text: "Schools should replace physical education with nutrition classes since learning about food is more important than exercise.", correct: false, feedback: "Replacing one health subject with another creates unnecessary opposition and ignores that both are important. Do not sacrifice allies to make your case." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "A ten-year study published in the Journal of Nutrition Education found that students who completed a semester-long cooking course were 35% more likely to prepare home-cooked meals as adults, significantly reducing their consumption of processed food.", type: 'strong' },
            { id: 'e2', text: "The CDC reports that diet-related conditions, including Type 2 diabetes, heart disease, and certain cancers, cost the U.S. healthcare system over 170 billion dollars annually, costs that early education could help reduce.", type: 'strong' },
            { id: 'e3', text: "Finland and Japan, which require nutrition education in their national curricula, consistently rank among the lowest in childhood obesity rates among developed nations.", type: 'strong' },
            { id: 'e4', text: "Since home economics was removed from most American schools in the 1990s, obesity rates have steadily climbed, demonstrating that cutting nutrition education directly caused the obesity epidemic.", type: 'weak', feedback: "Logical Fallacy (Post Hoc Ergo Propter Hoc / False Cause). Many factors contributed to rising obesity rates during this period, including changes in food production, marketing, and lifestyle. The timing correlation does not prove that removing one class caused a national epidemic." },
            { id: 'e5', text: "Celebrity chef Jamie Oliver's 'Food Revolution' campaign successfully improved school lunch menus in several districts, proving that nutrition education works when backed by passionate advocates.", type: 'weak', feedback: "Logical Fallacy (Anecdotal Evidence / Appeal to Authority). A celebrity-driven campaign changing lunch menus is not the same as evidence that a mandatory curriculum improves student health outcomes. One person's initiative does not substitute for systemic research." },
            { id: 'e6', text: "A survey of 500 teenagers found that 85% could not identify basic vegetables like kale and rutabaga, revealing a shocking knowledge gap that only mandatory education can fix.", type: 'weak', feedback: "Logical Fallacy (Misleading Statistics / Cherry-Picked Data). Not recognizing uncommon vegetables like rutabaga does not indicate a meaningful nutritional knowledge gap. The survey appears designed to produce alarming results rather than measure genuine dietary literacy." }
        ],
        counterArgument: {
            text: "Board Member Dr. Franklin objects: 'The curriculum is already stretched to the breaking point with math, science, reading, and test preparation. Adding another required subject means something else gets cut. Where does it fit?'",
            rebuttals: [
                { id: 'r1', text: "Nutrition education can be integrated into existing science classes through units on biology, chemistry, and human health, requiring no additional class periods while enriching the current curriculum with practical applications.", correct: true, feedback: "Excellent. You solved the scheduling problem by embedding the content within existing subjects rather than demanding new slots." },
                { id: 'r2', text: "Test preparation takes up too much time anyway. We should cut standardized test prep to make room.", correct: false, feedback: "Attacking test preparation antagonizes a board that oversees educational standards. Propose solutions that work within the system, not against it." },
                { id: 'r3', text: "Health is more important than any other subject, so the board should prioritize it above everything else.", correct: false, feedback: "Logical Fallacy (False Dilemma). Framing it as health versus everything else forces an unnecessary choice and ignores creative solutions for integration." }
            ]
        },
        pushback: {
            text: "Superintendent Garcia raises a concern: 'Many of our schools, especially in underfunded districts, lack kitchen facilities and trained staff. This mandate could widen the gap between wealthy and poor schools.'",
            rebuttals: [
                { id: 'p1', text: "Schools without kitchens can just focus on the theory portion and skip the cooking component.", correct: false, feedback: "This creates a two-tier system where wealthier schools get hands-on learning and poorer schools get lectures, which is exactly the inequality the superintendent warned about." },
                { id: 'p2', text: "That is a critical concern. The mandate should include a federal equipment grant program and partnerships with local community kitchens, so that every school, regardless of funding, can offer hands-on instruction from day one.", correct: true, feedback: "Strong. You acknowledged the equity issue directly and proposed a funding mechanism that prevents the policy from deepening existing inequalities." }
            ]
        },
        speechTemplate: {
            intro: "Board members, we teach our students to solve equations and analyze literature, yet we send them into adulthood unable to nourish their own bodies.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe what students currently lack',
                    options: [
                        { text: "fundamental life skill of feeding themselves well", strong: true },
                        { text: "scientific understanding of how food affects their bodies", strong: true },
                        { text: "cooking skills their grandparents had", strong: false, feedback: "Appealing to nostalgia weakens a forward-looking policy argument. The board wants evidence-based reasoning, not sentimentality about the past." },
                        { text: "knowledge about healthy eating and stuff", strong: false, feedback: "Vague and informal. A presentation to a standards board requires precise, professional language that conveys expertise." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the long-term benefit',
                    options: [
                        { text: "generation equipped to make informed choices about their health", strong: true },
                        { text: "measurable reduction in preventable diet-related disease", strong: true },
                        { text: "kids who eat better food at home", strong: false, feedback: "Too narrow and informal. The board needs to see systemic, long-term impact, not a simple lifestyle change described in casual language." }
                    ]
                }
            ]
        }
    }
];
