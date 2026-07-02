/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Users, Lightbulb, Cpu, DollarSign, Eye, HelpCircle, ArrowRight } from 'lucide-react';
import { fundamentosContent } from '../data/learningContent';
import { BlockId, Pillar } from '../types';

interface FundamentosPanelProps {
  onHoverPillar: (blocks: BlockId[] | null) => void;
  activeHighlightedBlocks: BlockId[];
}

export default function FundamentosPanel({ onHoverPillar, activeHighlightedBlocks }: FundamentosPanelProps) {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-5 h-5 text-blue-500" />;
      case 'Lightbulb':
        return <Lightbulb className="w-5 h-5 text-amber-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-500" />;
      case 'DollarSign':
        return <DollarSign className="w-5 h-5 text-emerald-500" />;
      default:
        return <HelpCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex flex-col gap-6" id="fundamentos-panel">
      {/* Definición */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-display font-semibold text-slate-800 text-lg">
            {fundamentosContent.definicion.title}
          </h3>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {fundamentosContent.definicion.description}
        </p>
        <div className="bg-slate-50 rounded-xl p-3 flex flex-col gap-2">
          {fundamentosContent.definicion.bullets.map((bullet, idx) => (
            <div key={idx} className="flex gap-2 text-xs text-slate-700">
              <span className="text-blue-500 font-bold">•</span>
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Los 4 Pilares */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <h3 className="font-display font-semibold text-slate-800 text-lg mb-2 flex items-center gap-2">
          <span>Los 4 Pilares del Negocio</span>
        </h3>
        <p className="text-slate-500 text-xs mb-4">
          Pasa el cursor sobre un pilar para resaltar sus bloques correspondientes en el lienzo central.
        </p>

        <div className="flex flex-col gap-3">
          {fundamentosContent.pilares.map((pilar: Pillar) => {
            const isHighlighted = pilar.associatedBlocks.some((b) =>
              activeHighlightedBlocks.includes(b)
            );

            return (
              <div
                key={pilar.id}
                onMouseEnter={() => onHoverPillar(pilar.associatedBlocks)}
                onMouseLeave={() => onHoverPillar(null)}
                onClick={() => setSelectedPillar(selectedPillar === pilar.id ? null : pilar.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                  isHighlighted || selectedPillar === pilar.id
                    ? 'border-blue-400 bg-blue-50/40 shadow-sm scale-[1.01]'
                    : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {getPillarIcon(pilar.icon)}
                    </div>
                    <span className="font-medium text-slate-800 text-sm">{pilar.title}</span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      selectedPillar === pilar.id ? 'rotate-90' : ''
                    }`}
                  />
                </div>

                {selectedPillar === pilar.id && (
                  <div className="mt-3 text-xs text-slate-600 border-t border-slate-100 pt-3 leading-relaxed animate-fadeIn">
                    <p className="mb-2">{pilar.description}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className="text-slate-400 font-medium mr-1">Vinculado a:</span>
                      {pilar.associatedBlocks.map((b) => (
                        <span
                          key={b}
                          className="px-1.5 py-0.5 bg-white text-slate-700 rounded border border-slate-100 capitalize font-mono text-[10px]"
                        >
                          {b.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pensamiento Visual */}
      <div className="bg-gradient-to-br from-indigo-50 to-sky-50 rounded-2xl p-5 border border-indigo-100 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="font-display font-semibold text-indigo-900 text-base">
            {fundamentosContent.pensamientoVisual.title}
          </h3>
        </div>
        <p className="text-indigo-950/80 text-xs leading-relaxed mb-3">
          {fundamentosContent.pensamientoVisual.description}
        </p>
        <div className="flex flex-col gap-1.5">
          {fundamentosContent.pensamientoVisual.benefits.map((benefit, idx) => (
            <div key={idx} className="flex gap-2 text-[11px] text-indigo-900/90">
              <span className="text-indigo-500 font-bold">✓</span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
