<?php
// login.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// ✅ Lista segura de usuarios (solo en el servidor)
$usuarios = [
  "asp" => "asepsia",
  "jaguilar" => "Paf07664",
  "asanchez" => "andr3s",
  "franquicia" => "fr4nquicia",
  "girona" => "g1r0n4",
  "valencia" => "v4lenc1a"
];

// ✅ Leer JSON recibido
$data = json_decode(file_get_contents("php://input"), true);
$user = strtolower(trim($data["user"] ?? ""));
$pass = $data["pass"] ?? "";

// ✅ Validar
if (isset($usuarios[$user]) && $usuarios[$user] === $pass) {
    echo json_encode(["success" => true, "user" => $user]);
} else {
    echo json_encode(["success" => false]);
}
?>