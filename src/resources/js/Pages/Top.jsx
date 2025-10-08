import { Head } from '@inertiajs/react';

export default function Top() {
  return (
    <div className="p-10 text-center">
      <Head title="Top" />
      <h1 className="text-3xl font-bold mb-4">🌿 Welcome to Plant Diagnosis</h1>
      <p className="text-gray-600">
        あなたにぴったりの観葉植物を診断します。
      </p>
    </div>
  );
}
