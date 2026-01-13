<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
Parfait 👍
Je vais te faire un README clair, propre et prêt pour révision/examen, avec toutes les bibliothèques que tu as utilisées dans ton projet NestJS + Sequelize + Auth JWT et les commandes CLI exactes.

Tu pourras :

le garder pour réviser

le copier dans ton projet

t’en servir comme squelette à l’examen

📘 README – Military API (NestJS + Sequelize)
🧱 Stack utilisée

Node.js

NestJS

PostgreSQL

Sequelize (ORM)

JWT Authentication

Role-based Authorization

Validation DTO

bcrypt (hash password)

🚀 Création du projet
npm i -g @nestjs/cli
nest new military-api
cd military-api

🗄️ Base de données & ORM (Sequelize)
📦 Packages nécessaires
npm install @nestjs/sequelize sequelize sequelize-typescript
npm install pg pg-hstore

📌 Utilisation

Connexion à PostgreSQL

Création automatique des tables via les models

Gestion des relations (@BelongsTo, @HasMany)

🔐 Authentification (JWT + Passport)
📦 Packages
npm install @nestjs/passport passport passport-jwt
npm install @nestjs/jwt

🔑 Hash des mots de passe
npm install bcrypt
npm install --save-dev @types/bcrypt


Utilisé pour :

Hasher les passwords à l’inscription

Vérifier les credentials au login

✅ Validation des données (DTO)
npm install class-validator class-transformer

📌 Activation globale (main.ts)
app.useGlobalPipes(
  new ValidationPipe({ whitelist: true })
);

🛡️ Guards & Sécurité
Utilisés :

AuthGuard('jwt')

Guard personnalisé RoleGuard

📦 Déjà inclus avec Passport :

npm install @nestjs/passport

🧩 Génération des modules / controllers / services
Users
nest g module users
nest g service users
nest g controller users

Auth
nest g module auth
nest g service auth
nest g controller auth

Shifts
nest g module shifts
nest g service shifts
nest g controller shifts

Assignments
nest g module assignments
nest g service assignments
nest g controller assignments

🗃️ Models Sequelize

Chaque table est définie dans un fichier *.model.ts :

User

Shift

Assignment

Décorateurs utilisés :

@Table

@Column

@ForeignKey

@BelongsTo

@HasMany

🔄 Relations entre tables

User

HasMany → Assignment

Shift

HasMany → Assignment

Assignment

BelongsTo → User

BelongsTo → Shift

⚙️ Configuration Sequelize (app.module.ts)
SequelizeModule.forRoot({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'military',
  autoLoadModels: true,
  synchronize: true,
});

🔍 Requêtes avec relations
Assignment.findAll({
  include: [User, Shift],
});


👉 Sequelize génère automatiquement les JOIN

🧪 Tests & lancement
npm run start:dev

🎯 À retenir pour l’examen

MODEL = TABLE

DTO = validation

Guard = sécurité

@BelongsTo = clé étrangère

include = JOIN SQL

JWT = auth stateless

💡 Bonus : commandes utiles
npm run start
npm run start:dev
npm run build

🏁 Conclusion

Ce projet couvre :

Auth JWT

Rôles (COMMANDER / SOLDIER)

Relations SQL

Validation

Sécurité

Architecture NestJS propre

👉 Parfait comme squelette pour un examen NestJS ✅

Si tu veux, je peux aussi :

📄 te faire une cheat-sheet 1 page examen

🧠 un plan type réponse orale

🧩 un starter minimal prêt à recoder en 1h

Dis-moi 💪
npm install bcrypt
npm install --save-dev @types/bcrypt
npm install class-validator class-transformer
