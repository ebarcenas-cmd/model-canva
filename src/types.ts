/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BlockId =
  | 'socios_clave'
  | 'actividades_clave'
  | 'recursos_clave'
  | 'propuestas_valor'
  | 'relaciones_clientes'
  | 'canales'
  | 'segmentos_clientes'
  | 'estructura_costos'
  | 'fuentes_ingresos';

export interface StickyNote {
  id: string;
  blockId: BlockId;
  text: string;
  color: 'yellow' | 'blue' | 'pink' | 'green' | 'purple';
}

export interface BusinessModelCanvas {
  id: string;
  title: string;
  description: string;
  notes: StickyNote[];
}

export interface LearningItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface Pillar {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  associatedBlocks: BlockId[];
}

export interface QuizQuestion {
  id: string;
  text: string;
  concept: string;
  correctBlockId: BlockId;
  options: { blockId: BlockId; label: string }[];
  hint: string;
}
