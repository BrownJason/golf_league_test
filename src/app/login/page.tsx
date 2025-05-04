/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.error('Login error:', result.error);
        // Map the error to a user-friendly message
        const errorMessage = result.error === 'CredentialsSignin' 
          ? 'Invalid username or password'
          : 'An error occurred during login';
        setError(errorMessage);
      } else if (result?.ok) {
        console.log('Login successful, redirecting to admin...');
        router.push('/admin');
        router.refresh();
      } else {
        console.error('Unexpected result:', result);
        setError('An unexpected error occurred');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-[#243E2A] rounded-lg shadow-lg shadow-black border border-[#9A9540]">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#9A9540]">
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-center text-sm p-2 bg-red-50 rounded border border-red-500">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#9A9540] placeholder-gray-500 text-[#9A9540] rounded-t-md focus:outline-none focus:ring-[#9A9540] focus:border-[#9A9540] focus:z-10 sm:text-sm bg-[#FFFFFF ]"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#9A9540] placeholder-gray-500 text-[#9A9540] rounded-b-md focus:outline-none focus:ring-[#9A9540] focus:border-[#9A9540] focus:z-10 sm:text-sm bg-[#FFFFFF ]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#243E2A] bg-[#9A9540] border-[#9A9540] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9A9540]"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 