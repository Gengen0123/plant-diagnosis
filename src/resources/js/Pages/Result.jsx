// resources/js/Pages/Result.jsx
import { Head, usePage } from '@inertiajs/react';

// ① 候補データ（超簡易）
const PLANTS = [
  { id: 'bifurcatum', name: 'ビフルカツム', vec: [3, 3, 3, 4, 3] }, // 日当たり3, 水やり3, サイズ3, 強さ4, 成長3
  { id: 'willinckii', name: 'ウィリンキー', vec: [4, 3, 4, 3, 4] },
  { id: 'nephrolepis', name: 'ネフロレピス', vec: [2, 4, 2, 3, 3] },
  { id: 'zz', name: 'ザミオクルカス', vec: [2, 2, 3, 5, 2] },
];

// ② 入力→ベクトル変換（レンジは1〜5前提）
function toVector(params) {
  const sunlight  = Number(params.sunlight || 3);
  const watering  = Number(params.watering || 3);
  const size      = Number(params.size || 3);
  const toughness = Number(params.toughness || 3);
  const growth    = Number(params.growth || 3);

  // 例：ペット/子供がいる場合は「強さ」を少し重視したいので補正
  const petBonus   = params.hasPet === 'yes' ? 0.5 : 0;
  const childBonus = params.hasChild === 'yes' ? 0.5 : 0;

  return [sunlight, watering, size, Math.min(5, toughness + petBonus + childBonus), growth];
}

// ③ 重み（後で調整OK）
const W = [1.2, 1.0, 0.8, 1.5, 0.9]; // 日当たり/水やり/サイズ/強さ/成長

function wdot(a, b, w) { // 重み付き内積
  return a.reduce((s, _, i) => s + w[i]*a[i]*b[i], 0);
}
function wnorm(a, w) {   // 重み付きノルム
  return Math.sqrt(a.reduce((s, _, i) => s + w[i]*a[i]*a[i], 0));
}
function wcosine(a, b, w) { // 重み付きコサイン類似度
  const denom = wnorm(a, w) * wnorm(b, w);
  return denom ? wdot(a, b, w) / denom : 0;
}

export default function Result() {
  const { url } = usePage();
  const params = Object.fromEntries(new URLSearchParams(url.split('?')[1] || ''));
  const userVec = toVector(params);

  // ④ スコア計算して上位3件
  const ranked = PLANTS
    .map(p => ({ ...p, score: Number(wcosine(userVec, p.vec, W).toFixed(3)) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Head title="Result" />
      <h1 className="text-2xl font-bold mb-4">🌱 あなたへのおすすめ</h1>

      <ul className="space-y-3">
        {ranked.map((p, i) => (
          <li key={p.id} className="border rounded p-4">
            <div className="text-sm text-gray-500">#{i+1}</div>
            <div className="text-lg font-semibold">{p.name}</div>
            <div className="text-xs text-gray-500">score: {p.score}</div>
          </li>
        ))}
      </ul>

      <details className="mt-6">
        <summary className="cursor-pointer text-sm text-gray-600">入力値を確認</summary>
        <pre className="bg-gray-50 p-4 rounded mt-2 text-sm">{JSON.stringify(params, null, 2)}</pre>
      </details>
    </div>
  );
}
