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
    description: 'Reconocimiento de proyectos, trade-offs, arquitectura',
    color: '#facc15',
  },
  {
    name: 'analisis/codigo',
    area: 'analisis',
    model: 'sonnet',
    icon: '🔬',
    description: 'Lectura de código, patrones, dependencias',
    color: '#22d3ee',
  },
  {
    name: 'backend/nodejs',
    area: 'backend',
    model: 'sonnet',
    icon: '⚙️',
    description: 'APIs, Express/NestJS, CRUD, servicios',
    color: '#4ade80',
  },
  {
    name: 'frontend/angular',
    area: 'frontend',
    model: 'sonnet',
    icon: '🅰️',
    description: 'Componentes, servicios, routing, UI',
    color: '#f472b6',
  },
  {
    name: 'diseño/ui-ux',
    area: 'diseño',
    model: 'opus',
    icon: '🎨',
    description: 'Decisiones de UX, wireframes, flujos',
    color: '#a78bfa',
  },
  {
    name: 'verificacion/qualified-code',
    area: 'verificacion',
    model: 'sonnet',
    icon: '✅',
    description: 'Verificación adversarial código vs spec',
    color: '#4ade80',
  },
  {
    name: 'verificacion/tester',
    area: 'verificacion',
    model: 'sonnet',
    icon: '🧪',
    description: 'Diseño e implementación de tests',
    color: '#22d3ee',
  },
  {
    name: 'testing/e2e-cypress',
    area: 'testing',
    model: 'sonnet',
    icon: '🌲',
    description: 'Tests E2E con Cypress',
    color: '#4ade80',
  },
  {
    name: 'testing/unit-backend',
    area: 'testing',
    model: 'sonnet',
    icon: '🎯',
    description: 'Tests unitarios con Jest',
    color: '#fb923c',
  },
  {
    name: 'documentacion/tecnica',
    area: 'documentacion',
    model: 'haiku',
    icon: '📝',
    description: 'Documentación estructurada, informes',
    color: '#94a3b8',
  },
  {
    name: 'anti-patterns',
    area: 'verificacion',
    model: 'sonnet',
    icon: '🚫',
    description: 'Detección de anti-patrones',
    color: '#f87171',
  },
];

