import { Head } from '@inertiajs/react';
export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Head title="About" />
      <h1 className="text-2xl font-bold text-gray-900">📖 このサイトについて</h1>
      <p className="mt-3 text-gray-600">
        ライフスタイルの入力から、重み付きコサイン類似度で適した観葉植物を提案します。
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {['簡単な操作','納得感のある根拠','育てやすさ重視','今後データ拡充'].map((t)=>(
          <li key={t} className="rounded-lg border border-emerald-100 bg-white p-4">{t}</li>
        ))}
      </ul>
    </div>
  );
}
