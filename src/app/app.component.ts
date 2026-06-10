import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="scanlines min-h-screen flex flex-col">
      <!-- NAV HUD -->
      <nav class="fixed top-0 left-0 right-0 z-50 border-b-2 border-green-900/50 bg-[#020617]/95 backdrop-blur-sm">
        <div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <a routerLink="/" class="flex items-center gap-2 no-underline">
            <span class="text-xl">🤖</span>
            <span class="font-mono text-sm font-bold text-green-400" style="text-shadow: 0 0 10px rgba(34,197,94,0.4);">ARCHIE<span class="text-cyan-400">TEAM</span></span>
          </a>
          <div class="flex items-center gap-1">
            <a routerLink="/" routerLinkActive="nav-active" [routerLinkActiveOptions]="{exact:true}"
               class="nav-link font-mono text-xs text-slate-500 hover:text-green-400 px-3 py-1.5 transition-colors no-underline uppercase tracking-wider">Home</a>
            <a routerLink="/agents" routerLinkActive="nav-active"
               class="nav-link font-mono text-xs text-slate-500 hover:text-green-400 px-3 py-1.5 transition-colors no-underline uppercase tracking-wider">Agents</a>
            <a routerLink="/skills" routerLinkActive="nav-active"
               class="nav-link font-mono text-xs text-slate-500 hover:text-green-400 px-3 py-1.5 transition-colors no-underline uppercase tracking-wider">Skills</a>
            <a routerLink="/rules" routerLinkActive="nav-active"
               class="nav-link font-mono text-xs text-slate-500 hover:text-green-400 px-3 py-1.5 transition-colors no-underline uppercase tracking-wider">Rules</a>
            <a routerLink="/projects" routerLinkActive="nav-active"
               class="nav-link font-mono text-xs text-slate-500 hover:text-green-400 px-3 py-1.5 transition-colors no-underline uppercase tracking-wider">Projects</a>
            <a routerLink="/methodologies" routerLinkActive="nav-active"
               class="nav-link font-mono text-xs text-slate-500 hover:text-green-400 px-3 py-1.5 transition-colors no-underline uppercase tracking-wider">Clans</a>
          </div>
          <div class="font-mono text-[10px] text-green-700 hidden md:flex items-center gap-3">
            <span>♥♥♥</span>
            <span>LVL 99</span>
          </div>
        </div>
      </nav>
      <main class="flex-1 pt-14">
        <router-outlet />
      </main>
      <footer class="border-t-2 border-green-900/50 py-3 px-4">
        <div class="max-w-6xl mx-auto flex items-center justify-between font-mono text-[10px] text-green-800">
          <span>2026 ARCHIE TEAM</span>
          <span>SYSTEM ONLINE</span>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .nav-active { color: #4ade80 !important; text-shadow: 0 0 10px rgba(74,222,128,0.4); }
  `]
})
export class AppComponent {}
