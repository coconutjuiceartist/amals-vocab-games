export const debateScenarios = [
    {
        id: 'dragon-conservation',
        title: "Dragon Conservation Initiative",
        premise: "A Muggle scientist has discovered dragons. Muggles want to build weapons. The Ministry wants to wipe their memories. You are arguing for cooperation and research.",
        claimOptions: [
            { id: 'c1', text: "Muggles are too dangerous and must be obliviated immediately.", correct: false, feedback: "This is the Ministry's current plan, not an argument for cooperation!" },
            { id: 'c2', text: "The Ministry must partner with Muggle scientists to establish joint dragon sanctuaries and study programs.", correct: true, feedback: "Perfect! A clear, debatable policy claim." },
            { id: 'c3', text: "We should tell the Muggles about everything magical, not just dragons.", correct: false, feedback: "Too broad! This violates the Statute of Secrecy entirely, making it impossible to win the debate." }
        ],
        // The correct options will be randomized by the UI. 
        // Nuance: The 'weak' ones are now half-right but contain fatal logical flaws or bad assumptions.
        evidenceOptions: [
            { id: 'e1', text: "Muggle satellite technology can safely track dragon migration patterns without using noticeable magic.", type: 'strong' },
            { id: 'e2', text: "Historical records show that Obliviation on a massive scale often leaves permanent neurological damage to Muggles.", type: 'strong' },
            { id: 'e3', text: "Combining Muggle biology with Magizoology will lead to breakthroughs in treating dragon-pox.", type: 'strong' },
            { id: 'e4', text: "Muggles are clearly smarter than us, so they will eventually figure it out anyway. We might as well surrender.", type: 'weak', feedback: "Logical Fallacy (Defeatism/Hasty Generalization). Acknowledging they have technology is good; saying they are 'clearly smarter' and we should 'surrender' will lose the Wizengamot immediately." },
            { id: 'e5', text: "If we don't work with them, they will drop nuclear weapons on Hogwarts tomorrow!", type: 'weak', feedback: "Logical Fallacy (Slippery Slope / Appeal to Fear). While conflict is a risk, extreme, unsubstantiated claims will get your argument thrown out." }
        ],
        counterArgument: {
            text: "Minister Fudge interjects: 'Muggles are fundamentally destructive! If we show them dragons, they will hunt them for sport or use them in their mundane wars. We must hide the beasts!'",
            rebuttals: [
                { id: 'r1', text: "They will only hunt them if we leave them ignorant. By establishing strict, joint-run sanctuaries, we control the narrative and enforce protection laws together.", correct: true, feedback: "Excellent. You neutralized his fear with a concrete policy (joint sanctuaries)." },
                { id: 'r2', text: "Wizards hunt things too! You're being a hypocrite.", correct: false, feedback: "Logical Fallacy (Tu Quoque / Whataboutism). Pointing fingers doesn't solve the problem at hand." },
                { id: 'r3', text: "Muggles don't even have weapons strong enough to hurt a dragon, so it doesn't matter.", correct: false, feedback: "Factually incorrect and arrogant. Underestimating Muggle weapons is dangerous." }
            ]
        },
        // New Mid-Debate Pushback Mechanics
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
                { id: 'b1', type: 'adjective', label: 'Describe the old ways' },
                { id: 'b2', type: 'verb', label: 'What we must do together' }
            ]
        }
    },
    {
        id: 'house-elf-rights',
        title: "S.P.E.W. Expansion Act",
        premise: "You are arguing that House-Elves should receive a minimum wage and right to refuse service. The opposition claims they 'enjoy' unpaid servitude.",
        claimOptions: [
            { id: 'c1', text: "House-Elves are currently unpaid.", correct: false, feedback: "This is a statement of fact, not a debatable policy proposal." },
            { id: 'c2', text: "The Ministry must immediately mandate a minimum wage and establish a magical labor rights board for House-Elves.", correct: true, feedback: "Strong, actionable claim." },
            { id: 'c3', text: "Any wizard who owns a House-Elf should be sent to Azkaban.", correct: false, feedback: "Too extreme. Punishing the entire wizarding world will not pass a vote." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Elves who are paid, like Dobby, demonstrate higher morale and increased problem-solving capabilities.", type: 'strong' },
            { id: 'e2', text: "Currently, abusive wizard families face zero legal repercussions for mistreating sentient magical beings.", type: 'strong' },
            { id: 'e3', text: "A minimum wage would stimulate the magical economy, as Elves would begin purchasing goods in Diagon Alley.", type: 'strong' },
            { id: 'e4', text: "Other magical creatures like Goblins are paid, so Elves should be too.", type: 'weak', feedback: "Logical Fallacy (False Equivalence). Goblins have a completely different societal structure and treaty history. You must argue based on the Elves' merits." },
            { id: 'e5', text: "If we don't pay them, they will all rebel and murder us in our sleep!", type: 'weak', feedback: "Logical Fallacy (Appeal to Fear). House-Elves are inherently peaceful; fear-mongering damages your credibility." }
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
                { id: 'b1', type: 'adjective', label: 'Describe the practice of unpaid labor' },
                { id: 'b2', type: 'noun', label: 'What the Elves deserve' }
            ]
        }
    },
    {
        id: 'hogwarts-curriculum',
        title: "Modernizing Hogwarts",
        premise: "You are advocating to the Hogwarts Board of Governors that Muggle subjects (Math, Science, Literature) must be integrated into the core magical curriculum.",
        claimOptions: [
            { id: 'c1', text: "Muggle subjects should be mandatory at Hogwarts to prepare students for a rapidly advancing, interconnected global world.", correct: true, feedback: "A decisive, clear policy claim." },
            { id: 'c2', text: "Math is very important for everyday life.", correct: false, feedback: "Too generic. How does it relate to the Hogwarts context specifically?" },
            { id: 'c3', text: "We should fire all the current teachers and replace them with Muggles.", correct: false, feedback: "Absurd and needlessly antagonistic." }
        ],
        evidenceOptions: [
            { id: 'e1', text: "Advanced Arithmancy relies heavily on calculus and statistics, which many pure-blood students struggle to grasp without foundational math.", type: 'strong' },
            { id: 'e2', text: "Understanding the scientific method and Muggle chemistry can lead to safer, more predictable breakthroughs in Potion invention.", type: 'strong' },
            { id: 'e3', text: "Wizards increasingly live in mixed communities; understanding Muggle laws and technology is now a matter of safety and Statute compliance.", type: 'strong' },
            { id: 'e4', text: "Muggles have invented airplanes, which are much faster than brooms, proving Muggle science is superior to magic.", type: 'weak', feedback: "Logical Fallacy (False Dilemma). The goal is integration, not declaring one 'superior' to the other. This alienates traditionalists." },
            { id: 'e5', text: "Because Albus Dumbledore said he likes Muggle candy, we should study their culture.", type: 'weak', feedback: "Logical Fallacy (Appeal to Authority). Even if Dumbledore likes candy, it's not a strong academic reason to overhaul the curriculum." }
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
                { id: 'b1', type: 'noun', label: 'A Muggle concept (e.g. logic, science)' },
                { id: 'b2', type: 'adjective', label: 'Describe the modern wizarding world' }
            ]
        }
    }
];
