export interface Agent {
  name: string;
  area: string;
  model: 'opus' | 'sonnet' | 'haiku';
  icon: string;
  description: string;
  color: string;
}

export interface Skill {
  name: string;
  category: 'equipo' | 'claude-code';
  uses: number;
  description: string;
}

export interface ProjectActivity {
  date: string;
  description: string;
  type: 'feat' | 'fix' | 'spec' | 'docs' | 'refactor' | 'chore';
}

export interface Project {
  id: string;
  name: string;
  stack: string;
  status: string;
  lastSession: string;
  description: string;
  specs: number;
  activities: ProjectActivity[];
}

export interface Rule {
  title: string;
  category: string;
  items: string[];
}

export const AGENTS: Agent[] = [
  {
    name: 'analisis/proyecto',
    area: 'analisis',
    model: 'opus',
    icon: '🔍',
    description: 'Reconocimiento de proyectos, trade-offs, arquitectura, DDD',
    color: '#facc15',
  },
  {
    name: 'analisis/codigo',
    area: 'analisis',
    model: 'sonnet',
    icon: '🔬',
    description: 'Lectura de código, patrones, deuda técnica, 13 preguntas clave',
    color: '#22d3ee',
  },
  {
    name: 'backend/nodejs',
    area: 'backend',
    model: 'sonnet',
    icon: '⚙️',
    description: 'APIs REST, response contract, error handling, entity taxonomy, Jest+Supertest',
    color: '#4ade80',
  },
  {
    name: 'frontend/angular',
    area: 'frontend',
    model: 'sonnet',
    icon: '🅰️',
    description: 'Angular 18.2+, PrimeNG 18, Tailwind 3.4+, standalone components, signals',
    color: '#f472b6',
  },
  {
    name: 'diseño/ui-ux',
    area: 'diseño',
    model: 'sonnet',
    icon: '🎨',
    description: 'Decisiones de UX, wireframes, flujos, impeccable + ui-ux-pro-max',
    color: '#a78bfa',
  },
  {
    name: 'verificacion/qualified-code',
    area: 'verificacion',
    model: 'sonnet',
    icon: '✅',
    description: 'Verificación adversarial con 4 lentes: arquitectura, calidad, API/HTTP, performance',
    color: '#4ade80',
  },
  {
    name: 'verificacion/tester',
    area: 'verificacion',
    model: 'sonnet',
    icon: '🧪',
    description: 'EJECUTA tests — nunca delega. Curl con JWT, DB restore, reportes de evidencia',
    color: '#22d3ee',
  },
  {
    name: 'verificacion/security-reviewer',
    area: 'verificacion',
    model: 'sonnet',
    icon: '🛡️',
    description: 'Auditor de seguridad read-only. OWASP, secretos, inyección, CORS, CVEs',
    color: '#f87171',
  },
  {
    name: 'testing/unit-backend',
    area: 'testing',
    model: 'sonnet',
    icon: '🎯',
    description: 'Tests unitarios con Jest, 5 tipos de test, factories, DB isolation',
    color: '#fb923c',
  },
  {
    name: 'infra/devops',
    area: 'infra',
    model: 'sonnet',
    icon: '🐳',
    description: 'Docker, Traefik, CI/CD, VPS, healthchecks, lecciones de deploy',
    color: '#38bdf8',
  },
  {
    name: 'infra/server-investigator',
    area: 'infra',
    model: 'opus',
    icon: '🔐',
    description: 'Investiga servidores via SSH read-only. NUNCA remedia. Entrega comandos al humano',
    color: '#fbbf24',
  },
  {
    name: 'documentacion/tecnica',
    area: 'documentacion',
    model: 'haiku',
    icon: '📝',
    description: 'Documentación estructurada, informes, plantillas',
    color: '#94a3b8',
  },
  {
    name: 'documentacion/frontend-handoff',
    area: 'documentacion',
    model: 'sonnet',
    icon: '📋',
    description: 'Guías API para FE en español. Endpoints, shapes, validación, i18n keys',
    color: '#c084fc',
  },
];

