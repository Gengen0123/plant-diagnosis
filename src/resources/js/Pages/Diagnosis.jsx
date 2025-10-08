import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Diagnosis() {
  const [form, setForm] = useState({
    hasPet: 'no',        // yes/no
    hasChild: 'no',      // yes/no
    sunlight: 3,         // 1-5
    watering: 3,         // 1-5 低=ズボラ
    size: 3,             // 1-5 小さい↔大きい
    toughness: 3,        // 1-5 弱い↔強い
    growth: 3,           // 1-5 遅い↔速い
  });

  const update = (k) => (e) =>
    setForm({ ...form, [k]: e.target.type === 'range' ? Number(e.target.value) : e.target.value });

  const submit = (e) => {
    e.preventDefault();
    // ひとまずクエリで Result へ渡す（後でPOST/APIに変える）
    router.visit(route('result'), { data: form, method: 'get' });
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Head title="Diagnosis" />
      <h1 className="text-2xl font-bold mb-6">🪴 Diagnosis</h1>

      <form onSubmit={submit} className="space-y-6">
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            ペットいる？
            <select value={form.hasPet} onChange={update('hasPet')} className="border p-2 rounded">
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </label>

          <label className="flex items-center gap-2">
            子供いる？
            <select value={form.hasChild} onChange={update('hasChild')} className="border p-2 rounded">
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </label>
        </div>

        <Range label="日当たり" value={form.sunlight} onChange={update('sunlight')} />
        <Range label="水やり頻度（ズボラ=1）" value={form.watering} onChange={update('watering')} />
        <Range label="大きさの希望" value={form.size} onChange={update('size')} />
        <Range label="強さ（枯らしにくさ）" value={form.toughness} onChange={update('toughness')} />
        <Range label="成長の速さ" value={form.growth} onChange={update('growth')} />

        <button type="submit" className="px-4 py-2 rounded bg-black text-white">結果を見る</button>
      </form>
    </div>
  );
}

function Range({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="mb-2">{label}：<span className="font-mono">{value}</span></div>
      <input type="range" min="1" max="5" value={value} onChange={onChange} className="w-full" />
      <div className="text-xs text-gray-500 flex justify-between">
        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
      </div>
    </label>
  );
}
