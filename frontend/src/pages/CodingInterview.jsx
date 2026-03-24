import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { Play, Check, Clock, RotateCcw, ChevronLeft, Terminal as TerminalIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const codingQuestions = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    timeLimit: "15 mins",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    details: "You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ],
    starterCode: {
      javascript: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};",
      python: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass"
    }
  }
];

const CodingInterview = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('javascript');
  const [question, setQuestion] = useState(codingQuestions[0]);
  const [code, setCode] = useState(question.starterCode[language]);
  const [output, setOutput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(question.starterCode[newLang]);
    setOutput('');
  };

  const handleRunCode = () => {
    setOutput('Running test cases...\n');
    setIsSubmitting(true);
    
    // Simulate backend execution delay
    setTimeout(() => {
      setIsSubmitting(false);
      setOutput((prev) => prev + `\nTestcase 1: Accepted (12ms)\nTestcase 2: Accepted (14ms)\n\nSuccess! Your code passed all base test cases.\nClick 'Submit' when you are ready to evaluate.`);
    }, 1500);
  };

  const handleSubmit = () => {
    setOutput('Executing hidden test cases and evaluating approach...\n');
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setOutput((prev) => prev + `\nEvaluation Complete!\n\nTime Complexity: O(N) - Excellent\nSpace Complexity: O(N) - Standard Tradeoff\n\nAll 54 hidden test cases passed.\nFinal Score: 98/100`);
    }, 2500);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col gap-4 max-w-7xl mx-auto py-2">
      {/* Header Bar */}
      <div className="flex items-center justify-between glass-card px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-slate-800 dark:text-white">{question.title}</h1>
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              {question.difficulty}
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
              <Clock size={14} /> {question.timeLimit}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={language} 
            onChange={handleLanguageChange}
            className="input-field py-1.5 px-3 rounded-lg text-sm bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-700 w-32"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python 3</option>
          </select>
          <button 
            onClick={() => setCode(question.starterCode[language])}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
            title="Reset to starter code"
          >
            <RotateCcw size={16} />
          </button>
          <button 
            onClick={handleRunCode}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors disabled:opacity-50"
          >
            <Play size={14} /> Run
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors disabled:opacity-50 shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Check size={14} /> Submit
          </button>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left Panel: Problem Description */}
        <div className="w-1/3 glass-card rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900/30">
            <h2 className="text-sm font-semibold text-slate-800 dark:text-white uppercase tracking-wider">Problem Details</h2>
          </div>
          <div className="p-5 overflow-y-auto custom-scrollbar flex-1 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            <p className="mb-4">{question.description}</p>
            <p className="mb-6">{question.details}</p>

            {question.examples.map((ex, idx) => (
              <div key={idx} className="mb-5 last:mb-0">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Example {idx + 1}:</h3>
                <div className="bg-slate-100 dark:bg-slate-800/50 rounded-lg p-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                  <div><span className="text-indigo-500 dark:text-indigo-400 select-none">Input:</span> {ex.input}</div>
                  <div><span className="text-indigo-500 dark:text-indigo-400 select-none">Output:</span> {ex.output}</div>
                  {ex.explanation && (
                    <div className="mt-1"><span className="text-emerald-500 dark:text-emerald-400 select-none">Explanation:</span> {ex.explanation}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Code Editor & Terminal */}
        <div className="w-2/3 flex flex-col gap-4 min-h-0">
          {/* Editor Container */}
          <div className="flex-1 glass-card rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
             <div className="px-4 py-2 bg-slate-100 dark:bg-[#1e1e1e] border-b border-slate-200 dark:border-black shadow-inner flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">solution.{language === 'javascript' ? 'js' : 'py'}</span>
             </div>
             <div className="flex-1 overflow-hidden bg-white dark:bg-[#1e1e1e]">
              <CodeMirror
                value={code}
                minHeight="100%"
                extensions={[language === 'javascript' ? javascript() : python()]}
                theme="dark" // Usually dark editors look better for coding even in light mode, but you could bind this to the global theme
                onChange={(value) => setCode(value)}
                className="h-full text-base"
                style={{
                  height: '100%',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Output Terminal */}
          <div className="h-48 glass-card rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden bg-slate-900 dark:bg-[#0d1117]">
            <div className="px-4 py-2 border-b border-slate-800 flex items-center gap-2">
              <TerminalIcon size={14} className="text-slate-400" />
              <span className="text-xs font-mono text-slate-400">Console Runtime</span>
            </div>
            <div className="p-4 flex-1 overflow-y-auto custom-scrollbar font-mono text-xs text-slate-300 whitespace-pre-wrap">
              {output || (
                <span className="text-slate-600 italic">No output yet. Run your code to test constraints.</span>
              )}
              {isSubmitting && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="inline-block w-2 h-3 bg-slate-400 ml-1 align-middle"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingInterview;
