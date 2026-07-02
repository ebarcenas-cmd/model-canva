/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, X, Loader2, Lightbulb, AlertCircle, HelpCircle } from 'lucide-react';
import { BlockId, StickyNote } from '../types';

interface BrainstormModalProps {
  onClose: () => void;
  onBrainstormSuccess: (generatedBlocks: Record<string, string[]>) => void;
}

export default function BrainstormModal({ onClose, onBrainstormSuccess }: BrainstormModalProps) {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestKey, setSuggestKey] = useState(false);

  const sampleIdeas = [
    'Un café con juegos de mesa y club de lectura para jóvenes.',
    'Una aplicación de paseos y cuidados de mascotas a demanda.',
    'Un servicio de suscripción mensual de vegetales orgánicos de granjas locales.',
    'Una marca de mochilas ecológicas hechas 100% de plástico marino reciclado.'
  ];

  const handleBrainstorm = async () => {
    if (description.trim() === '') return;
    setIsLoading(true);
    setError(null);
    setSuggestKey(false);

    try {
      const response = await fetch('/api/brainstorm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ businessDescription: description.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error al generar las ideas.');
      }

      // Convert server keys to our camelCase / snake_case mapping
      const mappedData: Record<string, string[]> = {
        socios_clave: data.sociosClave || [],
        actividades_clave: data.actividadesClave || [],
        recursos_clave: data.recursosClave || [],
        propuestas_valor: data.propuestasValor || [],
        relaciones_clientes: data.relacionesClientes || [],
        canales: data.canales || [],
        segmentos_clientes: data.segmentosClientes || [],
        estructura_costos: data.estructuraCostos || [],
        fuentes_ingresos: data.fuentesIngresos || [],
      };

      onBrainstormSuccess(mappedData);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'No se pudo conectar con el servicio de IA.');
      if (err.message?.includes('GEMINI_API_KEY') || err.message?.includes('missing')) {
        setSuggestKey(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <div>
              <h3 className="font-display font-bold text-base">Ideación Estratégica con IA</h3>
              <p className="text-[10px] text-indigo-100 font-medium">Potenciado por Gemini 3.5 Flash</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-all text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Describe tu Idea de Negocio
            </label>
            <textarea
              placeholder="Ej: Una panadería saludable sin gluten que ofrece talleres de repostería y entrega a domicilio suscrita..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              rows={4}
              className="w-full text-sm p-3.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 disabled:opacity-50"
            />
          </div>

          {/* Quick Suggestions */}
          {!isLoading && (
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                O prueba con estas sugerencias:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {sampleIdeas.map((idea, idx) => (
                  <button
                    key={idx}
                    onClick={() => setDescription(idea)}
                    className="text-[11px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 px-3 py-1.5 rounded-full transition-all text-left cursor-pointer border border-transparent hover:border-indigo-100 font-medium"
                  >
                    {idea.substring(0, 50)}...
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error display */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-800">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="text-xs flex-1">
                <p className="font-semibold mb-1">Hubo un contratiempo</p>
                <p className="leading-relaxed">{error}</p>
                {suggestKey && (
                  <div className="mt-3 p-2.5 bg-white rounded-lg border border-red-100 text-slate-600 leading-normal">
                    <span className="font-semibold text-slate-800 block mb-1">¿Cómo solucionarlo?</span>
                    Ve al menú de <strong>Configuración (icono de engranaje) &gt; Secrets</strong> e introduce tu <strong>GEMINI_API_KEY</strong> para habilitar las funciones inteligentes de inmediato.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Loading status */}
          {isLoading && (
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              <div>
                <p className="font-medium text-slate-800 text-sm">Diseñando tu Modelo de Negocio...</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  La IA está estructurando propuestas de valor, analizando costos y segmentando clientes ideales.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 disabled:opacity-50 transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleBrainstorm}
            disabled={isLoading || description.trim() === ''}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm disabled:opacity-50 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generar Modelo Canvas</span>
          </button>
        </div>
      </div>
    </div>
  );
}
