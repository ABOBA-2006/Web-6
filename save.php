<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Validation
    if (!isset($data['title']) || !isset($data['content'])) {
        http_response_code(400);
        echo "Invalid data format.";
        exit;
    }

    $title = htmlspecialchars($data['title'], ENT_QUOTES, 'UTF-8');
    $content = htmlspecialchars($data['content'], ENT_QUOTES, 'UTF-8');

    $filename = 'blocks.json';
    $blocks = [];

    if (file_exists($filename)) {
        $blocks = json_decode(file_get_contents($filename), true) ?? [];
    }

    $blocks[] = ['title' => $title, 'content' => $content];
    file_put_contents($filename, json_encode($blocks, JSON_PRETTY_PRINT));
    echo "Block saved successfully.";
} else {
    http_response_code(405);
    echo "Method not allowed.";
}
?>