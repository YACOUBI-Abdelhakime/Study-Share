# Study Share 🚀⚡

    - ReactJs Redux
    - NestJS Mongoose
    - MongoDB

# Fonctionalités de l'MVP 💪💪

    - Authentification avec email/mot de passe

    - Création de compte et validation d'email

    - Publier des post pour demander de l'aide sur une matière ou un sujet

    - Ajouter des commentaires aux posts

    - Marquer un post comme résolu et arrêter d'accepter les commentaires

    - Fonction de recherche avancée, filtres par matière/sujet

    - Chat privé en temps réel

    - Envoyer des notifications lorsqu'ils reçoivent des réponses à leurs posts ou messages privés

    - Partage de fichiers (pdf, img) sur les posts et chat privé ( `ce n'est pas une priorité` )

# Structure de la base de données 💾 🗂️

## Collection `Users` 📄

```json
{
  "_id": "ObjectId",
  "email": "String",        // Email de l'utilisateur (unique)
  "password": "String",     // Hash du mot de passe
  "name": "String",         // Nom de l'utilisateur
  "dateOfBirth": "Date",    // Date de naissance de l'utilisateur
  "isVerified": "Boolean",  // Statut de vérification de l'email
}
```

## Collection `Posts` 📄

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",     // Référence à l'utilisateur ayant créé le post
  "title": "String",        // Titre du post
  "content": "String",      // Contenu du post
  "attachments": [          // Fichiers joints (PDF, images)
    {
      "url": "String",      // URL du fichier
      "type": "String"      // Type de fichier (e.g., "pdf", "image")
    }
  ],
  "commentsCount": "Number",// Nombre de commentaires
  "status": "String",       // Statut du post (e.g., "open", "closed")
  "tags": [ "String" ]      // Tags associés au post [Mathematics, Physics, French, ...]
}
```

## Collection `Comments` 📄

```json
{
  "_id": "ObjectId",
  "postId": "ObjectId",     // Référence au post commenté
  "userId": "ObjectId",     // Référence à l'utilisateur ayant commenté
  "content": "String",      // Contenu du commentaire
}
```

## Collection `Chats` 📄

```json
{
  "_id": "ObjectId",
  "participants": [         // Liste des utilisateurs participants à la conversation
    "ObjectId",
    "ObjectId"
  ],
  "messages": [             // Liste des messages dans la conversation
    {
      "senderId": "ObjectId", // Référence à l'utilisateur ayant envoyé le message
      "content": "String",  // Contenu du message
      "attachments": [      // Fichiers joints au message
        {
          "url": "String",  // URL du fichier
          "type": "String"  // Type de fichier [pdf, image]
        }
      ],
      "createdAt": "Date"   // Date d'envoi du message
    }
  ],
  "lastMessageAt": "Date"   // Date du dernier message envoyé pour trier les conversations
}
```

## Collection `Notifications` 📄

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",     // Référence à l'utilisateur qui reçoit la notification
  "type": "String",         // Type de notification [comment, message]
  "referenceId": "ObjectId", // ID du post ou du message concerné
  "message": "String",      // Message de la notification
  "isRead": "Boolean"       // Statut de lecture de la notification
}
```
