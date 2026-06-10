import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-[#020617] font-mono overflow-hidden relative">

      <!-- Grid background -->
      <div class="absolute inset-0 pointer-events-none"
           style="background-image: linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px); background-size: 40px 40px;">
      </div>

      <!-- Corner decorations -->
      <div class="absolute top-6 left-6 text-green-800 text-xs leading-none select-none hidden md:block">
        <div>┌──────┐</div>
        <div>│ SYS  │</div>
        <div>└──────┘</div>
      </div>
      <div class="absolute top-6 right-6 text-green-800 text-xs leading-none select-none hidden md:block">
        <div>┌──────┐</div>
        <div>│ ON   │</div>
        <div>└──────┘</div>
      </div>

      <!-- HERO -->
      <section class="flex flex-col items-center justify-center pt-24 pb-12 px-4 text-center">

        <!-- ASCII art top border -->
        <div class="text-green-900 text-xs mb-6 leading-none select-none hidden sm:block whitespace-pre">╔══════════════════════════════════════════════════╗</div>

        <!-- PRESS START blinking title -->
        <div class="press-start text-green-400 text-xs sm:text-sm tracking-[0.3em] uppercase mb-3"
             style="text-shadow: 0 0 20px rgba(74,222,128,0.8), 0 0 40px rgba(74,222,128,0.4);">
          ► PRESS START ◄
        </div>

        <!-- Main title -->
        <h1 class="text-3xl sm:text-5xl font-bold tracking-tight mb-2 leading-none"
            style="text-shadow: 0 0 30px rgba(34,197,94,0.6);">
          <span class="text-green-400">ARCHIE</span>
          <span class="text-slate-600">_</span>
          <span class="text-cyan-400">TEAM</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-slate-400 text-xs sm:text-sm tracking-[0.2em] uppercase mb-2">
          AI AGENT ORCHESTRATOR
        </p>
        <p class="text-slate-600 text-[10px] tracking-widest uppercase mb-8">
          v2.0.26 — SYSTEM ONLINE — 2026
        </p>

        <!-- Stats bar -->
        <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10">
          <div class="stat-pill border border-green-700 bg-green-950/50 px-3 py-1.5"
               style="box-shadow: 0 0 12px rgba(74,222,128,0.2);">
            <span class="text-green-400 text-xs font-bold">11</span>
            <span class="text-green-700 text-[10px] ml-1">AGENTS</span>
          </div>
          <span class="text-slate-700 text-xs hidden sm:inline">|</span>
          <div class="stat-pill border border-cyan-700 bg-cyan-950/50 px-3 py-1.5"
               style="box-shadow: 0 0 12px rgba(34,211,238,0.2);">
            <span class="text-cyan-400 text-xs font-bold">53</span>
            <span class="text-cyan-700 text-[10px] ml-1">SKILLS</span>
          </div>
          <span class="text-slate-700 text-xs hidden sm:inline">|</span>
          <div class="stat-pill border border-fuchsia-700 bg-fuchsia-950/50 px-3 py-1.5"
               style="box-shadow: 0 0 12px rgba(232,121,249,0.2);">
            <span class="text-fuchsia-400 text-xs font-bold">8</span>
            <span class="text-fuchsia-700 text-[10px] ml-1">PROJECTS</span>
          </div>
          <span class="text-slate-700 text-xs hidden sm:inline">|</span>
          <div class="stat-pill border border-yellow-700 bg-yellow-950/50 px-3 py-1.5"
               style="box-shadow: 0 0 12px rgba(250,204,21,0.2);">
            <span class="text-yellow-400 text-xs font-bold">27</span>
            <span class="text-yellow-700 text-[10px] ml-1">SPECS</span>
          </div>
        </div>

        <!-- SELECT YOUR DESTINATION -->
        <h2 class="text-slate-500 text-[10px] tracking-[0.4em] uppercase mb-6">
          ▼ SELECT YOUR DESTINATION ▼
        </h2>

        <!-- Nav cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full px-2">

          <a routerLink="/agents"
             class="nav-card group block no-underline border-2 border-green-700 bg-green-950/20 p-5 text-center transition-all hover:border-green-400 hover:bg-green-950/40 cursor-pointer"
             style="box-shadow: 0 0 0px rgba(74,222,128,0);"
             [style]="'box-shadow: 0 0 16px rgba(74,222,128,0.15)'">
            <div class="text-3xl mb-3">🤖</div>
            <div class="text-green-400 text-xs font-bold tracking-widest uppercase group-hover:text-green-300">AGENTS</div>
            <div class="text-slate-600 text-[9px] mt-1 uppercase tracking-wider">ROSTER</div>
            <div class="mt-3 border-t border-green-900 pt-2">
              <span class="text-green-700 text-[9px]">11 FIGHTERS</span>
            </div>
          </a>

          <a routerLink="/skills"
             class="nav-card group block no-underline border-2 border-cyan-700 bg-cyan-950/20 p-5 text-center transition-all hover:border-cyan-400 hover:bg-cyan-950/40 cursor-pointer"
             [style]="'box-shadow: 0 0 16px rgba(34,211,238,0.15)'">
            <div class="text-3xl mb-3">⚡</div>
            <div class="text-cyan-400 text-xs font-bold tracking-widest uppercase group-hover:text-cyan-300">SKILLS</div>
            <div class="text-slate-600 text-[9px] mt-1 uppercase tracking-wider">TREE</div>
            <div class="mt-3 border-t border-cyan-900 pt-2">
              <span class="text-cyan-700 text-[9px]">53 ABILITIES</span>
            </div>
          </a>

          <a routerLink="/rules"
             class="nav-card group block no-underline border-2 border-fuchsia-700 bg-fuchsia-950/20 p-5 text-center transition-all hover:border-fuchsia-400 hover:bg-fuchsia-950/40 cursor-pointer"
             [style]="'box-shadow: 0 0 16px rgba(232,121,249,0.15)'">
            <div class="text-3xl mb-3">📜</div>
            <div class="text-fuchsia-400 text-xs font-bold tracking-widest uppercase group-hover:text-fuchsia-300">RULES</div>
            <div class="text-slate-600 text-[9px] mt-1 uppercase tracking-wider">GAME RULES</div>
            <div class="mt-3 border-t border-fuchsia-900 pt-2">
              <span class="text-fuchsia-700 text-[9px]">4 CATEGORIES</span>
            </div>
          </a>

          <a routerLink="/projects"
             class="nav-card group block no-underline border-2 border-yellow-700 bg-yellow-950/20 p-5 text-center transition-all hover:border-yellow-400 hover:bg-yellow-950/40 cursor-pointer"
             [style]="'box-shadow: 0 0 16px rgba(250,204,21,0.15)'">
            <div class="text-3xl mb-3">🗺️</div>
            <div class="text-yellow-400 text-xs font-bold tracking-widest uppercase group-hover:text-yellow-300">MISSIONS</div>
            <div class="text-slate-600 text-[9px] mt-1 uppercase tracking-wider">PROJECTS</div>
            <div class="mt-3 border-t border-yellow-900 pt-2">
              <span class="text-yellow-700 text-[9px]">8 ACTIVE</span>
            </div>
          </a>

        </div>

        <!-- ASCII art bottom border -->
        <div class="text-green-900 text-xs mt-6 leading-none select-none hidden sm:block whitespace-pre">╚══════════════════════════════════════════════════╝</div>

        <!-- INSERT COIN blinking -->
        <div class="insert-coin text-slate-600 text-[10px] tracking-[0.4em] uppercase mt-10">
          INSERT COIN TO CONTINUE
        </div>

      </section>

    </div>
  `,
  styles: [`
    :host { display: block; }

    @keyframes blink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    .press-start {
      animation: blink 1s step-end infinite;
    }
    .insert-coin {
      animation: blink 1.4s step-end infinite;
    }

    .stat-pill {
      display: inline-flex;
      align-items: center;
    }
    .nav-card:hover {
      transform: translateY(-2px);
    }
    .nav-card {
      transition: transform 0.15s ease, border-color 0.15s ease, background-color 0.15s ease;
    }
  `]
})
export class Home {}
