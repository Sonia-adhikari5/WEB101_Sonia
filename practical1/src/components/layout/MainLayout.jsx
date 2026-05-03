'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/authContext';
import AuthModal from '@/components/auth/AuthModal';

export default function MainLayout({ children }) {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col p-4 gap-4 fixed h-full">
        <Link href="/" className="text-2xl font-bold text-red-500">TikTok</Link>

        <nav className="flex flex-col gap-2">
          <Link href="/" className="hover:text-red-500 font-medium">🏠 For You</Link>

          {user && (
            <Link href="/following" className="hover:text-red-500 font-medium">
              👥 Following
            </Link>
          )}

          <Link href="/explore-users" className="hover:text-red-500 font-medium">
            🔍 Explore Users
          </Link>

          {user && (
            <Link href="/upload" className="hover:text-red-500 font-medium">
              ➕ Upload
            </Link>
          )}
        </nav>

        {/* Auth buttons at bottom */}
        <div className="mt-auto">
          {user ? (
            <div className="flex flex-col gap-2">
              <Link
                href={`/profile/${user.id}`}
                className="text-sm font-medium hover:text-red-500"
              >
                👤 {user.username}
              </Link>
              <button
                onClick={logout}
                className="bg-gray-100 hover:bg-gray-200 text-sm rounded py-2 px-4 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-red-500 hover:bg-red-600 text-white text-sm rounded py-2 px-4 font-semibold w-full"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </aside>

      {/* Main content — offset by sidebar width */}
      <main className="ml-64 flex-1 p-4">
        {children}
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}