'use client';

import { useEffect, useState } from 'react';

export default function Header() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored ? stored === 'dark' : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <header className="flex items-center justify-between px-4 md:px-6 h-14 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <span className="font-bold text-indigo-600 dark:text-indigo-400 text-lg">김정민 가계부</span>
      <button
        onClick={toggle}
        className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="다크모드 토글"
      >
        {dark ? '☀️' : '🌙'}
      </button>
    </header>
  );
}
