'use client';
import React from 'react';
import PixelGrid from './PixelGrid';

// Characters
import { STEVE, STEVE_MINING, STEVE_FISHING, STEVE_SCARED, VILLAGER } from './sprites/characters';
// Mobs
import { CREEPER, ENDERMAN, BLAZE, DRAGON, SHEEP, CAT } from './sprites/mobs';
// Tools
import { PICKAXE_WOOD, PICKAXE_DIAMOND, SWORD_STONE, SWORD_DIAMOND, SHIELD, HELMET, ARMOR, FISHING_ROD, TORCH, ARROW_ITEM } from './sprites/tools';
// Items
import { POTION, EYE_OF_ENDER, BLAZE_ROD, BREAD, PEARL, FISH, WHEAT_ITEM, DRAGON_EGG } from './sprites/items';
// Blocks
import { WOOD_BLOCK, STONE_BLOCK, IRON_BLOCK, DIAMOND_BLOCK, COAL_BLOCK, OBSIDIAN_BLOCK, REDSTONE_BLOCK, CHEST, PORTAL_FRAME } from './sprites/blocks';
// Environment
import { TREE, FIRE, EXPLOSION, HOUSE, PORTAL, FLOWER_RED, FLOWER_BLUE } from './sprites/environment';
// Effects
import { SPARKLE, ARROW_RIGHT, POOF, RAIN, HEART, CROWN } from './sprites/effects';

const SPRITE_MAP = {
    // Characters
    'steve': { pixels: STEVE, cellSize: 5 },
    'steve-mining': { pixels: STEVE_MINING, cellSize: 5 },
    'steve-fishing': { pixels: STEVE_FISHING, cellSize: 5 },
    'steve-scared': { pixels: STEVE_SCARED, cellSize: 5 },
    'villager': { pixels: VILLAGER, cellSize: 5 },
    // Mobs
    'creeper': { pixels: CREEPER, cellSize: 5 },
    'enderman': { pixels: ENDERMAN, cellSize: 4 },
    'blaze': { pixels: BLAZE, cellSize: 5 },
    'dragon': { pixels: DRAGON, cellSize: 5 },
    'sheep': { pixels: SHEEP, cellSize: 5 },
    'cat': { pixels: CAT, cellSize: 5 },
    // Tools (smaller)
    'pickaxe-wood': { pixels: PICKAXE_WOOD, cellSize: 4 },
    'pickaxe-diamond': { pixels: PICKAXE_DIAMOND, cellSize: 4 },
    'sword-stone': { pixels: SWORD_STONE, cellSize: 4 },
    'sword-diamond': { pixels: SWORD_DIAMOND, cellSize: 4 },
    'shield': { pixels: SHIELD, cellSize: 4 },
    'helmet': { pixels: HELMET, cellSize: 4 },
    'armor': { pixels: ARMOR, cellSize: 4 },
    'fishing-rod': { pixels: FISHING_ROD, cellSize: 4 },
    'torch': { pixels: TORCH, cellSize: 4 },
    'arrow-item': { pixels: ARROW_ITEM, cellSize: 4 },
    // Items (smaller)
    'potion': { pixels: POTION, cellSize: 4 },
    'eye-of-ender': { pixels: EYE_OF_ENDER, cellSize: 4 },
    'blaze-rod': { pixels: BLAZE_ROD, cellSize: 4 },
    'bread': { pixels: BREAD, cellSize: 4 },
    'pearl': { pixels: PEARL, cellSize: 4 },
    'fish': { pixels: FISH, cellSize: 4 },
    'wheat-item': { pixels: WHEAT_ITEM, cellSize: 4 },
    'dragon-egg': { pixels: DRAGON_EGG, cellSize: 5 },
    // Blocks
    'wood-block': { pixels: WOOD_BLOCK, cellSize: 4 },
    'stone-block': { pixels: STONE_BLOCK, cellSize: 4 },
    'iron-block': { pixels: IRON_BLOCK, cellSize: 4 },
    'diamond-block': { pixels: DIAMOND_BLOCK, cellSize: 4 },
    'coal-block': { pixels: COAL_BLOCK, cellSize: 4 },
    'obsidian-block': { pixels: OBSIDIAN_BLOCK, cellSize: 4 },
    'redstone-block': { pixels: REDSTONE_BLOCK, cellSize: 4 },
    'chest': { pixels: CHEST, cellSize: 4 },
    'portal-frame': { pixels: PORTAL_FRAME, cellSize: 4 },
    // Environment
    'tree': { pixels: TREE, cellSize: 4 },
    'fire': { pixels: FIRE, cellSize: 4 },
    'explosion': { pixels: EXPLOSION, cellSize: 4 },
    'house': { pixels: HOUSE, cellSize: 5 },
    'portal': { pixels: PORTAL, cellSize: 4 },
    'flower-red': { pixels: FLOWER_RED, cellSize: 3 },
    'flower-blue': { pixels: FLOWER_BLUE, cellSize: 3 },
    // Effects
    'sparkle': { pixels: SPARKLE, cellSize: 3 },
    'arrow-right': { pixels: ARROW_RIGHT, cellSize: 3 },
    'poof': { pixels: POOF, cellSize: 3 },
    'rain': { pixels: RAIN, cellSize: 4 },
    'heart': { pixels: HEART, cellSize: 3 },
    'crown': { pixels: CROWN, cellSize: 4 },
};

const SpriteRenderer = React.memo(function SpriteRenderer({ sprite, scale = 1, flip = false }) {
    const data = SPRITE_MAP[sprite];
    if (!data) return null;

    const effectiveCellSize = Math.round(data.cellSize * scale);

    return (
        <div style={{
            display: 'inline-block',
            transform: flip ? 'scaleX(-1)' : undefined,
        }}>
            <PixelGrid pixels={data.pixels} cellSize={effectiveCellSize} />
        </div>
    );
});

export default SpriteRenderer;
