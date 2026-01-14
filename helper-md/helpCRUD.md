Parfait 🔥
Voici **LA FICHE CRUD Sequelize + NestJS**, pensée **100 % examen**.
Avec ça, tu peux coder **Create / Read / Update / Delete** sans bloquer.

---

# 📕 FICHE EXAMEN – CRUD (NestJS + Sequelize)

---

## 🎯 Objectif

Savoir :

* faire un **CRUD complet**
* comprendre **où écrire quoi**
* éviter les erreurs classiques

---

## 1️⃣ Architecture CRUD (à connaître par cœur)

```
controller  → reçoit la requête HTTP
service     → logique métier + Sequelize
model       → table SQL
dto         → validation des données
```

---

## 2️⃣ CREATE (POST)

---

### 📦 DTO (Create)

```ts
import { IsString, IsNumber } from 'class-validator';

export class CreateAssignmentDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  shiftId: number;
}
```

---

### 🧠 Service

```ts
@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment)
    private assignmentModel: typeof Assignment,
  ) {}

  create(dto: CreateAssignmentDto) {
    return this.assignmentModel.create({
      userId: dto.userId,
      shiftId: dto.shiftId,
    });
  }
}
```

---

### 🌐 Controller

```ts
@Post()
create(@Body() dto: CreateAssignmentDto) {
  return this.assignmentsService.create(dto);
}
```

---

## 3️⃣ READ – tout récupérer (GET)

---

### 🧠 Service

```ts
findAll() {
  return this.assignmentModel.findAll();
}
```

---

### 🌐 Controller

```ts
@Get()
findAll() {
  return this.assignmentsService.findAll();
}
```

---

## 4️⃣ READ – par ID (GET /:id)

---

### 🧠 Service

```ts
findOne(id: number) {
  return this.assignmentModel.findByPk(id);
}
```

---

### 🌐 Controller

```ts
@Get(':id')
findOne(@Param('id') id: string) {
  return this.assignmentsService.findOne(+id);
}
```

---

## 5️⃣ READ avec relation (JOIN)

```ts
findAllWithRelations() {
  return this.assignmentModel.findAll({
    include: [User, Shift],
  });
}
```

---

## 6️⃣ UPDATE (PUT / PATCH)

---

### 📦 DTO (Update)

```ts
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateAssignmentDto {
  @IsOptional()
  @IsNumber()
  shiftId?: number;
}
```

---

### 🧠 Service

```ts
async update(id: number, dto: UpdateAssignmentDto) {
  const assignment = await this.assignmentModel.findByPk(id);

  if (!assignment) return null;

  return assignment.update(dto);
}
```

---

### 🌐 Controller

```ts
@Patch(':id')
update(
  @Param('id') id: string,
  @Body() dto: UpdateAssignmentDto,
) {
  return this.assignmentsService.update(+id, dto);
}
```

---

## 7️⃣ DELETE (DELETE /:id)

---

### 🧠 Service

```ts
async remove(id: number) {
  const assignment = await this.assignmentModel.findByPk(id);

  if (!assignment) return null;

  await assignment.destroy();
  return { message: 'Deleted successfully' };
}
```

---

### 🌐 Controller

```ts
@Delete(':id')
remove(@Param('id') id: string) {
  return this.assignmentsService.remove(+id);
}
```

---

## 8️⃣ CRUD sécurisé (JWT + Roles)

```ts
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.COMMANDER)
@Post()
create() {}
```

---

## 9️⃣ CRUD “ME” (données de l’utilisateur connecté)

```ts
@Get('me')
getMine(@Req() req) {
  return this.assignmentModel.findAll({
    where: { userId: req.user.sub },
  });
}
```

---

## 🔟 Validation globale (IMPORTANT)

```ts
app.useGlobalPipes(
  new ValidationPipe({ whitelist: true }),
);
```

➡️ Supprime les champs non autorisés

---

## 1️⃣1️⃣ Erreurs classiques à l’examen ❌

❌ oublier `+id` (string → number)
❌ `.update()` sans vérifier existence
❌ `.create(dto)` sans DTO
❌ oublier `@Body()`
❌ `include` sans relations définies

---

## 🧠 Phrase parfaite pour l’examen 🎓

> *“Un CRUD NestJS est structuré avec des DTO pour la validation, un service pour l’accès à la base via Sequelize, et un controller pour exposer les routes HTTP.”*

---

## 🧪 Cheat Sheet Express (à mémoriser)

```ts
create()    → Model.create()
findAll()   → Model.findAll()
findOne()   → Model.findByPk()
update()    → instance.update()
delete()    → instance.destroy()
```

---

Si tu veux encore monter d’un niveau 🚀 :

* CRUD avec **pagination**
* CRUD avec **transactions**
* CRUD avec **soft delete**
* CRUD GraphQL

Dis-moi ce que tu veux réviser encore 💪
