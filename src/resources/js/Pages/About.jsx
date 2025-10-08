import { Head } from '@inertiajs/react';

export default function About() {
  return (
    <div className="p-10">
       <Head title="About" />
      <h1 className="text-2xl font-bold mb-4">📖 About</h1>
      <p>
        このサイトは、あなたの生活スタイルに合う観葉植物を診断するための
        Webアプリです。
      </p>
    </div>
  );
}
