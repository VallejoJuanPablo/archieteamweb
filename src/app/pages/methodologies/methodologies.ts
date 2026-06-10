import { Component, signal } from '@angular/core';

interface Phase {
  name: string;
  icon: string;
}

interface Methodology {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  glowColor: string;
  type: string;
  summary: string;
  philosophy: string[];
  phases: Phase[];
  artifacts: string[];
  activatedBy: string;
  usedFor: string;
  strengths: string[];
}

const METHODOLOGIES: Methodology[] = [
  {
    id: 'sdd',
    name: 'SDD',
    subtitle: 'Spec-Driven Development',
    icon: '⚔️',
    color: '#4ade80',
    glowColor: 'rgba(74,222,128,',
    type: 'PROCESO',
    summary: 'Metodología de proceso del equipo. Define CÓMO se desarrolla cada feature: de idea a código verificado en 7 fases. Modo TURBO: decí "turbo" en cualquier fase para completar todo sin parar.',
    philosophy: [
      'Especificar antes de codear',
      'Aprobación humana entre fases (o TURBO para skip)',
      'Verificación adversarial del código',
      'Testing contra criterios de aceptación',
    ],
    phases: [
      { name: 'SPEC', icon: '📋' },
      { name: 'PLAN', icon: '🗺️' },
      { name: 'TASK', icon: '📝' },
      { name: 'REVIEW', icon: '👁️' },
      { name: 'CODE', icon: '⚡' },
      { name: 'QC', icon: '✅' },
      { name: 'TEST', icon: '🧪' },
    ],
    artifacts: [
      'spec.md — Especificación con user stories (Given/When/Then)',
      'plan-sdd.md — Plan técnico con decisiones justificadas',
      'tasks-sdd.md — Tareas atómicas con dependencias',
      'informe-spec.md — Informe de cierre (8 secciones obligatorias)',
      'INDEX.md — Registro acumulativo de todas las specs',
    ],
    activatedBy: '/spec (siempre)',
    usedFor: 'Cada feature, refactorización o cambio importante',
    strengths: [
      'Proceso riguroso con 7 fases',
      'QA adversarial (Qualified Code)',
      'Trazabilidad total con informes',
      'Criterios Given/When/Then verificables',
      'Modo TURBO: "turbo" = 7 fases sin parar',
      '27 specs completadas en producción',
    ],
  },
  {
    id: 'ddd',
    name: 'DDD',
    subtitle: 'Domain-Driven Design',
    icon: '🏰',
    color: '#c084fc',
    glowColor: 'rgba(192,132,252,',
    type: 'ARQUITECTURA',
    summary: 'Metodología de arquitectura. Define CÓMO se organiza el código: capas, entidades, bounded contexts. Se aplica al iniciar un proyecto nuevo para diseñar la estructura antes de codear.',
    philosophy: [
      'El dominio es el centro de todo',
      'Domain no depende de nadie',
      'Un aggregate = una transacción',
      'Bounded contexts con lenguaje propio',
    ],
    phases: [
      { name: 'ANÁLISIS', icon: '🔍' },
      { name: 'CONTEXT MAP', icon: '🗺️' },
      { name: 'AGGREGATES', icon: '🧱' },
      { name: 'CAPAS', icon: '📐' },
      { name: 'INTERFACES', icon: '🔌' },
      { name: 'IMPLEMENTAR', icon: '⚡' },
    ],
    artifacts: [
      'context-map.md — Bounded contexts + relaciones + glosario',
      'aggregate-design.md — Aggregates con invariantes',
      'Estructura 4 capas: Domain / Application / Infrastructure / Presentation',
      'Repository interfaces en Domain',
    ],
    activatedBy: 'Al crear proyecto nuevo (Archie pregunta)',
    usedFor: 'Diseño de arquitectura al inicio del proyecto',
    strengths: [
      'Separación clara de responsabilidades',
      '4 capas con reglas de dependencia estrictas',
      'Building blocks: Entity, VO, Aggregate, Repository, Domain Event',
      'Estructura estándar para Node.js y Angular',
      'Complementario con SDD (DDD diseña, SDD implementa)',
    ],
  },
  {
    id: 'openspec',
    name: 'OPENSPEC',
    subtitle: 'Spec-Driven Development (Fission AI)',
    icon: '🌀',
    color: '#22d3ee',
    glowColor: 'rgba(34,211,238,',
    type: 'PROCESO (ALTERNATIVO)',
    summary: 'Framework open-source alternativo a SDD. Más fluido y menos ceremonial. Usa delta specs (ADDED/MODIFIED/REMOVED) para cambios incrementales. Specs vivas que evolucionan con el proyecto.',
    philosophy: [
      'Fluid not rigid — sin phase gates forzados',
      'Iterative not waterfall — refinás sobre la marcha',
      'Easy not complex — mínima ceremonia',
      'Brownfield-first — pensado para proyectos existentes',
    ],
    phases: [
      { name: 'PROPOSE', icon: '💡' },
      { name: 'SPECS', icon: '📋' },
      { name: 'DESIGN', icon: '🗺️' },
      { name: 'TASKS', icon: '📝' },
      { name: 'APPLY', icon: '⚡' },
      { name: 'VERIFY', icon: '✅' },
      { name: 'ARCHIVE', icon: '📦' },
    ],
    artifacts: [
      'proposal.md — Intent, scope, in/out of scope',
      'specs/ — Delta specs (ADDED / MODIFIED / REMOVED)',
      'design.md — Decisiones técnicas y arquitectura',
      'tasks.md — Checklist jerárquico con checkboxes',
      'archive/ — Historial de cambios completados',
    ],
    activatedBy: 'Solo si el usuario menciona "openspec" (requiere confirmación)',
    usedFor: 'Experimental — probando como alternativa a SDD',
    strengths: [
      'Delta specs para cambios incrementales',
      'Specs vivas que evolucionan (source of truth)',
      'Sin gates rígidos entre fases',
      'Brownfield-first (proyectos existentes)',
      'RFC 2119: MUST / SHOULD / MAY en requirements',
    ],
  },
];

