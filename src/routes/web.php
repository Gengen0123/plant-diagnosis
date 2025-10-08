<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 🌱 Top / Diagnosis / Result / About ページを追加（←ここを追記）
Route::get('/', fn() => Inertia::render('Top'))->name('top');
Route::get('/diagnosis', fn() => Inertia::render('Diagnosis'))->name('diagnosis');
Route::get('/result', fn() => Inertia::render('Result'))->name('result');
Route::get('/about', fn() => Inertia::render('About'))->name('about');

// 🚪 Breeze標準のDashboardなど（そのまま残す）
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// 👤 プロフィール関連（そのまま残す）
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// 🔐 認証ルート群（login / register / logout）
require __DIR__.'/auth.php';
