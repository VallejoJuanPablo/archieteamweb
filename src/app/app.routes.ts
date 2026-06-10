import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'agents', loadComponent: () => import('./pages/agents/agents').then(m => m.Agents) },
  { path: 'skills', loadComponent: () => import('./pages/skills/skills').then(m => m.Skills) },
  { path: 'rules', loadComponent: () => import('./pages/rules/rules').then(m => m.Rules) },
  { path: 'projects', loadComponent: () => import('./pages/projects/projects').then(m => m.Projects) },
  { path: '**', redirectTo: '' },
];