@Component({
  selector: 'app-methodologies',
  standalone: true,
  imports: [],
  template: `
    <div class="min-h-screen bg-[#020617] font-mono px-4 py-10">
      <div class="max-w-5xl mx-auto">

        <!-- Header -->
        <div class="text-center mb-10">
          <p class="text-fuchsia-700 text-[10px] tracking-[0.4em] uppercase mb-2">[ CHOOSE YOUR PATH ]</p>
          <h1 class="text-3xl sm:text-4xl font-bold text-fuchsia-400 tracking-tight leading-none"
              style="text-shadow: 0 0 24px rgba(232,121,249,0.6);">
            METODOLOGÍAS
          </h1>
          <p class="text-slate-500 text-xs tracking-[0.3em] uppercase mt-3">
            PATHS OF THE ARCHIE ORDER
          </p>
          <div class="mt-4 border-b border-fuchsia-900/50 max-w-xs mx-auto"></div>
        </div>

        <!-- 3 clan cards -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          @for (m of methodologies; track m.id) {
            <div class="clan-card border-2 p-5 cursor-pointer transition-all"
                 [class]="selected()?.id === m.id ? 'scale-[1.02]' : 'hover:scale-[1.01]'"
                 [style]="getCardStyle(m, selected()?.id === m.id)"
                 (click)="select(m)">

              <!-- Icon + Name -->
              <div class="text-center mb-4">
                <div class="text-4xl mb-2 clan-icon" [class]="selected()?.id === m.id ? 'float' : ''">{{ m.icon }}</div>
                <h2 class="text-xl font-bold tracking-wider"
                    [style]="'color: ' + m.color + '; text-shadow: 0 0 15px ' + m.glowColor + '0.5)'">
                  {{ m.name }}
                </h2>
                <p class="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{{ m.subtitle }}</p>
              </div>

              <!-- Type badge -->
              <div class="text-center mb-3">
                <span class="text-[9px] font-bold px-2.5 py-1 border uppercase tracking-widest"
                      [style]="'border-color: ' + m.color + '50; color: ' + m.color + '; background: ' + m.color + '10'">
                  {{ m.type }}
                </span>
              </div>

              <!-- Summary -->
              <p class="text-[11px] text-slate-400 text-center leading-relaxed">
                {{ m.summary }}
              </p>

              <!-- Activation -->
              <div class="mt-4 pt-3 border-t text-center"
                   [style]="'border-color: ' + m.color + '15'">
                <p class="text-[9px] text-slate-600 uppercase tracking-wider">ACTIVATED BY</p>
                <p class="text-[10px] font-bold mt-0.5" [style]="'color: ' + m.color">{{ m.activatedBy }}</p>
              </div>
            </div>
          }
        </div>

        <!-- Detail panel -->
        @if (selected()) {
          <div class="border-2 p-6 relative overflow-hidden"
               [style]="'border-color: ' + selected()!.color + '30; box-shadow: 0 0 30px ' + selected()!.glowColor + '0.1)'">

            <!-- Background decoration -->
            <div class="absolute top-4 right-6 text-[80px] leading-none select-none pointer-events-none opacity-[0.04]">
              {{ selected()!.icon }}
            </div>

            <div class="relative z-10">
              <!-- Header -->
              <div class="flex items-center gap-3 mb-6">
                <span class="text-3xl">{{ selected()!.icon }}</span>
                <div>
                  <h2 class="text-xl font-bold tracking-wider" [style]="'color: ' + selected()!.color">
                    {{ selected()!.name }} PATH
                  </h2>
                  <p class="text-xs text-slate-500">{{ selected()!.subtitle }}</p>
                </div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <!-- Left column -->
                <div>
                  <!-- Philosophy -->
                  <div class="mb-5">
                    <h3 class="text-[10px] uppercase tracking-widest mb-3"
                        [style]="'color: ' + selected()!.color">► PHILOSOPHY</h3>
                    <div class="space-y-1.5">
                      @for (p of selected()!.philosophy; track p) {
                        <div class="flex items-start gap-2">
                          <span class="text-[10px] mt-0.5" [style]="'color: ' + selected()!.color">◆</span>
                          <span class="text-xs text-slate-400">{{ p }}</span>
                        </div>
                      }
                    </div>
                  </div>

                  <!-- Phases pipeline -->
                  <div class="mb-5">
                    <h3 class="text-[10px] uppercase tracking-widest mb-3"
                        [style]="'color: ' + selected()!.color">► PHASES</h3>
                    <div class="flex flex-wrap gap-1.5">
                      @for (phase of selected()!.phases; track phase.name; let i = $index) {
                        <div class="flex items-center gap-1.5">
                          <span class="text-[10px] font-bold px-2 py-1 border"
                                [style]="'border-color: ' + selected()!.color + '40; color: ' + selected()!.color + '; background: ' + selected()!.color + '10'">
                            {{ phase.icon }} {{ phase.name }}
                          </span>
                          @if (i < selected()!.phases.length - 1) {
                            <span class="text-slate-700 text-xs">→</span>
                          }
                        </div>
                      }
                    </div>
                  </div>

                  <!-- Strengths -->
                  <div>
                    <h3 class="text-[10px] uppercase tracking-widest mb-3"
                        [style]="'color: ' + selected()!.color">► STRENGTHS</h3>
                    <div class="space-y-1.5">
                      @for (s of selected()!.strengths; track s) {
                        <div class="flex items-start gap-2">
                          <span class="text-[10px] mt-0.5" [style]="'color: ' + selected()!.color">★</span>
                          <span class="text-xs text-slate-400">{{ s }}</span>
                        </div>
                      }
                    </div>
                  </div>
                </div>

                <!-- Right column -->
                <div>
                  <!-- Artifacts -->
                  <div class="mb-5">
                    <h3 class="text-[10px] uppercase tracking-widest mb-3"
                        [style]="'color: ' + selected()!.color">► ARTIFACTS</h3>
                    <div class="space-y-2">
                      @for (a of selected()!.artifacts; track a) {
                        <div class="border px-3 py-2 text-[11px] text-slate-400"
                             [style]="'border-color: ' + selected()!.color + '20; background: ' + selected()!.color + '05'">
                          <span class="font-bold" [style]="'color: ' + selected()!.color">
                            {{ getArtifactName(a) }}
                          </span>
                          @if (getArtifactDesc(a)) {
                            <span class="text-slate-500"> — {{ getArtifactDesc(a) }}</span>
                          }
                        </div>
                      }
                    </div>
                  </div>

                  <!-- Used for -->
                  <div class="mb-5">
                    <h3 class="text-[10px] uppercase tracking-widest mb-3"
                        [style]="'color: ' + selected()!.color">► USED FOR</h3>
                    <p class="text-xs text-slate-400 border-l-2 pl-3"
                       [style]="'border-color: ' + selected()!.color + '40'">
                      {{ selected()!.usedFor }}
                    </p>
                  </div>

                  <!-- Activation -->
                  <div class="border p-4 text-center"
                       [style]="'border-color: ' + selected()!.color + '30; background: ' + selected()!.color + '05'">
                    <p class="text-[9px] text-slate-600 uppercase tracking-widest mb-1">ACTIVATION COMMAND</p>
                    <p class="text-sm font-bold" [style]="'color: ' + selected()!.color">
                      {{ selected()!.activatedBy }}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        } @else {
          <div class="border-2 border-dashed border-slate-800 p-12 text-center">
            <div class="text-4xl mb-4 opacity-20">⚔️</div>
            <p class="text-slate-600 text-sm uppercase tracking-wider">SELECT A METHODOLOGY</p>
            <p class="text-slate-700 text-[10px] uppercase tracking-widest mt-2">CLICK ON A METHODOLOGY TO VIEW DETAILS</p>
          </div>
        }

        <!-- Footer -->
        <div class="text-center mt-10 text-slate-700 text-[10px] tracking-widest uppercase">
          3 PATHS AVAILABLE — SDD DEFAULT — DDD ON INIT — OPENSPEC EXPERIMENTAL
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .clan-card { transition: transform 0.15s ease; }
    .clan-icon { transition: transform 0.3s ease; }
  `]
})
export class Methodologies {
  methodologies = METHODOLOGIES;
  selected = signal<Methodology | null>(null);

  select(m: Methodology): void {
    this.selected.set(this.selected()?.id === m.id ? null : m);
  }

  getCardStyle(m: Methodology, isSelected: boolean): string {
    if (isSelected) {
      return 'border-color: ' + m.color + '; box-shadow: 0 0 25px ' + m.glowColor + '0.25), inset 0 0 30px ' + m.glowColor + '0.05); background: ' + m.glowColor + '0.03)';
    }
    return 'border-color: ' + m.color + '20; box-shadow: 0 0 8px ' + m.glowColor + '0.08)';
  }

  getArtifactName(artifact: string): string {
    const dash = artifact.indexOf(' — ');
    return dash > -1 ? artifact.substring(0, dash) : artifact;
  }

  getArtifactDesc(artifact: string): string {
    const dash = artifact.indexOf(' — ');
    return dash > -1 ? artifact.substring(dash + 3) : '';
  }
}
