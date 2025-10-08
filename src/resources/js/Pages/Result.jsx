import { Head, usePage } from '@inertiajs/react';

const PLANTS = [
  { id: 'bifurcatum', name: 'ビフルカツム', vec: [3, 3, 3, 4, 3] },
  { id: 'willinckii', name: 'ウィリンキー', vec: [4, 3, 4, 3, 4] },
  { id: 'nephrolepis', name: 'ネフロレピス', vec: [2, 4, 2, 3, 3] },
  { id: 'zz', name: 'ザミオクルカス', vec: [2, 2, 3, 5, 2] },
];

const W = [1.2, 1.0, 0.8, 1.5, 0.9];
const wdot = (a,b,w)=>a.reduce((s,_,i)=>s+w[i]*a[i]*b[i],0);
const wnorm=(a,w)=>Math.sqrt(a.reduce((s,_,i)=>s+w[i]*a[i]*a[i],0));
const wcos=(a,b,w)=>{const d=wnorm(a,w)*wnorm(b,w);return d?wdot(a,b,w)/d:0;};

function toVector(p){
  const s=+p.sunlight||3,w=+p.watering||3,sz=+p.size||3,t=+p.toughness||3,g=+p.growth||3;
  const bonus=(p.hasPet==='yes')*0.5 + (p.hasChild==='yes')*0.5;
  return [s,w,sz,Math.min(5,t+bonus),g];
}

export default function Result() {
  const { url } = usePage();
  const params = Object.fromEntries(new URLSearchParams(url.split('?')[1] || ''));
  const userVec = toVector(params);
  const ranked = PLANTS.map(p=>({...p,score:+wcos(userVec,p.vec,W).toFixed(3)})).sort((a,b)=>b.score-a.score);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Head title="Result" />
      <h1 className="text-2xl font-bold text-gray-900">🌱 あなたへのおすすめ</h1>

      <ul className="mt-6 space-y-4">
        {ranked.slice(0,3).map((p,i)=>(
          <li key={p.id} className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">#{i+1}</div>
              <div className="text-xs text-emerald-700">score {p.score}</div>
            </div>
            <div className="mt-1 text-lg font-semibold text-gray-900">{p.name}</div>
            {/* スコアバー（0〜1を%表示） */}
            <div className="mt-3 h-2 w-full rounded-full bg-emerald-100">
              <div
                className="h-2 rounded-full bg-emerald-500"
                style={{ width: `${Math.round(p.score*100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <details className="mt-6">
        <summary className="cursor-pointer text-sm text-gray-600">入力値を確認</summary>
        <pre className="mt-2 rounded bg-gray-50 p-3 text-sm">{JSON.stringify(params, null, 2)}</pre>
      </details>
    </div>
  );
}
