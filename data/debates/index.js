import { harryPotterDebates } from './harry-potter';
import { historyDebates } from './history';
import { scienceDebates } from './science';
import { ethicsDebates } from './ethics';
import { civicsDebates } from './civics';
import { economicsDebates } from './economics';
import { technologyDebates } from './technology';
import { healthDebates } from './health';
import { artsDebates } from './arts';

export const debateCategories = [
    // Initially unlocked
    { id: 'harry-potter', name: 'Harry Potter', icon: '⚡', scenarios: harryPotterDebates, unlocked: true },
    { id: 'history', name: 'History', icon: '🏛️', scenarios: historyDebates, unlocked: true },
    { id: 'science', name: 'Science & Environment', icon: '🔬', scenarios: scienceDebates, unlocked: true },
    // Progressively unlocked
    { id: 'ethics', name: 'Ethics & Philosophy', icon: '⚖️', scenarios: ethicsDebates, unlocked: false },
    { id: 'civics', name: 'Government & Civics', icon: '🗳️', scenarios: civicsDebates, unlocked: false },
    { id: 'economics', name: 'Economics', icon: '💰', scenarios: economicsDebates, unlocked: false },
    { id: 'technology', name: 'Technology', icon: '💻', scenarios: technologyDebates, unlocked: false },
    { id: 'health', name: 'Health', icon: '🏥', scenarios: healthDebates, unlocked: false },
    { id: 'arts', name: 'Literature & Art', icon: '🎨', scenarios: artsDebates, unlocked: false },
];

// Flat list of all scenarios with category info
export const debateScenarios = debateCategories.flatMap(c =>
    c.scenarios.map(s => ({ ...s, category: c.id }))
);
