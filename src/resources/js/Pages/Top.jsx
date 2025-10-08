import { Head, Link } from '@inertiajs/react';

export default function Top() {
  return (
    <div>
      <Head title="Top" />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 to-white" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            あなたに合う<span className="text-emerald-600">観葉植物</span>を診断
          </h1>
          <p className="mt-4 max-w-2xl text-gray-600">
            日当たり・水やり・サイズの希望など、ライフスタイルに合わせておすすめを提案します。
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href={route('diagnosis')}
              className="inline-flex items-center rounded-lg bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
            >
              診断をはじめる
            </Link>
            <Link
              href={route('about')}
              className="inline-flex items-center rounded-lg px-5 py-3 ring-1 ring-gray-300 text-gray-700 hover:bg-gray-50"
            >
              このサイトについて
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              ['かんたん', '5つの質問に答えるだけ'],
              ['信頼性', '重み付き内積で類似度スコア算出'],
              ['快適', '育てやすさ（強さ）を優先'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
