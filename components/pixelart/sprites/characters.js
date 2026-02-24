// Pixel art character sprites for Minecraft-themed vocabulary games
// Each sprite is a 2D array of hex color strings. null = transparent pixel.
// Renders at ~4-5px per cell (64-80px on screen).

const _ = null;

// Color palette
const HAIR = '#4A3728';
const SKIN = '#C8956C';
const EYE_W = '#FFFFFF';
const PUPIL = '#3C2415';
const SHIRT = '#3C8AC4';
const PANTS = '#525252';
const SHOE = '#3B3B3B';
const HANDLE = '#6B4E0A';
const PICK_HEAD = '#7F7F7F';
const LINE = '#999999';
const MOUTH = '#8B4513';
const ROBE = '#7B5B3A';
const GREEN_EYE = '#47A025';

// ---------------------------------------------------------------------------
// 1. STEVE — 16x16 standing idle
// ---------------------------------------------------------------------------
export const STEVE = [
  // Row 0: top of hair
  [_, _, _, _, _, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, _, _, _, _, _],
  // Row 1: hair full width
  [_, _, _, _, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, _, _, _, _],
  // Row 2: hair + forehead
  [_, _, _, _, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, _, _, _, _],
  // Row 3: hair sides, skin forehead
  [_, _, _, _, HAIR, SKIN, SKIN, SKIN, SKIN, SKIN, SKIN, HAIR, _, _, _, _],
  // Row 4: face with eyes
  [_, _, _, _, HAIR, SKIN, EYE_W, PUPIL, SKIN, EYE_W, PUPIL, HAIR, _, _, _, _],
  // Row 5: face — nose/mouth area
  [_, _, _, _, HAIR, SKIN, SKIN, SKIN, SKIN, SKIN, SKIN, HAIR, _, _, _, _],
  // Row 6: face — chin
  [_, _, _, _, _, SKIN, SKIN, SKIN, SKIN, SKIN, SKIN, _, _, _, _, _],
  // Row 7: neck
  [_, _, _, _, _, _, SKIN, SKIN, SKIN, SKIN, _, _, _, _, _, _],
  // Row 8: shoulders + shirt
  [_, _, _, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, _, _, _],
  // Row 9: arms + torso
  [_, _, _, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, _, _, _],
  // Row 10: arms + torso
  [_, _, _, SKIN, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SKIN, _, _, _],
  // Row 11: hands + lower torso
  [_, _, _, SKIN, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SKIN, _, _, _],
  // Row 12: pants
  [_, _, _, _, _, PANTS, PANTS, PANTS, PANTS, PANTS, PANTS, _, _, _, _, _],
  // Row 13: pants
  [_, _, _, _, _, PANTS, PANTS, _, _, PANTS, PANTS, _, _, _, _, _],
  // Row 14: shoes
  [_, _, _, _, _, SHOE, SHOE, _, _, SHOE, SHOE, _, _, _, _, _],
  // Row 15: shoes
  [_, _, _, _, SHOE, SHOE, SHOE, _, _, SHOE, SHOE, SHOE, _, _, _, _],
];

// ---------------------------------------------------------------------------
// 2. STEVE_MINING — 16x16 Steve with right arm raised, swinging pickaxe
// ---------------------------------------------------------------------------
export const STEVE_MINING = [
  // Row 0: pickaxe head above raised arm
  [_, _, _, _, _, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, _, PICK_HEAD, PICK_HEAD, _, _],
  // Row 1: hair + handle leading to pick
  [_, _, _, _, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, _, HANDLE, _, _],
  // Row 2: hair
  [_, _, _, _, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, HANDLE, _, _, _],
  // Row 3: forehead + arm reaching up
  [_, _, _, _, HAIR, SKIN, SKIN, SKIN, SKIN, SKIN, SKIN, HAIR, SKIN, _, _, _],
  // Row 4: face with eyes
  [_, _, _, _, HAIR, SKIN, EYE_W, PUPIL, SKIN, EYE_W, PUPIL, HAIR, SHIRT, _, _, _],
  // Row 5: face
  [_, _, _, _, HAIR, SKIN, SKIN, SKIN, SKIN, SKIN, SKIN, HAIR, _, _, _, _],
  // Row 6: chin
  [_, _, _, _, _, SKIN, SKIN, SKIN, SKIN, SKIN, SKIN, _, _, _, _, _],
  // Row 7: neck
  [_, _, _, _, _, _, SKIN, SKIN, SKIN, SKIN, _, _, _, _, _, _],
  // Row 8: shoulders + shirt (right arm raised)
  [_, _, _, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, _, _, _, _],
  // Row 9: torso
  [_, _, _, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, _, _, _, _],
  // Row 10: left arm + torso (no right arm here, it's raised)
  [_, _, _, SKIN, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, _, _, _, _],
  // Row 11: left hand + lower torso
  [_, _, _, SKIN, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, _, _, _, _],
  // Row 12: pants
  [_, _, _, _, _, PANTS, PANTS, PANTS, PANTS, PANTS, PANTS, _, _, _, _, _],
  // Row 13: pants legs
  [_, _, _, _, _, PANTS, PANTS, _, _, PANTS, PANTS, _, _, _, _, _],
  // Row 14: shoes
  [_, _, _, _, _, SHOE, SHOE, _, _, SHOE, SHOE, _, _, _, _, _],
  // Row 15: shoes
  [_, _, _, _, SHOE, SHOE, SHOE, _, _, SHOE, SHOE, SHOE, _, _, _, _],
];

