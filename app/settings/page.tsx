'use client';

import { useState } from 'react';
import { currentMonth } from '@/utils/format';

export default function SettingsPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleReset() {
    setResetting(true);
    await fetch('/api/transactions', { method: 'DELETE' });
    setResetting(false);
    setShowConfirm(false);
    setDone(true);
    setTimeout(() => setDone(false), 3000);
  }

  function downloadCSV() {
    const month = currentMonth();
    window.location.href = `/api/export?month=${month}`;
  }

  function downloadAllCSV() {
    window.location.href = '/api/export';
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">데이터 관리</h1>

      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 space-y-3">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">CSV 내보내기</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <button onClick={downloadCSV} className="flex-1 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors">
            이번 달 다운로드
          </button>
          <button onClick={downloadAllCSV} className="flex-1 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium transition-colors">
            전체 다운로드
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 space-y-3">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">데이터 초기화</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">모든 거래 내역과 예산 설정이 삭제됩니다. 이 작업은 되돌릴 수 없습니다.</p>
        {done && <p className="text-sm text-green-600 dark:text-green-400">초기화가 완료되었습니다.</p>}
        <button
          onClick={() => setShowConfirm(true)}
          className="py-2.5 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
        >
          전체 데이터 초기화
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-sm shadow-xl space-y-4">
            <h3 className="font-bold text-lg">정말 초기화할까요?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">모든 거래 내역과 예산 데이터가 삭제됩니다.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleReset}
                disabled={resetting}
                className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-sm font-medium transition-colors"
              >
                {resetting ? '삭제 중…' : '삭제하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
