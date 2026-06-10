import { Component, signal } from '@angular/core';
import { PROJECTS, Project } from '../../data/team-data';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  template: `
    <div class="min-h-screen bg-[#020617] font-mono px-4 py-10">
      <div class="max-w-6xl mx-auto">

        <!-- Header -->
        <div class="text-center mb-10">
          <p class="text-yellow-700 text-[10px] tracking-[0.4em] uppercase mb-2">[ MISSION CONTROL ]</p>
          <h1 class="text-3xl sm:text-4xl font-bold text-yellow-400 tracking-tight leading-none"
              style="text-shadow: 0 0 24px rgba(250,204,21,0.6);">
            ACTIVE MISSIONS
          </h1>
          <p class="text-slate-500 text-xs tracking-[0.3em] uppercase mt-3">
            SELECT A MISSION TO VIEW INTEL
          </p>
          <div class="mt-4 border-b border-yellow-900/50 max-w-xs mx-auto"></div>
        </div>

        <div class="flex flex-col lg:flex-row gap-4">

          <!-- LEFT: Project list -->
          <div class="lg:w-2/5 space-y-2">
            @for (project of projects; track project.id) {
              <div class="mission-card border-2 p-4 cursor-pointer transition-all"
                   [class]="selected()?.id === project.id
                     ? 'border-l-4 scale-[1.02]'
                     : 'hover:scale-[1.01]'"
                   [style]="getCardStyle(project, selected()?.id === project.id)"
                   (click)="select(project)">

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="text-[9px] font-bold px-1.5 py-0.5 border border-slate-700 text-slate-500 bg-slate-900/80 flex-shrink-0">
                      {{ project.id }}
                    </span>
                    <h3 class="text-sm font-bold tracking-wider truncate"
                        [style]="'color: ' + getStatusColor(project.status)">
                      {{ project.name }}
                    </h3>
                  </div>
                  <div class="flex items-center gap-2 flex-shrink-0">
                    @if (isActive(project.status)) {
                      <span class="live-dot w-2 h-2 rounded-full"
                            [style]="'background-color: ' + getStatusColor(project.status) + '; box-shadow: 0 0 8px ' + getStatusColor(project.status)">
                      </span>
                    }
                    <span class="text-[8px] font-bold px-1.5 py-0.5 border uppercase tracking-wider"
                          [style]="getStatusBadgeStyle(project.status)">
                      {{ project.status }}
                    </span>
                  </div>
                </div>

              </div>
            }
          </div>

          <!-- RIGHT: Detail panel -->
          <div class="lg:w-3/5">
            @if (selected()) {
              <div class="border-2 p-6 relative overflow-hidden"
                   [style]="getDetailStyle(selected()!.status)">

                <!-- Background ID -->
                <div class="absolute top-2 right-4 text-[100px] leading-none select-none pointer-events-none opacity-[0.03] font-bold text-white">
                  {{ selected()!.id.replace('P', '') }}
                </div>

                <div class="relative z-10">
                  <!-- Header -->
                  <div class="flex items-start justify-between mb-4">
                    <div>
                      <div class="flex items-center gap-2 mb-1">
                        <span class="text-[10px] font-bold px-2 py-0.5 border border-slate-700 text-slate-500 bg-slate-900/80">
                          {{ selected()!.id }}
                        </span>
                        <span class="text-[10px] font-bold px-2 py-0.5 border uppercase tracking-wider"
                              [style]="getStatusBadgeStyle(selected()!.status)">
                          {{ selected()!.status }}
                        </span>
                      </div>
                      <h2 class="text-xl font-bold tracking-wider mt-2"
                          [style]="'color: ' + getStatusColor(selected()!.status) + '; text-shadow: 0 0 15px ' + getStatusColor(selected()!.status) + '60'">
                        {{ selected()!.name }}
                      </h2>
                    </div>
                    <button class="text-slate-600 hover:text-slate-400 text-xs px-2 py-1 border border-slate-800 transition-colors"
                            (click)="close()">
                      ESC
                    </button>
                  </div>

                  <!-- Description -->
                  <p class="text-xs text-slate-400 leading-relaxed mb-5 border-l-2 pl-3"
                     [style]="'border-color: ' + getStatusColor(selected()!.status) + '40'">
                    {{ selected()!.description }}
                  </p>

                  <!-- Stats row -->
                  <div class="flex items-center gap-4 mb-5">
                    <div class="border border-slate-800 px-3 py-2 text-center">
                      <div class="text-lg font-bold text-cyan-400">{{ selected()!.specs }}</div>
                      <div class="text-[8px] text-slate-600 uppercase tracking-wider">SPECS</div>
                    </div>
                    <div class="border border-slate-800 px-3 py-2 text-center">
                      <div class="text-lg font-bold text-yellow-400">{{ selected()!.activities.length }}</div>
                      <div class="text-[8px] text-slate-600 uppercase tracking-wider">LOGS</div>
                    </div>
                    @if (selected()!.lastSession) {
                      <div class="border border-slate-800 px-3 py-2 text-center">
                        <div class="text-sm font-bold text-green-400">{{ selected()!.lastSession }}</div>
                        <div class="text-[8px] text-slate-600 uppercase tracking-wider">LAST SESSION</div>
                      </div>
                    }
                  </div>

                  <!-- Stack -->
                  @if (selected()!.stack && selected()!.stack !== '—') {
                    <div class="mb-5">
                      <div class="text-[9px] text-slate-600 uppercase tracking-widest mb-2">► TECH STACK</div>
                      <div class="flex flex-wrap gap-1.5">
                        @for (tech of getStackItems(selected()!.stack); track tech) {
                          <span class="text-[10px] px-2 py-0.5 border border-slate-700 text-slate-400 bg-slate-900/60 uppercase">
                            {{ tech }}
                          </span>
                        }
                      </div>
                    </div>
                  }

                  <!-- Activity log -->
                  <div>
                    <div class="text-[9px] text-slate-600 uppercase tracking-widest mb-3">► ACTIVITY LOG</div>
                    @if (selected()!.activities.length > 0) {
                      <div class="space-y-0 border-l border-slate-800 ml-1">
                        @for (act of selected()!.activities; track act.date + act.description) {
                          <div class="flex items-start gap-3 pl-4 py-2 relative">
                            <!-- Dot on the line -->
                            <div class="absolute left-[-4px] top-3 w-2 h-2 border"
                                 [style]="'border-color: ' + getTypeColor(act.type) + '; background: ' + getTypeColor(act.type) + '40'">
                            </div>
                            <!-- Date -->
                            <span class="text-[9px] text-slate-600 flex-shrink-0 w-20 pt-0.5">{{ act.date }}</span>
                            <!-- Type badge -->
                            <span class="text-[8px] font-bold px-1.5 py-0.5 border uppercase flex-shrink-0"
                                  [style]="'border-color: ' + getTypeColor(act.type) + '60; color: ' + getTypeColor(act.type) + '; background: ' + getTypeColor(act.type) + '15'">
                              {{ act.type }}
                            </span>
                            <!-- Description -->
                            <span class="text-[11px] text-slate-400 leading-relaxed">{{ act.description }}</span>
                          </div>
                        }
                      </div>
                    } @else {
                      <div class="text-[10px] text-slate-700 text-center py-4 border border-dashed border-slate-800">
                        NO ACTIVITY LOGS RECORDED
                      </div>
                    }
                  </div>

                </div>
              </div>
            } @else {
              <!-- Empty state -->
              <div class="border-2 border-dashed border-slate-800 p-12 text-center">
                <div class="text-4xl mb-4 opacity-20">🎯</div>
                <p class="text-slate-600 text-sm uppercase tracking-wider">SELECT A MISSION</p>
                <p class="text-slate-700 text-[10px] uppercase tracking-widest mt-2">CLICK ON A PROJECT TO VIEW INTEL</p>
              </div>
            }
          </div>

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

    @keyframes live-pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.7; }
    }
    .live-dot { animation: live-pulse 1.5s ease-in-out infinite; }
  `]
})
export class Projects {
  projects: Project[] = PROJECTS;
  selected = signal<Project | null>(null);

