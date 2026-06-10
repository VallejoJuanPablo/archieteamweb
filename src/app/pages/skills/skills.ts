import { Component, signal, computed } from '@angular/core';
import { SKILLS, Skill } from '../../data/team-data';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  template: `
    <div class="min-h-screen bg-[#020617] font-mono px-4 py-10">
      <div class="max-w-5xl mx-auto">

        <!-- Header -->
        <div class="text-center mb-10">
          <p class="text-cyan-700 text-[10px] tracking-[0.4em] uppercase mb-2">[ ABILITY DATABASE ]</p>
          <h1 class="text-3xl sm:text-4xl font-bold text-cyan-400 tracking-tight leading-none"
              style="text-shadow: 0 0 24px rgba(34,211,238,0.6);">
            SKILL TREE
          </h1>
          <p class="text-slate-500 text-xs tracking-[0.3em] uppercase mt-3">
            CHOOSE YOUR POWER-UPS
          </p>
          <div class="mt-4 border-b border-cyan-900/50 max-w-xs mx-auto"></div>
        </div>

        <!-- Filter toggle -->
        <div class="flex items-center justify-center gap-0 mb-8">
          <button
            (click)="setFilter('equipo')"
            class="px-6 py-2 text-xs font-bold uppercase tracking-widest border-2 transition-all"
            [class]="filter() === 'equipo'
              ? 'border-cyan-500 bg-cyan-950/60 text-cyan-400'
              : 'border-slate-700 bg-transparent text-slate-600 hover:text-slate-400 hover:border-slate-600'">
            EQUIPO
          </button>
          <button
            (click)="setFilter('claude-code')"
            class="px-6 py-2 text-xs font-bold uppercase tracking-widest border-2 border-l-0 transition-all"
            [class]="filter() === 'claude-code'
              ? 'border-cyan-500 bg-cyan-950/60 text-cyan-400'
              : 'border-slate-700 bg-transparent text-slate-600 hover:text-slate-400 hover:border-slate-600'">
            CLAUDE CODE
          </button>
        </div>

        <!-- Stats bar -->
        <div class="flex items-center justify-center gap-6 mb-8 text-[10px] uppercase tracking-wider text-slate-600">
          <span>{{ filteredSkills().length }} SKILLS</span>
          <span class="text-slate-800">|</span>
          <span class="text-cyan-700">{{ activeCount() }} ACTIVE</span>
          <span class="text-slate-800">|</span>
          <span class="text-yellow-700">TOTAL XP: {{ totalXp() }}</span>
        </div>

        <!-- Skills grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          @for (skill of filteredSkills(); track skill.name) {
            <div class="skill-card border p-4 transition-all hover:-translate-y-0.5"
                 [class]="skill.uses > 0 ? 'border-cyan-800/60 bg-slate-950/80' : 'border-slate-800/40 bg-slate-950/50'"
                 [style]="getCardGlow(skill.uses)">

              <!-- Top row: name + XP badge -->
              <div class="flex items-start justify-between gap-2 mb-2">
                <div class="text-xs font-bold uppercase tracking-wider"
                     [class]="skill.uses > 0 ? 'text-cyan-300' : 'text-slate-500'">
                  {{ skill.name }}
                </div>
                <span class="pixel-counter text-[10px] font-bold px-2 py-0.5 border flex-shrink-0"
                      [class]="getCounterClass(skill.uses)">
                  {{ formatUses(skill.uses) }}
                </span>
              </div>

              <!-- Description -->
              <p class="text-[11px] leading-relaxed"
                 [class]="skill.uses > 0 ? 'text-slate-400' : 'text-slate-600'">
                {{ skill.description }}
              </p>

              <!-- XP bar (always visible) -->
              <div class="mt-3">
                <div class="h-1.5 bg-slate-900 border border-slate-800 w-full">
                  <div class="h-full transition-all"
                       [style]="'width: ' + getBarWidth(skill.uses) + '%; ' + getBarStyle(skill.uses)">
                  </div>
                </div>
              </div>

            </div>
          }
        </div>

        <!-- Footer -->
        <div class="text-center mt-10 text-slate-700 text-[10px] tracking-widest uppercase">
          SKILL TREE LOADED — {{ filteredSkills().length }} SKILLS — {{ totalXp() }} TOTAL XP
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .skill-card { transition: transform 0.15s ease, opacity 0.15s ease; }
  `]
})
export class Skills {
  filter = signal<'equipo' | 'claude-code'>('equipo');

  filteredSkills = computed(() => {
    return [...SKILLS]
      .filter(s => s.category === this.filter())
      .sort((a, b) => b.uses - a.uses);
  });

  activeCount = computed(() => this.filteredSkills().filter(s => s.uses > 0).length);
  totalXp = computed(() => this.filteredSkills().reduce((acc, s) => acc + s.uses, 0));

  setFilter(value: 'equipo' | 'claude-code'): void {
    this.filter.set(value);
  }

  formatUses(uses: number): string {
    return uses.toString().padStart(3, '0') + ' XP';
  }

  getCardGlow(uses: number): string {
    if (uses >= 50) return 'box-shadow: 0 0 20px rgba(34,211,238,0.25), inset 0 0 20px rgba(34,211,238,0.05);';
    if (uses >= 20) return 'box-shadow: 0 0 12px rgba(34,211,238,0.15);';
    if (uses > 0)   return 'box-shadow: 0 0 6px rgba(34,211,238,0.08);';
    return '';
  }

  getCounterClass(uses: number): string {
    if (uses >= 50) return 'border-cyan-500 text-cyan-300 bg-cyan-950/70';
    if (uses >= 20) return 'border-cyan-700 text-cyan-400 bg-cyan-950/50';
    if (uses >= 5)  return 'border-cyan-800 text-cyan-600 bg-cyan-950/30';
    if (uses > 0)   return 'border-slate-700 text-slate-500 bg-slate-900/50';
    return 'border-slate-800 text-slate-600 bg-slate-900/30';
  }

  getBarWidth(uses: number): number {
    const max = 110;
    return Math.min(100, Math.round((uses / max) * 100));
  }

  getBarStyle(uses: number): string {
    if (uses >= 50) return 'background-color: #22d3ee; box-shadow: 0 0 6px rgba(34,211,238,0.6);';
    if (uses >= 20) return 'background-color: #0891b2; box-shadow: 0 0 4px rgba(8,145,178,0.4);';
    return 'background-color: #164e63;';
  }
}
