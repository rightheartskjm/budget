'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/', label: '대시보드', icon: '📊' },
  { href: '/transactions', label: '거래 내역', icon: '💳' },
  { href: '/budget', label: '예산 관리', icon: '📋' },
  { href: '/settings', label: '데이터 관리', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-full md:w-56 shrink-0">
      <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
        {NAV.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
              ${pathname === href
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
