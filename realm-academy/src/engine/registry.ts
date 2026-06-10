/**
 * Content registry — indexes all items, skills, teach sequences.
 * The app loads JSON via loadContent.ts; tests construct registries from fixtures.
 */

import type { Item, SkillDef, TeachSequence, BossDef, RealmId } from './types';

export class ContentRegistry {
  items: Item[] = [];
  skills: SkillDef[] = [];
  teachSequences: TeachSequence[] = [];
  bosses: BossDef[] = [];

  private itemById = new Map<string, Item>();
  private itemsBySkill = new Map<string, Item[]>();
  private skillById = new Map<string, SkillDef>();
  private teachById = new Map<string, TeachSequence>();

  constructor(opts: { items?: Item[]; skills?: SkillDef[]; teachSequences?: TeachSequence[]; bosses?: BossDef[] } = {}) {
    if (opts.items) this.addItems(opts.items);
    if (opts.skills) this.addSkills(opts.skills);
    if (opts.teachSequences) this.addTeachSequences(opts.teachSequences);
    if (opts.bosses) this.bosses.push(...opts.bosses);
  }

  addItems(items: Item[]) {
    for (const item of items) {
      this.items.push(item);
      this.itemById.set(item.id, item);
      const list = this.itemsBySkill.get(item.skill) ?? [];
      list.push(item);
      this.itemsBySkill.set(item.skill, list);
    }
  }

  addSkills(skills: SkillDef[]) {
    for (const s of skills) {
      this.skills.push(s);
      this.skillById.set(s.id, s);
    }
  }

  addTeachSequences(seqs: TeachSequence[]) {
    for (const t of seqs) {
      this.teachSequences.push(t);
      this.teachById.set(t.id, t);
    }
  }

  item(id: string): Item | undefined {
    return this.itemById.get(id);
  }
  skill(id: string): SkillDef | undefined {
    return this.skillById.get(id);
  }
  teach(id: string): TeachSequence | undefined {
    return this.teachById.get(id);
  }
  skillItems(skillId: string): Item[] {
    return this.itemsBySkill.get(skillId) ?? [];
  }
  /** practice pool: excludes teach-sequence-bound items */
  practiceItems(skillId: string): Item[] {
    return this.skillItems(skillId).filter(i => !i.teachSequenceId);
  }
  realmSkills(realm: RealmId): SkillDef[] {
    return this.skills.filter(s => s.realm === realm).sort((a, b) => a.order - b.order);
  }
  realmBosses(realm: RealmId): BossDef[] {
    return this.bosses.filter(b => b.realm === realm);
  }
}
