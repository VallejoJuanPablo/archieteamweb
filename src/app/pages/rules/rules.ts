import { Component } from '@angular/core';
import { RULES, Rule } from '../../data/team-data';

interface RuleStyle {
  headerBg: string;
  headerText: string;
  borderColor: string;
  dotColor: string;
  bullet: string;
}

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [],
  template: `
    <div class="min-h-screen bg-[#020617] font-mono px-4 py-10">
      <div class="max-w-4xl mx-auto">

        <!-- Header -->
        <div class="text-center mb-10">
          <p class="text-fuchsia-700 text-[10px] tracking-[0.4em] uppercase mb-2">[ SYSTEM CONSTRAINTS ]</p>
          <h1 class="text-3xl sm:text-4xl font-bold text-fuchsia-400 tracking-tight leading-none"
              style="text-shadow: 0 0 24px rgba(232,121,249,0.6);">
            GAME RULES
          </h1>
          <p class="text-slate-500 text-xs tracking-[0.3em] uppercase mt-3">
            KNOW THE RULES. PLAY BY THEM.
          </p>
          <div class="mt-4 border-b border-fuchsia-900/50 max-w-xs mx-auto"></div>
        </div>

        <!-- Rules sections -->
        <div class="space-y-6">
          @for (rule of rules; track rule.category; let i = $index) {
            <div class="terminal-box border-2"
                 [style]="getBoxStyle(i)">

              <!-- Terminal title bar -->
              <div class="flex items-center gap-2 px-4 py-2 border-b"
                   [style]="getTitleBarStyle(i)">
                <!-- Terminal dots -->
                <span class="inline-block w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
                <span class="inline-block w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
                <span class="inline-block w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
                <span class="text-[11px] font-bold tracking-[0.3em] uppercase ml-2"
                      [style]="'color: ' + getCategoryColors(i).headerText">
                  {{ rule.title }}
                </span>
                <span class="ml-auto text-[9px] tracking-wider"
                      [style]="'color: ' + getCategoryColors(i).headerText + '60'">
                  {{ rule.items.length }} RULES
                </span>
              </div>

              <!-- Rules list -->
              <div class="p-4 space-y-2">
                @for (item of rule.items; track item) {
                  <div class="flex items-start gap-2 text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                    <span class="flex-shrink-0 mt-0.5"
                          [style]="'color: ' + getCategoryColors(i).headerText">►</span>
                    <span>{{ item }}</span>
                  </div>
                }

                <!-- SDD Phase pipeline -->
                @if (rule.category === 'sdd') {
                  <div class="mt-5 pt-4 border-t border-slate-800">
                    <div class="text-[9px] text-slate-600 uppercase tracking-wider mb-3">PIPELINE</div>
                    <div class="flex flex-wrap items-center gap-1 sm:gap-0">
                      @for (phase of sddPhases; track phase.label; let last = $last) {
                        <div class="flex items-center">
                          <div class="phase-node border px-2 py-1 text-[9px] font-bold uppercase tracking-wider"
                               [style]="'border-color: ' + phase.color + '60; color: ' + phase.color + '; background: ' + phase.color + '12; box-shadow: 0 0 8px ' + phase.color + '20'">
                            {{ phase.label }}
                          </div>
                          @if (!last) {
                            <span class="text-slate-700 text-xs px-0.5 hidden sm:inline">→</span>
                          }
                        </div>
                      }
                    </div>
                    <div class="text-[9px] text-slate-700 mt-2">
                      ↑ APPROVAL REQUIRED BETWEEN EACH PHASE
                    </div>
                  </div>
                }

              </div>
            </div>
          }
        </div>

        <!-- Footer -->
        <div class="text-center mt-10 text-slate-700 text-[10px] tracking-widest uppercase">
          RULES ENFORCED — NO EXCEPTIONS
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .terminal-box { transition: box-shadow 0.2s ease; }
  `]
})
export class Rules {
  rules: Rule[] = RULES;

  sddPhases = [
    { label: 'SPEC',   color: '#4ade80' },
    { label: 'PLAN',   color: '#22d3ee' },
    { label: 'TASK',   color: '#a78bfa' },
    { label: 'REVIEW', color: '#facc15' },
    { label: 'CODE',   color: '#fb923c' },
    { label: 'QC',     color: '#f472b6' },
    { label: 'TEST',   color: '#4ade80' },
  ];

  private palette = [
    { headerBg: 'rgba(74,222,128,0.06)',   headerText: '#4ade80', border: '#4ade8040', titleBorder: '#4ade8030' },
    { headerBg: 'rgba(250,204,21,0.06)',   headerText: '#facc15', border: '#facc1540', titleBorder: '#facc1530' },
    { headerBg: 'rgba(34,211,238,0.06)',   headerText: '#22d3ee', border: '#22d3ee40', titleBorder: '#22d3ee30' },
    { headerBg: 'rgba(232,121,249,0.06)',  headerText: '#e879f9', border: '#e879f940', titleBorder: '#e879f930' },
  ];

  getBoxStyle(i: number): string {
    const c = this.palette[i % this.palette.length];
    return `border-color: ${c.border}; box-shadow: 0 0 16px ${c.border};`;
  }

  getTitleBarStyle(i: number): string {
    const c = this.palette[i % this.palette.length];
    return `background: ${c.headerBg}; border-color: ${c.titleBorder};`;
  }

  getCategoryColors(i: number): { headerText: string } {
    const c = this.palette[i % this.palette.length];
    return { headerText: c.headerText };
  }
}
