import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
      <div>
        <Link href="/">
          <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
        </Link>
      </div>

      {/* ゲスト用の簡易ナビ（任意） */}
      <nav className="mt-4 flex gap-4">
        <Link href={route('top')} className="text-sm text-gray-600 hover:underline">Top</Link>
        <Link href={route('diagnosis')} className="text-sm text-gray-600 hover:underline">Diagnosis</Link>
        <Link href={route('result')} className="text-sm text-gray-600 hover:underline">Result</Link>
        <Link href={route('about')} className="text-sm text-gray-600 hover:underline">About</Link>
      </nav>

      <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