export const SKILLS: Skill[] = [
  // equipo
  { name: 'angular', category: 'equipo', uses: 87, description: 'Componentes, servicios, routing Angular' },
  { name: 'nodejs', category: 'equipo', uses: 17, description: 'Backend Node.js, APIs REST' },
  { name: 'mysql', category: 'equipo', uses: 1, description: 'Base de datos relacional MySQL' },
  { name: 'mongodb', category: 'equipo', uses: 10, description: 'Base de datos NoSQL MongoDB' },
  { name: 'componentes-angular', category: 'equipo', uses: 110, description: 'Biblioteca de componentes reutilizables Angular' },
  { name: 'diseño-ui', category: 'equipo', uses: 35, description: 'Diseño de interfaces y sistemas visuales' },
  { name: 'sdd', category: 'equipo', uses: 18, description: 'Spec-Driven Development, 7 fases de desarrollo' },
  { name: 'git', category: 'equipo', uses: 34, description: 'Control de versiones, branching, commits' },
  { name: 'buenas-practicas', category: 'equipo', uses: 19, description: 'Estándares de código y arquitectura' },
  { name: 'microservicios', category: 'equipo', uses: 3, description: 'Arquitectura de microservicios' },
  { name: 'patrones-diseño', category: 'equipo', uses: 0, description: 'Design patterns y arquitectura de software' },
  { name: 'n8n', category: 'equipo', uses: 4, description: 'Automatización de workflows con n8n' },
  { name: 'ddd', category: 'equipo', uses: 0, description: 'Domain-Driven Design, bounded contexts, aggregates' },
  { name: 'openspec', category: 'equipo', uses: 0, description: 'Metodología alternativa a SDD (proposal → delta specs)' },
  { name: 'graphify', category: 'equipo', uses: 2, description: 'Knowledge graph de código, análisis de codebase' },
  { name: 'generacion-imagen', category: 'equipo', uses: 0, description: 'Generación de imágenes con IA' },
  { name: 'optimizacion-tokens', category: 'equipo', uses: 0, description: 'Optimización de uso de tokens en LLMs' },
  // claude-code
  { name: 'impeccable', category: 'claude-code', uses: 33, description: 'Interfaces frontend de producción con alta calidad de diseño' },
  { name: 'ui-ux-pro-max', category: 'claude-code', uses: 33, description: 'Inteligencia UI/UX para web y mobile, 50+ estilos' },
  { name: 'design', category: 'claude-code', uses: 33, description: 'Identidad de marca, tokens de diseño, generación de logos' },
  { name: 'ui-styling', category: 'claude-code', uses: 33, description: 'Interfaces hermosas con shadcn/ui y Tailwind' },
  { name: 'high-end-visual-design', category: 'claude-code', uses: 33, description: 'Diseño como agencia premium, fuentes, sombras, cards' },
  { name: 'design-taste-frontend', category: 'claude-code', uses: 33, description: 'Senior UI/UX Engineer, reglas basadas en métricas' },
  { name: 'animate', category: 'claude-code', uses: 15, description: 'Animaciones y micro-interacciones con propósito' },
  { name: 'layout', category: 'claude-code', uses: 17, description: 'Layout, spacing y ritmo visual' },
  { name: 'full-output-enforcement', category: 'claude-code', uses: 10, description: 'Fuerza generación completa de código sin truncar' },
  { name: 'adapt', category: 'claude-code', uses: 10, description: 'Adapta diseños para múltiples dispositivos y pantallas' },
  { name: 'design-system', category: 'claude-code', uses: 6, description: 'Arquitectura de tokens, specs de componentes' },
  { name: 'overdrive', category: 'claude-code', uses: 1, description: 'Implementaciones técnicas ambiciosas, shaders, spring physics' },
  { name: 'shape', category: 'claude-code', uses: 0, description: 'Planificación de UX y UI antes de escribir código' },
  { name: 'critique', category: 'claude-code', uses: 0, description: 'Evaluación de diseño desde perspectiva UX' },
  { name: 'audit', category: 'claude-code', uses: 0, description: 'Checks técnicos: accesibilidad, performance, responsive' },
  { name: 'polish', category: 'claude-code', uses: 0, description: 'Pase final de calidad: alineación, spacing, micro-detalles' },
  { name: 'delight', category: 'claude-code', uses: 0, description: 'Momentos de alegría y personalidad en interfaces' },
  { name: 'bolder', category: 'claude-code', uses: 0, description: 'Amplifica diseños seguros para mayor impacto visual' },
  { name: 'quieter', category: 'claude-code', uses: 0, description: 'Tona diseños agresivos o sobre-estimulantes' },
  { name: 'colorize', category: 'claude-code', uses: 0, description: 'Agrega color estratégico a interfaces monocromáticas' },
  { name: 'clarify', category: 'claude-code', uses: 0, description: 'Mejora UX copy, mensajes de error, microcopy' },
  { name: 'distill', category: 'claude-code', uses: 0, description: 'Reduce diseños a su esencia eliminando complejidad' },
  { name: 'typeset', category: 'claude-code', uses: 0, description: 'Mejora tipografía, jerarquía y legibilidad' },
  { name: 'harden', category: 'claude-code', uses: 0, description: 'Fortalece interfaces contra edge cases y errores' },
  { name: 'optimize', category: 'claude-code', uses: 0, description: 'Diagnostica y corrige performance de UI' },
  { name: 'brand', category: 'claude-code', uses: 0, description: 'Voz de marca, identidad visual, consistencia' },
  { name: 'brandkit', category: 'claude-code', uses: 0, description: 'Generación de brand kits de alta gama' },
  { name: 'banner-design', category: 'claude-code', uses: 0, description: 'Diseño de banners para redes sociales y ads' },
  { name: 'slides', category: 'claude-code', uses: 0, description: 'Presentaciones HTML estratégicas con Chart.js' },
  { name: 'minimalist-ui', category: 'claude-code', uses: 0, description: 'Interfaces editoriales limpias, paleta monocromática cálida' },
  { name: 'industrial-brutalist-ui', category: 'claude-code', uses: 0, description: 'Interfaces mecánicas crudas, tipografía suiza, militar' },
];

