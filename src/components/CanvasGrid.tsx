/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Users,
  Lightbulb,
  Truck,
  HeartHandshake,
  DollarSign,
  TrendingUp,
  Cpu,
  Bookmark,
  Plus,
  Trash2,
  Edit2,
  FileText,
  Workflow,
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import { BlockId, StickyNote } from '../types';

interface CanvasGridProps {
  notes: StickyNote[];
  onAddNote: (blockId: BlockId, text: string, color: StickyNote['color']) => void;
  onDeleteNote: (id: string) => void;
  onEditNote: (id: string, newText: string, color: StickyNote['color']) => void;
  highlightedBlocks: BlockId[];
}

interface BlockDefinition {
  id: BlockId;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bgHeader: string;
  borderHover: string;
  textColor: string;
  description: string;
}

export default function CanvasGrid({
  notes,
  onAddNote,
  onDeleteNote,
  onEditNote,
  highlightedBlocks
}: CanvasGridProps) {
  const [layoutMode, setLayoutMode] = useState<'classic' | 'grid'>('classic');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [editingColor, setEditingColor] = useState<StickyNote['color']>('yellow');

  // Input states for quick add
  const [activeAddBlockId, setActiveAddBlockId] = useState<BlockId | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteColor, setNewNoteColor] = useState<StickyNote['color']>('yellow');

  const blockDefinitions: Record<BlockId, BlockDefinition> = {
    socios_clave: {
      id: 'socios_clave',
      title: 'Socios Clave',
      subtitle: 'Alianzas y Proveedores',
      icon: <Workflow className="w-4 h-4" />,
      bgHeader: 'bg-indigo-50 border-indigo-100',
      borderHover: 'hover:border-indigo-400',
      textColor: 'text-indigo-700',
      description: '¿Quiénes son nuestros socios y proveedores clave? ¿Qué recursos adquirimos de ellos?'
    },
    actividades_clave: {
      id: 'actividades_clave',
      title: 'Actividades Clave',
      subtitle: 'Acciones Necesarias',
      icon: <Bookmark className="w-4 h-4" />,
      bgHeader: 'bg-orange-50 border-orange-100',
      borderHover: 'hover:border-orange-400',
      textColor: 'text-orange-700',
      description: '¿Qué acciones clave requiere nuestra propuesta de valor? ¿Canales de distribución?'
    },
    recursos_clave: {
      id: 'recursos_clave',
      title: 'Recursos Clave',
      subtitle: 'Activos Indispensables',
      icon: <Cpu className="w-4 h-4" />,
      bgHeader: 'bg-purple-50 border-purple-100',
      borderHover: 'hover:border-purple-400',
      textColor: 'text-purple-700',
      description: '¿Qué recursos clave (intelectuales, físicos, humanos, financieros) requerimos?'
    },
    propuestas_valor: {
      id: 'propuestas_valor',
      title: 'Propuestas de Valor',
      subtitle: 'Solución y Diferenciador',
      icon: <Lightbulb className="w-4 h-4" />,
      bgHeader: 'bg-amber-50 border-amber-100',
      borderHover: 'hover:border-amber-400',
      textColor: 'text-amber-700',
      description: '¿Qué valor entregamos al cliente? ¿Qué problemas resolvemos? ¿Qué necesidad satisfacemos?'
    },
    relaciones_clientes: {
      id: 'relaciones_clientes',
      title: 'Relaciones con Clientes',
      subtitle: 'Vínculo y Fidelización',
      icon: <HeartHandshake className="w-4 h-4" />,
      bgHeader: 'bg-pink-50 border-pink-100',
      borderHover: 'hover:border-pink-400',
      textColor: 'text-pink-700',
      description: '¿Qué tipo de relación espera cada segmento de cliente que establezcamos y mantengamos?'
    },
    canales: {
      id: 'canales',
      title: 'Canales',
      subtitle: 'Distribución y Entrega',
      icon: <Truck className="w-4 h-4" />,
      bgHeader: 'bg-sky-50 border-sky-100',
      borderHover: 'hover:border-sky-400',
      textColor: 'text-sky-700',
      description: '¿A través de qué canales quieren ser contactados nuestros segmentos de clientes?'
    },
    segmentos_clientes: {
      id: 'segmentos_clientes',
      title: 'Segmentos de Clientes',
      subtitle: 'Mercado Objetivo',
      icon: <Users className="w-4 h-4" />,
      bgHeader: 'bg-blue-50 border-blue-100',
      borderHover: 'hover:border-blue-400',
      textColor: 'text-blue-700',
      description: '¿Para quién estamos creando valor? ¿Quiénes son nuestros clientes más importantes?'
    },
    estructura_costos: {
      id: 'estructura_costos',
      title: 'Estructura de Costos',
      subtitle: 'Egresos Principales',
      icon: <FileText className="w-4 h-4" />,
      bgHeader: 'bg-red-50 border-red-100',
      borderHover: 'hover:border-red-400',
      textColor: 'text-red-700',
      description: '¿Cuáles son los costos más importantes e inherentes a nuestro modelo de negocio?'
    },
    fuentes_ingresos: {
      id: 'fuentes_ingresos',
      title: 'Fuentes de Ingresos',
      subtitle: 'Formas de Cobro',
      icon: <DollarSign className="w-4 h-4" />,
      bgHeader: 'bg-emerald-50 border-emerald-100',
      borderHover: 'hover:border-emerald-400',
      textColor: 'text-emerald-700',
      description: '¿Por qué valor están realmente dispuestos a pagar nuestros clientes? ¿Cómo pagan?'
    }
  };

  const colorClasses: Record<StickyNote['color'], string> = {
    yellow: 'bg-amber-100 border-amber-200 text-amber-900 shadow-amber-100/50',
    blue: 'bg-sky-100 border-sky-200 text-sky-900 shadow-sky-100/50',
    pink: 'bg-pink-100 border-pink-200 text-pink-900 shadow-pink-100/50',
    green: 'bg-emerald-100 border-emerald-200 text-emerald-900 shadow-emerald-100/50',
    purple: 'bg-purple-100 border-purple-200 text-purple-900 shadow-purple-100/50'
  };

  const handleQuickAdd = (blockId: BlockId) => {
    if (newNoteText.trim() === '') return;
    onAddNote(blockId, newNoteText.trim(), newNoteColor);
    setNewNoteText('');
    setActiveAddBlockId(null);
  };

  const handleStartEdit = (note: StickyNote) => {
    setEditingNoteId(note.id);
    setEditingText(note.text);
    setEditingColor(note.color);
  };

  const handleSaveEdit = () => {
    if (editingNoteId && editingText.trim() !== '') {
      onEditNote(editingNoteId, editingText.trim(), editingColor);
      setEditingNoteId(null);
    }
  };

  const renderStickyNotes = (blockId: BlockId) => {
    const blockNotes = notes.filter((n) => n.blockId === blockId);

    return (
      <div className="flex flex-wrap gap-2 p-1 max-h-[220px] overflow-y-auto mt-2">
        {blockNotes.map((note) => {
          const isEditing = editingNoteId === note.id;

          if (isEditing) {
            return (
              <div
                key={note.id}
                className="w-full p-2.5 rounded-lg border bg-white shadow-md z-10 flex flex-col gap-2 border-slate-200"
              >
                <textarea
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
                  rows={2}
                />
                <div className="flex items-center justify-between gap-1">
                  <div className="flex gap-1">
                    {(['yellow', 'blue', 'pink', 'green', 'purple'] as StickyNote['color'][]).map((c) => (
                      <button
                        key={c}
                        onClick={() => setEditingColor(c)}
                        className={`w-4.5 h-4.5 rounded-full border ${
                          colorClasses[c].split(' ')[0]
                        } transition-transform ${editingColor === c ? 'scale-125 border-slate-400 ring-1 ring-slate-400' : 'border-transparent'}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setEditingNoteId(null)}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px] font-medium"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-medium"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={note.id}
              className={`sticky-note group p-2.5 rounded-lg border text-xs leading-relaxed shadow-sm flex flex-col justify-between w-full min-h-[50px] ${
                colorClasses[note.color]
              }`}
            >
              <p className="font-sans font-medium whitespace-pre-wrap">{note.text}</p>
              <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity mt-2 pt-1 border-t border-black/5">
                <button
                  onClick={() => handleStartEdit(note)}
                  className="p-1 hover:bg-black/5 rounded text-black/50 hover:text-black"
                  title="Editar nota"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="p-1 hover:bg-black/5 rounded text-red-700/50 hover:text-red-700"
                  title="Eliminar nota"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderBlockHeader = (def: BlockDefinition) => {
    const isHighlighted = highlightedBlocks.includes(def.id);

    return (
      <div className={`flex items-start justify-between border-b pb-2 ${def.bgHeader} p-2 rounded-t-xl`}>
        <div className="flex gap-2">
          <div className={`${def.textColor} mt-0.5`}>{def.icon}</div>
          <div>
            <h4 className={`font-display font-semibold text-xs text-slate-800`}>{def.title}</h4>
            <span className="text-[9px] text-slate-400 font-medium block">{def.subtitle}</span>
          </div>
        </div>

        <button
          onClick={() => {
            setActiveAddBlockId(activeAddBlockId === def.id ? null : def.id);
            setNewNoteText('');
          }}
          className={`p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all ${
            activeAddBlockId === def.id ? 'bg-slate-100 text-slate-700' : ''
          }`}
          title="Agregar nota adhesiva"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  };

  const renderBlockBody = (def: BlockDefinition) => {
    const isAdding = activeAddBlockId === def.id;

    return (
      <div className="p-2 flex-1 flex flex-col justify-between">
        {/* Helper tooltip info if empty */}
        {notes.filter((n) => n.blockId === def.id).length === 0 && !isAdding && (
          <p className="text-[10px] text-slate-400 leading-normal p-2 italic font-sans bg-slate-50/50 rounded-lg">
            {def.description}
          </p>
        )}

        {/* Dynamic post-it notes */}
        {renderStickyNotes(def.id)}

        {/* Active Quick Add Post-it input */}
        {isAdding && (
          <div className="mt-2 p-2 bg-slate-50 border border-slate-100 rounded-lg flex flex-col gap-2 animate-fadeIn">
            <textarea
              placeholder="Escribe el contenido..."
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              className="w-full text-xs p-2 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
              rows={2}
              autoFocus
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {(['yellow', 'blue', 'pink', 'green', 'purple'] as StickyNote['color'][]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setNewNoteColor(c)}
                    className={`w-4 h-4 rounded-full border ${
                      colorClasses[c].split(' ')[0]
                    } transition-transform ${newNoteColor === c ? 'scale-125 border-slate-400' : 'border-transparent'}`}
                  />
                ))}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveAddBlockId(null)}
                  className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-500 rounded text-[10px] border border-slate-200 font-medium"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => handleQuickAdd(def.id)}
                  className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-medium shadow-sm"
                >
                  Añadir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSingleBlockCard = (id: BlockId) => {
    const def = blockDefinitions[id];
    const isHighlighted = highlightedBlocks.includes(id);

    return (
      <div
        className={`bg-white rounded-xl border flex flex-col transition-all duration-300 min-h-[140px] ${def.borderHover} ${
          isHighlighted ? 'border-indigo-500 ring-2 ring-indigo-100 shadow-md scale-[1.01]' : 'border-slate-100'
        }`}
      >
        {renderBlockHeader(def)}
        {renderBlockBody(def)}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Layout Selector and Title */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase font-bold block">
            Lienzo Interactivo
          </span>
          <h2 className="font-display font-semibold text-slate-800 text-base">
            {layoutMode === 'classic' ? 'Lienzo Clásico del Modelo Canvas' : 'Lienzo en Vista Cuadrícula (Foto)'}
          </h2>
        </div>

        {/* Selector Toggle */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-medium">
          <button
            onClick={() => setLayoutMode('classic')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer transition-all ${
              layoutMode === 'classic' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Clásico (9 Bloques)</span>
          </button>
          <button
            onClick={() => setLayoutMode('grid')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer transition-all ${
              layoutMode === 'grid' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Cuadrícula (Foto)</span>
          </button>
        </div>
      </div>

      {/* RENDER CLASSIC CANVAS VIEW */}
      {layoutMode === 'classic' && (
        <div className="flex flex-col gap-3">
          {/* Main 5-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {/* Column 1: Socios Clave */}
            <div className="md:col-span-1 flex flex-col">
              {renderSingleBlockCard('socios_clave')}
            </div>

            {/* Column 2: Actividades and Recursos */}
            <div className="md:col-span-1 flex flex-col gap-3">
              <div className="flex-1 flex flex-col">{renderSingleBlockCard('actividades_clave')}</div>
              <div className="flex-1 flex flex-col">{renderSingleBlockCard('recursos_clave')}</div>
            </div>

            {/* Column 3: Propuestas de Valor */}
            <div className="md:col-span-1 flex flex-col">
              {renderSingleBlockCard('propuestas_valor')}
            </div>

            {/* Column 4: Relaciones and Canales */}
            <div className="md:col-span-1 flex flex-col gap-3">
              <div className="flex-1 flex flex-col">{renderSingleBlockCard('relaciones_clientes')}</div>
              <div className="flex-1 flex flex-col">{renderSingleBlockCard('canales')}</div>
            </div>

            {/* Column 5: Segmentos de Clientes */}
            <div className="md:col-span-1 flex flex-col">
              {renderSingleBlockCard('segmentos_clientes')}
            </div>
          </div>

          {/* Bottom Financial Row (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {renderSingleBlockCard('estructura_costos')}
            {renderSingleBlockCard('fuentes_ingresos')}
          </div>
        </div>
      )}

      {/* RENDER GRID CANVAS VIEW (MATCHING THE PHOTO'S 3X3 GRID) */}
      {layoutMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Row 1 */}
          {renderSingleBlockCard('segmentos_clientes')}
          {renderSingleBlockCard('propuestas_valor')}
          {renderSingleBlockCard('canales')}

          {/* Row 2 */}
          {renderSingleBlockCard('relaciones_clientes')}
          
          {/* Center Card (Replacing standard 9th block as shown in photo center) */}
          <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-xl p-5 text-white flex flex-col justify-center items-center text-center shadow-md min-h-[140px] relative overflow-hidden">
            <div className="absolute -bottom-6 -right-6 p-6 opacity-10 text-white select-none pointer-events-none">
              <Sparkles className="w-24 h-24" />
            </div>
            <span className="font-mono text-[9px] tracking-widest text-pink-200 uppercase font-bold mb-1">
              Guía Visual
            </span>
            <h3 className="font-display font-bold text-sm tracking-wide leading-tight uppercase">
              Los 9 Bloques de Construcción
            </h3>
            <p className="text-[10px] text-indigo-100 max-w-[200px] mt-2 leading-relaxed">
              La cuadrícula simplifica los 4 pilares lógicos del negocio para facilitar el análisis inmediato.
            </p>
          </div>

          {renderSingleBlockCard('fuentes_ingresos')}

          {/* Row 3 */}
          {renderSingleBlockCard('actividades_clave')}
          {renderSingleBlockCard('recursos_clave')}
          {renderSingleBlockCard('estructura_costos')}
        </div>
      )}
    </div>
  );
}