// ---------------------------------------------------------------------------
// 3. STEVE_FISHING — 16x16 Steve holding fishing rod to the right
// ---------------------------------------------------------------------------
export const STEVE_FISHING = [
  // Row 0: top of hair
  [_, _, _, _, _, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, _, _, _, _, _],
  // Row 1: hair
  [_, _, _, _, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, _, _, _, _],
  // Row 2: hair
  [_, _, _, _, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, _, _, _, _],
  // Row 3: forehead
  [_, _, _, _, HAIR, SKIN, SKIN, SKIN, SKIN, SKIN, SKIN, HAIR, _, _, _, _],
  // Row 4: face with eyes
  [_, _, _, _, HAIR, SKIN, EYE_W, PUPIL, SKIN, EYE_W, PUPIL, HAIR, _, _, _, _],
  // Row 5: face
  [_, _, _, _, HAIR, SKIN, SKIN, SKIN, SKIN, SKIN, SKIN, HAIR, _, _, _, _],
  // Row 6: chin
  [_, _, _, _, _, SKIN, SKIN, SKIN, SKIN, SKIN, SKIN, _, _, _, _, _],
  // Row 7: neck
  [_, _, _, _, _, _, SKIN, SKIN, SKIN, SKIN, _, _, _, _, _, _],
  // Row 8: shoulders + shirt
  [_, _, _, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, _, _, _],
  // Row 9: torso + right arm forward with rod
  [_, _, _, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SKIN, HANDLE, HANDLE, HANDLE],
  // Row 10: left arm + torso
  [_, _, _, SKIN, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SKIN, _, _, LINE],
  // Row 11: hands + lower torso
  [_, _, _, SKIN, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, _, _, _, LINE],
  // Row 12: pants + fishing line going down
  [_, _, _, _, _, PANTS, PANTS, PANTS, PANTS, PANTS, PANTS, _, _, _, _, LINE],
  // Row 13: pants legs
  [_, _, _, _, _, PANTS, PANTS, _, _, PANTS, PANTS, _, _, _, _, LINE],
  // Row 14: shoes
  [_, _, _, _, _, SHOE, SHOE, _, _, SHOE, SHOE, _, _, _, _, LINE],
  // Row 15: shoes + line end
  [_, _, _, _, SHOE, SHOE, SHOE, _, _, SHOE, SHOE, SHOE, _, _, _, LINE],
];