  select(project: Project): void {
    this.selected.set(this.selected()?.id === project.id ? null : project);
  }

  close(): void {
    this.selected.set(null);
  }

  isActive(status: string): boolean {
    const active = ['en desarrollo', 'iniciando', 'sprint'];
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

  getCardStyle(project: Project, isSelected: boolean): string {
    const color = this.getStatusColor(project.status);
    if (isSelected) {
      return 'border-color: ' + color + '; box-shadow: 0 0 20px ' + color + '30, inset 0 0 30px ' + color + '08; background: ' + color + '08;';
    }
    return 'border-color: ' + color + '25; box-shadow: 0 0 8px ' + color + '08;';
  }

  getDetailStyle(status: string): string {
    const color = this.getStatusColor(status);
    return 'border-color: ' + color + '40; box-shadow: 0 0 30px ' + color + '15, inset 0 0 40px ' + color + '05;';
  }

  getStatusBadgeStyle(status: string): string {
    const color = this.getStatusColor(status);
    return 'border-color: ' + color + '60; color: ' + color + '; background: ' + color + '15;';
  }

  getStackItems(stack: string): string[] {
    return stack.split('+').map(s => s.trim()).filter(Boolean);
  }

  getTypeColor(type: string): string {
    const colors: Record<string, string> = {
      feat: '#4ade80',
      fix: '#22d3ee',
      spec: '#c084fc',
      docs: '#facc15',
      refactor: '#f97316',
      chore: '#64748b',
    };
    return colors[type] || '#64748b';
  }
}
