export const resourceQuests = [
    {
        id: 1,
        title: "The Basics of Survival",
        goal: "Craft a Wooden Pickaxe",
        requirements: { wood: 3 },
        steps: [
            {
                text: "You found 2 Oak Trees. Each tree drops 4 wood blocks. How much wood did you get?",
                math: { type: 'multiply', numbers: [2, 4], answer: 8 },
                reward: { item: 'wood', amount: 8 }
            },
            {
                text: "A Creeper blew up 2 of your wood blocks! How much wood do you have left?",
                math: { type: 'subtract', numbers: [8, 2], answer: 6 },
                reward: { item: 'wood', amount: -2 }
            }
        ],
        crafting: {
            recipeCost: { wood: 3 },
            question: "You have 6 wood. A Wooden Pickaxe costs 3 wood. If you craft it, how much wood will you have left over?",
            finalMath: { answer: 3 }
        }
    },
    {
        id: 2,
        title: "Into the Mines",
        goal: "Craft a Stone Sword and a Furnace",
        requirements: { stone: 10, wood: 2 },
        steps: [
            {
                text: "You are deep in a cave. You mine 3 clusters of stone. Each cluster has 5 stone blocks. How much stone did you mine?",
                math: { type: 'multiply', numbers: [3, 5], answer: 15 },
                reward: { item: 'stone', amount: 15 }
            },
            {
                text: "You need sticks for your sword. You have 8 wood planks. You turn half of them into sticks. How many wood planks do you still have?",
                math: { type: 'divide', numbers: [8, 2], answer: 4 },
                reward: { item: 'wood', amount: 4 } // For simplicity we just award wood instead of complex sub-items
            }
        ],
        crafting: {
            recipeCost: { stone: 10, wood: 2 },
            question: "You have 15 stone and 4 wood. A Sword costs 2 stone/1 wood. A Furnace costs 8 stone. Total cost: 10 stone, 1 wood. After crafting both, how much STONE is left?",
            finalMath: { answer: 5 } // 15 - 10
        }
    },
    {
        id: 3,
        title: "The Iron Age",
        goal: "Craft Full Iron Armor",
        requirements: { iron: 24 },
        steps: [
            {
                text: "You found a massive ravine! There are 4 veins of iron. Each vein gives you 7 raw iron. How much raw iron did you collect?",
                math: { type: 'multiply', numbers: [4, 7], answer: 28 },
                reward: { item: 'iron', amount: 28 } // Assuming smellting is automatic for the math puzzle
            },
            {
                text: "Oh no! You fell in lava and lost 3 iron! You quickly climbed out. How much iron do you have now?",
                math: { type: 'subtract', numbers: [28, 3], answer: 25 },
                reward: { item: 'iron', amount: -3 }
            }
        ],
        crafting: {
            recipeCost: { iron: 24 },
            question: "Full Iron Armor requires 24 iron ingots. You currently have 25 iron. If you craft the full set, how much iron do you have left?",
            finalMath: { answer: 1 }
        }
    },
    {
        id: 4,
        title: "Diamond Heist",
        goal: "Craft a Diamond Pickaxe and Diamond Sword",
        requirements: { diamond: 5, wood: 4 },
        steps: [
            {
                text: "You are exploring a stronghold. You open 3 chests. Each chest contains 2 diamonds. How many diamonds did you find?",
                math: { type: 'multiply', numbers: [3, 2], answer: 6 },
                reward: { item: 'diamond', amount: 6 }
            },
            {
                text: "You need wood for handles! You chop 3 trees, getting 5 wood from each. You already had 1 wood in your pocket. How much wood do you have in total?",
                math: { type: 'complex', numbers: [3, 5, 1], answer: 16 }, // (3*5) + 1
                reward: { item: 'wood', amount: 16 }
            }
        ],
        crafting: {
            recipeCost: { diamond: 5, wood: 4 },
            question: "A Pickaxe costs 3 diamonds & 2 wood. A Sword costs 2 diamonds & 1 wood. Total cost: 5 diamonds, 3 wood. You have 6 diamonds. After crafting, how many DIAMONDS remain?",
            finalMath: { answer: 1 } // 6-5
        }
    }
];
