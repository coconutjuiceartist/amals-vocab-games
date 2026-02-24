export const resourceQuests = [
    {
        id: 1,
        title: "Time to Build!",
        goal: "Make a Wood Pickaxe 🪓",
        requirements: { wood: 3 },
        steps: [
            {
                text: "You found 2 big trees 🌳🌳! Each tree drops 4 blocks of wood 🪵. How much wood did you get?",
                math: { type: 'multiply', numbers: [2, 4], answer: 8 },
                reward: { item: 'wood', amount: 8 }
            },
            {
                text: "Oh no! A Creeper 💥 blew up 2 of your wood blocks! How much wood do you have left?",
                math: { type: 'subtract', numbers: [8, 2], answer: 6 },
                reward: { item: 'wood', amount: -2 }
            }
        ],
        crafting: {
            recipeCost: { wood: 3 },
            question: "You have 6 wood 🪵. A Wood Pickaxe 🪓 costs 3 wood. If you make it, how much wood will you have left?",
            finalMath: { answer: 3 }
        }
    },
    {
        id: 2,
        title: "Into the Cave!",
        goal: "Make a Stone Sword ⚔️ and a Furnace 🔥",
        requirements: { stone: 10, wood: 2 },
        steps: [
            {
                text: "You go deep into a cave 🕳️. You find 3 piles of stone 🪨. Each pile has 5 stone blocks. How much stone did you get?",
                math: { type: 'multiply', numbers: [3, 5], answer: 15 },
                reward: { item: 'stone', amount: 15 }
            },
            {
                text: "You need sticks for your sword ⚔️! You have 8 wood pieces. You use half of them to make sticks. How many wood pieces do you still have?",
                math: { type: 'divide', numbers: [8, 2], answer: 4 },
                reward: { item: 'wood', amount: 4 }
            }
        ],
        crafting: {
            recipeCost: { stone: 10, wood: 2 },
            question: "You have 15 stone 🪨 and 4 wood 🪵. A Sword ⚔️ costs 2 stone and 1 wood. A Furnace 🔥 costs 8 stone. That's 10 stone and 1 wood in total. After you make both, how much STONE is left?",
            finalMath: { answer: 5 }
        }
    },
    {
        id: 3,
        title: "Iron Time! ⛏️",
        goal: "Make a Full Set of Iron Armor 🛡️",
        requirements: { iron: 24 },
        steps: [
            {
                text: "You found a huge crack in the ground! There are 4 spots with iron ⛓️ inside. Each spot gives you 7 iron. How much iron did you get?",
                math: { type: 'multiply', numbers: [4, 7], answer: 28 },
                reward: { item: 'iron', amount: 28 }
            },
            {
                text: "Oh no! You fell in lava 🌋 and lost 3 iron! You got out fast. How much iron do you have now?",
                math: { type: 'subtract', numbers: [28, 3], answer: 25 },
                reward: { item: 'iron', amount: -3 }
            }
        ],
        crafting: {
            recipeCost: { iron: 24 },
            question: "A full set of Iron Armor 🛡️ needs 24 iron ⛓️. You have 25 iron. If you make the armor, how much iron do you have left?",
            finalMath: { answer: 1 }
        }
    },
    {
        id: 4,
        title: "Diamond Hunt! 💎",
        goal: "Make a Diamond Pickaxe ⛏️ and Diamond Sword ⚔️",
        requirements: { diamond: 5, wood: 4 },
        steps: [
            {
                text: "You find a secret room 🏰! There are 3 treasure chests 🧰. Each chest has 2 diamonds 💎 inside. How many diamonds did you find?",
                math: { type: 'multiply', numbers: [3, 2], answer: 6 },
                reward: { item: 'diamond', amount: 6 }
            },
            {
                text: "You need wood for handles! You chop 3 trees 🌳, and get 5 wood 🪵 from each. You also had 1 wood in your pocket. How much wood do you have in total?",
                math: { type: 'complex', numbers: [3, 5, 1], answer: 16 },
                reward: { item: 'wood', amount: 16 }
            }
        ],
        crafting: {
            recipeCost: { diamond: 5, wood: 4 },
            question: "A Pickaxe ⛏️ costs 3 diamonds 💎 and 2 wood 🪵. A Sword ⚔️ costs 2 diamonds and 1 wood. That's 5 diamonds and 3 wood in total. You have 6 diamonds. After you make both, how many DIAMONDS are left?",
            finalMath: { answer: 1 }
        }
    }
];
