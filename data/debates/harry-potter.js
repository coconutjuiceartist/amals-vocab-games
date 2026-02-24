export const harryPotterDebates = [
    {
        id: 'dragon-conservation',
        title: "Dragon Conservation Initiative",
        premise: "A Muggle scientist has discovered dragons. Muggles want to build weapons. The Ministry wants to wipe their memories. You are arguing for cooperation and research.",
        setting: "the Wizengamot",
        claimOptions: [
            { id: 'c1', text: "Muggles are too dangerous and must be obliviated immediately.", correct: false, feedback: "This is the Ministry's current plan, not an argument for cooperation!" },
            { id: 'c2', text: "The Ministry must partner with Muggle scientists to establish joint dragon sanctuaries and study programs.", correct: true, feedback: "Perfect! A clear, debatable policy claim." },
            { id: 'c3', text: "We should tell the Muggles about everything magical, not just dragons.", correct: false, feedback: "Too broad! This violates the Statute of Secrecy entirely, making it impossible to win the debate." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Muggle satellite technology can safely track dragon migration patterns without using noticeable magic.", type: 'strong' },
            { id: 'e2', text: "Historical records show that Obliviation on a massive scale often leaves permanent neurological damage to Muggles.", type: 'strong' },
            { id: 'e3', text: "Combining Muggle biology with Magizoology will lead to breakthroughs in treating dragon-pox.", type: 'strong' },
            { id: 'e4', text: "Three Muggle governments have already expressed interest in exotic wildlife research, suggesting that if we delay, they may attempt unregulated dragon contact on their own.", type: 'weak', feedback: "Logical Fallacy (Hasty Generalization). Interest in wildlife research does not mean governments will pursue dragon contact. This leap in logic weakens your argument." },
            { id: 'e5', text: "Since Muggle technology has advanced faster than magical innovation over the past century, our defensive spells may already be insufficient against their military capabilities.", type: 'weak', feedback: "Logical Fallacy (Non Sequitur). The rate of technological advancement does not directly tell us anything about magical defense effectiveness. This comparison lacks actual evidence." },
            { id: 'e6', text: "A recent survey showed that 68% of Muggles would welcome the existence of dragons, indicating broad public support for cooperation.", type: 'weak', feedback: "Logical Fallacy (Appeal to Popularity / Misleading Statistics). A hypothetical poll about fictional creatures cannot predict real reactions to actual dragons. Public opinion surveys are not a basis for security policy." }
        ],
        counterArgument: {
            text: "Minister Fudge interjects: 'Muggles are fundamentally destructive! If we show them dragons, they will hunt them for sport or use them in their mundane wars. We must hide the beasts!'",
            rebuttals: [
                { id: 'r1', text: "They will only hunt them if we leave them ignorant. By establishing strict, joint-run sanctuaries, we control the narrative and enforce protection laws together.", correct: true, feedback: "Excellent. You neutralized his fear with a concrete policy (joint sanctuaries)." },
                { id: 'r2', text: "Wizards hunt things too! You're being a hypocrite.", correct: false, feedback: "Logical Fallacy (Tu Quoque / Whataboutism). Pointing fingers doesn't solve the problem at hand." },
                { id: 'r3', text: "Muggles don't even have weapons strong enough to hurt a dragon, so it doesn't matter.", correct: false, feedback: "Factually incorrect and arrogant. Underestimating Muggle weapons is dangerous." }
            ]
        },
        pushback: {
            text: "A Wizengamot Elder slams their gavel: 'But the Statute of Secrecy is our most sacred law! You are asking us to tear up centuries of tradition for a mere experiment!'",
            rebuttals: [
                { id: 'p1', text: "Tradition is meaningless if it leads to our destruction.", correct: false, feedback: "Too aggressive. Insulting the law directly alienates the council." },
                { id: 'p2', text: "The Statute was created to protect us from persecution. But true protection now lies in controlled cooperation, adapting the law to a modern world, not breaking it.", correct: true, feedback: "Brilliant Pivot! You redefined the purpose of the law instead of attacking it." }
            ]
        },
        speechTemplate: {
            intro: "Members of the Wizengamot, we stand at a precarious crossroads between secrecy and survival.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the old ways',
                    options: [
                        { text: "outdated secrecy policies", strong: true },
                        { text: "growing threat of discovery", strong: true },
                        { text: "scary feelings about Muggles", strong: false, feedback: "Vague emotional language weakens a policy argument. Strong debaters use specific, concrete descriptions." },
                        { text: "stuff happening lately", strong: false, feedback: "Too vague! A powerful opening needs precise language that commands attention." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'What we must do together',
                    options: [
                        { text: "opportunity for peaceful coexistence", strong: true },
                        { text: "chance to protect both our worlds", strong: true },
                        { text: "magical superiority", strong: false, feedback: "Claiming superiority undermines your argument for cooperation. You're trying to build a partnership, not assert dominance." }
                    ]
                }
            ]
        }
    },
    {
        id: 'house-elf-rights',
        title: "S.P.E.W. Expansion Act",
        premise: "You are arguing that House-Elves should receive a minimum wage and right to refuse service. The opposition claims they 'enjoy' unpaid servitude.",
        setting: "the Wizengamot",
        claimOptions: [
            { id: 'c1', text: "House-Elves are currently unpaid.", correct: false, feedback: "This is a statement of fact, not a debatable policy proposal." },
            { id: 'c2', text: "The Ministry must immediately mandate a minimum wage and establish a magical labor rights board for House-Elves.", correct: true, feedback: "Strong, actionable claim." },
            { id: 'c3', text: "Any wizard who owns a House-Elf should be sent to Azkaban.", correct: false, feedback: "Too extreme. Punishing the entire wizarding world will not pass a vote." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Elves who are paid, like Dobby, demonstrate higher morale and increased problem-solving capabilities.", type: 'strong' },
            { id: 'e2', text: "Currently, abusive wizard families face zero legal repercussions for mistreating sentient magical beings.", type: 'strong' },
            { id: 'e3', text: "A minimum wage would stimulate the magical economy, as Elves would begin purchasing goods in Diagon Alley.", type: 'strong' },
            { id: 'e4', text: "Goblin workers at Gringotts receive fair wages under the Treaty of 1473, establishing a clear legal precedent for paying non-human magical workers.", type: 'weak', feedback: "Logical Fallacy (False Equivalence). The Goblin Treaty was negotiated under completely different historical circumstances after armed rebellion. You must argue based on the Elves' own situation, not force a comparison." },
            { id: 'e5', text: "Studies at Beauxbatons showed that Elves given days off completed their remaining tasks 15% faster, proving that rest improves productivity.", type: 'weak', feedback: "Logical Fallacy (Cherry-Picked Data). One school's internal study is not sufficient evidence for national policy. The sample size and conditions are too narrow to generalize." },
            { id: 'e6', text: "Several prominent wizarding families, including the Weasleys, have publicly supported Elf wages, showing that the wizarding community is ready for this change.", type: 'weak', feedback: "Logical Fallacy (Appeal to Authority / Popularity). A few families supporting a cause does not prove the community is 'ready.' You need structural arguments, not celebrity endorsements." }
        ],
        counterArgument: {
            text: "A Traditionalist argues: 'But House-Elves take pride in serving! Offering them money is an insult to their very nature and deeply offends them!'",
            rebuttals: [
                { id: 'r1', text: "They only think that because thousands of years of systemic conditioning has brainwashed them into accepting abuse.", correct: true, feedback: "Strong rebuttal that addresses the root cause of the 'nature' argument." },
                { id: 'r2', text: "You just want to keep your free labor because you are greedy.", correct: false, feedback: "Logical Fallacy (Ad Hominem). Insulting the traditionalist's character does not address their argument about the Elves' feelings." },
                { id: 'r3', text: "Then we will force them to take the money until they like it.", correct: false, feedback: "Counter-productive. Forcing them replaces one tyranny with another." }
            ]
        },
        pushback: {
            text: "The Head of Magical Economy argues: 'Mandating wages will bankrupt ancient wizarding families overnight! How do you propose we fund this?'",
            rebuttals: [
                { id: 'p1', text: "That sounds like a personal problem for those families.", correct: false, feedback: "Too dismissive. The economy is a valid concern for the Ministry." },
                { id: 'p2', text: "Wages can be phased in gradually, and families who cannot afford a full-time Elf can participate in a shared-labor registry.", correct: true, feedback: "Excellent compromise. You acknowledged the economic concern and offered a practical solution." }
            ]
        },
        speechTemplate: {
            intro: "For too long, the foundation of our magical society has rested on the quiet suffering of unpaid labor.",
            blanks: [
                {
                    id: 'b1',
                    label: 'Describe the practice of unpaid labor',
                    options: [
                        { text: "unjust exploitation of sentient beings", strong: true },
                        { text: "systematic denial of basic rights", strong: true },
                        { text: "old traditions about Elves", strong: false, feedback: "Too vague and passive. A powerful opening statement needs language that conveys the weight of the injustice." },
                        { text: "mean things wizards do", strong: false, feedback: "Childish language undermines your credibility before a legislative body. Use precise, formal vocabulary." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'What the Elves deserve',
                    options: [
                        { text: "dignity and autonomy they have earned", strong: true },
                        { text: "fundamental right to fair compensation", strong: true },
                        { text: "freedom to do whatever they want", strong: false, feedback: "Too absolute and undefined. 'Whatever they want' sounds like anarchy, not policy. Be specific about the rights you're advocating." }
                    ]
                }
            ]
        }
    },
    {
        id: 'hogwarts-curriculum',
        title: "Modernizing Hogwarts",
        premise: "You are advocating to the Hogwarts Board of Governors that Muggle subjects (Math, Science, Literature) must be integrated into the core magical curriculum.",
        setting: "the Hogwarts Board of Governors",
        claimOptions: [
            { id: 'c1', text: "Muggle subjects should be mandatory at Hogwarts to prepare students for a rapidly advancing, interconnected global world.", correct: true, feedback: "A decisive, clear policy claim." },
            { id: 'c2', text: "Math is very important for everyday life.", correct: false, feedback: "Too generic. How does it relate to the Hogwarts context specifically?" },
            { id: 'c3', text: "We should fire all the current teachers and replace them with Muggles.", correct: false, feedback: "Absurd and needlessly antagonistic." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Advanced Arithmancy relies heavily on calculus and statistics, which many pure-blood students struggle to grasp without foundational math.", type: 'strong' },
            { id: 'e2', text: "Understanding the scientific method and Muggle chemistry can lead to safer, more predictable breakthroughs in Potion invention.", type: 'strong' },
            { id: 'e3', text: "Wizards increasingly live in mixed communities; understanding Muggle laws and technology is now a matter of safety and Statute compliance.", type: 'strong' },
            { id: 'e4', text: "Muggle universities have produced more published research papers in the last decade than all wizarding institutions combined, proving their methods are more rigorous.", type: 'weak', feedback: "Logical Fallacy (Misleading Comparison). Muggle universities vastly outnumber wizarding ones, so comparing raw publication counts is meaningless. Volume does not equal quality or relevance." },
            { id: 'e5', text: "Former Hogwarts students who took Muggle Studies as an elective reported feeling more 'well-rounded,' according to a Hogwarts alumni survey.", type: 'weak', feedback: "Logical Fallacy (Appeal to Subjective Experience). 'Feeling well-rounded' is a vague, self-reported sentiment, not measurable academic evidence. You need concrete outcomes, not feelings." },
            { id: 'e6', text: "Since Hermione Granger, a Muggle-born witch, became the top student in her year, it stands to reason that Muggle educational foundations give students an academic advantage.", type: 'weak', feedback: "Logical Fallacy (Anecdotal Evidence / Hasty Generalization). One exceptional student does not prove a systemic advantage. Hermione's success could be due to many personal factors beyond her Muggle education." }
        ],
        counterArgument: {
            text: "Lucius Malfoy sneers: 'Magic is the highest form of power. We have no need for mundane Muggle tricks. Teaching their methods dilutes our magical heritage.'",
            rebuttals: [
                { id: 'r1', text: "It is not about replacing magic, but supplementing our heritage with the logic and reasoning skills that traditional magical education often ignores.", correct: true, feedback: "Great distinction. It frames Muggle studies as an enhancement, neutralizing the threat to 'heritage'." },
                { id: 'r2', text: "You're just a prejudiced elitist.", correct: false, feedback: "Logical Fallacy (Ad Hominem). Accurately labeling him doesn't win the structured debate." },
                { id: 'r3', text: "Magic isn't real power anyway, technology is.", correct: false, feedback: "Factually incorrect in this universe, and immediately ruins your credibility." }
            ]
        },
        pushback: {
            text: "Professor McGonagall expresses concern: 'The students' schedules are already overflowing with spellwork and history. Where will we find the hours in the day?'",
            rebuttals: [
                { id: 'p1', text: "Cancel Divination and History of Magic, they are useless.", correct: false, feedback: "Disrespectful to current faculty. A good debater doesn't tear down others to make room." },
                { id: 'p2', text: "We don't need independent classes. We integrate math directly into Arithmancy, and chemistry directly into Potions, blending the disciplines.", correct: true, feedback: "Brilliant structural solution. You addressed the scheduling concern without sacrificing the core goal." }
            ]
        },
        speechTemplate: {
            intro: "Governors, magic is our cherished heritage, but a broad, adaptable intellect is our future.",
            blanks: [
                {
                    id: 'b1',
                    label: 'A Muggle concept (e.g. logic, science)',
                    options: [
                        { text: "critical thinking and scientific reasoning", strong: true },
                        { text: "mathematical foundations that underpin advanced magic", strong: true },
                        { text: "cool Muggle inventions like phones", strong: false, feedback: "Informal language and focusing on gadgets trivializes your academic argument. Focus on intellectual principles, not products." },
                        { text: "things Muggles know that we don't", strong: false, feedback: "Vague and slightly insulting to your audience. Be specific about what knowledge areas would benefit students." }
                    ]
                },
                {
                    id: 'b2',
                    label: 'Describe the modern wizarding world',
                    options: [
                        { text: "increasingly interconnected world", strong: true },
                        { text: "evolving demands of modern magical society", strong: true },
                        { text: "boring old way of teaching", strong: false, feedback: "Insulting the current system alienates the Governors who built it. Advocate for improvement, not replacement." }
                    ]
                }
            ]
        }
    }
];
