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
            opponent: { name: "Minister Fudge", title: "Minister of Magic", emoji: "🎩" },
            reactions: {
                correct: "Fudge pauses, visibly recalculating. He hadn't expected you to have a concrete policy ready — his argument relied on the assumption that cooperation was just idealism, not a workable plan. He straightens his robes and glances at the council, measuring whether he's lost them.",
                wrong: "A thin smile crosses Fudge's face. He didn't even need to respond — your own argument just did his work for him. Several council members exchange glances, and you can feel the room's confidence in your position wavering."
            },
            text: "Muggles are fundamentally destructive! If we show them dragons, they will hunt them for sport or use them in their mundane wars. We must hide the beasts!",
            rebuttals: [
                { id: 'r1', text: "They will only hunt them if we leave them ignorant. Joint-run sanctuaries let us control the narrative and enforce protection laws together.", correct: true, feedback: "Excellent. You neutralized his fear with a concrete policy (joint sanctuaries)." },
                { id: 'r2', text: "Wizards have hunted magical creatures for centuries as well. This argument unfairly singles out Muggles while ignoring our own destructive track record.", correct: false, feedback: "Logical Fallacy (Tu Quoque / Whataboutism). Pointing out wizard misdeeds does not address the Minister's concern about Muggle behavior toward dragons." },
                { id: 'r3', text: "Muggle weapons are designed for human conflict, not dragon-scale armor. Their technology poses no realistic threat to a fully grown dragon.", correct: false, feedback: "Factually questionable and dangerously overconfident. Underestimating Muggle military technology is a strategic error that weakens your credibility." }
            ]
        },
        pushback: {
            opponent: { name: "A Wizengamot Elder", title: "Senior Council Member", emoji: "⚖️" },
            reactions: {
                correct: "The Elder's gavel hand lowers slowly. By reframing the Statute's purpose rather than attacking it, you took away the one weapon they had — the moral authority of tradition. Several younger council members are nodding openly now, and the Elder knows that pressing further risks looking like an obstructionist rather than a guardian.",
                wrong: "The Elder raps the gavel once, sharply, and the sound echoes through the chamber like a verdict. Your response either attacked the Statute too directly or gave too much ground, and either way, you've handed the traditionalists exactly what they needed — proof that reform advocates don't truly respect wizarding law."
            },
            text: "But the Statute of Secrecy is our most sacred law! You are asking us to tear up centuries of tradition for a mere experiment!",
            rebuttals: [
                { id: 'p1', text: "Tradition that leads to our destruction is not worth preserving. The Statute was written for a different era and must be discarded entirely.", correct: false, feedback: "Too aggressive. Calling their most sacred law disposable alienates every traditionalist on the council." },
                { id: 'p2', text: "You raise a fair point, and perhaps we should simply table this proposal until we have more time to study the issue further.", correct: false, feedback: "Too concessive. Agreeing to delay indefinitely kills your own proposal and surrenders all momentum you have built." },
                { id: 'p3', text: "The Statute was created to protect us from persecution. True protection now lies in controlled cooperation, adapting the law to a modern world, not breaking it.", correct: true, feedback: "Brilliant Pivot! You redefined the purpose of the law instead of attacking it, showing respect while advocating change." }
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
            { id: 'c3', text: "The Ministry should immediately free all House-Elves and ban the practice of bonded service entirely.", correct: false, feedback: "Too radical without a transition plan. An overnight ban with no economic framework will collapse the system and hurt the Elves you're trying to help." }
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
            opponent: { name: "A Traditionalist", title: "Pure-Blood Advocate", emoji: "🧐" },
            reactions: {
                correct: "The Traditionalist's composure cracks — a flicker of uncertainty crosses their face. Their entire argument hinged on the idea that servitude was natural, and by naming it as conditioning, you forced every council member to question that assumption. The chamber has gone quiet in the way it does when something uncomfortable and true has been said aloud.",
                wrong: "The Traditionalist leans back with a satisfied air, fingers steepled. Your rebuttal failed to challenge the core premise — that Elves genuinely want to serve — and instead went after the messenger or danced around the edges. Two council members who were leaning your way now look uncertain, their quills pausing over their notes."
            },
            text: "But House-Elves take pride in serving! Offering them money is an insult to their very nature and deeply offends them!",
            rebuttals: [
                { id: 'r1', text: "That perceived pride is the product of thousands of years of systemic conditioning. True nature can only be observed when genuine choice exists.", correct: true, feedback: "Strong rebuttal that addresses the root cause of the 'nature' argument." },
                { id: 'r2', text: "The families making this argument are the same ones who benefit most from unpaid labor. Their defense of tradition is really a defense of profit.", correct: false, feedback: "Logical Fallacy (Ad Hominem). Questioning their motives does not actually address whether the Elves themselves feel pride in their work." },
                { id: 'r3', text: "If Elves truly love serving, then receiving wages for their work should only increase their satisfaction, not diminish it in any way.", correct: false, feedback: "This sounds logical but sidesteps the real issue. It fails to challenge the flawed premise that conditioned behavior equals genuine preference." }
            ]
        },
        pushback: {
            opponent: { name: "Head of Magical Economy", title: "Treasury Official", emoji: "💰" },
            reactions: {
                correct: "The Treasury Official blinks, caught off guard by the specificity of your proposal. They came prepared to demolish vague idealism about Elf rights, not to debate a phased economic plan with a registry system. You can see them scanning their notes for a counter that isn't there, while several governors begin murmuring approvingly about the shared-labor concept.",
                wrong: "The Treasury Official adjusts their spectacles with the calm precision of someone who just won without trying. Your response either wished financial ruin on the old families or surrendered your mandate entirely — either way, you've confirmed their narrative that reformers don't understand economics. The council's attention shifts back to the budget projections on the table."
            },
            text: "Mandating wages will bankrupt ancient wizarding families overnight! How do you propose we fund this?",
            rebuttals: [
                { id: 'p1', text: "If those families built their wealth on unpaid labor, then their financial model was exploitative from the start and deserves to collapse.", correct: false, feedback: "Too aggressive. Wishing economic ruin on ancient families will turn the entire council against you and your proposal." },
                { id: 'p2', text: "You make a compelling point about affordability. Perhaps we should start with voluntary guidelines instead of a legal mandate for now.", correct: false, feedback: "Too concessive. Voluntary guidelines have no enforcement power and would allow abusive families to simply opt out of the entire reform." },
                { id: 'p3', text: "Wages can be phased in gradually over several years, and families who cannot afford a full-time Elf can join a shared-labor registry.", correct: true, feedback: "Excellent compromise. You acknowledged the economic concern and offered a practical, structured solution." }
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
            { id: 'c3', text: "Hogwarts should offer Muggle subjects as optional electives for interested students.", correct: false, feedback: "Too weak! An optional elective can be easily ignored. Your claim needs to advocate for meaningful structural change to the curriculum." }
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
            opponent: { name: "Lucius Malfoy", title: "School Governor", emoji: "🐍" },
            reactions: {
                correct: "Malfoy's sneer falters — just for a moment, but the governors noticed. By framing Muggle knowledge as a supplement rather than a replacement, you neutralized the 'dilution' argument he was counting on. He recovers quickly, but his next objection will carry less weight; the room has already accepted your framing.",
                wrong: "Malfoy's lip curls into a knowing smile. Your response either attacked pure-blood culture directly or accidentally implied that Muggle methods are superior — either way, you've played into the exact narrative he wanted. Several governors who were open to reform now shift uncomfortably, worried about being seen as anti-tradition."
            },
            text: "Magic is the highest form of power. We have no need for mundane Muggle tricks. Teaching their methods dilutes our magical heritage.",
            rebuttals: [
                { id: 'r1', text: "This is not about replacing magic. It supplements our heritage with logic and reasoning skills that traditional magical education often overlooks.", correct: true, feedback: "Great distinction. It frames Muggle studies as an enhancement, neutralizing the threat to 'heritage'." },
                { id: 'r2', text: "That prejudice is exactly why our students fall behind. Pure-blood elitism has historically produced narrower thinkers, not stronger wizards.", correct: false, feedback: "Logical Fallacy (Ad Hominem). Attacking pure-blood culture directly will harden opposition rather than persuade the undecided governors in the room." },
                { id: 'r3', text: "Muggle science has produced achievements that magic cannot replicate, like space travel and global communication networks spanning the entire planet.", correct: false, feedback: "This implicitly concedes that Muggle methods are superior, which undermines your framing of integration as a supplement rather than a replacement." }
            ]
        },
        pushback: {
            opponent: { name: "Professor McGonagall", title: "Deputy Headmistress", emoji: "🏰" },
            reactions: {
                correct: "McGonagall's eyebrows rise — not in disapproval, but in genuine surprise. She had expected you to propose cutting courses, which would have given her grounds to block you on faculty solidarity alone. Instead, your integration model respects existing teachers' expertise while expanding it. She gives a small, measured nod, and the other governors take note — if McGonagall is intrigued, this proposal has academic credibility.",
                wrong: "McGonagall's expression tightens almost imperceptibly — the look of a professor watching a student reach for the wrong answer. Your response either insulted her colleagues' subjects or conceded the scheduling point so completely that your reform proposal lost its teeth. She folds her hands, and the governors read her silence as a verdict: this advocate hasn't thought the implementation through."
            },
            text: "The students' schedules are already overflowing with spellwork and history. Where will we find the hours in the day?",
            rebuttals: [
                { id: 'p1', text: "Some existing subjects like Divination have questionable academic value. We should cut the weakest courses to make room for what matters.", correct: false, feedback: "Too aggressive. Calling colleagues' subjects worthless insults current faculty and creates unnecessary enemies on the board." },
                { id: 'p2', text: "You are absolutely right that scheduling is tight. Perhaps we should only introduce these subjects in the later years as optional additions.", correct: false, feedback: "Too concessive. Limiting it to optional later-year additions guts your entire proposal for mandatory, integrated curriculum reform." },
                { id: 'p3', text: "We do not need independent classes. We integrate math directly into Arithmancy and chemistry directly into Potions, blending the disciplines seamlessly.", correct: true, feedback: "Brilliant structural solution. You addressed the scheduling concern without sacrificing the core goal of your proposal." }
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
