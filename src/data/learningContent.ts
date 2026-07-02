/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LearningItem, Pillar, QuizQuestion } from '../types';

export const fundamentosContent = {
  definicion: {
    title: '¿Qué es un Modelo de Negocio?',
    subtitle: 'La base de la creación de valor',
    description: 'Es la descripción detallada de la lógica mediante la cual una empresa o emprendimiento genera, entrega y captura valor en el mercado. No se limita solo a cómo ganar dinero, sino a cómo creas un ciclo autosostenible que soluciona problemas reales para un grupo específico de personas.',
    bullets: [
      'Generación de Valor: Crear un producto o servicio que resuelva una necesidad clara.',
      'Entrega de Valor: Cómo haces llegar esa solución a las manos del cliente final.',
      'Captura de Valor: La estructura para monetizar y cobrar de forma viable.'
    ]
  },
  pilares: [
    {
      id: 'clientes',
      title: '1. Clientes (Quién)',
      description: 'Define a quién te diriges. Comprende sus comportamientos, dolores y alegrías.',
      icon: 'Users',
      color: 'from-blue-500 to-indigo-600',
      associatedBlocks: ['segmentos_clientes', 'relaciones_clientes', 'canales']
    },
    {
      id: 'oferta',
      title: '2. Oferta (Qué)',
      description: 'Es tu propuesta de valor. El núcleo de por qué te elegirán sobre la competencia.',
      icon: 'Lightbulb',
      color: 'from-amber-400 to-orange-500',
      associatedBlocks: ['propuestas_valor']
    },
    {
      id: 'infraestructura',
      title: '3. Infraestructura (Cómo)',
      description: 'El motor operativo. Qué actividades, recursos y socios necesitas para cumplir tu promesa.',
      icon: 'Cpu',
      color: 'from-purple-500 to-pink-600',
      associatedBlocks: ['actividades_clave', 'recursos_clave', 'socios_clave']
    },
    {
      id: 'viabilidad',
      title: '4. Viabilidad Financiera (Cuánto)',
      description: 'La salud económica. Cuánto cuesta operar y cómo ingresa el dinero.',
      icon: 'DollarSign',
      color: 'from-emerald-500 to-teal-600',
      associatedBlocks: ['estructura_costos', 'fuentes_ingresos']
    }
  ] as Pillar[],
  pensamientoVisual: {
    title: 'Pensamiento Visual',
    description: 'El uso de lienzos y notas adhesivas (post-its) facilita la discusión grupal, promueve la cocreación, estimula la innovación y permite comprender la complejidad de un modelo de negocio de un solo vistazo, sin simplificar en exceso los flujos lógicos.',
    benefits: [
      'Mapeo Rápido: Mueve y cambia ideas sin escribir extensos manuales de 100 páginas.',
      'Enfoque Sistémico: Mira cómo se conecta un bloque con el otro de inmediato.',
      'Comprensión Compartida: Alinea a todo tu equipo bajo un mismo lenguaje visual.'
    ]
  }
};

