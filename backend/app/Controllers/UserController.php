<?php
namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Firebase\JWT\JWT;
use App\Models\Utilisateur;

class UserController
{
    public function login(Request $request, Response $response, array $args): Response
    {
        $data = $request->getParsedBody();

        $login = $data["login"] ?? "";
        $password = $data["password"] ?? "";

        $utilisateurRepository = $entityManager->getRepository('UTILISATEUR');
        $utilisateur = $utilisateurRepository->findOneBy(array('login' => $login, 'password' => $password));
        if ($utilisateur && $login == $utilisateur->getLogin() && $password == $utilisateur->getPassword()) {
            $data = array('nom' => $utilisateur->getNom(), 'prenom' => $utilisateur->getPrenom());
            return $response->withHeader("Content-Type", "application/json");
        }
        // expiration
        $issuedAt = time();
        $payload = [
            "user" => $user,
            "iat" => $issuedAt,
            "exp" => $issuedAt + 60 // 60 secondes
        ];

        $token_jwt = JWT::encode($payload, $_ENV["JWT_SECRET"], "HS256");

        $response->getBody()->write(json_encode([
            "success" => true
        ]));
        return $response
            ->withHeader("Authorization", $token_jwt)
            ->withHeader("Content-Type", "application/json");
    }

    public function register(Request $request, Response $response, array $args): Response
    {
        $entityManager = EntityManager::create($conn, $config);;
        $user = $request->getParsedBody();

        $result = [
            "success" => true,
            "user" => $user
        ];

        $entityManager->getConnection()->beginTransaction();

        try {
        $client = new UTILISATEUR;
        $client->setNom($user.nom);
        $client->setPrenom($user.prenom);
        $client->setCivilite($user.civilite);
        $client->setAdresse($user.adresse);
        $client->setMail($user.email);
        $client->setTelephone($user.telephone);
        $entityManager->persist($client);
        $entityManager->flush();
        $entityManager->getConnection()->commit();
        } catch(Exception $e) {
            $entityManager->getConnection()->rollback();
        }
        $response->getBody()->write(json_encode($result));
        return $response->withHeader("Content-Type", "application/json");
    }
}