export const PROJECTS: Project[] = [
  {
    id: 'P01', name: 'GymPulse', stack: 'Angular 18 + Node.js/Express + MySQL (Prisma) + MongoDB', status: 'En desarrollo', lastSession: '2026-05-27',
    description: 'App de gestión de gimnasio con rutinas, ejercicios y seguimiento de progreso de usuarios.',
    specs: 0,
    activities: [
      { date: '2026-05-27', description: 'Reconocimiento de proyecto y análisis de stack', type: 'docs' },
      { date: '2026-05-27', description: 'Registro como P01 en equipo Archie', type: 'chore' },
    ]
  },
  {
    id: 'P02', name: 'LavaderoOs', stack: '—', status: 'Sin analizar', lastSession: '',
    description: 'Proyecto pendiente de análisis. Sin stack definido ni reconocimiento realizado.',
    specs: 0,
    activities: []
  },
  {
    id: 'P03', name: 'IL017 (DBM)', stack: 'Angular 17 + Material 17 + Bootstrap 5 + SSR + i18n + Chart.js', status: 'SPEC-052/053 + fixes mergeados', lastSession: '2026-07-14',
    description: 'Digital Buyers Manager — Plataforma de gestión de pedidos de vehículos renting/leasing. Conecta brokers con suppliers.',
    specs: 53,
    activities: [
      { date: '2026-07-14', description: 'SPEC-052/053 + SharedFilter fixes + i18n mergeados a dev', type: 'feat' },
      { date: '2026-07-03', description: 'Sprint de specs: SPEC-028 a SPEC-051', type: 'spec' },
      { date: '2026-06-18', description: 'Layout responsive + adapt fixes mobile', type: 'fix' },
      { date: '2026-06-10', description: 'SPEC-026/027: Tabla notas + campañas en stocks', type: 'spec' },
      { date: '2026-06-09', description: 'SPEC-024/025: Forms responsive + scroll indicators', type: 'spec' },
      { date: '2026-06-08', description: 'Sprint 4: Clientes tabla card-layout + SharedFilter migration', type: 'feat' },
    ]
  },
  {
    id: 'P04', name: 'AgroEnvios', stack: 'Node.js 22 + TS + Express + MongoDB + AWS + Redis + Socket.IO', status: 'Notificaciones + dashboard', lastSession: '2026-06-25',
    description: 'ECO AgroEnvíos — Microservicio de envíos para plataforma agrícola. Admin API con 32 endpoints y 81 tests. Notificaciones, seguimientos, dashboard stats.',
    specs: 0,
    activities: [
      { date: '2026-06-25', description: 'Dashboard stats + validación server-side + campo tipo usuario', type: 'feat' },
      { date: '2026-06-25', description: 'Notificaciones + seguimientos de envíos', type: 'feat' },
      { date: '2026-06-22', description: 'Tests unitarios backend con Jest', type: 'feat' },
      { date: '2026-05-27', description: 'Admin API completada: 32 endpoints + 81 tests', type: 'feat' },
    ]
  },
  {
    id: 'P05', name: 'Braillin', stack: 'Node.js + Express + Angular + MySQL (Prisma)', status: 'Hero editable mergeado a main', lastSession: '2026-07-13',
    description: 'Sitio web de Braillin con backend Node.js, frontend Angular. Hero editable desde admin, galerías, contacto, i18n.',
    specs: 0,
    activities: [
      { date: '2026-07-13', description: 'Hero editable mergeado a main', type: 'feat' },
      { date: '2026-07-11', description: 'Deploy VPS con Docker + Traefik documentado', type: 'docs' },
      { date: '2026-07-11', description: 'Fixes backend: uploads, nginx config, seeds', type: 'fix' },
      { date: '2026-06-04', description: 'Setup inicial del proyecto', type: 'chore' },
    ]
  },
  {
    id: 'P06', name: 'microTelco', stack: 'NestJS + Angular 19 + MongoDB + Socket.IO', status: '7 fases + 3 specs', lastSession: '2026-06-08',
    description: 'Microsistema de telecomunicaciones con NestJS backend, Angular 19 frontend, MongoDB y comunicación real-time con Socket.IO.',
    specs: 3,
    activities: [
      { date: '2026-06-08', description: 'Spec 3 completada: módulo de comunicaciones', type: 'spec' },
      { date: '2026-06-07', description: 'Fase 7 completada: testing E2E', type: 'feat' },
      { date: '2026-06-06', description: 'Implementación Socket.IO real-time', type: 'feat' },
    ]
  },
  {
    id: 'P07', name: 'FrontKit', stack: 'Angular 20 + Tailwind CSS 4', status: '271 comp + 28 templates', lastSession: '2026-06-26',
    description: 'Catálogo de 271+ componentes frontend y 28 templates multi-página. Botones, formularios, secciones, efectos, animaciones, navegación.',
    specs: 0,
    activities: [
      { date: '2026-06-26', description: 'Template tpl-corrientes + total 28 templates', type: 'feat' },
      { date: '2026-06-10', description: 'Template retro 8-bit (tpl-retro-game) + 7 componentes retro', type: 'feat' },
      { date: '2026-06-10', description: '+62 componentes: efectos, animaciones, nav, formularios', type: 'feat' },
      { date: '2026-06-09', description: 'Templates: scroll-story, lago-hermoso + base 194 componentes', type: 'feat' },
    ]
  },
  {
    id: 'P08', name: 'AgroEnvioPanel', stack: 'Angular 19 + Tailwind CSS 4 + Socket.IO', status: '2 specs + roles/permisos', lastSession: '2026-06-26',
    description: 'Panel de administración para AgroEnvíos. Roles/permisos, notas fiscales, notificaciones, seguimientos, apiKeyHub dinámica. Repo en GitLab.',
    specs: 2,
    activities: [
      { date: '2026-06-26', description: 'ApiKeyHub dinámica + repo GitLab configurado', type: 'feat' },
      { date: '2026-06-25', description: 'Notificaciones + seguimientos real-time', type: 'feat' },
      { date: '2026-06-25', description: 'Roles/permisos + notas fiscales', type: 'feat' },
      { date: '2026-06-10', description: 'Fase 7 completada: panel base completo', type: 'feat' },
    ]
  },
  {
    id: 'P09', name: 'ArchieTeam', stack: 'Angular 19 + Tailwind CSS 4', status: 'MVP + deploy VPS listo', lastSession: '2026-07-15',
    description: 'Sitio web de presentación del equipo Archie con estética retro 8-bit. Muestra agentes, skills, reglas y proyectos activos.',
    specs: 0,
    activities: [
      { date: '2026-07-15', description: 'Manual deploy VPS + Dockerfile + docker-compose', type: 'docs' },
      { date: '2026-07-15', description: 'Deploy local build (no cargar servidor)', type: 'feat' },
      { date: '2026-06-10', description: 'MVP completo: 6 páginas funcionales', type: 'feat' },
    ]
  },
  {
    id: 'P10', name: 'Dentos', stack: 'Angular 18 + Material 18 + Bootstrap 5 / Laravel 10 + PHP 8.1', status: 'Registrado', lastSession: '2026-06-18',
    description: 'Sistema de gestión odontológica. Frontend Angular con Material + Bootstrap, backend Laravel con Sanctum auth.',
    specs: 0,
    activities: [
      { date: '2026-06-18', description: 'Registrado como P10 en equipo Archie', type: 'chore' },
    ]
  },
  {
    id: 'P11', name: 'BarberiaElJefe', stack: 'Node.js/Express + Angular 19 + MongoDB + Tailwind CSS 4', status: 'Inicializado', lastSession: '2026-07-11',
    description: 'Sistema de gestión para barbería. Turnos, clientes, servicios, facturación.',
    specs: 0,
    activities: [
      { date: '2026-07-11', description: 'Proyecto inicializado con stack definido', type: 'chore' },
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
      'Delegar al agente correcto según su perfil y skills',
      'Usar las plantillas definidas en .claude/plantillas/',
      'Documentar todo en la carpeta docs/ del proyecto',
      'Registrar las tareas completadas en registro/',
      'Guardar progreso continuamente (no esperar al final de la sesión)',
    ],
  },
  {
    title: 'GIT',
    category: 'git',
    items: [
      'NUNCA commitear en main/master/dev directamente',
      'Siempre crear rama (feature/, fix/, style/, docs/) antes de trabajar',
      'Commits en ramas de trabajo: automáticos, sin pedir confirmación',
      'Merge a main/master: SOLO con confirmación explícita del usuario',
      'NUNCA mergear a dev sin que el usuario lo pida',
      'Actualizar registros (context, skills, agentes) en cada commit',
    ],
  },
  {
    title: 'MODELOS',
    category: 'models',
    items: [
      'Sonnet es el modelo base por defecto para Archie',
      'Opus solo para arquitectura, decisiones complejas y análisis profundo',
      'Haiku para tareas mecánicas, búsquedas y formateo',
      'Nunca usar Opus para CRUD, formateo o renombrar',
      'Los subagentes reciben el parámetro model al delegar',
    ],
  },
  {
    title: 'SDD — SPEC DRIVEN DEVELOPMENT',
    category: 'sdd',
    items: [
      'Flujo de 7 fases: SPEC → PLAN → TASK → REVIEW → CODE → QC → TEST',
      'Requiere aprobación del usuario entre cada fase',
      'Se activa EXCLUSIVAMENTE con el comando /spec',
      'Modo TURBO: completar todas las fases de corrido sin pausar',
      'Genera informe-spec.md al cerrar cada spec',
      'El índice docs/specs/INDEX.md se actualiza al cerrar cada spec',
    ],
  },
  {
    title: 'MULTI-PROYECTO',
    category: 'multi-project',
    items: [
      'Archie trabaja desde Equipo/ como base fija',
      'Al abrir un proyecto: leer su docs/archie-context.md',
      'Al terminar: actualizar archie-context.md con estado actual',
      'registro/proyectos.md es la tabla central de todos los proyectos',
      'Los archivos generados van en la carpeta del proyecto, nunca en Equipo/',
    ],
  },
];
