<?php
$filename = 'blocks.json';

if (file_exists($filename)) {
    $blocks = json_decode(file_get_contents($filename), true);
    header('Content-Type: application/json');
    echo json_encode($blocks);
} else {
    header('Content-Type: application/json');
    echo json_encode([]);
}
?>