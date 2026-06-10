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

export interface Project {
  id: string;
  name: string;
  stack: string;
  status: string;
  lastSession: string;
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
  { name: 'angular', category: 'equipo', uses: 42, description: 'Componentes, servicios, routing Angular' },
  { name: 'nodejs', category: 'equipo', uses: 1, description: 'Backend Node.js, APIs REST' },
  { name: 'mysql', category: 'equipo', uses: 1, description: 'Base de datos relacional MySQL' },
  { name: 'mongodb', category: 'equipo', uses: 1, description: 'Base de datos NoSQL MongoDB' },
  { name: 'componentes-angular', category: 'equipo', uses: 110, description: 'Biblioteca de componentes reutilizables Angular' },
  { name: 'diseño-ui', category: 'equipo', uses: 34, description: 'Diseño de interfaces y sistemas visuales' },
  { name: 'sdd', category: 'equipo', uses: 4, description: 'Spec-Driven Development, 7 fases de desarrollo' },
  { name: 'git', category: 'equipo', uses: 18, description: 'Control de versiones, branching, commits' },
  { name: 'buenas-practicas', category: 'equipo', uses: 5, description: 'Estándares de código y arquitectura' },
  { name: 'microservicios', category: 'equipo', uses: 0, description: 'Arquitectura de microservicios' },
  { name: 'patrones-diseño', category: 'equipo', uses: 0, description: 'Design patterns y arquitectura de software' },
  { name: 'n8n', category: 'equipo', uses: 0, description: 'Automatización de workflows con n8n' },
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
  { name: 'layout', category: 'claude-code', uses: 14, description: 'Layout, spacing y ritmo visual' },
  { name: 'full-output-enforcement', category: 'claude-code', uses: 10, description: 'Fuerza generación completa de código sin truncar' },
  { name: 'adapt', category: 'claude-code', uses: 8, description: 'Adapta diseños para múltiples dispositivos y pantallas' },
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
  { id: 'P01', name: 'GymPulse', stack: 'Angular 18 + Node.js + MySQL + MongoDB', status: 'En desarrollo', lastSession: '2026-05-27' },
  { id: 'P02', name: 'LavaderoOs', stack: '—', status: 'Sin analizar', lastSession: '' },
  { id: 'P03', name: 'IL017 (DBM)', stack: 'Angular 17 + Material + Bootstrap', status: 'Sprint 6 campaigns', lastSession: '2026-06-10' },
  { id: 'P04', name: 'AgroEnvios', stack: 'Node.js 22 + TS + Express + MongoDB', status: 'Registrado', lastSession: '2026-05-27' },
  { id: 'P05', name: 'Braillin', stack: 'Node.js + Angular', status: 'Iniciando', lastSession: '2026-06-04' },
  { id: 'P06', name: 'microTelco', stack: 'NestJS + Angular 19 + MongoDB', status: '7 fases + 3 specs', lastSession: '2026-06-08' },
  { id: 'P07', name: 'FrontKit', stack: 'Angular 20 + Tailwind CSS 4', status: '256 comp + 27 tpl', lastSession: '2026-06-10' },
  { id: 'P08', name: 'AgroEnvioPanel', stack: 'Angular 19 + Tailwind CSS 4', status: '7 fases completas', lastSession: '2026-06-10' },
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
      'Usar git de forma consistente: commits descriptivos, branches claras',
    ],
  },
  {
    title: 'GIT',
    category: 'git',
    items: [
      'NUNCA commitear en main/master/dev directamente',
      'Commits atómicos: un propósito por commit',
      'Tipos de commit: feat/, fix/, refactor/, docs/, test/',
      'Tag co-authored-by de Claude Code en cada commit',
      'Merge a dev sin confirmación del usuario',
      'Merge a main SOLO con confirmación explícita del usuario',
      'Limpiar branches después del merge',
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
      'Genera informe-spec.md al cerrar cada spec',
      'El índice docs/specs/INDEX.md se actualiza al cerrar cada spec',
    ],
  },
];
