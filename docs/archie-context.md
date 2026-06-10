# ArchieTeam — Contexto Operativo

## Qué es
Sitio web de presentación del equipo Archie con estética retro 8-bit. Muestra agentes, skills, reglas y proyectos activos para presentar a compañeros de trabajo.

## Stack
- Angular 19 (standalone components, @if/@for)
- Tailwind CSS 4 (via PostCSS)
- SCSS para keyframes globales

## Estructura
```
src/app/
├── data/
│   └── team-data.ts        ← Datos de agentes, skills, proyectos, reglas
├── pages/
│   ├── home/home.ts         ← PRESS START arcade screen
│   ├── agents/agents.ts     ← 11 agentes con cards retro
│   ├── skills/skills.ts     ← Skill tree con toggle equipo/claude-code
│   ├── rules/rules.ts       ← Reglas en terminales retro
│   └── projects/projects.ts ← 8 misiones activas
├── app.component.ts         ← Shell con nav HUD retro
├── app.config.ts
└── app.routes.ts
```

## Estado actual — 2026-06-10
- MVP completo, 5 páginas funcionales
- Compila sin errores
- Estética retro 8-bit (scanlines, neon glow, pixel borders, font-mono)

## Pendiente
- Agregar más detalle a cada agente (expandible)
- Animaciones de transición entre páginas
- Sección de estadísticas con gráficos retro
- Responsive mobile
