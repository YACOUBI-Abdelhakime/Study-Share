<div align="center">
  <a href="http://study-share.s3-website.eu-west-3.amazonaws.com/">
    <img src="frontend/public/assets/logo-1x2.svg" alt="logo" width="200"/>
  </a>
  <a href="http://study-share.s3-website.eu-west-3.amazonaws.com/">
    <p style="font-size: 30px; color: white;">🚀 Study Share v1.1 🚀</p>
  </a>
</div>

## Technologies 🧑🏻‍💻🛠️

- [React.js](https://react.dev/) [Redux](https://redux.js.org/)
- [NestJS](https://nestjs.com/) [Mongoose](https://mongoosejs.com/docs/)
- [MongoDB](https://www.mongodb.com/en-us)

## MVP Features 💪💪

- [x] Authentication with email/password
- [x] Secure APIs with JWT authentication
- [x] Account creation with email verification
- [x] Publication to ask for help with a subject or topic
- [x] Add comments to publications
- [x] Mark a publication as resolved and stop accepting comments
- [x] Real-time private chat
- [ ] Advanced search function with filters by subject/topic
- [ ] Send notifications when users receive replies to their publications or private messages
- [ ] File sharing (pdf, img) in publications and private chat

## Database structure 💾 🗂️

### Collection `Users` 📄

```json
{
  "_id": "ObjectId",
  "email": "String",
  // Password hash
  "password": "String",
  "name": "String",
  "dateOfBirth": "Date",
  "isVerified": "Boolean"
}
```

### Collection `Publications` 📄

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "title": "String",
  "content": "String",
  "attachments": [
    {
      "url": "String",
      // [pdf, image, ...]
      "type": "String"
    }
  ],
  "commentsCount": "Number",
  "isDiscussionOpen": "Boolean",
  // [Mathematics, Physics, French, ...]
  "tags": ["String"]
}
```

### Collection `Comments` 📄

```json
{
  "_id": "ObjectId",
  "publicationId": "ObjectId",
  "userId": "ObjectId",
  "content": "String"
}
```

### Collection `Chats` 📄

```json
{
  "_id": "ObjectId",
  "participants": ["ObjectId", "ObjectId"],
  "messages": ["ObjectId", "ObjectId", "..."]
}
```

### Collection `Messages` 📄

```json
{
  "_id": "ObjectId",
  "senderId": "ObjectId",
  "content": "String",
  "read": "Boolean"
}
```

### Collection `Notifications` 📄

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  // [comment, message, ...]
  "type": "String",
  // ID of the post or message concerned
  "referenceId": "ObjectId",
  "message": "String",
  "isRead": "Boolean"
}
```
