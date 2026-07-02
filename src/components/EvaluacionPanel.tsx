/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layers, Rocket, Zap, Heart, CheckSquare, Sparkles } from 'lucide-react';
import { evaluacionContent } from '../data/learningContent';
import InteractiveQuiz from './InteractiveQuiz';

export default function EvaluacionPanel() {
  const [activeTab, setActiveTab] = useState<'canvas' | 'mvp' | 'pmf'>('canvas');
  const [checkedHypotheses, setCheckedHypotheses] = useState<Record<string, boolean>>({
    h1: false,
    h2: false,
    h3: false,
  });

  const toggleHypothesis = (key: string) => {
    setCheckedHypotheses((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-6" id="evaluacion-panel">
      {/* Evaluación y Viabilidad Tabs */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <h3 className="font-display font-semibold text-slate-800 text-lg mb-3 flex items-center gap-2">
          <Rocket className="w-5 h-5 text-indigo-500" />
          <span>Evaluación y Viabilidad</span>
        </h3>

        {/* Tab triggers */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('canvas')}
            className={`flex-1 py-2 rounded-lg text-center cursor-pointer transition-all ${
              activeTab === 'canvas' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            BMC vs Lean
          </button>
          <button
            onClick={() => setActiveTab('mvp')}
            className={`flex-1 py-2 rounded-lg text-center cursor-pointer transition-all ${
              activeTab === 'mvp' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            MVP (PMV)
          </button>
          <button
            onClick={() => setActiveTab('pmf')}
            className={`flex-1 py-2 rounded-lg text-center cursor-pointer transition-all ${
              activeTab === 'pmf' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Market Fit
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'canvas' && (
          <div className="animate-fadeIn">
            <h4 className="font-semibold text-slate-800 text-sm mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>{evaluacionContent.comparacion.title}</span>
            </h4>
            <p className="text-slate-500 text-xs leading-relaxed mb-3">
              {evaluacionContent.comparacion.description}
            </p>

            <div className="border border-slate-100 rounded-xl overflow-hidden text-[11px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-100 font-medium">
                    <th className="p-2 border-r border-slate-100">Aspecto</th>
                    <th className="p-2 border-r border-slate-100">BMC</th>
                    <th className="p-2">Lean Canvas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-700">
                  {evaluacionContent.comparacion.comparisonTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-2 font-medium border-r border-slate-100 bg-slate-50/20">{row.aspect}</td>
                      <td className="p-2 border-r border-slate-100">{row.bmc}</td>
                      <td className="p-2">{row.lean}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'mvp' && (
          <div className="animate-fadeIn">
            <h4 className="font-semibold text-slate-800 text-sm mb-2 flex items-center gap-1.5">
              <Rocket className="w-4 h-4 text-amber-500" />
              <span>El Producto Mínimo Viable (PMV)</span>
            </h4>
            <p className="text-slate-500 text-xs leading-relaxed mb-4">
              {evaluacionContent.mvp.description}
            </p>

            <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 flex flex-col gap-3">
              <span className="font-semibold text-amber-900 text-[11px] uppercase tracking-wider">
                Lista de Validación Rápida
              </span>
              <div className="flex flex-col gap-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs select-none">
                  <input
                    type="checkbox"
                    checked={checkedHypotheses.h1}
                    onChange={() => toggleHypothesis('h1')}
                    className="mt-0.5 rounded text-amber-500 focus:ring-amber-400"
                  />
                  <span className={`${checkedHypotheses.h1 ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    Definir el dolor crítico que solucionas (Mapeado en Propuesta de Valor)
                  </span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer text-xs select-none">
                  <input
                    type="checkbox"
                    checked={checkedHypotheses.h2}
                    onChange={() => toggleHypothesis('h2')}
                    className="mt-0.5 rounded text-amber-500 focus:ring-amber-400"
                  />
                  <span className={`${checkedHypotheses.h2 ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    Establecer una métrica mínima de éxito (ej. conseguir 10 preventas o entrevistas)
                  </span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer text-xs select-none">
                  <input
                    type="checkbox"
                    checked={checkedHypotheses.h3}
                    onChange={() => toggleHypothesis('h3')}
                    className="mt-0.5 rounded text-amber-500 focus:ring-amber-400"
                  />
                  <span className={`${checkedHypotheses.h3 ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    Lanzar landing page / experimento MVP sin programar infraestructura compleja
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pmf' && (
          <div className="animate-fadeIn">
            <h4 className="font-semibold text-slate-800 text-sm mb-2 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span>Ajuste Producto-Mercado (PMF)</span>
            </h4>
            <p className="text-slate-500 text-xs leading-relaxed mb-3">
              {evaluacionContent.productMarketFit.description}
            </p>
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-800 leading-relaxed">
              <span className="font-bold">¿Cómo saber si lo lograste?</span>
              <p className="mt-1">{evaluacionContent.productMarketFit.indicator}</p>
            </div>
          </div>
        )}
      </div>

      {/* Aplicación Práctica: Simulación y Acción */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-display font-semibold text-slate-800 text-base flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span>Aplicación Práctica</span>
          </h3>
          <span className="text-[10px] uppercase font-mono bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded">
            Simulación y Acción
          </span>
        </div>

        {/* Embedded Quiz Component */}
        <InteractiveQuiz />
      </div>

      {/* Steve Jobs Quote */}
      <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-white select-none pointer-events-none">
          <Heart className="w-32 h-32" />
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-1.5 bg-slate-800 rounded-lg text-red-400 shadow-inner">
            <Heart className="w-4 h-4 fill-red-400/20" />
          </div>
          <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase font-bold">
            Mentalidad Emprendedora
          </span>
        </div>
        <p className="font-serif italic text-sm text-slate-100 leading-relaxed mb-4">
          "Amar lo que haces... La pasión es la clave principal para realizar un gran trabajo, mantenerte resiliente ante los desafíos y construir con éxito el futuro estratégico que sueñas."
        </p>
        <div className="flex items-center gap-3 border-t border-slate-800 pt-3">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-300 font-bold font-mono">
            SJ
          </div>
          <div>
            <span className="font-display font-semibold text-slate-200 text-xs block">Steve Jobs</span>
            <span className="text-slate-500 text-[10px] block">Co-fundador de Apple</span>
          </div>
        </div>
      </div>
    </div>
  );
}
