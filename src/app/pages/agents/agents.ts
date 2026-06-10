import { Component, computed, signal } from '@angular/core';
import { AGENTS, Agent } from '../../data/team-data';

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [],
  template: `
    <div class="min-h-screen bg-[#020617] font-mono px-4 py-10">
      <div class="max-w-5xl mx-auto">

        <!-- Header -->
        <div class="text-center mb-10">
          <p class="text-green-700 text-[10px] tracking-[0.4em] uppercase mb-2">[ TEAM DATABASE ]</p>
          <h1 class="text-3xl sm:text-4xl font-bold text-green-400 tracking-tight leading-none"
              style="text-shadow: 0 0 24px rgba(74,222,128,0.6);">
            AGENT ROSTER
          </h1>
          <p class="text-slate-500 text-xs tracking-[0.3em] uppercase mt-3">
            SELECT YOUR FIGHTER
          </p>
          <div class="mt-4 border-b border-green-900/50 max-w-xs mx-auto"></div>
        </div>

        <!-- Legend -->
        <div class="flex flex-wrap items-center justify-center gap-4 mb-8 text-[10px] uppercase tracking-wider">
          <span class="flex items-center gap-1.5">
            <span class="inline-block w-3 h-3 border border-yellow-500 bg-yellow-950/50"></span>
            <span class="text-yellow-600">OPUS — HIGH POWER</span>
          </span>
          <span class="flex items-center gap-1.5">
            <span class="inline-block w-3 h-3 border border-cyan-600 bg-cyan-950/50"></span>
            <span class="text-cyan-700">SONNET — STANDARD</span>
          </span>
          <span class="flex items-center gap-1.5">
            <span class="inline-block w-3 h-3 border border-green-700 bg-green-950/50"></span>
            <span class="text-green-800">HAIKU — FAST</span>
          </span>
        </div>

        <!-- Agent grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (agent of agents; track agent.name) {
            <div class="agent-card border-2 bg-slate-950/80 p-4 transition-all hover:-translate-y-0.5"
                 [style]="getCardStyle(agent)">

              <!-- Card header -->
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-2">
                  <span class="text-2xl">{{ agent.icon }}</span>
                  <div>
                    <div class="text-[10px] text-slate-600 uppercase tracking-wider">{{ agent.area }}</div>
                    <div class="text-xs font-bold leading-tight" [style]="'color: ' + agent.color">
                      {{ getShortName(agent.name) }}
                    </div>
                  </div>
                </div>
                <!-- Model badge -->
                <span class="text-[9px] font-bold px-2 py-0.5 border uppercase tracking-wider"
                      [class]="getModelBadgeClass(agent.model)">
                  {{ agent.model }}
                </span>
              </div>

              <!-- Description -->
              <p class="text-slate-400 text-[11px] leading-relaxed mb-4">
                {{ agent.description }}
              </p>

              <!-- HP Bar -->
              <div class="mt-auto">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-[9px] text-slate-600 uppercase tracking-wider">PWR</span>
                  <span class="text-[9px]" [style]="'color: ' + agent.color">{{ getHpLabel(agent.model) }}</span>
                </div>
                <div class="h-2 bg-slate-900 border border-slate-800 w-full">
                  <div class="h-full transition-all"
                       [style]="'width: ' + getHpWidth(agent.model) + '%; background-color: ' + agent.color + '; box-shadow: 0 0 6px ' + agent.color + '80'">
                  </div>
                </div>
              </div>

            </div>
          }
        </div>

        <!-- Footer count -->
        <div class="text-center mt-10 text-slate-700 text-[10px] tracking-widest uppercase">
          {{ agents.length }} AGENTS LOADED — READY FOR DEPLOYMENT
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .agent-card { transition: transform 0.15s ease; }
  `]
})
export class Agents {
  agents: Agent[] = AGENTS;

  getCardStyle(agent: Agent): string {
    return `border-color: ${agent.color}40; box-shadow: 0 0 16px ${agent.color}18, inset 0 0 20px ${agent.color}05;`;
  }

  getShortName(name: string): string {
    const parts = name.split('/');
    return parts[parts.length - 1].toUpperCase();
  }

  getModelBadgeClass(model: string): string {
    if (model === 'opus') return 'border-yellow-600 text-yellow-400 bg-yellow-950/50';
    if (model === 'haiku') return 'border-green-700 text-green-500 bg-green-950/50';
    return 'border-cyan-700 text-cyan-400 bg-cyan-950/50';
  }

  getHpWidth(model: string): number {
    if (model === 'opus') return 100;
    if (model === 'sonnet') return 65;
    return 30;
  }

  getHpLabel(model: string): string {
    if (model === 'opus') return '████████ MAX';
    if (model === 'sonnet') return '█████░░░ MED';
    return '███░░░░░ LOW';
  }
}
