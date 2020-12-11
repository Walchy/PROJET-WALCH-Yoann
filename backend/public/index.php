<?php
use Tuupola\Middleware\HttpBasicAuthentication;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../bootstrap.php';

$app = AppFactory::create();
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/..");
$dotenv->load();
$routes = require __DIR__ . '/../router.php';
$routes($app);

// Middleware de validation du Jwt
$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => $_ENV["JWT_SECRET"],
    "path" => ["/user"],
    "ignore" => ["/user/login", "/user/register"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'Le JWT n\'est pas valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

// Chargement du Middleware
$app->add(new Tuupola\Middleware\JwtAuthentication($options));

// Lancement du Middleware
$app->run();
