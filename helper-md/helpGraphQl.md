Parfait 🔥
Voici **LA FICHE EXAMEN – CRUD avec GraphQL (NestJS + Sequelize)**.
Après ça, tu comprends **comment REST ⇄ GraphQL** et tu peux coder **sans paniquer**.

---

# 📘 FICHE EXAMEN – CRUD GraphQL (NestJS + Sequelize)

---

## 🎯 C’est quoi GraphQL (version examen) ?

GraphQL =
👉 **un seul endpoint** (`/graphql`)
👉 le client demande **exactement** les champs qu’il veut
👉 pas de sur/sous-données

📌 Contrairement à REST :

```
GET /users
GET /users/1
```

GraphQL :

```
POST /graphql
```

---

## 1️⃣ Installation GraphQL

```bash
npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

---

## 2️⃣ Configuration GraphQL (app.module.ts)

```ts
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: true,
  playground: true,
});
```

➡️ `autoSchemaFile` = schéma généré automatiquement

---

## 3️⃣ ObjectType (équivalent du Model côté GraphQL)

```ts
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AssignmentType {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  shiftId: number;
}
```

📌 GraphQL ≠ Sequelize
➡️ **Model = DB**, **ObjectType = API**

---

## 4️⃣ InputType (Create / Update)

### CREATE

```ts
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateAssignmentInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  shiftId: number;
}
```

---

### UPDATE

```ts
@InputType()
export class UpdateAssignmentInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  shiftId?: number;
}
```

---

## 5️⃣ Service (identique à REST ✅)

```ts
@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment)
    private assignmentModel: typeof Assignment,
  ) {}

  create(input: CreateAssignmentInput) {
    return this.assignmentModel.create(input);
  }

  findAll() {
    return this.assignmentModel.findAll();
  }

  findOne(id: number) {
    return this.assignmentModel.findByPk(id);
  }

  update(input: UpdateAssignmentInput) {
    return this.assignmentModel.update(
      { shiftId: input.shiftId },
      { where: { id: input.id } },
    );
  }

  remove(id: number) {
    return this.assignmentModel.destroy({
      where: { id },
    });
  }
}
```

---

## 6️⃣ Resolver (équivalent du Controller)

```ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

@Resolver(() => AssignmentType)
export class AssignmentsResolver {
  constructor(
    private readonly assignmentsService: AssignmentsService,
  ) {}

  // READ ALL
  @Query(() => [AssignmentType])
  assignments() {
    return this.assignmentsService.findAll();
  }

  // READ ONE
  @Query(() => AssignmentType)
  assignment(@Args('id', { type: () => Int }) id: number) {
    return this.assignmentsService.findOne(id);
  }

  // CREATE
  @Mutation(() => AssignmentType)
  createAssignment(
    @Args('input') input: CreateAssignmentInput,
  ) {
    return this.assignmentsService.create(input);
  }

  // UPDATE
  @Mutation(() => Boolean)
  updateAssignment(
    @Args('input') input: UpdateAssignmentInput,
  ) {
    return this.assignmentsService.update(input);
  }

  // DELETE
  @Mutation(() => Boolean)
  deleteAssignment(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.assignmentsService.remove(id);
  }
}
```

---

## 7️⃣ Tester dans GraphQL Playground

### CREATE

```graphql
mutation {
  createAssignment(
    input: { userId: 1, shiftId: 2 }
  ) {
    id
    userId
    shiftId
  }
}
```

---

### READ

```graphql
query {
  assignments {
    id
    userId
    shiftId
  }
}
```

---

### UPDATE

```graphql
mutation {
  updateAssignment(
    input: { id: 1, shiftId: 3 }
  )
}
```

---

### DELETE

```graphql
mutation {
  deleteAssignment(id: 1)
}
```

---

## 8️⃣ GraphQL + JWT + Roles

```ts
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.COMMANDER)
@Mutation(() => AssignmentType)
createAssignment() {}
```

---

## 9️⃣ GraphQL “ME” (user connecté)

```ts
@Query(() => [AssignmentType])
getMyAssignments(@Context() ctx) {
  return this.assignmentModel.findAll({
    where: { userId: ctx.req.user.sub },
  });
}
```

---

## 🔟 Différence REST vs GraphQL (EXAMEN ⚠️)

| REST                | GraphQL         |
| ------------------- | --------------- |
| plusieurs endpoints | un seul         |
| overfetch           | données exactes |
| controllers         | resolvers       |
| DTO                 | InputType       |

---

## 🧠 Phrase parfaite examen 🎓

> *“En GraphQL avec NestJS, on utilise des Resolvers à la place des Controllers, des ObjectType pour la sortie, et des InputType pour les mutations.”*

---

## 🧪 Cheat Sheet Express

```ts
@Query     → GET
@Mutation  → POST / PUT / DELETE
@Resolver  → Controller
```

---

## 🚨 Erreurs classiques

❌ oublier `@ObjectType()`
❌ confondre Model et ObjectType
❌ oublier `@Args()`
❌ retourner `Boolean` au lieu d’objet
❌ oublier `autoSchemaFile`

---

Si tu veux, prochain niveau 🔥 :

* GraphQL + Sequelize relations
* GraphQL + pagination
* GraphQL + subscriptions (notifications)
* Comparaison GraphQL vs REST pour examen

Dis-moi 👇
