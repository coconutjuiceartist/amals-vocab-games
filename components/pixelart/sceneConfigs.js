export const sceneConfigs = {
  // ============================================================
  // Quest 1 - Time to Build!
  // ============================================================
  'q1-s1': {
    label: 'Chopping trees',
    background: 'overworld',
    ground: 'grass',
    elements: [
      { sprite: 'steve-mining', x: '8%', y: '32px' },
      { sprite: 'tree', x: '40%', y: '32px' },
      { sprite: 'tree', x: '65%', y: '32px' },
      { sprite: 'wood-block', x: '45%', y: '70px', count: 2 },
    ],
  },
  'q1-s2': {
    label: 'Creeper attack!',
    background: 'overworld',
    ground: 'grass',
    elements: [
      { sprite: 'creeper', x: '40%', y: '32px' },
      { sprite: 'explosion', x: '42%', y: '60px' },
      { sprite: 'steve-scared', x: '10%', y: '32px' },
      { sprite: 'poof', x: '60%', y: '50px' },
    ],
  },
  'q1-c': {
    label: 'Making a pickaxe',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'wood-block', x: '15%', y: '32px', count: 3 },
      { sprite: 'arrow-right', x: '40%', y: '60px' },
      { sprite: 'pickaxe-wood', x: '60%', y: '32px', scale: 1.5 },
      { sprite: 'sparkle', x: '65%', y: '100px' },
    ],
  },

  // ============================================================
  // Quest 2 - Into the Cave!
  // ============================================================
  'q2-s1': {
    label: 'Mining stone',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'steve-mining', x: '8%', y: '32px' },
      { sprite: 'stone-block', x: '35%', y: '36px', count: 3 },
      { sprite: 'stone-block', x: '55%', y: '36px', count: 2 },
    ],
  },
  'q2-s2': {
    label: 'Making sticks',
    background: 'overworld',
    ground: 'grass',
    elements: [
      { sprite: 'steve', x: '8%', y: '32px' },
      { sprite: 'wood-block', x: '35%', y: '32px', count: 4 },
      { sprite: 'arrow-right', x: '55%', y: '55px' },
      { sprite: 'wood-block', x: '70%', y: '50px', count: 2 },
    ],
  },
  'q2-c': {
    label: 'Crafting sword and furnace',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'stone-block', x: '10%', y: '32px', count: 2 },
      { sprite: 'arrow-right', x: '35%', y: '60px' },
      { sprite: 'sword-stone', x: '50%', y: '32px', scale: 1.5 },
      { sprite: 'fire', x: '70%', y: '32px' },
      { sprite: 'sparkle', x: '55%', y: '100px' },
    ],
  },

  // ============================================================
  // Quest 3 - Iron Time!
  // ============================================================
  'q3-s1': {
    label: 'Mining iron',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'steve-mining', x: '8%', y: '32px' },
      { sprite: 'iron-block', x: '35%', y: '32px', count: 2 },
      { sprite: 'iron-block', x: '55%', y: '32px', count: 2 },
      { sprite: 'sparkle', x: '45%', y: '90px' },
    ],
  },
  'q3-s2': {
    label: 'Falling in lava!',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'steve-scared', x: '10%', y: '32px' },
      { sprite: 'fire', x: '40%', y: '32px' },
      { sprite: 'fire', x: '50%', y: '32px' },
      { sprite: 'iron-block', x: '65%', y: '70px' },
      { sprite: 'poof', x: '70%', y: '80px' },
    ],
  },
  'q3-c': {
    label: 'Making armor',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'iron-block', x: '10%', y: '32px', count: 3 },
      { sprite: 'arrow-right', x: '38%', y: '60px' },
      { sprite: 'armor', x: '55%', y: '32px', scale: 1.5 },
      { sprite: 'helmet', x: '65%', y: '70px' },
      { sprite: 'sparkle', x: '60%', y: '110px' },
    ],
  },

  // ============================================================
  // Quest 4 - Diamond Hunt!
  // ============================================================
  'q4-s1': {
    label: 'Opening treasure chests',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'steve', x: '5%', y: '32px' },
      { sprite: 'chest', x: '30%', y: '32px' },
      { sprite: 'chest', x: '50%', y: '32px' },
      { sprite: 'chest', x: '70%', y: '32px' },
      { sprite: 'diamond-block', x: '35%', y: '70px' },
      { sprite: 'diamond-block', x: '55%', y: '75px' },
      { sprite: 'diamond-block', x: '75%', y: '68px' },
      { sprite: 'sparkle', x: '40%', y: '100px' },
    ],
  },
  'q4-s2': {
    label: 'Chopping trees for handles',
    background: 'overworld',
    ground: 'grass',
    elements: [
      { sprite: 'steve-mining', x: '8%', y: '32px' },
      { sprite: 'tree', x: '35%', y: '32px' },
      { sprite: 'tree', x: '55%', y: '32px' },
      { sprite: 'tree', x: '75%', y: '32px' },
      { sprite: 'wood-block', x: '42%', y: '40px' },
    ],
  },
  'q4-c': {
    label: 'Making diamond tools',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'diamond-block', x: '10%', y: '32px', count: 2 },
      { sprite: 'wood-block', x: '22%', y: '32px' },
      { sprite: 'arrow-right', x: '38%', y: '60px' },
      { sprite: 'pickaxe-diamond', x: '55%', y: '32px', scale: 1.5 },
      { sprite: 'sword-diamond', x: '72%', y: '32px', scale: 1.5 },
      { sprite: 'sparkle', x: '60%', y: '110px' },
    ],
  },

  // ============================================================
  // Quest 5 - Build a House!
  // ============================================================
  'q5-s1': {
    label: 'Chopping many trees',
    background: 'overworld',
    ground: 'grass',
    elements: [
      { sprite: 'steve-mining', x: '3%', y: '32px' },
      { sprite: 'tree', x: '20%', y: '32px' },
      { sprite: 'tree', x: '35%', y: '32px' },
      { sprite: 'tree', x: '50%', y: '32px' },
      { sprite: 'tree', x: '65%', y: '32px' },
      { sprite: 'tree', x: '80%', y: '32px' },
    ],
  },
  'q5-s2': {
    label: 'Rain ruining wood',
    background: 'overworld',
    ground: 'grass',
    elements: [
      { sprite: 'rain', x: '20%', y: '120px' },
      { sprite: 'rain', x: '40%', y: '110px' },
      { sprite: 'rain', x: '60%', y: '125px' },
      { sprite: 'wood-block', x: '30%', y: '32px', count: 2 },
      { sprite: 'poof', x: '55%', y: '50px' },
      { sprite: 'steve-scared', x: '8%', y: '32px' },
    ],
  },
  'q5-c': {
    label: 'Building a house',
    background: 'overworld',
    ground: 'grass',
    elements: [
      { sprite: 'wood-block', x: '10%', y: '32px', count: 3 },
      { sprite: 'arrow-right', x: '35%', y: '60px' },
      { sprite: 'house', x: '55%', y: '32px' },
      { sprite: 'sparkle', x: '65%', y: '120px' },
    ],
  },

  // ============================================================
  // Quest 6 - Coal for Torches!
  // ============================================================
  'q6-s1': {
    label: 'Mining coal',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'steve-mining', x: '8%', y: '32px' },
      { sprite: 'coal-block', x: '35%', y: '32px', count: 2 },
      { sprite: 'coal-block', x: '60%', y: '32px', count: 2 },
      { sprite: 'sparkle', x: '50%', y: '80px' },
    ],
  },
  'q6-s2': {
    label: 'Cutting sticks',
    background: 'overworld',
    ground: 'grass',
    elements: [
      { sprite: 'steve', x: '8%', y: '32px' },
      { sprite: 'wood-block', x: '30%', y: '32px', count: 3 },
      { sprite: 'arrow-right', x: '50%', y: '55px' },
      { sprite: 'wood-block', x: '68%', y: '45px', count: 2 },
    ],
  },
  'q6-c': {
    label: 'Making torches',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'coal-block', x: '10%', y: '32px' },
      { sprite: 'wood-block', x: '22%', y: '32px' },
      { sprite: 'arrow-right', x: '38%', y: '60px' },
      { sprite: 'torch', x: '55%', y: '32px', scale: 1.5 },
      { sprite: 'torch', x: '65%', y: '32px', scale: 1.5 },
      { sprite: 'torch', x: '75%', y: '32px', scale: 1.5 },
      { sprite: 'sparkle', x: '60%', y: '100px' },
    ],
  },

  // ============================================================
  // Quest 7 - Shield Up!
  // ============================================================
  'q7-s1': {
    label: 'Mining more iron',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'steve-mining', x: '8%', y: '32px' },
      { sprite: 'iron-block', x: '30%', y: '32px', count: 3 },
      { sprite: 'iron-block', x: '55%', y: '32px', count: 3 },
      { sprite: 'sparkle', x: '45%', y: '80px' },
    ],
  },
  'q7-s2': {
    label: 'Finding bonus chest',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'steve', x: '10%', y: '32px' },
      { sprite: 'chest', x: '45%', y: '32px', scale: 1.2 },
      { sprite: 'sparkle', x: '50%', y: '80px' },
      { sprite: 'sparkle', x: '42%', y: '90px' },
      { sprite: 'iron-block', x: '55%', y: '70px', count: 2 },
    ],
  },
  'q7-c': {
    label: 'Making shield and helmet',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'iron-block', x: '10%', y: '32px', count: 3 },
      { sprite: 'arrow-right', x: '35%', y: '60px' },
      { sprite: 'shield', x: '52%', y: '32px', scale: 1.5 },
      { sprite: 'helmet', x: '70%', y: '32px', scale: 1.5 },
      { sprite: 'sparkle', x: '60%', y: '105px' },
    ],
  },

  // ============================================================
  // Quest 8 - Fishing Trip!
  // ============================================================
  'q8-s1': {
    label: 'Fishing by the water',
    background: 'water',
    ground: 'water',
    elements: [
      { sprite: 'steve-fishing', x: '5%', y: '32px' },
      { sprite: 'fish', x: '45%', y: '20px' },
      { sprite: 'fish', x: '55%', y: '15px' },
      { sprite: 'fish', x: '65%', y: '25px' },
      { sprite: 'sparkle', x: '50%', y: '50px' },
    ],
  },
  'q8-s2': {
    label: 'Cat stealing fish!',
    background: 'overworld',
    ground: 'grass',
    elements: [
      { sprite: 'cat', x: '60%', y: '32px', flip: true },
      { sprite: 'fish', x: '55%', y: '55px' },
      { sprite: 'steve-scared', x: '10%', y: '32px' },
      { sprite: 'poof', x: '50%', y: '60px' },
    ],
  },
  'q8-c': {
    label: 'Cooking fish',
    background: 'overworld',
    ground: 'grass',
    elements: [
      { sprite: 'fish', x: '15%', y: '32px', scale: 1.2 },
      { sprite: 'fire', x: '38%', y: '32px' },
      { sprite: 'arrow-right', x: '52%', y: '60px' },
      { sprite: 'bread', x: '68%', y: '32px', scale: 1.5 },
      { sprite: 'sparkle', x: '72%', y: '100px' },
    ],
  },

  // ============================================================
  // Quest 9 - Farm Time!
  // ============================================================
  'q9-s1': {
    label: 'Growing wheat',
    background: 'farm',
    ground: 'grass',
    elements: [
      { sprite: 'steve', x: '3%', y: '32px' },
      { sprite: 'wheat-item', x: '22%', y: '32px', scale: 1.2 },
      { sprite: 'wheat-item', x: '30%', y: '32px', scale: 1.2 },
      { sprite: 'wheat-item', x: '38%', y: '32px', scale: 1.2 },
      { sprite: 'wheat-item', x: '46%', y: '32px', scale: 1.2 },
      { sprite: 'wheat-item', x: '54%', y: '32px', scale: 1.2 },
      { sprite: 'wheat-item', x: '62%', y: '32px', scale: 1.2 },
      { sprite: 'wheat-item', x: '70%', y: '32px', scale: 1.2 },
      { sprite: 'wheat-item', x: '78%', y: '32px', scale: 1.2 },
    ],
  },
  'q9-s2': {
    label: 'Sheep eating wheat!',
    background: 'farm',
    ground: 'grass',
    elements: [
      { sprite: 'sheep', x: '40%', y: '32px' },
      { sprite: 'sheep', x: '55%', y: '32px' },
      { sprite: 'steve-scared', x: '8%', y: '32px' },
      { sprite: 'wheat-item', x: '68%', y: '32px', scale: 1.2 },
      { sprite: 'poof', x: '45%', y: '60px' },
    ],
  },
  'q9-c': {
    label: 'Baking bread',
    background: 'overworld',
    ground: 'grass',
    elements: [
      { sprite: 'wheat-item', x: '10%', y: '32px', count: 3, scale: 1.2 },
      { sprite: 'arrow-right', x: '38%', y: '60px' },
      { sprite: 'bread', x: '55%', y: '32px', scale: 2 },
      { sprite: 'bread', x: '68%', y: '32px', scale: 2 },
      { sprite: 'sparkle', x: '60%', y: '110px' },
    ],
  },

  // ============================================================
  // Quest 10 - Red Dust Power!
  // ============================================================
  'q10-s1': {
    label: 'Mining redstone',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'steve-mining', x: '8%', y: '32px' },
      { sprite: 'redstone-block', x: '35%', y: '32px', count: 3 },
      { sprite: 'redstone-block', x: '60%', y: '32px', count: 2 },
      { sprite: 'sparkle', x: '50%', y: '80px' },
    ],
  },
  'q10-s2': {
    label: 'Sharing with a friend',
    background: 'overworld',
    ground: 'grass',
    elements: [
      { sprite: 'steve', x: '10%', y: '32px' },
      { sprite: 'villager', x: '55%', y: '32px', flip: true },
      { sprite: 'iron-block', x: '33%', y: '50px', count: 2 },
      { sprite: 'heart', x: '35%', y: '100px' },
    ],
  },
  'q10-c': {
    label: 'Building a redstone door',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'redstone-block', x: '10%', y: '32px', count: 2 },
      { sprite: 'iron-block', x: '25%', y: '32px' },
      { sprite: 'arrow-right', x: '40%', y: '60px' },
      { sprite: 'wood-block', x: '58%', y: '32px', scale: 1.5 },
      { sprite: 'sparkle', x: '62%', y: '90px' },
      { sprite: 'sparkle', x: '68%', y: '100px' },
    ],
  },

  // ============================================================
  // Quest 11 - Go to the Nether!
  // ============================================================
  'q11-s1': {
    label: 'Mining dark stone',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'steve-mining', x: '8%', y: '32px' },
      { sprite: 'obsidian-block', x: '30%', y: '32px', count: 3 },
      { sprite: 'obsidian-block', x: '55%', y: '32px', count: 2 },
      { sprite: 'sparkle', x: '45%', y: '80px' },
    ],
  },
  'q11-s2': {
    label: 'Blocks falling in river!',
    background: 'overworld',
    ground: 'water',
    elements: [
      { sprite: 'steve-scared', x: '8%', y: '32px' },
      { sprite: 'obsidian-block', x: '40%', y: '20px' },
      { sprite: 'obsidian-block', x: '50%', y: '15px' },
      { sprite: 'poof', x: '45%', y: '45px' },
      { sprite: 'poof', x: '55%', y: '40px' },
    ],
  },
  'q11-c': {
    label: 'Making a nether portal',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'obsidian-block', x: '10%', y: '32px', count: 3 },
      { sprite: 'arrow-right', x: '35%', y: '60px' },
      { sprite: 'portal', x: '55%', y: '32px' },
      { sprite: 'sparkle', x: '62%', y: '110px' },
    ],
  },

  // ============================================================
  // Quest 12 - Nether Adventure!
  // ============================================================
  'q12-s1': {
    label: 'Fighting blazes',
    background: 'nether',
    ground: 'nether',
    elements: [
      { sprite: 'steve', x: '5%', y: '32px' },
      { sprite: 'blaze', x: '35%', y: '32px' },
      { sprite: 'blaze', x: '55%', y: '32px' },
      { sprite: 'blaze', x: '75%', y: '32px' },
      { sprite: 'sparkle', x: '40%', y: '100px' },
    ],
  },
  'q12-s2': {
    label: 'Finding blaze rods',
    background: 'nether',
    ground: 'nether',
    elements: [
      { sprite: 'steve', x: '10%', y: '32px' },
      { sprite: 'chest', x: '45%', y: '32px', scale: 1.2 },
      { sprite: 'blaze-rod', x: '50%', y: '70px' },
      { sprite: 'blaze-rod', x: '56%', y: '75px' },
      { sprite: 'sparkle', x: '48%', y: '90px' },
    ],
  },
  'q12-c': {
    label: 'Making blaze powder',
    background: 'nether',
    ground: 'nether',
    elements: [
      { sprite: 'blaze-rod', x: '12%', y: '32px', scale: 1.3, count: 3 },
      { sprite: 'arrow-right', x: '40%', y: '60px' },
      { sprite: 'potion', x: '60%', y: '32px', scale: 1.5 },
      { sprite: 'sparkle', x: '65%', y: '100px' },
    ],
  },

  // ============================================================
  // Quest 13 - Ender Pearls!
  // ============================================================
  'q13-s1': {
    label: 'Fighting endermen',
    background: 'night',
    ground: 'grass',
    elements: [
      { sprite: 'steve', x: '5%', y: '32px' },
      { sprite: 'enderman', x: '35%', y: '32px' },
      { sprite: 'enderman', x: '55%', y: '32px' },
      { sprite: 'enderman', x: '75%', y: '32px' },
      { sprite: 'sparkle', x: '40%', y: '110px' },
    ],
  },
  'q13-s2': {
    label: 'Trading with villager',
    background: 'overworld',
    ground: 'grass',
    elements: [
      { sprite: 'steve', x: '15%', y: '32px' },
      { sprite: 'villager', x: '55%', y: '32px', flip: true },
      { sprite: 'pearl', x: '35%', y: '60px', count: 3 },
      { sprite: 'heart', x: '38%', y: '100px' },
    ],
  },
  'q13-c': {
    label: 'Making eyes of ender',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'pearl', x: '10%', y: '32px', scale: 1.3, count: 2 },
      { sprite: 'arrow-right', x: '35%', y: '60px' },
      { sprite: 'eye-of-ender', x: '55%', y: '32px', scale: 2 },
      { sprite: 'sparkle', x: '60%', y: '100px' },
    ],
  },

  // ============================================================
  // Quest 14 - Potion Brewing!
  // ============================================================
  'q14-s1': {
    label: 'Picking flowers',
    background: 'farm',
    ground: 'grass',
    elements: [
      { sprite: 'steve', x: '5%', y: '32px' },
      { sprite: 'flower-red', x: '25%', y: '32px' },
      { sprite: 'flower-blue', x: '35%', y: '32px' },
      { sprite: 'flower-red', x: '45%', y: '32px' },
      { sprite: 'flower-blue', x: '55%', y: '32px' },
      { sprite: 'flower-red', x: '65%', y: '32px' },
      { sprite: 'flower-blue', x: '75%', y: '32px' },
    ],
  },
  'q14-s2': {
    label: 'Spilling drops',
    background: 'overworld',
    ground: 'grass',
    elements: [
      { sprite: 'steve-scared', x: '10%', y: '32px' },
      { sprite: 'potion', x: '40%', y: '32px', scale: 1.2 },
      { sprite: 'poof', x: '50%', y: '40px' },
      { sprite: 'poof', x: '55%', y: '35px' },
    ],
  },
  'q14-c': {
    label: 'Brewing potions',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'flower-red', x: '8%', y: '32px' },
      { sprite: 'flower-blue', x: '16%', y: '32px' },
      { sprite: 'arrow-right', x: '32%', y: '60px' },
      { sprite: 'potion', x: '48%', y: '32px', scale: 1.8 },
      { sprite: 'potion', x: '62%', y: '32px', scale: 1.8 },
      { sprite: 'potion', x: '76%', y: '32px', scale: 1.8 },
      { sprite: 'sparkle', x: '55%', y: '105px' },
    ],
  },

  // ============================================================
  // Quest 15 - Find the Stronghold!
  // ============================================================
  'q15-s1': {
    label: 'Throwing eyes of ender',
    background: 'overworld',
    ground: 'grass',
    elements: [
      { sprite: 'steve', x: '8%', y: '32px' },
      { sprite: 'eye-of-ender', x: '30%', y: '80px', scale: 1.2 },
      { sprite: 'eye-of-ender', x: '45%', y: '100px', scale: 1.2 },
      { sprite: 'eye-of-ender', x: '60%', y: '110px', scale: 1.2 },
      { sprite: 'eye-of-ender', x: '75%', y: '120px', scale: 1.2 },
    ],
  },
  'q15-s2': {
    label: 'Finding the portal frame',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'steve', x: '5%', y: '32px' },
      { sprite: 'portal-frame', x: '30%', y: '32px', count: 3 },
      { sprite: 'portal-frame', x: '55%', y: '32px', count: 2 },
      { sprite: 'eye-of-ender', x: '32%', y: '70px', count: 2 },
      { sprite: 'sparkle', x: '50%', y: '80px' },
    ],
  },
  'q15-c': {
    label: 'Opening the end portal',
    background: 'cave',
    ground: 'stone',
    elements: [
      { sprite: 'eye-of-ender', x: '8%', y: '32px', scale: 1.2, count: 3 },
      { sprite: 'arrow-right', x: '35%', y: '60px' },
      { sprite: 'portal', x: '55%', y: '32px' },
      { sprite: 'sparkle', x: '58%', y: '110px' },
      { sprite: 'sparkle', x: '65%', y: '120px' },
    ],
  },

  // ============================================================
  // Quest 16 - Beat the Ender Dragon!
  // ============================================================
  'q16-s1': {
    label: 'Shooting the dragon',
    background: 'end',
    ground: 'end',
    elements: [
      { sprite: 'steve', x: '5%', y: '32px' },
      { sprite: 'arrow-item', x: '30%', y: '90px' },
      { sprite: 'arrow-item', x: '40%', y: '100px' },
      { sprite: 'arrow-item', x: '50%', y: '110px' },
      { sprite: 'dragon', x: '60%', y: '60px' },
      { sprite: 'sparkle', x: '65%', y: '110px' },
    ],
  },
  'q16-s2': {
    label: 'Dragon defeated!',
    background: 'end',
    ground: 'end',
    elements: [
      { sprite: 'dragon', x: '35%', y: '40px' },
      { sprite: 'heart', x: '45%', y: '90px' },
      { sprite: 'heart', x: '55%', y: '85px' },
      { sprite: 'heart', x: '65%', y: '95px' },
      { sprite: 'steve', x: '10%', y: '32px' },
      { sprite: 'sparkle', x: '50%', y: '120px' },
    ],
  },
  'q16-c': {
    label: 'Victory!',
    background: 'end',
    ground: 'end',
    elements: [
      { sprite: 'dragon-egg', x: '25%', y: '70px', scale: 1.5 },
      { sprite: 'crown', x: '45%', y: '100px', scale: 1.5 },
      { sprite: 'sparkle', x: '30%', y: '110px' },
      { sprite: 'sparkle', x: '50%', y: '115px' },
      { sprite: 'sparkle', x: '60%', y: '105px' },
      { sprite: 'sparkle', x: '70%', y: '120px' },
      { sprite: 'steve', x: '75%', y: '32px' },
    ],
  },
};
