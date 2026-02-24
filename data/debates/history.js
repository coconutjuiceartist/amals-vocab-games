export const historyDebates = [
    {
        id: 'library-of-alexandria',
        title: "Rebuilding the Library of Alexandria",
        premise: "The ancient Library of Alexandria was one of the greatest repositories of knowledge in human history, destroyed centuries ago. You are arguing before an international council that it should be rebuilt as a modern global knowledge center.",
        setting: "the UNESCO International Heritage Council",
        claimOptions: [
            { id: 'c1', text: "The Library of Alexandria was very important and its destruction was tragic.", correct: false, feedback: "This is a historical fact, not a debatable policy proposal. You need to argue for a specific action." },
            { id: 'c2', text: "The international community must fund and construct a new Library of Alexandria as a global open-access knowledge center, combining ancient preservation methods with modern digital technology.", correct: true, feedback: "Excellent! A clear, specific, and actionable policy claim that can be debated." },
            { id: 'c3', text: "Every country should be required to send all their original historical documents to the new library in Egypt.", correct: false, feedback: "Too extreme. Forcing nations to surrender their cultural artifacts would violate sovereignty and guarantee opposition." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Over 40% of academic research worldwide is locked behind expensive paywalls, preventing scholars in developing nations from accessing critical knowledge. A global open-access center would directly address this inequality.", type: 'strong' },
            { id: 'e2', text: "The original Library of Alexandria served as a model for international scholarly exchange for over 600 years, demonstrating that centralized knowledge institutions can endure and thrive across political changes when properly supported.", type: 'strong' },
            { id: 'e3', text: "Modern digital preservation technology can now store millions of texts in climate-controlled environments with redundant backup systems, meaning a rebuilt library would not face the same vulnerability to fire or war that destroyed the original.", type: 'strong' },
            { id: 'e4', text: "The Bibliotheca Alexandrina, a library already built in Alexandria in 2002, has attracted over 1.5 million visitors annually, proving that the world is ready for an even larger global knowledge center.", type: 'weak', feedback: "Logical Fallacy (Hasty Generalization). Tourism numbers at an existing library do not prove global readiness for a much larger, more expensive international institution. Visiting a library and funding a massive global project are very different things." },
            { id: 'e5', text: "Since ancient civilizations like Greece, Rome, and Persia all valued libraries, it is clear that preserving knowledge is a universal human instinct that transcends culture, so every nation will naturally support this project.", type: 'weak', feedback: "Logical Fallacy (Appeal to Tradition / Non Sequitur). Just because ancient civilizations valued libraries does not mean modern governments will agree to fund a specific international project. Cultural values do not automatically translate into political or financial commitment." },
            { id: 'e6', text: "If we do not rebuild the Library of Alexandria now, future generations will lose irreplaceable knowledge forever, just as humanity lost countless texts when the original burned.", type: 'weak', feedback: "Logical Fallacy (False Dilemma / Appeal to Fear). This implies that not building this specific library means knowledge will be lost, ignoring the many other institutions, digital archives, and universities already preserving knowledge worldwide." }
        ],
        counterArgument: {
            text: "Ambassador Chen objects: 'Why should we pour billions into a single building in one country when the internet already connects all the world's knowledge? This is a romantic fantasy, not practical policy.'",
            rebuttals: [
                { id: 'r1', text: "The internet is decentralized and fragile — websites disappear, servers crash, and digital formats become obsolete. A physical institution with dedicated archivists ensures long-term preservation that no algorithm can guarantee.", correct: true, feedback: "Strong rebuttal. You acknowledged the internet's value while exposing a genuine weakness, then offered the library as a complementary solution." },
                { id: 'r2', text: "The internet is full of misinformation, so it clearly cannot be trusted to preserve knowledge.", correct: false, feedback: "Logical Fallacy (Sweeping Generalization). Dismissing the entire internet as untrustworthy is extreme and undermines your credibility with a modern audience." },
                { id: 'r3', text: "Ambassador Chen clearly does not appreciate history or culture if she thinks the internet is a replacement for a library.", correct: false, feedback: "Logical Fallacy (Ad Hominem). Attacking the ambassador's character instead of addressing her argument about practicality will lose you support." }
            ]
        },
        pushback: {
            text: "Dr. Okafor, the council's budget director, raises a concern: 'We are already struggling to fund existing UNESCO World Heritage sites. Where exactly will the estimated $4 billion for this project come from?'",
            rebuttals: [
                { id: 'p1', text: "If we can spend trillions on military budgets worldwide, surely we can find a few billion for knowledge.", correct: false, feedback: "Too dismissive of the actual budget question. Comparing unrelated budgets does not answer where the specific funding will come from." },
                { id: 'p2', text: "The project can be funded through a tiered international partnership model, where nations contribute based on GDP, supplemented by private tech company sponsorships and a global digital access subscription that costs less than a dollar per user annually.", correct: true, feedback: "Excellent practical response. You provided a specific, realistic funding model that addresses the concern directly." }
            ]
        },
        speechTemplate: {
            intro: "Distinguished delegates, the destruction of the Library of Alexandria was not just Egypt's loss — it was humanity's loss.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the current problem with global knowledge access',
                    options: [
                        { text: "vast inequality in access to scholarly knowledge", strong: true },
                        { text: "fragmented and vulnerable state of our digital archives", strong: true },
                        { text: "sad feelings about the old library burning down", strong: false, feedback: "Emotional nostalgia is not a policy argument. Focus on the present-day problem you are solving, not ancient grief." },
                        { text: "stuff that is wrong with libraries today", strong: false, feedback: "Far too vague. A persuasive speech requires specific, concrete descriptions of the problem." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the vision for the rebuilt library',
                    options: [
                        { text: "beacon of open knowledge for every nation", strong: true },
                        { text: "permanent safeguard against the loss of human wisdom", strong: true },
                        { text: "really big and impressive building", strong: false, feedback: "Focusing on the building's size rather than its mission makes your argument shallow. Emphasize purpose over appearance." }
                    ]
                }
            ]
        }
    },
    {
        id: 'silk-road-trade',
        title: "The Silk Road Trade Agreement",
        premise: "It is the height of the ancient Silk Road era. You are arguing that civilizations along the route should establish open trade agreements rather than imposing heavy tariffs and closed borders.",
        setting: "the Grand Council of the Silk Road Nations",
        claimOptions: [
            { id: 'c1', text: "Trade is good for the economy.", correct: false, feedback: "Too vague. This is a general statement, not a specific policy proposal for the council to vote on." },
            { id: 'c2', text: "The Silk Road nations must ratify an open trade charter that eliminates excessive tariffs, establishes shared safety standards for caravans, and creates a neutral dispute resolution court.", correct: true, feedback: "Excellent! A multi-part, specific, and actionable policy claim." },
            { id: 'c3', text: "All nations should merge into a single empire to make trade easier.", correct: false, feedback: "Absurdly extreme. No independent nation would vote to dissolve itself for trade convenience." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Cities along open trade routes, such as Samarkand and Baghdad, grew to populations exceeding 500,000, while isolated cities of similar size stagnated, demonstrating that trade directly fuels urban growth and prosperity.", type: 'strong' },
            { id: 'e2', text: "The exchange of papermaking technology from China to the Islamic world and eventually to Europe transformed literacy rates across three continents, proving that open trade spreads not just goods but transformative knowledge.", type: 'strong' },
            { id: 'e3', text: "When the Parthian Empire imposed heavy tolls on Silk Road merchants in the 1st century, traders simply found alternative routes, costing Parthia both revenue and political influence over the region.", type: 'strong' },
            { id: 'e4', text: "The Roman Empire and Han Dynasty both prospered during periods of active Silk Road trade, so clearly open trade is the reason both empires became powerful.", type: 'weak', feedback: "Logical Fallacy (Post Hoc Ergo Propter Hoc / Correlation vs. Causation). Both empires had many factors contributing to their power — military strength, governance, agriculture. Attributing their success solely to trade oversimplifies history." },
            { id: 'e5', text: "A merchant named Khalid from Bukhara tripled his family's wealth after tariffs were reduced on his route, showing that free trade benefits everyone along the Silk Road.", type: 'weak', feedback: "Logical Fallacy (Anecdotal Evidence). One merchant's success story cannot prove that free trade benefits everyone. Entire populations include farmers, artisans, and laborers who may be affected very differently." },
            { id: 'e6', text: "Since the Silk Road has existed for centuries and trade has always flowed despite obstacles, it is inevitable that open trade will prevail, so we should simply formalize what nature intends.", type: 'weak', feedback: "Logical Fallacy (Appeal to Nature / Inevitability). Trade existing informally does not mean open trade agreements are 'natural' or 'inevitable.' Many trade routes have been shut down by wars and political decisions throughout history." }
        ],
        counterArgument: {
            text: "Governor Rustam of Persia protests: 'If we open our borders to cheap foreign goods, our own craftsmen will be ruined! Persian silk weavers cannot compete with Chinese prices. You are asking us to sacrifice our people's livelihoods!'",
            rebuttals: [
                { id: 'r1', text: "The open trade charter includes a provision for transitional support — nations can maintain modest protective tariffs on specific vulnerable industries for up to five years while retraining artisans in specialized luxury crafts that command premium prices.", correct: true, feedback: "Excellent. You directly addressed his concern by showing the policy already accounts for vulnerable workers, and you offered a concrete transition plan." },
                { id: 'r2', text: "If Persian weavers cannot compete, perhaps their silk is simply not good enough.", correct: false, feedback: "Insulting an entire nation's craftsmen will immediately turn the Persian delegation against you and damage your credibility." },
                { id: 'r3', text: "Every great empire has had to accept some losses for the greater good of progress.", correct: false, feedback: "Logical Fallacy (Appeal to Inevitability). Dismissing real human suffering as 'necessary losses' is both callous and unconvincing to a council worried about their citizens." }
            ]
        },
        pushback: {
            text: "Caravan Master Li Wei raises a practical concern: 'Open trade sounds wonderful in a council chamber, but who will protect merchants from bandits in the lawless stretches between our nations? Words on parchment do not stop swords.'",
            rebuttals: [
                { id: 'p1', text: "Merchants have always faced risks on the road. That is simply the cost of doing business.", correct: false, feedback: "Dismissing a legitimate safety concern makes you seem out of touch with the practical realities of trade." },
                { id: 'p2', text: "The charter proposes jointly funded garrison outposts every 200 miles along major routes, staffed by soldiers from each participating nation, creating shared responsibility for merchant safety and reducing costs for any single nation.", correct: true, feedback: "A concrete, detailed security plan that directly answers the concern. The shared-cost model also reinforces the cooperative spirit of the agreement." }
            ]
        },
        speechTemplate: {
            intro: "Honored delegates of the Silk Road nations, for generations our merchants have braved deserts and mountains to connect our civilizations.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe what tariffs and closed borders cause',
                    options: [
                        { text: "unnecessary barriers that stifle prosperity and breed mistrust", strong: true },
                        { text: "artificial divisions that weaken every nation standing alone", strong: true },
                        { text: "annoying rules that slow things down", strong: false, feedback: "Informal and dismissive language undermines the gravity of your argument before a council of national leaders." },
                        { text: "problems that hurt some people sometimes", strong: false, feedback: "Hopelessly vague. A strong speech requires specific language about who is harmed and how." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the future under open trade',
                    options: [
                        { text: "shared prosperity built on mutual respect and fair exchange", strong: true },
                        { text: "era of cooperation where every nation's strengths enrich the whole", strong: true },
                        { text: "time when everyone gets rich", strong: false, feedback: "Oversimplified and sounds naive. A credible vision must acknowledge complexity while inspiring confidence." }
                    ]
                }
            ]
        }
    },
    {
        id: 'space-race-priorities',
        title: "Space Race Priorities",
        premise: "It is 1962, at the height of the Cold War and the Space Race. You are arguing before a congressional committee that NASA's space funding should be maintained and expanded, rather than redirected to solve problems on Earth.",
        setting: "the United States Congressional Committee on Science and Aeronautics",
        claimOptions: [
            { id: 'c1', text: "Space is really exciting and inspirational for the American people.", correct: false, feedback: "This is an emotional appeal, not a concrete policy position. Congress needs a reason to allocate billions, not a pep talk." },
            { id: 'c2', text: "Congress must maintain and expand NASA's funding because the space program drives technological innovation, strengthens national security, and produces scientific discoveries that directly benefit life on Earth.", correct: true, feedback: "A strong three-pronged policy claim with clear reasoning." },
            { id: 'c3', text: "We should spend whatever it takes to beat the Soviets, no matter the cost.", correct: false, feedback: "A blank check with no limits is irresponsible policy. Congress must weigh costs against benefits." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "NASA research has already produced over 30 spin-off technologies used in everyday life, including improvements to water purification systems, fireproof materials for firefighters, and lightweight alloys now used in medical equipment.", type: 'strong' },
            { id: 'e2', text: "Satellite technology developed through the space program enables weather forecasting that protects farmers' crops and saves lives during hurricanes — a direct, Earth-based benefit of space investment.", type: 'strong' },
            { id: 'e3', text: "After the Soviet Union launched Sputnik, international polls showed a significant shift in global opinion toward viewing the USSR as the technological leader. Maintaining space leadership is critical to American credibility with allied nations during the Cold War.", type: 'strong' },
            { id: 'e4', text: "Throughout history, every great civilization that stopped exploring — from Ming Dynasty China to the late Roman Empire — eventually declined, proving that nations which abandon exploration are doomed to fall.", type: 'weak', feedback: "Logical Fallacy (False Cause / Oversimplification). These civilizations declined for complex reasons including corruption, invasion, and economic collapse — not simply because they stopped exploring. Drawing a direct causal line is historically inaccurate." },
            { id: 'e5', text: "A recent Gallup poll shows that 58% of Americans support increased space funding, demonstrating a clear public mandate for Congress to continue investing in NASA.", type: 'weak', feedback: "Logical Fallacy (Appeal to Popularity). Public opinion polls do not determine whether a policy is wise. Many popular policies have been poor decisions, and many unpopular ones have been necessary. Congress needs evidence of results, not poll numbers." },
            { id: 'e6', text: "If the United States does not land on the Moon before 1970, the Soviet Union will almost certainly establish a permanent military base there, giving them the ability to threaten American cities from space.", type: 'weak', feedback: "Logical Fallacy (Slippery Slope / Appeal to Fear). There is no evidence the Soviets plan a military Moon base, and the technology to threaten cities from the Moon does not exist. This exaggeration undermines your credibility with a knowledgeable committee." }
        ],
        counterArgument: {
            text: "Senator Harrison stands: 'While you talk about the Moon, 22% of American children live in poverty. One in three rural communities lacks a hospital. How can we justify rockets to space when Americans are suffering right here at home?'",
            rebuttals: [
                { id: 'r1', text: "NASA's entire budget is less than 4% of federal spending, while social programs receive over 30%. The space program is not the reason poverty exists, and cutting it would barely make a dent in social spending while destroying irreplaceable scientific progress.", correct: true, feedback: "Powerful rebuttal. You used specific numbers to show the false trade-off, then reframed the issue as a matter of proportion rather than competition." },
                { id: 'r2', text: "People have always been poor and always will be. Space exploration is what makes America exceptional.", correct: false, feedback: "Dismissing poverty as inevitable is callous and will alienate the committee. A good debater shows empathy for the opposing concern." },
                { id: 'r3', text: "If the Senator cared so much about poverty, he would have voted for the welfare bill he opposed last year.", correct: false, feedback: "Logical Fallacy (Tu Quoque / Whataboutism). Attacking the Senator's voting record does not address his argument about funding priorities." }
            ]
        },
        pushback: {
            text: "Committee Chair Wilson presses: 'Even if we accept the innovation argument, can you guarantee that these technologies could not be developed more cheaply through targeted research programs without the enormous cost of manned spaceflight?'",
            rebuttals: [
                { id: 'p1', text: "Targeted research is slow and uninspiring. Only the grand challenge of space can push engineers to their limits.", correct: false, feedback: "This is an assertion without evidence. The Chair asked about cost-effectiveness, and you responded with emotion instead of data." },
                { id: 'p2', text: "History shows that breakthrough innovations emerge from ambitious, integrated programs — not isolated labs. The urgency and complexity of spaceflight forces engineers to solve problems they would never encounter in targeted research, and the solutions often have unexpected civilian applications, like the miniaturized circuits that are now revolutionizing computing.", correct: true, feedback: "You answered the cost-effectiveness question with a concrete example and explained the mechanism by which space programs uniquely drive innovation." }
            ]
        },
        speechTemplate: {
            intro: "Members of the committee, this is not a debate between the stars and our streets — it is about investing in both.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe what the space program represents',
                    options: [
                        { text: "engine of innovation that benefits every American household", strong: true },
                        { text: "strategic investment in national security and scientific leadership", strong: true },
                        { text: "really cool adventure for astronauts", strong: false, feedback: "Congress allocates funds based on national interest, not excitement. Frame the space program in terms of concrete benefits." },
                        { text: "way to show the Soviets who is boss", strong: false, feedback: "Reducing the argument to chest-thumping rivalry undermines the substantive case for space investment." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the consequence of cutting space funding',
                    options: [
                        { text: "surrendering technological leadership that took a decade to build", strong: true },
                        { text: "losing the innovations that are already improving life on Earth", strong: true },
                        { text: "making America look weak", strong: false, feedback: "Too vague and appeals only to pride. Specify what concrete advantages would be lost." }
                    ]
                }
            ]
        }
    },
    {
        id: 'indigenous-languages',
        title: "Preserving Indigenous Languages",
        premise: "Linguists estimate that one indigenous language dies every two weeks. You are arguing before a cultural preservation board that schools in regions with indigenous populations must offer mandatory indigenous language programs.",
        setting: "the National Cultural Preservation Board",
        claimOptions: [
            { id: 'c1', text: "Indigenous languages are beautiful and should not disappear.", correct: false, feedback: "This is a sentiment, not a policy position. You need to propose a specific action for the board to approve." },
            { id: 'c2', text: "The Board must mandate funded indigenous language programs in all public schools within regions that have indigenous populations, including trained native-speaker instructors and culturally integrated curricula.", correct: true, feedback: "Strong, specific, and actionable. It identifies what should happen, where, and how." },
            { id: 'c3', text: "Indigenous languages should replace English as the primary language of instruction in all schools nationwide.", correct: false, feedback: "Far too extreme and logistically impossible. This would guarantee immediate rejection and undermine your credibility." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Research from the University of British Columbia shows that indigenous youth who learn their ancestral language score 15% higher on measures of cultural identity and psychological well-being, with significantly lower rates of depression.", type: 'strong' },
            { id: 'e2', text: "Each indigenous language encodes unique ecological knowledge — for example, the Hopi language contains precise terminology for desert water management techniques that Western science has only recently begun to study.", type: 'strong' },
            { id: 'e3', text: "Bilingual education programs in New Zealand's Maori-language schools have shown that students who learn te reo Maori alongside English perform equally well in English literacy tests while gaining an additional language, disproving the myth that indigenous language education harms academic performance.", type: 'strong' },
            { id: 'e4', text: "The Hawaiian language revival program, which began in the 1980s, has increased the number of Hawaiian speakers from fewer than 50 children to over 3,000, proving that if we implement similar programs everywhere, we can save all endangered languages.", type: 'weak', feedback: "Logical Fallacy (Hasty Generalization). The Hawaiian revival succeeded due to specific local conditions — strong community support, geographic isolation, and decades of dedicated effort. Assuming the same results can be replicated everywhere ignores the unique challenges each language community faces." },
            { id: 'e5', text: "Since the United Nations Declaration on the Rights of Indigenous Peoples affirms the right to revitalize languages, any nation that fails to fund language programs is violating international law and human rights.", type: 'weak', feedback: "Logical Fallacy (Appeal to Authority / Misrepresentation). The UN Declaration is non-binding and does not create enforceable legal obligations. Claiming nations are 'violating international law' overstates the declaration's power and could be easily challenged by opponents." },
            { id: 'e6', text: "Studies show that countries with greater linguistic diversity tend to have richer cultural tourism industries, so preserving indigenous languages will boost the national economy.", type: 'weak', feedback: "Logical Fallacy (Correlation vs. Causation). Linguistic diversity and tourism revenue may both be caused by other factors, such as geographic diversity or historical preservation efforts. The link between language programs and economic growth is not established by this correlation." }
        ],
        counterArgument: {
            text: "Board Member Thornton argues: 'In a globalized economy, students need English fluency and STEM skills to compete. Adding indigenous language requirements takes time away from subjects that will actually help these children get jobs and escape poverty.'",
            rebuttals: [
                { id: 'r1', text: "Decades of research on bilingual education consistently shows that learning a second language enhances cognitive flexibility, problem-solving ability, and even performance in STEM subjects. These programs do not compete with academic achievement — they strengthen it.", correct: true, feedback: "You directly countered the zero-sum framing with research evidence showing that language learning enhances, rather than undermines, the very skills Thornton values." },
                { id: 'r2', text: "Not everything in education should be about getting a job. Some things matter more than money.", correct: false, feedback: "While philosophically valid, this dismisses the economic concerns that are very real for indigenous communities facing poverty. It sounds out of touch." },
                { id: 'r3', text: "Board Member Thornton is being culturally insensitive and should recuse himself from this discussion.", correct: false, feedback: "Logical Fallacy (Ad Hominem). Attacking the board member rather than his argument will alienate the rest of the board." }
            ]
        },
        pushback: {
            text: "Superintendent Reyes raises a practical concern: 'I support the goal, but where will we find enough qualified native-speaker instructors? Many of these languages have fewer than 100 fluent speakers remaining, and most of them are elders, not trained teachers.'",
            rebuttals: [
                { id: 'p1', text: "If the languages are that close to extinction, that is even more reason to act immediately, regardless of whether we have enough teachers.", correct: false, feedback: "Urgency without a plan is not a solution. You ignored the legitimate staffing problem entirely." },
                { id: 'p2', text: "The program includes a 'Language Keeper' apprenticeship track, where fluent elders are paired with younger community members who receive teaching certification training. This simultaneously preserves the language and builds a sustainable pipeline of future instructors.", correct: true, feedback: "A creative, practical solution that directly addresses the teacher shortage while also serving the preservation mission. This shows you have thought beyond the policy into its implementation." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Board, every two weeks a language falls silent forever — and with it, centuries of irreplaceable human knowledge.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe what is lost when a language dies',
                    options: [
                        { text: "unique ways of understanding the natural world", strong: true },
                        { text: "irreplaceable cultural heritage and ancestral wisdom", strong: true },
                        { text: "old words that nobody uses anymore", strong: false, feedback: "Dismissive and reductive. Languages are not just 'old words' — they are living systems of knowledge. This phrasing undermines the urgency of your own argument." },
                        { text: "things that make some people sad", strong: false, feedback: "Reducing cultural loss to personal sadness trivializes the issue. Focus on the concrete, collective consequences." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe what the language programs will achieve',
                    options: [
                        { text: "bridge between generations that strengthens both identity and achievement", strong: true },
                        { text: "foundation for communities to reclaim their heritage while preparing for the future", strong: true },
                        { text: "nice thing for indigenous kids to learn about", strong: false, feedback: "Patronizing and vague. The program is a serious educational initiative, not a 'nice thing.' Use language that conveys its importance." }
                    ]
                }
            ]
        }
    }
];
