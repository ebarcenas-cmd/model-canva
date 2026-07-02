/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Trash2,
  Copy,
  Check,
  ChevronDown,
  RefreshCw,
  HelpCircle,
  Briefcase,
  Layers,
  BookOpen,
  Info,
  Download
} from 'lucide-react';
import FundamentosPanel from './components/FundamentosPanel';
import EvaluacionPanel from './components/EvaluacionPanel';
import CanvasGrid from './components/CanvasGrid';
import BrainstormModal from './components/BrainstormModal';
import { templates } from './data/canvasTemplates';
import { BlockId, StickyNote } from './types';

export default function App() {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [highlightedBlocks, setHighlightedBlocks] = useState<BlockId[]>([]);
  const [showBrainstormModal, setShowBrainstormModal] = useState(false);
  const [activeTemplateId, setActiveTemplateId] = useState<string>('cafe_libros');
  const [copySuccess, setCopySuccess] = useState(false);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);

  // Initialize canvas with localstorage or default template
  useEffect(() => {
    const savedNotes = localStorage.getItem('bmc_canvas_notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        // Fallback to default template if error parsing
        const defaultTemplate = templates.find((t) => t.id === 'cafe_libros') || templates[0];
        setNotes(defaultTemplate.notes);
      }
    } else {
      const defaultTemplate = templates.find((t) => t.id === 'cafe_libros') || templates[0];
      setNotes(defaultTemplate.notes);
    }
  }, []);

  // Sync to localstorage
  const saveNotesToStorage = (updatedNotes: StickyNote[]) => {
    setNotes(updatedNotes);
    localStorage.setItem('bmc_canvas_notes', JSON.stringify(updatedNotes));
  };

  // Actions
  const handleAddNote = (blockId: BlockId, text: string, color: StickyNote['color']) => {
    const newNote: StickyNote = {
      id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      blockId,
      text,
      color,
    };
    saveNotesToStorage([...notes, newNote]);
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    saveNotesToStorage(updated);
  };

  const handleEditNote = (id: string, newText: string, color: StickyNote['color']) => {
    const updated = notes.map((n) => (n.id === id ? { ...n, text: newText, color } : n));
    saveNotesToStorage(updated);
  };

  const handleLoadTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      saveNotesToStorage(template.notes);
      setActiveTemplateId(templateId);
    }
    setShowTemplateDropdown(false);
  };

  const handleClearCanvas = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar todo el lienzo? Se borrarán tus notas.')) {
      saveNotesToStorage([]);
      setActiveTemplateId('custom');
    }
  };

  // Callback when AI returns brainstorm result
  const handleBrainstormSuccess = (generatedBlocks: Record<string, string[]>) => {
    const newNotes: StickyNote[] = [];
    const colors: StickyNote['color'][] = ['yellow', 'blue', 'pink', 'green', 'purple'];
    
    Object.entries(generatedBlocks).forEach(([blockId, points]) => {
      points.forEach((point, idx) => {
        const colorIdx = idx % colors.length;
        newNotes.push({
          id: `ai_note_${blockId}_${idx}_${Date.now()}`,
          blockId: blockId as BlockId,
          text: point,
          color: colors[colorIdx],
        });
      });
    });

    saveNotesToStorage(newNotes);
    setActiveTemplateId('ai_brainstorm');
  };

  // Highlight blocks associated with hovered pillars
  const handleHoverPillar = (blocks: BlockId[] | null) => {
    if (blocks) {
      setHighlightedBlocks(blocks);
    } else {
      setHighlightedBlocks([]);
    }
  };

  // Export to markdown clipboard
  const handleExportMarkdown = () => {
    const blocksTitles: Record<BlockId, string> = {
      socios_clave: '1. Socios Clave',
      actividades_clave: '2. Actividades Clave',
      recursos_clave: '3. Recursos Clave',
      propuestas_valor: '4. Propuestas de Valor',
      relaciones_clientes: '5. Relaciones con Clientes',
      canales: '6. Canales',
      segmentos_clientes: '7. Segmentos de Clientes',
      estructura_costos: '8. Estructura de Costos',
      fuentes_ingresos: '9. Fuentes de Ingresos',
    };

    let mdText = `# Business Model Canvas - Exportación\n\n`;
    
    Object.keys(blocksTitles).forEach((key) => {
      const bId = key as BlockId;
      mdText += `## ${blocksTitles[bId]}\n`;
      const blockNotes = notes.filter((n) => n.blockId === bId);
      if (blockNotes.length === 0) {
        mdText += `- (Sin notas)\n`;
      } else {
        blockNotes.forEach((n) => {
          mdText += `- [${n.color.toUpperCase()}] ${n.text}\n`;
        });
      }
      mdText += `\n`;
    });

    navigator.clipboard.writeText(mdText).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleDownloadHTML = () => {
    const activeTitle = templates.find(t => t.id === activeTemplateId)?.title || 'Lienzo Personalizado';
    const activeDesc = templates.find(t => t.id === activeTemplateId)?.description || 'Lienzo interactivo creado por el usuario.';

    // Pasamos las notas actuales como el estado inicial dentro del archivo HTML generado
    const initialNotesJson = JSON.stringify(notes);

    const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lienzo Interactivo - ${activeTitle}</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        h1, h2, h3, h4 {
            font-family: 'Space Grotesk', sans-serif;
        }
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 5px;
            height: 5px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: rgba(156, 163, 175, 0.25);
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(156, 163, 175, 0.45);
        }
        .sticky-note {
            transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .sticky-note:hover {
            transform: scale(1.01) rotate(0.5deg);
        }
    </style>
</head>
<body class="bg-slate-50/50 text-slate-800 min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">

    <!-- Header -->
    <header class="bg-white border-b border-slate-100 py-4 px-6 sticky top-0 z-30 shadow-xs">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
                    <i data-lucide="briefcase" class="w-5 h-5"></i>
                </div>
                <div>
                    <h1 class="font-extrabold text-slate-800 text-lg md:text-xl tracking-tight leading-none uppercase">
                        Mi Lienzo Interactivo HTML5
                    </h1>
                    <span class="text-[10px] sm:text-xs text-indigo-600 font-semibold uppercase tracking-wider block mt-0.5">
                        Guardado Local Offline • No requiere internet
                    </span>
                </div>
            </div>
            
            <div class="flex items-center gap-2">
                <button onclick="clearCanvas()" class="px-3 py-1.5 bg-slate-50 hover:bg-red-50 hover:text-red-600 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer">
                    <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    <span>Limpiar Lienzo</span>
                </button>
                <button onclick="resetToDefault()" class="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer">
                    <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
                    <span>Restaurar Original</span>
                </button>
            </div>
        </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-5">
        
        <!-- Info Banner -->
        <div class="bg-indigo-50/65 border border-indigo-100/50 rounded-2xl p-4 flex items-start gap-3 shadow-xs">
            <i data-lucide="info" class="w-5 h-5 text-indigo-600 shrink-0 mt-0.5"></i>
            <div>
                <h4 class="font-bold text-indigo-950 text-xs uppercase tracking-wider">Lienzo Autoportante e Interactivo</h4>
                <p class="text-xs text-slate-600 leading-normal mt-1">
                    Este archivo es una aplicación interactiva completa. Puedes agregar notas adhesivas en cualquiera de los bloques usando el botón <strong class="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 border border-slate-200 inline-flex items-center gap-0.5"><i data-lucide="plus" class="w-3 h-3"></i></strong>, cambiar colores, editarlas o borrarlas. Todo se guarda automáticamente en tu navegador usando la tecnología <strong>HTML5 localStorage</strong>.
                </p>
            </div>
        </div>

        <!-- Meta Card -->
        <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
            <span class="text-[9px] font-mono tracking-widest text-indigo-600 uppercase font-bold block mb-1">Modelo Actual</span>
            <h2 id="canvas-title" class="text-base font-bold text-slate-800">${activeTitle}</h2>
            <p id="canvas-desc" class="text-xs text-slate-500 mt-1">${activeDesc}</p>
        </div>

        <!-- The 9 Block Grid -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            <!-- Column 1: Socios Clave -->
            <div id="col-socios_clave" class="md:col-span-1 bg-white rounded-2xl border border-slate-100 flex flex-col shadow-xs overflow-hidden">
                <!-- Header -->
                <div class="flex items-center justify-between p-3 bg-indigo-50/50 border-b border-indigo-100/30">
                    <div class="flex items-center gap-2">
                        <i data-lucide="git-branch" class="w-4 h-4 text-indigo-600"></i>
                        <div>
                            <h3 class="font-bold text-xs text-slate-800">Socios Clave</h3>
                            <span class="text-[8px] text-slate-400 font-medium block">Alianzas y Aliados</span>
                        </div>
                    </div>
                    <button onclick="openAddForm('socios_clave')" class="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                        <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                    </button>
                </div>
                <!-- Content -->
                <div id="notes-socios_clave" class="p-3 flex-1 flex flex-col gap-2 min-h-[160px] overflow-y-auto"></div>
            </div>

            <!-- Column 2: Actividades Clave & Recursos Clave -->
            <div class="md:col-span-1 flex flex-col gap-4">
                <!-- Actividades Clave -->
                <div id="col-actividades_clave" class="flex-1 bg-white rounded-2xl border border-slate-100 flex flex-col shadow-xs overflow-hidden">
                    <div class="flex items-center justify-between p-3 bg-orange-50/50 border-b border-orange-100/30">
                        <div class="flex items-center gap-2">
                            <i data-lucide="check-square" class="w-4 h-4 text-orange-600"></i>
                            <div>
                                <h3 class="font-bold text-xs text-slate-800">Actividades</h3>
                                <span class="text-[8px] text-slate-400 font-medium block">Acciones Críticas</span>
                            </div>
                        </div>
                        <button onclick="openAddForm('actividades_clave')" class="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                    <div id="notes-actividades_clave" class="p-3 flex-1 flex flex-col gap-2 min-h-[120px] overflow-y-auto"></div>
                </div>
                <!-- Recursos Clave -->
                <div id="col-recursos_clave" class="flex-1 bg-white rounded-2xl border border-slate-100 flex flex-col shadow-xs overflow-hidden">
                    <div class="flex items-center justify-between p-3 bg-purple-50/50 border-b border-purple-100/30">
                        <div class="flex items-center gap-2">
                            <i data-lucide="cpu" class="w-4 h-4 text-purple-600"></i>
                            <div>
                                <h3 class="font-bold text-xs text-slate-800">Recursos Clave</h3>
                                <span class="text-[8px] text-slate-400 font-medium block">Activos de Valor</span>
                            </div>
                        </div>
                        <button onclick="openAddForm('recursos_clave')" class="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                    <div id="notes-recursos_clave" class="p-3 flex-1 flex flex-col gap-2 min-h-[120px] overflow-y-auto"></div>
                </div>
            </div>

            <!-- Column 3: Propuestas de Valor -->
            <div id="col-propuestas_valor" class="md:col-span-1 bg-white rounded-2xl border border-slate-100 flex flex-col shadow-xs overflow-hidden">
                <div class="flex items-center justify-between p-3 bg-amber-50/50 border-b border-amber-100/30">
                    <div class="flex items-center gap-2">
                        <i data-lucide="lightbulb" class="w-4 h-4 text-amber-600"></i>
                        <div>
                            <h3 class="font-bold text-xs text-slate-800">Propuestas Valor</h3>
                            <span class="text-[8px] text-slate-400 font-medium block">Diferenciador</span>
                        </div>
                    </div>
                    <button onclick="openAddForm('propuestas_valor')" class="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                        <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                    </button>
                </div>
                <div id="notes-propuestas_valor" class="p-3 flex-1 flex flex-col gap-2 min-h-[160px] overflow-y-auto"></div>
            </div>

            <!-- Column 4: Relaciones con Clientes & Canales -->
            <div class="md:col-span-1 flex flex-col gap-4">
                <!-- Relaciones con Clientes -->
                <div id="col-relaciones_clientes" class="flex-1 bg-white rounded-2xl border border-slate-100 flex flex-col shadow-xs overflow-hidden">
                    <div class="flex items-center justify-between p-3 bg-pink-50/50 border-b border-pink-100/30">
                        <div class="flex items-center gap-2">
                            <i data-lucide="heart" class="w-4 h-4 text-pink-600"></i>
                            <div>
                                <h3 class="font-bold text-xs text-slate-800">Relación Clientes</h3>
                                <span class="text-[8px] text-slate-400 font-medium block">Fidelización</span>
                            </div>
                        </div>
                        <button onclick="openAddForm('relaciones_clientes')" class="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                    <div id="notes-relaciones_clientes" class="p-3 flex-1 flex flex-col gap-2 min-h-[120px] overflow-y-auto"></div>
                </div>
                <!-- Canales -->
                <div id="col-canales" class="flex-1 bg-white rounded-2xl border border-slate-100 flex flex-col shadow-xs overflow-hidden">
                    <div class="flex items-center justify-between p-3 bg-sky-50/50 border-b border-sky-100/30">
                        <div class="flex items-center gap-2">
                            <i data-lucide="truck" class="w-4 h-4 text-sky-600"></i>
                            <div>
                                <h3 class="font-bold text-xs text-slate-800">Canales</h3>
                                <span class="text-[8px] text-slate-400 font-medium block">Distribución y Venta</span>
                            </div>
                        </div>
                        <button onclick="openAddForm('canales')" class="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                    <div id="notes-canales" class="p-3 flex-1 flex flex-col gap-2 min-h-[120px] overflow-y-auto"></div>
                </div>
            </div>

            <!-- Column 5: Segmentos de Clientes -->
            <div id="col-segmentos_clientes" class="md:col-span-1 bg-white rounded-2xl border border-slate-100 flex flex-col shadow-xs overflow-hidden">
                <div class="flex items-center justify-between p-3 bg-blue-50/50 border-b border-blue-100/30">
                    <div class="flex items-center gap-2">
                        <i data-lucide="users" class="w-4 h-4 text-blue-600"></i>
                        <div>
                            <h3 class="font-bold text-xs text-slate-800">Segmento Clientes</h3>
                            <span class="text-[8px] text-slate-400 font-medium block">Público Objetivo</span>
                        </div>
                    </div>
                    <button onclick="openAddForm('segmentos_clientes')" class="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                        <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                    </button>
                </div>
                <div id="notes-segmentos_clientes" class="p-3 flex-1 flex flex-col gap-2 min-h-[160px] overflow-y-auto"></div>
            </div>

        </div>

        <!-- Financial Row (Costos e Ingresos) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Estructura de Costos -->
            <div id="col-estructura_costos" class="bg-white rounded-2xl border border-slate-100 flex flex-col shadow-xs overflow-hidden">
                <div class="flex items-center justify-between p-3 bg-red-50/50 border-b border-red-100/30">
                    <div class="flex items-center gap-2">
                        <i data-lucide="file-text" class="w-4 h-4 text-red-600"></i>
                        <div>
                            <h3 class="font-bold text-xs text-slate-800">Estructura de Costos</h3>
                            <span class="text-[8px] text-slate-400 font-medium block">Gastos y Egresos Principales</span>
                        </div>
                    </div>
                    <button onclick="openAddForm('estructura_costos')" class="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                        <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                    </button>
                </div>
                <div id="notes-estructura_costos" class="p-3 flex-1 flex flex-col gap-2 min-h-[110px] overflow-y-auto"></div>
            </div>

            <!-- Fuentes de Ingresos -->
            <div id="col-fuentes_ingresos" class="bg-white rounded-2xl border border-slate-100 flex flex-col shadow-xs overflow-hidden">
                <div class="flex items-center justify-between p-3 bg-emerald-50/50 border-b border-emerald-100/30">
                    <div class="flex items-center gap-2">
                        <i data-lucide="dollar-sign" class="w-4 h-4 text-emerald-600"></i>
                        <div>
                            <h3 class="font-bold text-xs text-slate-800">Fuentes de Ingresos</h3>
                            <span class="text-[8px] text-slate-400 font-medium block">Monetización y Flujos de Caja</span>
                        </div>
                    </div>
                    <button onclick="openAddForm('fuentes_ingresos')" class="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                        <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                    </button>
                </div>
                <div id="notes-fuentes_ingresos" class="p-3 flex-1 flex flex-col gap-2 min-h-[110px] overflow-y-auto"></div>
            </div>
        </div>

    </main>

    <!-- Modal Form for Adding/Editing Note -->
    <div id="note-modal" class="fixed inset-0 bg-slate-900/50 backdrop-blur-xs hidden items-center justify-center z-50 p-4">
        <div class="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-scaleIn">
            <!-- Modal Header -->
            <div class="px-5 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <h3 id="modal-title" class="font-bold text-slate-800 text-sm">Agregar Nota Adhesiva</h3>
                <button onclick="closeModal()" class="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all cursor-pointer">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>
            <!-- Modal Body -->
            <div class="p-5 flex flex-col gap-4">
                <input type="hidden" id="modal-block-id">
                <input type="hidden" id="modal-note-id">
                
                <div>
                    <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Contenido de la nota</label>
                    <textarea id="modal-note-text" rows="3" placeholder="Ingresa una idea clara y concisa..." class="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"></textarea>
                </div>

                <div>
                    <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Color de la nota adhesiva</label>
                    <div class="flex gap-2.5">
                        <button onclick="setModalColor('yellow')" id="color-yellow" class="w-8 h-8 rounded-full border-2 border-transparent bg-amber-100 focus:outline-none cursor-pointer"></button>
                        <button onclick="setModalColor('blue')" id="color-blue" class="w-8 h-8 rounded-full border-2 border-transparent bg-sky-100 focus:outline-none cursor-pointer"></button>
                        <button onclick="setModalColor('pink')" id="color-pink" class="w-8 h-8 rounded-full border-2 border-transparent bg-pink-100 focus:outline-none cursor-pointer"></button>
                        <button onclick="setModalColor('green')" id="color-green" class="w-8 h-8 rounded-full border-2 border-transparent bg-emerald-100 focus:outline-none cursor-pointer"></button>
                        <button onclick="setModalColor('purple')" id="color-purple" class="w-8 h-8 rounded-full border-2 border-transparent bg-purple-100 focus:outline-none cursor-pointer"></button>
                    </div>
                </div>
            </div>
            <!-- Modal Footer -->
            <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-end gap-2 text-xs font-semibold">
                <button onclick="closeModal()" class="px-3 py-2 bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 rounded-lg transition-all cursor-pointer">Cancelar</button>
                <button onclick="saveNote()" class="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-all shadow-sm cursor-pointer">Guardar Idea</button>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-100 py-6 px-6 mt-12 text-center text-slate-400 text-xs">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
            <p>© 2026 Dominando el Business Model Canvas. Exportado de forma 100% Interactiva en HTML5.</p>
            <p class="font-medium text-slate-500">Diseño estratégico ágil con persistencia automática.</p>
        </div>
    </footer>

    <!-- Interactive Canvas Logic Script -->
    <script>
        // Default seed notes in case localStorage is empty
        const defaultNotes = ${initialNotesJson};
        
        // Load current state or use default seed
        let notes = [];
        const storageKey = 'downloaded_bmc_notes_' + '${activeTemplateId}';
        
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                notes = JSON.parse(saved);
            } else {
                notes = [...defaultNotes];
            }
        } catch(e) {
            notes = [...defaultNotes];
        }

        let selectedColor = 'yellow';

        const colorHexMap = {
            yellow: 'bg-amber-100 border-amber-200 text-amber-900',
            blue: 'bg-sky-100 border-sky-200 text-sky-900',
            pink: 'bg-pink-100 border-pink-200 text-pink-900',
            green: 'bg-emerald-100 border-emerald-200 text-emerald-900',
            purple: 'bg-purple-100 border-purple-200 text-purple-900'
        };

        const activeColorBorderMap = {
            yellow: 'border-amber-400 ring-2 ring-amber-200',
            blue: 'border-sky-400 ring-2 ring-sky-200',
            pink: 'border-pink-400 ring-2 ring-pink-200',
            green: 'border-emerald-400 ring-2 ring-emerald-200',
            purple: 'border-purple-400 ring-2 ring-purple-200'
        };

        // Render the notes into blocks
        function renderCanvas() {
            const blocks = [
                'socios_clave', 'actividades_clave', 'recursos_clave', 'propuestas_valor',
                'relaciones_clientes', 'canales', 'segmentos_clientes', 'estructura_costos', 'fuentes_ingresos'
            ];

            // Clean all blocks first
            blocks.forEach(bId => {
                const container = document.getElementById('notes-' + bId);
                if (container) container.innerHTML = '';
            });

            // Render matching notes
            notes.forEach(note => {
                const container = document.getElementById('notes-' + note.blockId);
                if (!container) return;

                const bgClass = colorHexMap[note.color] || colorHexMap.yellow;

                const noteDiv = document.createElement('div');
                noteDiv.className = \`sticky-note group p-3 rounded-xl border text-xs leading-relaxed shadow-xs flex flex-col justify-between cursor-pointer \${bgClass}\`;
                
                noteDiv.innerHTML = \`
                    <div onclick="openEditForm('\${note.id}')" class="flex-1">
                        <p class="font-sans font-medium whitespace-pre-wrap">\${note.text}</p>
                    </div>
                    <div class="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity mt-2 pt-1 border-t border-black/5">
                        <button onclick="openEditForm('\${note.id}')" class="p-1 hover:bg-black/5 rounded text-black/50 hover:text-black" title="Editar">
                            <i data-lucide="edit-2" class="w-3 h-3"></i>
                        </button>
                        <button onclick="deleteNote('\${note.id}')" class="p-1 hover:bg-black/5 rounded text-red-700/50 hover:text-red-700" title="Eliminar">
                            <i data-lucide="trash-2" class="w-3 h-3"></i>
                        </button>
                    </div>
                \`;

                container.appendChild(noteDiv);
            });

            // Re-render lucide icons for newly added buttons
            if (window.lucide) {
                window.lucide.createIcons();
            }

            // Save to local storage
            localStorage.setItem(storageKey, JSON.stringify(notes));
        }

        // Add Note Dialog
        function openAddForm(blockId) {
            document.getElementById('modal-block-id').value = blockId;
            document.getElementById('modal-note-id').value = '';
            document.getElementById('modal-note-text').value = '';
            document.getElementById('modal-title').innerText = 'Agregar nota a ' + blockId.replace('_', ' ').toUpperCase();
            
            setModalColor('yellow');
            
            const modal = document.getElementById('note-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.getElementById('modal-note-text').focus();
        }

        // Edit Note Dialog
        function openEditForm(noteId) {
            const note = notes.find(n => n.id === noteId);
            if (!note) return;

            document.getElementById('modal-block-id').value = note.blockId;
            document.getElementById('modal-note-id').value = note.id;
            document.getElementById('modal-note-text').value = note.text;
            document.getElementById('modal-title').innerText = 'Editar Nota Adhesiva';
            
            setModalColor(note.color);

            const modal = document.getElementById('note-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.getElementById('modal-note-text').focus();
        }

        function closeModal() {
            const modal = document.getElementById('note-modal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        function setModalColor(color) {
            selectedColor = color;
            const colors = ['yellow', 'blue', 'pink', 'green', 'purple'];
            
            colors.forEach(c => {
                const btn = document.getElementById('color-' + c);
                if (btn) {
                    btn.className = btn.className.split(' ').filter(cl => !cl.startsWith('border-') && !cl.startsWith('ring-')).join(' ');
                    if (c === color) {
                        btn.className += ' ' + activeColorBorderMap[c];
                    } else {
                        btn.className += ' border-transparent';
                    }
                }
            });
        }

        function saveNote() {
            const blockId = document.getElementById('modal-block-id').value;
            const noteId = document.getElementById('modal-note-id').value;
            const text = document.getElementById('modal-note-text').value.trim();

            if (text === '') return;

            if (noteId === '') {
                // Create mode
                const newNote = {
                    id: 'note_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                    blockId: blockId,
                    text: text,
                    color: selectedColor
                };
                notes.push(newNote);
            } else {
                // Edit mode
                notes = notes.map(n => n.id === noteId ? { ...n, text: text, color: selectedColor } : n);
            }

            closeModal();
            renderCanvas();
        }

        function deleteNote(noteId) {
            if (confirm('¿Deseas eliminar esta nota adhesiva?')) {
                notes = notes.filter(n => n.id !== noteId);
                renderCanvas();
            }
        }

        function clearCanvas() {
            if (confirm('¿Estás seguro de que quieres limpiar todo el lienzo? Se perderán todas tus notas.')) {
                notes = [];
                renderCanvas();
            }
        }

        function resetToDefault() {
            if (confirm('¿Deseas restaurar el lienzo con el ejemplo original de exportación? Se sobrescribirá tu progreso actual.')) {
                notes = [...defaultNotes];
                renderCanvas();
            }
        }

        // Initialize on page load
        window.onload = function() {
            renderCanvas();
        };
    </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `canvas_interactivo_${activeTemplateId}_${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Upper Navigation / Decorative Grid Header */}
      <header className="bg-white border-b border-slate-100 py-4 px-6 md:px-12 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-slate-800 text-lg md:text-xl tracking-tight leading-none">
                DOMINANDO EL BUSINESS MODEL CANVAS
              </h1>
              <span className="text-[10px] md:text-xs text-indigo-600 font-semibold uppercase tracking-wider block mt-0.5">
                De la Idea a la Estrategia • Metodología Ágil
              </span>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Template Selector dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
                className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Ejemplos</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showTemplateDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showTemplateDropdown && (
                <div className="absolute right-0 mt-1.5 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 p-1.5 animate-fadeIn">
                  <div className="text-[9px] uppercase font-bold text-slate-400 px-3 py-1.5 tracking-wider">
                    Cargar Caso Práctico
                  </div>
                  {templates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleLoadTemplate(t.id)}
                      className={`w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-50 transition-all font-medium flex flex-col cursor-pointer ${
                        activeTemplateId === t.id ? 'bg-indigo-50/55 text-indigo-700' : 'text-slate-700'
                      }`}
                    >
                      <span>{t.title}</span>
                      <span className="text-[9px] text-slate-400 font-normal truncate mt-0.5">{t.description}</span>
                    </button>
                  ))}
                  <div className="border-t border-slate-100 my-1.5" />
                  <button
                    onClick={() => {
                      saveNotesToStorage([]);
                      setActiveTemplateId('custom');
                      setShowTemplateDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-red-50 text-red-600 transition-all font-medium cursor-pointer"
                  >
                    Empezar de Cero (Lienzo Vacío)
                  </button>
                </div>
              )}
            </div>

            {/* Clear Canvas */}
            <button
              onClick={handleClearCanvas}
              className="p-2 bg-slate-50 hover:bg-red-50 hover:text-red-600 border border-slate-200 rounded-xl text-slate-500 transition-all cursor-pointer"
              title="Limpiar todo el lienzo"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Export Markdown */}
            <button
              onClick={handleExportMarkdown}
              className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Copiar lienzo como texto estructurado"
            >
              {copySuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500 animate-scaleIn" />
                  <span className="text-emerald-600">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Exportar</span>
                </>
              )}
            </button>

            {/* Download HTML5 */}
            <button
              onClick={handleDownloadHTML}
              className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Descargar reporte interactivo en HTML5"
            >
              <Download className="w-4 h-4 text-indigo-500" />
              <span>Descargar HTML5</span>
            </button>

            {/* Brainstorm with IA */}
            <button
              onClick={() => setShowBrainstormModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-indigo-100 hover:scale-[1.01] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-white/20 animate-pulse" />
              <span>Brainstorm con IA</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container Dashboard */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col gap-6">
        
        {/* Banner Informational Accent */}
        <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
          <div className="flex gap-2.5 items-start">
            <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5 md:mt-0" />
            <p className="text-xs text-slate-600 leading-normal">
              <strong>Consejo de aprendizaje:</strong> El modelo de negocio no es estático. Utiliza el <strong>Pensamiento Visual</strong> (en la columna izquierda) para comprender los fundamentos, rellena o genera bloques interactivos con la <strong>IA</strong> en el centro, y valida tus hipótesis usando la <strong>Simulación Práctica</strong> en la derecha.
            </p>
          </div>
          {activeTemplateId !== 'custom' && (
            <span className="text-[10px] font-mono font-bold bg-white text-indigo-600 px-3 py-1.5 rounded-full shadow-xs shrink-0 border border-indigo-50">
              Modo: {activeTemplateId === 'cafe_libros' ? 'Café Literario' : activeTemplateId === 'uber' ? 'Uber' : activeTemplateId === 'netflix' ? 'Netflix' : 'Brainstorm de IA'}
            </span>
          )}
        </div>

        {/* Triple Column Layout (Left: Fundamentos, Center: Canvas, Right: Evaluacion) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (Fundamentos Estratégicos) - 3 spans */}
          <section className="lg:col-span-3 flex flex-col">
            <div className="bg-slate-100/50 px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1.5 mb-3 self-start border border-slate-200/50">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fundamentos Estratégicos</span>
            </div>
            <FundamentosPanel
              onHoverPillar={handleHoverPillar}
              activeHighlightedBlocks={highlightedBlocks}
            />
          </section>

          {/* Center Stage (The Canvas Builder) - 6 spans */}
          <section className="lg:col-span-6 flex flex-col bg-white rounded-3xl p-5 border border-slate-100 shadow-sm min-h-[600px]">
            <CanvasGrid
              notes={notes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
              onEditNote={handleEditNote}
              highlightedBlocks={highlightedBlocks}
            />
          </section>

          {/* Right Column (Evaluación & Viabilidad) - 3 spans */}
          <section className="lg:col-span-3 flex flex-col">
            <div className="bg-slate-100/50 px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1.5 mb-3 self-start border border-slate-200/50">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Evaluación y Viabilidad</span>
            </div>
            <EvaluacionPanel />
          </section>

        </div>
      </main>

      {/* Footer Branding */}
      <footer className="bg-white border-t border-slate-100 py-6 mt-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-slate-400 text-xs">
          <p>© 2026 Dominando el Business Model Canvas. Diseñado de forma interactiva.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-600 transition-colors">NotebookLM Inspiración</span>
            <span className="hover:text-slate-600 transition-colors">Estrategia Ágil</span>
          </div>
        </div>
      </footer>

      {/* AI Brainstorm Modal */}
      {showBrainstormModal && (
        <BrainstormModal
          onClose={() => setShowBrainstormModal(false)}
          onBrainstormSuccess={handleBrainstormSuccess}
        />
      )}
    </div>
  );
}
