/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Award, RefreshCw, HelpCircle, ChevronRight, Sparkles } from 'lucide-react';
import { quizQuestions } from '../data/learningContent';
import { BlockId } from '../types';

export default function InteractiveQuiz() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<BlockId | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIdx];

  const handleOptionClick = (optionBlockId: BlockId) => {
    if (isAnswered) return;
    
    setSelectedOption(optionBlockId);
    setIsAnswered(true);
    
    const correct = optionBlockId === currentQuestion.correctBlockId;
    setIsCorrect(correct);
    if (correct) {
      setScore((s) => s + 10);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);
    
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx((idx) => idx + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setShowHint(false);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 text-center shadow-sm">
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Award className="w-8 h-8" />
        </div>
        <h4 className="font-display font-bold text-slate-800 text-xl mb-1">
          ¡Simulación Completada!
        </h4>
        <p className="text-slate-500 text-sm mb-4">
          Has demostrado un gran dominio de los 9 bloques del lienzo.
        </p>

        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-2xl shadow-sm border border-indigo-100 mb-6">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-slate-700 font-medium text-sm">
            Puntuación Final:{' '}
            <strong className="text-indigo-600 text-lg">{score}</strong> /{' '}
            {quizQuestions.length * 10} pts
          </span>
        </div>

        <button
          onClick={restartQuiz}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Volver a Jugar</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-wider font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded">
          Pregunta {currentQuestionIdx + 1} de {quizQuestions.length}
        </span>
        <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
          <Award className="w-3.5 h-3.5" />
          <span>{score} pts</span>
        </span>
      </div>

      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-4">
        <p className="font-medium text-slate-800 text-sm leading-relaxed mb-1">
          {currentQuestion.text}
        </p>
        <p className="text-xs text-slate-400 italic">
          Concepto: {currentQuestion.concept}
        </p>
      </div>

      {/* Options list */}
      <div className="flex flex-col gap-2 mb-4">
        {currentQuestion.options.map((option) => {
          let btnClass = 'border-slate-100 hover:bg-slate-50 text-slate-700 bg-white';
          
          if (isAnswered) {
            if (option.blockId === currentQuestion.correctBlockId) {
              btnClass = 'border-emerald-200 bg-emerald-50 text-emerald-800 shadow-sm';
            } else if (option.blockId === selectedOption) {
              btnClass = 'border-red-200 bg-red-50 text-red-800';
            } else {
              btnClass = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={option.blockId}
              onClick={() => handleOptionClick(option.blockId)}
              disabled={isAnswered}
              className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${btnClass}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Answer feedback */}
      {isAnswered && (
        <div
          className={`p-3.5 rounded-xl border mb-4 animate-fadeIn flex items-start gap-2.5 ${
            isCorrect
              ? 'bg-emerald-50/60 border-emerald-100 text-emerald-800'
              : 'bg-red-50/60 border-red-100 text-red-800'
          }`}
        >
          {isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="text-xs">
            <p className="font-semibold mb-1">
              {isCorrect ? '¡Excelente elección!' : 'Vaya, esa no es.'}
            </p>
            <p className="leading-relaxed font-normal">
              {isCorrect
                ? 'Correcto. ' + currentQuestion.hint
                : 'Pista: ' + currentQuestion.hint}
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 justify-between items-center">
        {!isAnswered ? (
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-indigo-500" />
            <span>{showHint ? 'Ocultar pista' : 'Ver pista'}</span>
          </button>
        ) : (
          <div />
        )}

        {isAnswered && (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-medium flex items-center gap-1 shadow-sm transition-all ml-auto cursor-pointer"
          >
            <span>{currentQuestionIdx < quizQuestions.length - 1 ? 'Siguiente' : 'Finalizar'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {showHint && !isAnswered && (
        <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-xl text-[11px] text-amber-800 leading-relaxed animate-fadeIn">
          <strong>Pista de la IA:</strong> {currentQuestion.hint}
        </div>
      )}
    </div>
  );
}