export const SKILLS: Skill[] = [
  // equipo — 10 skills activas
  { name: 'sdd-v2', category: 'equipo', uses: 0, description: 'Spec-Driven Development v2: 5 fases, Requirements + Scenarios WHEN/THEN, AGENT MUST EXECUTE' },
  { name: 'git-v2', category: 'equipo', uses: 0, description: '4 flujos (commit/ship/dry-run/cleanforest), limpieza automática, safety guardrails' },
  { name: 'componentes-angular', category: 'equipo', uses: 110, description: 'Biblioteca de componentes reutilizables Angular con PrimeNG y Tailwind' },
  { name: 'angular-v2', category: 'equipo', uses: 0, description: 'Angular 18.2+, standalone, signals, PrimeNG 18, Tailwind 3.4+, patterns propios' },
  { name: 'nodejs-standards', category: 'equipo', uses: 0, description: 'Response contract, error handling, entity taxonomy, validation al borde, Jest+Supertest' },
  { name: 'graphify', category: 'equipo', uses: 2, description: 'Knowledge graph de código. Ahorro 6x-71x en tokens. Auto-update post-commit' },
  { name: 'n8n', category: 'equipo', uses: 4, description: 'Automatización de workflows con n8n, bot Telegram, sub-workflows' },
  { name: 'swarm-v2', category: 'equipo', uses: 0, description: '8 patterns: research, implement-test, full-review (9 agentes), security-scan, pre-deploy' },
  { name: 'adversarial-review', category: 'equipo', uses: 0, description: 'Red-team review independiente. Blocker/Major/Minor. Veredicto PASS/FAIL' },
  { name: 'security-audit', category: 'equipo', uses: 0, description: 'Auditoría OWASP A01-A10 adaptada a Node.js/Express + Angular + MongoDB/MySQL' },
  // claude-code — 12 skills activas
  { name: 'impeccable', category: 'claude-code', uses: 33, description: 'Master skill de diseño. Anti-patterns de IA, context gathering, design direction' },
  { name: 'ui-ux-pro-max', category: 'claude-code', uses: 33, description: 'Inteligencia UI/UX: 50+ estilos, 161 paletas, 57 font pairings, 25 chart types' },
  { name: 'design', category: 'claude-code', uses: 33, description: 'Logo (55 estilos), CIP (50 deliverables), banners (22 estilos), social photos' },
  { name: 'layout', category: 'claude-code', uses: 19, description: 'Layout, spacing y ritmo visual. Fixes grids monotonos, visual hierarchy' },
  { name: 'animate', category: 'claude-code', uses: 15, description: 'Animaciones y micro-interacciones con propósito para mejorar UX' },
  { name: 'adapt', category: 'claude-code', uses: 10, description: 'Responsive design, breakpoints, fluid layouts, touch targets, cross-device' },
  { name: 'full-output-enforcement', category: 'claude-code', uses: 10, description: 'Anti-truncamiento. Fuerza generación completa de código sin placeholders' },
  { name: 'design-system', category: 'claude-code', uses: 6, description: 'Three-layer tokens (primitive→semantic→component), component specs, spacing scales' },
  { name: 'harden', category: 'claude-code', uses: 0, description: 'Edge cases, error handling, i18n, real-world usage. Obligatoria pre-deploy' },
  { name: 'audit', category: 'claude-code', uses: 0, description: 'Checks técnicos: accesibilidad, performance, responsive, anti-patterns. Scored P0-P3' },
  { name: 'archify', category: 'claude-code', uses: 0, description: 'Diagramas de arquitectura, workflows, secuencias como HTML interactivo con SVG' },
  { name: 'archie-help', category: 'claude-code', uses: 0, description: 'Referencia rápida del equipo Archie — agentes, skills, comandos' },
];