// ---------------------------------------------------------------------------
// 4. STEVE_SCARED — 16x16 Steve with both arms raised (alarmed)
// ---------------------------------------------------------------------------
export const STEVE_SCARED = [
  // Row 0: hands raised above head
  [_, _, _, SKIN, _, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, _, SKIN, _, _, _],
  // Row 1: arms up + hair
  [_, _, _, SHIRT, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, SHIRT, _, _, _],
  // Row 2: arms up + hair
  [_, _, _, SHIRT, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, SHIRT, _, _, _],
  // Row 3: arms + forehead
  [_, _, _, SHIRT, HAIR, SKIN, SKIN, SKIN, SKIN, SKIN, SKIN, HAIR, SHIRT, _, _, _],
  // Row 4: face with wide eyes
  [_, _, _, _, HAIR, SKIN, EYE_W, PUPIL, SKIN, EYE_W, PUPIL, HAIR, _, _, _, _],
  // Row 5: face with open mouth
  [_, _, _, _, HAIR, SKIN, SKIN, MOUTH, MOUTH, SKIN, SKIN, HAIR, _, _, _, _],
  // Row 6: chin
  [_, _, _, _, _, SKIN, SKIN, SKIN, SKIN, SKIN, SKIN, _, _, _, _, _],
  // Row 7: neck
  [_, _, _, _, _, _, SKIN, SKIN, SKIN, SKIN, _, _, _, _, _, _],
  // Row 8: shirt (no arms, they're raised)
  [_, _, _, _, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, _, _, _, _],
  // Row 9: torso
  [_, _, _, _, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, _, _, _, _],
  // Row 10: torso
  [_, _, _, _, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, _, _, _, _],
  // Row 11: lower torso
  [_, _, _, _, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, SHIRT, _, _, _, _],
  // Row 12: pants
  [_, _, _, _, _, PANTS, PANTS, PANTS, PANTS, PANTS, PANTS, _, _, _, _, _],
  // Row 13: pants legs
  [_, _, _, _, _, PANTS, PANTS, _, _, PANTS, PANTS, _, _, _, _, _],
  // Row 14: shoes
  [_, _, _, _, _, SHOE, SHOE, _, _, SHOE, SHOE, _, _, _, _, _],
  // Row 15: shoes
  [_, _, _, _, SHOE, SHOE, SHOE, _, _, SHOE, SHOE, SHOE, _, _, _, _],
];

// ---------------------------------------------------------------------------
// 5. VILLAGER — 16x16 Minecraft villager with big nose and robe
// ---------------------------------------------------------------------------
export const VILLAGER = [
  // Row 0: top of head (bald with rim)
  [_, _, _, _, _, ROBE, ROBE, ROBE, ROBE, ROBE, ROBE, _, _, _, _, _],
  // Row 1: hood/hat
  [_, _, _, _, ROBE, ROBE, ROBE, ROBE, ROBE, ROBE, ROBE, ROBE, _, _, _, _],
  // Row 2: hood sides + forehead
  [_, _, _, _, ROBE, SKIN, SKIN, SKIN, SKIN, SKIN, SKIN, ROBE, _, _, _, _],
  // Row 3: unibrow
  [_, _, _, _, ROBE, HAIR, HAIR, HAIR, HAIR, HAIR, HAIR, ROBE, _, _, _, _],
  // Row 4: face with green eyes
  [_, _, _, _, ROBE, SKIN, EYE_W, GREEN_EYE, SKIN, EYE_W, GREEN_EYE, ROBE, _, _, _, _],
  // Row 5: face with big nose protruding
  [_, _, _, _, ROBE, SKIN, SKIN, SKIN, SKIN, SKIN, SKIN, ROBE, SKIN, _, _, _],
  // Row 6: nose continues + lower face
  [_, _, _, _, _, SKIN, SKIN, SKIN, SKIN, SKIN, SKIN, _, SKIN, _, _, _],
  // Row 7: chin / neck
  [_, _, _, _, _, _, SKIN, SKIN, SKIN, SKIN, _, _, _, _, _, _],
  // Row 8: robe top — wide
  [_, _, _, ROBE, ROBE, ROBE, ROBE, ROBE, ROBE, ROBE, ROBE, ROBE, ROBE, _, _, _],
  // Row 9: robe with hands clasped (skin in front)
  [_, _, _, ROBE, ROBE, ROBE, SKIN, SKIN, SKIN, SKIN, ROBE, ROBE, ROBE, _, _, _],
  // Row 10: robe body
  [_, _, _, ROBE, ROBE, ROBE, SKIN, SKIN, SKIN, SKIN, ROBE, ROBE, ROBE, _, _, _],
  // Row 11: robe body
  [_, _, _, ROBE, ROBE, ROBE, ROBE, ROBE, ROBE, ROBE, ROBE, ROBE, ROBE, _, _, _],
  // Row 12: robe lower
  [_, _, _, _, ROBE, ROBE, ROBE, ROBE, ROBE, ROBE, ROBE, ROBE, _, _, _, _],
  // Row 13: robe bottom / legs hidden
  [_, _, _, _, ROBE, ROBE, ROBE, _, _, ROBE, ROBE, ROBE, _, _, _, _],
  // Row 14: robe hem
  [_, _, _, _, ROBE, ROBE, ROBE, _, _, ROBE, ROBE, ROBE, _, _, _, _],
  // Row 15: shoes peeking out
  [_, _, _, _, SHOE, SHOE, SHOE, _, _, SHOE, SHOE, SHOE, _, _, _, _],
];