export const evaluacionContent = {
  comparacion: {
    title: 'BMC vs. Lean Canvas',
    description: 'Aunque se parecen visualmente, sirven para etapas distintas de la vida del negocio. El Business Model Canvas se enfoca en el diseño estratégico organizacional de empresas establecidas o con mercado conocido, mientras que el Lean Canvas (creado por Ash Maurya) prioriza el binomio "Problema-Solución" para startups en etapa temprana.',
    comparisonTable: [
      { aspect: 'Enfoque principal', bmc: 'Estructura e infraestructura de negocio', lean: 'Validación del binomio Problema-Solución' },
      { aspect: 'Bloques eliminados', bmc: 'Ninguno (Clásico)', lean: 'Socios, Recursos, Actividades, Relaciones' },
      { aspect: 'Bloques agregados', bmc: 'Socios, Recursos, Actividades, Relaciones', lean: 'Problema, Solución, Métricas clave, Ventaja injusta' },
      { aspect: 'Etapa óptima', bmc: 'Planificación estratégica y optimización', lean: 'Descubrimiento de cliente y fase de experimentación inicial' }
    ]
  },
  mvp: {
    title: 'El Producto Mínimo Viable (PMV)',
    description: 'El lienzo del Business Model Canvas funciona como un conjunto de hipótesis iniciales. El Producto Mínimo Viable (MVP) es la versión más simplificada de tu oferta que te permite validar comercialmente esas hipótesis en el mercado con clientes reales de forma rápida y barata, antes de realizar grandes inversiones.',
    steps: [
      'Paso 1: Identifica el supuesto más riesgoso de tu propuesta de valor.',
      'Paso 2: Diseña un experimento rápido (como una landing page, un video o un servicio manual "Mago de Oz").',
      'Paso 3: Lanza, mide el comportamiento de los usuarios y retroalimenta tu canvas.'
    ]
  },
  productMarketFit: {
    title: 'Ajuste Producto-Mercado (Product-Market Fit)',
    description: 'Es el santo grial de cualquier modelo. Sucede cuando logras crear una propuesta de valor que encaja perfectamente con las necesidades, dolores y deseos de un segmento de clientes dispuesto a pagar por ella de forma sostenible.',
    indicator: 'Se logra cuando el mercado "tira" del producto de forma natural: el boca a boca se dispara, la retención de clientes es alta y los ingresos crecen de forma orgánica.'
  }
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    text: '¿En qué bloque colocarías "Tostadores de café locales" para nuestro Café Literario?',
    concept: 'Identifica la red de proveedores y aliados que hacen viable el modelo.',
    correctBlockId: 'socios_clave',
    options: [
      { blockId: 'socios_clave', label: 'Socios Clave' },
      { blockId: 'recursos_clave', label: 'Recursos Clave' },
      { blockId: 'propuestas_valor', label: 'Propuesta de Valor' },
      { blockId: 'canales', label: 'Canales' }
    ],
    hint: 'Son entidades externas con las que te asocias para adquirir materias primas estables.'
  },
  {
    id: 'q2',
    text: 'Para Netflix, ¿dónde encaja "Streaming ilimitado sin comerciales y recomendaciones inteligentes"?',
    concept: 'El valor diferenciador que atrae y soluciona la necesidad del usuario.',
    correctBlockId: 'propuestas_valor',
    options: [
      { blockId: 'segmentos_clientes', label: 'Segmentos de Clientes' },
      { blockId: 'propuestas_valor', label: 'Propuesta de Valor' },
      { blockId: 'fuentes_ingresos', label: 'Fuentes de Ingresos' },
      { blockId: 'actividades_clave', label: 'Actividades Clave' }
    ],
    hint: 'Es la promesa de valor central que le ofreces a tu mercado objetivo.'
  },
  {
    id: 'q3',
    text: '¿Dónde clasificarías "Suscripciones mensuales de $9.99, $15.49 y $19.99"?',
    concept: 'La forma y mecanismo por el cual el modelo captura ingresos monetarios.',
    correctBlockId: 'fuentes_ingresos',
    options: [
      { blockId: 'estructura_costos', label: 'Estructura de Costos' },
      { blockId: 'fuentes_ingresos', label: 'Fuentes de Ingresos' },
      { blockId: 'relaciones_clientes', label: 'Relaciones con Clientes' },
      { blockId: 'recursos_clave', label: 'Recursos Clave' }
    ],
    hint: 'Representa el flujo de caja recurrente generado por tus segmentos de mercado.'
  },
  {
    id: 'q4',
    text: '¿Dónde va "Desarrollo y soporte continuo del algoritmo de la app de Uber"?',
    concept: 'Acciones críticas internas necesarias para que el modelo funcione.',
    correctBlockId: 'actividades_clave',
    options: [
      { blockId: 'actividades_clave', label: 'Actividades Clave' },
      { blockId: 'recursos_clave', label: 'Recursos Clave' },
      { blockId: 'canales', label: 'Canales' },
      { blockId: 'estructura_costos', label: 'Estructura de Costos' }
    ],
    hint: 'Se refiere a tareas y procesos indispensables que tu equipo ejecuta día con día.'
  },
  {
    id: 'q5',
    text: '¿Dónde colocarías "Familias con niños pequeños en busca de películas seguras"?',
    concept: 'El grupo específico de personas u organizaciones a las que diriges tu negocio.',
    correctBlockId: 'segmentos_clientes',
    options: [
      { blockId: 'relaciones_clientes', label: 'Relaciones con Clientes' },
      { blockId: 'propuestas_valor', label: 'Propuesta de Valor' },
      { blockId: 'segmentos_clientes', label: 'Segmentos de Clientes' },
      { blockId: 'canales', label: 'Canales' }
    ],
    hint: 'Son los destinatarios finales de tu propuesta, divididos por nichos o demográficos.'
  }
];