export const PROJECTS: Project[] = [
  {
    id: 'P01', name: 'GymPulse', stack: 'Angular 18 + Node.js/Express + MySQL (Prisma) + MongoDB', status: 'Inactivo (5 meses)', lastSession: '2026-05-27',
    description: 'App de gestión de gimnasio con rutinas, ejercicios y seguimiento. 74 tests, design system, dual DB.',
    specs: 7,
    activities: [
      { date: '2026-05-27', description: 'Light Mode completada. Pendientes: modales, facturación, onboarding', type: 'feat' },
    ]
  },
  {
    id: 'P02', name: 'LavaderoOs', stack: '—', status: 'Sin analizar', lastSession: '',
    description: 'Proyecto pendiente de análisis. Nunca tuvo sesión de trabajo.',
    specs: 0,
    activities: []
  },
  {
    id: 'P03', name: 'IL017 Frontend', stack: 'Angular 17 + Material 17 + Bootstrap 5 + SSR + i18n + Chart.js', status: 'ACTIVO', lastSession: '2026-10-29',
    description: 'Digital Buyers Manager — Frontend. Gestión de pedidos de vehículos renting/leasing. Graphify: 5,014 nodos.',
    specs: 53,
    activities: [
      { date: '2026-10-29', description: '5 ramas mergeadas. IMAP inbox, MFA, CRM wizard, delivery form', type: 'feat' },
      { date: '2026-09-23', description: 'Auditoría + ZIP scopes + quotes string + breakdown units', type: 'feat' },
      { date: '2026-07-14', description: 'SPEC-052/053 + SharedFilter fixes + i18n mergeados a dev', type: 'feat' },
    ]
  },
  {
    id: 'P04', name: 'AgroEnvios', stack: 'Node.js 22 + TS + Express + MongoDB + AWS + Socket.IO', status: 'Inactivo (3 meses)', lastSession: '2026-07-31',
    description: 'ECO AgroEnvíos — Microservicios de envíos. 32 endpoints + 81 tests. Deuda: 192 console.log, 119 any.',
    specs: 0,
    activities: [
      { date: '2026-07-31', description: 'Webhook formato macro + x-api-key + wrapper objetos', type: 'feat' },
    ]
  },
  {
    id: 'P05', name: 'Braillin', stack: 'Node.js + Express + Angular + MySQL (Prisma)', status: 'Producción VPS', lastSession: '2026-07-13',
    description: 'Sitio web en producción VPS. Hero editable, galerías, contacto. Pendiente: fix upload, SMTP, e-commerce.',
    specs: 0,
    activities: [
      { date: '2026-07-13', description: 'Hero editable mergeado a main. Deploy VPS con Docker + Traefik', type: 'feat' },
    ]
  },
  {
    id: 'P06', name: 'microTelco', stack: 'NestJS + Angular 19 + MongoDB + Socket.IO', status: 'Pausado (4.7 meses)', lastSession: '2026-06-08',
    description: 'Microsistema telco. 7 fases + 3 specs. Rama feat/fase-1 sin merge a master.',
    specs: 3,
    activities: [
      { date: '2026-06-08', description: '7 fases completadas, 3 specs. Rama sin merge', type: 'spec' },
    ]
  },
  {
    id: 'P07', name: 'FrontKit', stack: 'Angular 20 + Tailwind CSS 4', status: 'Biblioteca (271 comp)', lastSession: '2026-06-11',
    description: 'Catálogo de 271 componentes + 28 templates. Rama feat/expansion sin merge.',
    specs: 0,
    activities: [
      { date: '2026-06-26', description: 'Template tpl-corrientes + total 28 templates', type: 'feat' },
    ]
  },
  {
    id: 'P08', name: 'AgroEnvioPanel', stack: 'Angular 19 + Tailwind CSS 4 + Socket.IO', status: 'Inactivo', lastSession: '2026-07-23',
    description: 'Panel admin para AgroEnvíos. Roles/permisos, notas fiscales. Rama sin merge.',
    specs: 2,
    activities: [
      { date: '2026-07-23', description: 'idCliente como ObjectId + select clientes en usuario-form', type: 'feat' },
    ]
  },
  {
    id: 'P09', name: 'ArchieTeam', stack: 'Angular 19 + Tailwind CSS 4', status: 'Producción VPS', lastSession: '2026-08-07',
    description: 'Sitio web de presentación del equipo Archie con estética retro 8-bit. Desplegado en bowin.com.ar.',
    specs: 0,
    activities: [
      { date: '2026-08-07', description: 'Migrado a Server 2 (bowin.com.ar). Responsive pendiente', type: 'docs' },
    ]
  },
  {
    id: 'P10', name: 'Dentos', stack: 'Angular 18 + Material 18 + Bootstrap 5 / Laravel 10 + PHP 8.1', status: 'Registrado', lastSession: '2026-06-18',
    description: 'Sistema de gestión odontológica. Solo registrado, sin análisis ni trabajo.',
    specs: 0,
    activities: []
  },
  {
    id: 'P11', name: 'BarberiaElJefe', stack: 'Node.js/Express + Angular 19 + MongoDB + Tailwind CSS 4', status: 'ACTIVO', lastSession: '2026-10-13',
    description: 'Barbería con landing, turnos, servicios. Módulo Empresas B2B en rama.',
    specs: 2,
    activities: [
      { date: '2026-10-13', description: 'Sección LA COMUNIDAD en landing. Empresas B2B en rama', type: 'feat' },
      { date: '2026-08-28', description: 'Landing completa con secciones responsive', type: 'feat' },
    ]
  },
  {
    id: 'P12', name: 'PanelHandlerFacaf', stack: 'PHP + MySQL (PDO) + Bootstrap 3 + jQuery + PHPExcel', status: 'Alerta seguridad', lastSession: '2026-09-25',
    description: 'Panel PHP legacy. SPEC-001 Cierre Lotes IMED. Alertas: MD5, SQL injection, credenciales en repo.',
    specs: 1,
    activities: [
      { date: '2026-09-25', description: 'SPEC-001: Cierre Lotes IMED en Modificar Farmacia', type: 'spec' },
    ]
  },
  {
    id: 'P13', name: 'SysFac', stack: 'Angular 19 + Node.js/Express + TypeScript + MySQL (Prisma 6) + Tailwind CSS 4', status: 'Simulador créditos', lastSession: '2026-09-16',
    description: 'Sistema de facturación. Simulador de créditos prendarios (francés/alemán + PDF). 22 tests en deuda.',
    specs: 1,
    activities: [
      { date: '2026-09-16', description: 'Simulador créditos prendarios completado', type: 'feat' },
    ]
  },
  {
    id: 'P14', name: 'registroglucemiaweb', stack: 'PHP + MySQL (PDO) + Bootstrap 3 + jQuery + FPDF', status: 'Sin contexto', lastSession: '2026-08-27',
    description: 'Registro de glucemia web. Admin farmacias. Sin archie-context ni .claudeignore.',
    specs: 0,
    activities: [
      { date: '2026-08-27', description: 'Admin farmacias: listado, agregar, bloquear, límite', type: 'feat' },
    ]
  },
  {
    id: 'P15', name: 'panelsolgen', stack: 'PHP + MySQL (PDO) + Bootstrap 3.3.7 + jQuery + DataTables + Chart.js', status: 'Alerta seguridad', lastSession: '2026-09-14',
    description: 'Panel Solgen PHP legacy. Fix nro_receta modal. Alertas: MD5, SQL injection, PHPExcel obsoleto.',
    specs: 0,
    activities: [
      { date: '2026-09-14', description: 'Fix nro_receta modal + análisis inicial completo', type: 'fix' },
    ]
  },
  {
    id: 'P16', name: 'panelpf', stack: 'PHP + MySQL (PDO) + Bootstrap 3 + jQuery + DataTables + Chart.js + PHPExcel + FPDF', status: 'Alerta seguridad', lastSession: '2026-09-14',
    description: 'Panel PF PHP legacy. Alertas: MD5, SQL injection, credenciales en repo, PHPMailer 5.2.1 obsoleto.',
    specs: 0,
    activities: [
      { date: '2026-09-14', description: 'Análisis inicial completo — alertas de seguridad detectadas', type: 'docs' },
    ]
  },
  {
    id: 'P17', name: 'IL017 Backend', stack: 'PHP 8.3 + Laravel 12 + MySQL + JWT + Spatie Permission + AWS S3 + DOMPDF + Scramble + Redis + Jenkins', status: 'Registrado', lastSession: '2026-10-15',
    description: 'Digital Buyers Manager — Backend API. 2,597 commits, 82 modelos, 190 tests. OpenSpec con 146 cambios archivados.',
    specs: 119,
    activities: [
      { date: '2026-10-15', description: 'Clonado y análisis completo. Registrado en Archie', type: 'docs' },
    ]
  },
];

