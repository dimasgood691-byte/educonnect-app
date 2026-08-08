<?php

use Dotenv\Dotenv;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/api/ai/generate', function (Request $request) {
    $apiKey = env('GOOGLE_AI_API_KEY');
    $model = env('GOOGLE_AI_MODEL', 'text-bison-001');

    if (!$apiKey) {
        $frontendEnvPath = base_path('../frontend-educonnect-app/.env');
        if (file_exists($frontendEnvPath)) {
            try {
                $dotenv = Dotenv::createImmutable(dirname($frontendEnvPath), basename($frontendEnvPath));
                $frontendVars = $dotenv->load();
                $apiKey = $frontendVars['VITE_GOOGLE_AI_KEY'] ?? $frontendVars['GOOGLE_AI_API_KEY'] ?? null;
            } catch (\Throwable $e) {
                // Ignored: fallback remains null if frontend env cannot be loaded.
            }
        }
    }

    if (!$apiKey) {
        return response()->json(['error' => 'Google AI API key belum disetel.'], 500);
    }

    $prompt = $request->input('prompt');
    if (!$prompt) {
        return response()->json(['error' => 'Prompt tidak boleh kosong.'], 422);
    }

    $response = Http::withHeaders([
        'Content-Type' => 'application/json',
    ])
    ->post("https://generativelanguage.googleapis.com/v1beta2/models/{$model}:generate?key={$apiKey}", [
        'prompt' => ['text' => $prompt],
        'temperature' => 0.7,
        'maxOutputTokens' => 512,
    ]);

    if (!$response->ok()) {
        return response()->json(['error' => $response->body()], $response->status());
    }

    $data = $response->json();
    if (empty($data['candidates'][0]['output'])) {
        return response()->json(['error' => 'Respons Google AI tidak valid atau kosong'], 500);
    }

    return response()->json(['output' => $data['candidates'][0]['output']]);
});
