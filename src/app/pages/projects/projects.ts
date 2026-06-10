import { Component } from '@angular/core';
import { PROJECTS, Project } from '../../data/team-data';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  template: `
    <div class="min-h-screen bg-[#020617] font-mono px-4 py-10">
      <div class="max-w-5xl mx-auto">

        <!-- Header -->
        <div class="text-center mb-10">
          <p class="text-yellow-700 text-[10px] tracking-[0.4em] uppercase mb-2">[ MISSION CONTROL ]</p>
          <h1 class="text-3xl sm:text-4xl font-bold text-yellow-400 tracking-tight leading-none"
              style="text-shadow: 0 0 24px rgba(250,204,21,0.6);">
            ACTIVE MISSIONS
          </h1>
          <p class="text-slate-500 text-xs tracking-[0.3em] uppercase mt-3">
            CURRENT DEPLOYMENTS
          </p>
          <div class="mt-4 border-b border-yellow-900/50 max-w-xs mx-auto"></div>
        </div>

        <!-- Status legend -->
        <div class="flex flex-wrap items-center justify-center gap-4 mb-8 text-[9px] uppercase tracking-wider">
          <span class="flex items-center gap-1.5">
            <span class="inline-block w-2 h-2 rounded-full bg-cyan-400" style="box-shadow: 0 0 6px rgba(34,211,238,0.8)"></span>
            <span class="text-cyan-700">EN DESARROLLO</span>
          </span>
          <span class="flex items-center gap-1.5">
            <span class="inline-block w-2 h-2 rounded-full bg-yellow-400" style="box-shadow: 0 0 6px rgba(250,204,21,0.8)"></span>
            <span class="text-yellow-700">REGISTRADO</span>
          </span>
          <span class="flex items-center gap-1.5">
            <span class="inline-block w-2 h-2 rounded-full bg-green-400" style="box-shadow: 0 0 6px rgba(74,222,128,0.8)"></span>
            <span class="text-green-700">INICIANDO</span>
          </span>
          <span class="flex items-center gap-1.5">
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-400" style="box-shadow: 0 0 6px rgba(52,211,153,0.8)"></span>
            <span class="text-emerald-700">COMPLETADO</span>
          </span>
          <span class="flex items-center gap-1.5">
            <span class="inline-block w-2 h-2 rounded-full bg-slate-500"></span>
            <span class="text-slate-600">SIN ANALIZAR</span>
          </span>
        </div>

        <!-- Projects grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          @for (project of projects; track project.id) {
            <div class="mission-card border-2 p-5 relative overflow-hidden transition-all hover:-translate-y-0.5"
                 [class]="isActive(project.status) ? 'mission-pulse' : ''"
                 [style]="getCardStyle(project.status)">

              <!-- Background decoration -->
              <div class="absolute top-0 right-0 text-[80px] leading-none select-none pointer-events-none opacity-5 font-bold"
                   [style]="'color: ' + getStatusColor(project.status)">
                {{ project.id.replace('P', '') }}
              </div>

              <!-- Mission header -->
              <div class="flex items-start justify-between mb-3 relative z-10">
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-bold px-2 py-0.5 border border-slate-700 text-slate-500 bg-slate-900/80">
                    {{ project.id }}
                  </span>
                  <h3 class="text-sm font-bold tracking-wider"
                      [style]="'color: ' + getStatusColor(project.status)">
                    {{ project.name }}
                  </h3>
                </div>
                <!-- Pulse indicator -->
                @if (isActive(project.status)) {
                  <span class="live-dot w-2 h-2 rounded-full flex-shrink-0 mt-1"
                        [style]="'background-color: ' + getStatusColor(project.status) + '; box-shadow: 0 0 8px ' + getStatusColor(project.status)">
                  </span>
                }
              </div>

              <!-- Stack -->
              <div class="relative z-10 mb-3">
                @if (project.stack && project.stack !== '—') {
                  <div class="flex flex-wrap gap-1">
                    @for (tech of getStackItems(project.stack); track tech) {
                      <span class="text-[9px] px-1.5 py-0.5 border border-slate-800 text-slate-500 bg-slate-900/60 uppercase">
                        {{ tech }}
                      </span>
                    }
                  </div>
                } @else {
                  <span class="text-slate-700 text-[10px]">— STACK NOT DEFINED —</span>
                }
              </div>

              <!-- Status badge -->
              <div class="relative z-10 flex items-center justify-between mt-4 pt-3 border-t border-slate-800/60">
                <span class="status-badge text-[9px] font-bold px-2 py-1 border uppercase tracking-wider"
                      [style]="getStatusBadgeStyle(project.status)">
                  {{ project.status }}
                </span>
                @if (project.lastSession) {
                  <span class="text-[9px] text-slate-600 uppercase tracking-wider">
                    {{ project.lastSession }}
                  </span>
                } @else {
                  <span class="text-[9px] text-slate-800 uppercase tracking-wider">NO SESSION</span>
                }
              </div>

            </div>
          }
        </div>

        <!-- Footer -->
        <div class="text-center mt-10 text-slate-700 text-[10px] tracking-widest uppercase">
          {{ projects.length }} MISSIONS TRACKED — ARCHIE ONLINE
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .mission-card { transition: transform 0.15s ease; }

    @keyframes pulse-border {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .mission-pulse {
      animation: pulse-border 2.5s ease-in-out infinite;
    }

    @keyframes live-pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.7; }
    }
    .live-dot {
      animation: live-pulse 1.5s ease-in-out infinite;
    }
  `]
})
export class Projects {
  projects: Project[] = PROJECTS;

  isActive(status: string): boolean {
    const active = ['en desarrollo', 'iniciando'];
    return active.some(s => status.toLowerCase().includes(s));
  }

  getStatusColor(status: string): string {
    const s = status.toLowerCase();
    if (s.includes('en desarrollo'))  return '#22d3ee';
    if (s.includes('registrado'))      return '#facc15';
    if (s.includes('iniciando'))       return '#4ade80';
    if (s.includes('complet') || s.includes('fases') || s.includes('comp + ') || s.includes('sprint')) return '#34d399';
    return '#64748b';
  }

  getCardStyle(status: string): string {
    const color = this.getStatusColor(status);
    return `border-color: ${color}35; box-shadow: 0 0 16px ${color}12, inset 0 0 30px ${color}05;`;
  }

  getStatusBadgeStyle(status: string): string {
    const color = this.getStatusColor(status);
    return `border-color: ${color}60; color: ${color}; background: ${color}15;`;
  }

  getStackItems(stack: string): string[] {
    return stack.split('+').map(s => s.trim()).filter(Boolean);
  }
}
