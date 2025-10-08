import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Diagnosis() {
  const [form, setForm] = useState({
    hasPet: 'no',
    hasChild: 'no',
    sunlight: 3,
    watering: 3,
    size: 3,
    toughness: 3,
    growth: 3,
  });

  const update = (k) => (e) =>
    setForm({ ...form, [k]: e.target.type === 'range' ? Number(e.target.value) : e.target.value });

  const submit = (e) => {
    e.preventDefault();
    router.visit(route('result'), { data: form, method: 'get' });
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Head title="Diagnosis" />
      <h1 className="text-2xl font-bold text-gray-900">🪴 診断</h1>
      <p className="mt-2 text-sm text-gray-600">以下の項目を選ぶと、あなたに合う植物を提案します。</p>

      <form onSubmit={submit} className="mt-8 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Select label="ペットはいますか？" value={form.hasPet} onChange={update('hasPet')}>
            <option value="no">いない</option>
            <option value="yes">いる</option>
          </Select>
          <Select label="子供はいますか？" value={form.hasChild} onChange={update('hasChild')}>
            <option value="no">いない</option>
            <option value="yes">いる</option>
          </Select>
        </div>

        <Range label="日当たり（1=弱い / 5=強い）" value={form.sunlight} onChange={update('sunlight')} />
        <Range label="水やり頻度（1=ズボラ / 5=頻繁OK）" value={form.watering} onChange={update('watering')} />
        <Range label="大きさの希望（1=小 / 5=大）" value={form.size} onChange={update('size')} />
        <Range label="強さ（枯らしにくさ）" value={form.toughness} onChange={update('toughness')} />
        <Range label="成長の速さ" value={form.growth} onChange={update('growth')} />

        <button type="submit" className="mt-2 inline-flex rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700">
          結果を見る
        </button>
      </form>
    </div>
  );
}

function Select({ label, children, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-700">{label}</span>
      <select
        {...props}
        className="mt-2 w-full rounded-lg border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
      >
        {children}
      </select>
    </label>
  );
}

function Range({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">{label}</span>
        <span className="text-xs text-gray-500">現在：{value}</span>
      </div>
      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={onChange}
        className="mt-2 w-full accent-emerald-600"
      />
      <div className="mt-1 text-[10px] text-gray-400 flex justify-between">
        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
      </div>
    </label>
  );
}
