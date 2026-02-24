export const resourceQuests = [
    {
        id: 1,
        title: "Time to Build!",
        goal: "Make a Wood Pickaxe 🪓",
        requirements: { wood: 3 },
        steps: [
            {
                text: "You found 2 big trees 🌳🌳! Each tree drops 4 blocks of wood 🪵. How much wood did you get?",
                visual: { sceneId: 'q1-s1' },
                math: { type: 'multiply', numbers: [2, 4], answer: 8 },
                reward: { item: 'wood', amount: 8 }
            },
            {
                text: "Oh no! A Creeper 💥 blew up 2 of your wood blocks! How much wood do you have left?",
                visual: { sceneId: 'q1-s2' },
                math: { type: 'subtract', numbers: [8, 2], answer: 6 },
                reward: { item: 'wood', amount: -2 }
            }
        ],
        crafting: {
            recipeCost: { wood: 3 },
            question: "You have 6 wood 🪵. A Wood Pickaxe 🪓 costs 3 wood. If you make it, how much wood will you have left?",
            visual: { sceneId: 'q1-c' },
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
                visual: { sceneId: 'q2-s1' },
                math: { type: 'multiply', numbers: [3, 5], answer: 15 },
                reward: { item: 'stone', amount: 15 }
            },
            {
                text: "You need sticks for your sword ⚔️! You have 8 wood pieces. You use half of them to make sticks. How many wood pieces do you still have?",
                visual: { sceneId: 'q2-s2' },
                math: { type: 'divide', numbers: [8, 2], answer: 4 },
                reward: { item: 'wood', amount: 4 }
            }
        ],
        crafting: {
            recipeCost: { stone: 10, wood: 2 },
            question: "You have 15 stone 🪨 and 4 wood 🪵. A Sword ⚔️ costs 2 stone and 1 wood. A Furnace 🔥 costs 8 stone. That's 10 stone and 1 wood in total. After you make both, how much STONE is left?",
            visual: { sceneId: 'q2-c' },
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
                visual: { sceneId: 'q3-s1' },
                math: { type: 'multiply', numbers: [4, 7], answer: 28 },
                reward: { item: 'iron', amount: 28 }
            },
            {
                text: "Oh no! You fell in lava 🌋 and lost 3 iron! You got out fast. How much iron do you have now?",
                visual: { sceneId: 'q3-s2' },
                math: { type: 'subtract', numbers: [28, 3], answer: 25 },
                reward: { item: 'iron', amount: -3 }
            }
        ],
        crafting: {
            recipeCost: { iron: 24 },
            question: "A full set of Iron Armor 🛡️ needs 24 iron ⛓️. You have 25 iron. If you make the armor, how much iron do you have left?",
            visual: { sceneId: 'q3-c' },
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
                visual: { sceneId: 'q4-s1' },
                math: { type: 'multiply', numbers: [3, 2], answer: 6 },
                reward: { item: 'diamond', amount: 6 }
            },
            {
                text: "You need wood for handles! You chop 3 trees 🌳, and get 5 wood 🪵 from each. You also had 1 wood in your pocket. How much wood do you have in total?",
                visual: { sceneId: 'q4-s2' },
                math: { type: 'complex', numbers: [3, 5, 1], answer: 16 },
                reward: { item: 'wood', amount: 16 }
            }
        ],
        crafting: {
            recipeCost: { diamond: 5, wood: 4 },
            question: "A Pickaxe ⛏️ costs 3 diamonds 💎 and 2 wood 🪵. A Sword ⚔️ costs 2 diamonds and 1 wood. That's 5 diamonds and 3 wood in total. You have 6 diamonds. After you make both, how many DIAMONDS are left?",
            visual: { sceneId: 'q4-c' },
            finalMath: { answer: 1 }
        }
    },
    {
        id: 5,
        title: "Build a House!",
        goal: "Make a Wooden House 🏠",
        requirements: { wood: 20 },
        steps: [
            {
                text: "You chop 5 big trees 🌳! Each tree gives you 6 wood 🪵. How much wood did you get?",
                visual: { sceneId: 'q5-s1' },
                math: { type: 'multiply', numbers: [5, 6], answer: 30 },
                reward: { item: 'wood', amount: 30 }
            },
            {
                text: "It rained 🌧️ and 4 wood blocks got wet and broke! How much wood do you have now?",
                visual: { sceneId: 'q5-s2' },
                math: { type: 'subtract', numbers: [30, 4], answer: 26 },
                reward: { item: 'wood', amount: -4 }
            }
        ],
        crafting: {
            recipeCost: { wood: 20 },
            question: "A house 🏠 needs 20 wood 🪵. You have 26 wood. How much wood is left after you build it?",
            visual: { sceneId: 'q5-c' },
            finalMath: { answer: 6 }
        }
    },
    {
        id: 6,
        title: "Coal for Torches!",
        goal: "Make Torches 🔦",
        inventoryLabels: { stone: { icon: '⬛', label: 'Coal' } },
        requirements: { stone: 5 },
        steps: [
            {
                text: "You found 2 big piles of coal ⬛! Each pile has 8 coal blocks. How much coal did you get?",
                visual: { sceneId: 'q6-s1' },
                math: { type: 'multiply', numbers: [2, 8], answer: 16 },
                reward: { item: 'stone', amount: 16 }
            },
            {
                text: "You need sticks! You have 10 wood 🪵. You cut them in half to make sticks. How many sticks did you get?",
                visual: { sceneId: 'q6-s2' },
                math: { type: 'divide', numbers: [10, 2], answer: 5 },
                reward: { item: 'wood', amount: 5 }
            }
        ],
        crafting: {
            recipeCost: { stone: 5 },
            question: "Each torch 🔦 needs 1 coal and 1 stick. You make 5 torches. You had 16 coal. How much coal is left?",
            visual: { sceneId: 'q6-c' },
            finalMath: { answer: 11 }
        }
    },
    {
        id: 7,
        title: "Shield Up!",
        goal: "Make a Shield 🛡️ and a Helmet ⛑️",
        requirements: { iron: 11 },
        steps: [
            {
                text: "You mine 6 spots in a cave 🕳️. Each spot has 3 iron ⛓️. How much iron did you get?",
                visual: { sceneId: 'q7-s1' },
                math: { type: 'multiply', numbers: [6, 3], answer: 18 },
                reward: { item: 'iron', amount: 18 }
            },
            {
                text: "You find a bonus chest 🧰 with 4 extra iron inside! How much iron do you have now?",
                visual: { sceneId: 'q7-s2' },
                math: { type: 'add', numbers: [18, 4], answer: 22 },
                reward: { item: 'iron', amount: 4 }
            }
        ],
        crafting: {
            recipeCost: { iron: 11 },
            question: "A Shield 🛡️ costs 6 iron. A Helmet ⛑️ costs 5 iron. That's 11 iron total. You have 22 iron. How much iron is left?",
            visual: { sceneId: 'q7-c' },
            finalMath: { answer: 11 }
        }
    },
    {
        id: 8,
        title: "Fishing Trip!",
        goal: "Catch and Cook Fish 🐟",
        inventoryLabels: { diamond: { icon: '🐟', label: 'Fish' } },
        requirements: { diamond: 6 },
        steps: [
            {
                text: "You go fishing 🎣! You catch 3 fish every hour for 4 hours. How many fish did you catch?",
                visual: { sceneId: 'q8-s1' },
                math: { type: 'multiply', numbers: [3, 4], answer: 12 },
                reward: { item: 'diamond', amount: 12 }
            },
            {
                text: "A sneaky cat 🐱 stole 5 of your fish! How many fish do you have left?",
                visual: { sceneId: 'q8-s2' },
                math: { type: 'subtract', numbers: [12, 5], answer: 7 },
                reward: { item: 'diamond', amount: -5 }
            }
        ],
        crafting: {
            recipeCost: { diamond: 6 },
            question: "You want to cook 6 fish 🐟 on the fire 🔥. You have 7 fish. How many fish are left after cooking?",
            visual: { sceneId: 'q8-c' },
            finalMath: { answer: 1 }
        }
    },
    {
        id: 9,
        title: "Farm Time!",
        goal: "Grow Wheat and Make Bread 🍞",
        inventoryLabels: { wood: { icon: '🌾', label: 'Wheat' } },
        requirements: { wood: 24 },
        steps: [
            {
                text: "You plant 4 rows of wheat 🌾. Each row has 8 wheat. How much wheat did you grow?",
                visual: { sceneId: 'q9-s1' },
                math: { type: 'multiply', numbers: [4, 8], answer: 32 },
                reward: { item: 'wood', amount: 32 }
            },
            {
                text: "Some sheep 🐑🐑 ate 7 of your wheat! How much wheat do you have left?",
                visual: { sceneId: 'q9-s2' },
                math: { type: 'subtract', numbers: [32, 7], answer: 25 },
                reward: { item: 'wood', amount: -7 }
            }
        ],
        crafting: {
            recipeCost: { wood: 24 },
            question: "Each bread 🍞 needs 3 wheat. You make 8 loaves! That's 24 wheat. You have 25 wheat. How much wheat is left?",
            visual: { sceneId: 'q9-c' },
            finalMath: { answer: 1 }
        }
    },
    {
        id: 10,
        title: "Red Dust Power!",
        goal: "Build a Red Dust Door 🚪",
        inventoryLabels: { stone: { icon: '🔴', label: 'Red Dust' } },
        requirements: { stone: 6 },
        steps: [
            {
                text: "You mine 7 blocks. Each one has 2 pieces of red dust 🔴 inside. How much red dust did you get?",
                visual: { sceneId: 'q10-s1' },
                math: { type: 'multiply', numbers: [7, 2], answer: 14 },
                reward: { item: 'stone', amount: 14 }
            },
            {
                text: "You also need iron! You find 10 iron ⛓️ and share half with your friend. How many iron do you keep?",
                visual: { sceneId: 'q10-s2' },
                math: { type: 'divide', numbers: [10, 2], answer: 5 },
                reward: { item: 'iron', amount: 5 }
            }
        ],
        crafting: {
            recipeCost: { stone: 6 },
            question: "A Red Dust Door 🚪 needs 6 red dust and 4 iron. You have 14 red dust. How much red dust is left after you build it?",
            visual: { sceneId: 'q10-c' },
            finalMath: { answer: 8 }
        }
    },
    {
        id: 11,
        title: "Go to the Nether!",
        goal: "Make a Nether Portal 🟣",
        inventoryLabels: { stone: { icon: '⬛', label: 'Dark Stone' } },
        requirements: { stone: 10 },
        steps: [
            {
                text: "You need dark stone ⬛ for the portal! You find 5 piles with 4 blocks each. How many blocks did you get?",
                visual: { sceneId: 'q11-s1' },
                math: { type: 'multiply', numbers: [5, 4], answer: 20 },
                reward: { item: 'stone', amount: 20 }
            },
            {
                text: "You drop 6 blocks in a river 🌊! They sink! How many do you have left?",
                visual: { sceneId: 'q11-s2' },
                math: { type: 'subtract', numbers: [20, 6], answer: 14 },
                reward: { item: 'stone', amount: -6 }
            }
        ],
        crafting: {
            recipeCost: { stone: 10 },
            question: "A Nether Portal 🟣 needs 10 dark stone blocks and some fire 🔥. You have 14 blocks. How many are left after you build it?",
            visual: { sceneId: 'q11-c' },
            finalMath: { answer: 4 }
        }
    },
    {
        id: 12,
        title: "Nether Adventure!",
        goal: "Get Blaze Rods 🔥",
        inventoryLabels: { iron: { icon: '🥢', label: 'Rods' } },
        requirements: { iron: 6 },
        steps: [
            {
                text: "You fight 3 fire monsters 🔥! Each one drops 2 blaze rods 🥢. How many rods did you get?",
                visual: { sceneId: 'q12-s1' },
                math: { type: 'multiply', numbers: [3, 2], answer: 6 },
                reward: { item: 'iron', amount: 6 }
            },
            {
                text: "You find a chest 🧰 with 4 more rods inside! How many rods do you have now?",
                visual: { sceneId: 'q12-s2' },
                math: { type: 'add', numbers: [6, 4], answer: 10 },
                reward: { item: 'iron', amount: 4 }
            }
        ],
        crafting: {
            recipeCost: { iron: 6 },
            question: "You need 6 rods 🥢 to make blaze powder 🧪. You have 10 rods. How many rods are left?",
            visual: { sceneId: 'q12-c' },
            finalMath: { answer: 4 }
        }
    },
    {
        id: 13,
        title: "Ender Pearls!",
        goal: "Collect Ender Pearls 🟢",
        inventoryLabels: { diamond: { icon: '🟢', label: 'Pearls' } },
        requirements: { diamond: 4 },
        steps: [
            {
                text: "You fight 8 tall dark monsters 👾! Half of them drop a pearl 🟢. How many pearls did you get?",
                visual: { sceneId: 'q13-s1' },
                math: { type: 'divide', numbers: [8, 2], answer: 4 },
                reward: { item: 'diamond', amount: 4 }
            },
            {
                text: "A friendly villager 🧑‍🌾 gives you 3 more pearls as a gift! How many pearls do you have now?",
                visual: { sceneId: 'q13-s2' },
                math: { type: 'add', numbers: [4, 3], answer: 7 },
                reward: { item: 'diamond', amount: 3 }
            }
        ],
        crafting: {
            recipeCost: { diamond: 4 },
            question: "You use 4 pearls 🟢 to make Eyes of Ender 👁️. You have 7 pearls. How many pearls are left?",
            visual: { sceneId: 'q13-c' },
            finalMath: { answer: 3 }
        }
    },
    {
        id: 14,
        title: "Potion Brewing!",
        goal: "Brew Healing Potions 🧪",
        inventoryLabels: { wood: { icon: '💧', label: 'Drops' } },
        requirements: { wood: 9 },
        steps: [
            {
                text: "You pick 6 pretty flowers 🌸🌺🌻🌼🌷🌹! Each flower gives 2 magic drops 💧. How many drops did you get?",
                visual: { sceneId: 'q14-s1' },
                math: { type: 'multiply', numbers: [6, 2], answer: 12 },
                reward: { item: 'wood', amount: 12 }
            },
            {
                text: "Oops! You spill 3 drops 💧 on the floor! How many drops do you have left?",
                visual: { sceneId: 'q14-s2' },
                math: { type: 'subtract', numbers: [12, 3], answer: 9 },
                reward: { item: 'wood', amount: -3 }
            }
        ],
        crafting: {
            recipeCost: { wood: 9 },
            question: "Each potion 🧪 needs 3 drops. You have 9 drops. How many potions can you make?",
            visual: { sceneId: 'q14-c' },
            finalMath: { answer: 3 }
        }
    },
    {
        id: 15,
        title: "Find the Stronghold!",
        goal: "Open the End Portal 🌀",
        inventoryLabels: { diamond: { icon: '👁️', label: 'Eyes' } },
        requirements: { diamond: 7 },
        steps: [
            {
                text: "You throw 4 Eyes of Ender 👁️! Each one flies 3 blocks. How far did they fly in total?",
                visual: { sceneId: 'q15-s1' },
                math: { type: 'multiply', numbers: [4, 3], answer: 12 },
                reward: { item: 'stone', amount: 12 }
            },
            {
                text: "You find the portal frame! It has 12 slots. 5 slots are already full. How many empty slots are there?",
                visual: { sceneId: 'q15-s2' },
                math: { type: 'subtract', numbers: [12, 5], answer: 7 },
                reward: { item: 'diamond', amount: 7 }
            }
        ],
        crafting: {
            recipeCost: { diamond: 7 },
            question: "You need to fill 7 empty slots with Eyes of Ender 👁️. You have 7 eyes. How many eyes are left after filling them all?",
            visual: { sceneId: 'q15-c' },
            finalMath: { answer: 0 }
        }
    },
    {
        id: 16,
        title: "Beat the Ender Dragon!",
        goal: "Win the Game! 🐉",
        inventoryLabels: { iron: { icon: '🏹', label: 'Arrows' }, diamond: { icon: '💥', label: 'Damage' } },
        requirements: { iron: 18 },
        steps: [
            {
                text: "You shoot 9 arrows 🏹 at the dragon 🐉! Each arrow does 2 damage 💥. How much total damage?",
                visual: { sceneId: 'q16-s1' },
                math: { type: 'multiply', numbers: [9, 2], answer: 18 },
                reward: { item: 'iron', amount: 18 }
            },
            {
                text: "Your friend helps! You did 18 damage and your friend did 32 damage. How much damage together?",
                visual: { sceneId: 'q16-s2' },
                math: { type: 'add', numbers: [18, 32], answer: 50 },
                reward: { item: 'diamond', amount: 50 }
            }
        ],
        crafting: {
            recipeCost: { diamond: 25 },
            question: "The dragon drops a special egg 🥚! You and your friend share 50 gems 💎. You each get half. How many gems do you get?",
            visual: { sceneId: 'q16-c' },
            finalMath: { answer: 25 }
        }
    }
];