export const RULES: Rule[] = [
  {
    title: 'OPERACIÓN',
    category: 'operation',
    items: [
      'Siempre hablar en español con el usuario',
      'Explicar brevemente qué se va a hacer y por qué antes de ejecutar',
      'Bash sin confirmación en htdocs — describir acción en español llano',
      'Delegar al agente correcto según su perfil en .claude/agents/',
      'Guardar progreso cada 3-5 interacciones (archie-context.md)',
      'Registrar uso de skills y agentes en registro/',
      'Graphify-first: consultar grafo ANTES de grep/read masivo',
    ],
  },
  {
    title: 'GIT v2',
    category: 'git',
    items: [
      'Verificar rama ANTES de cualquier cambio — Step 0 de todo',
      'NUNCA trabajar en main/master/dev/develop — ni un carácter',
      'Solo feature/ (no feat/), fix/, hotfix/, style/, docs/, chore/, perf/',
      'Co-Authored-By obligatorio en cada commit',
      '4 flujos: commit, ship, dry-run, cleanforest',
      '/ship: commit → merge --no-ff → push → delete rama (todo en uno)',
      '/cleanforest: limpieza masiva de ramas mergeadas',
      'Push SOLO con instrucción explícita — "mergeá" ≠ "pusheá"',
    ],
  },
  {
    title: 'MODELOS',
    category: 'models',
    items: [
      'Opus FORZADO para /spec, /review, /adversarial (auto-escalación)',
      'Sonnet para código, implementación, tests (default)',
      'Haiku para búsquedas, exploración, formateo, sub-agentes mecánicos',
      'Auto-escalación: si la tarea requiere Opus, cambiar sin preguntar',
    ],
  },
  {
    title: 'SDD v2 — 5 FASES',
    category: 'sdd',
    items: [
      'Flujo: SPEC → DESIGN → IMPLEMENT → VERIFY → CLOSE',
      'Specs como Requirements + Scenarios WHEN/THEN (testeables)',
      'Carpeta aislada por cambio: docs/changes/<nombre>/',
      'Mandatory steps: Step 0 rama, Step N tests, Step N+1 curl, Step N+2 docs',
      'AGENT MUST EXECUTE: el agente ejecuta tests y curl, nunca delega',
      'VERIFY: 3 dimensiones (Completitud, Corrección, Coherencia) + 4 lentes',
      'Modo TURBO: 0 aprobaciones, tests se ejecutan igual',
      'Al cerrar: archive con fecha + spec acumulada en docs/specs/',
    ],
  },
  {
    title: 'TESTING v2',
    category: 'testing',
    items: [
      'El agente EJECUTA tests — nunca delega al usuario',
      'Tests antes de cerrar cada tarea (npm test / jest / ng test)',
      'Curl con JWT para endpoints: GET, POST, PUT, DELETE + error cases',
      'DB restoration obligatoria después de operaciones CUD',
      'Reporte de evidencia en docs/changes/<nombre>/reports/',
      'testing-debt.md NO es escape hatch — solo deuda técnicamente imposible',
      'Si no hay infra de testing, configurarla es Step 0',
    ],
  },
  {
    title: 'HOOKS v2',
    category: 'hooks',
    items: [
      'SessionStart: inyecta archie-context + git status automáticamente',
      'PreToolUse > Bash: security gate (rm -rf, force push, DROP, curl|sh)',
      'PreToolUse > Edit|Write: secret scanner (API keys, passwords, URIs)',
      'PostToolUse > Edit|Write: auto-lint (ESLint para TS/JS, php -l para PHP)',
      'PreCompact: preserva rama y contexto antes de compactación',
      'Stop: registra actividad + detecta cambios sin commitear',
      'Graphify post-commit: actualiza grafo incrementalmente',
    ],
  },
  {
    title: 'MULTI-PROYECTO',
    category: 'multi-project',
    items: [
      'Archie trabaja desde Equipo/ como base fija',
      'Al abrir un proyecto: leer archie-context.md sin preguntar',
      'Al terminar: actualizar archie-context.md con estado actual',
      'registro/proyectos.md es la tabla central de los 17 proyectos',
      '/switch para cambiar, /project para registrar',
      'Graphify: verificar grafo al cambiar de proyecto',
    ],
  },
];
