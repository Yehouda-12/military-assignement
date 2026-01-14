Parfait 🔥
Voici **le PROJET TYPE “EXAMEN” COMPLET NestJS**
👉 **AUTH + ROLES + CRUD + SEQUELIZE**
👉 exactement ce que tu peux **reproduire demain sans réfléchir**

---

# 🧪 PROJET TYPE EXAMEN – NESTJS (PAS À PAS)

## 🎯 OBJECTIF

Construire une API NestJS avec :

* Authentification JWT
* Rôles (`COMMANDER`, `SOLDIER`)
* 1 CRUD principal
* Sequelize + PostgreSQL
* Code propre, structuré, noté positivement

---

# 1️⃣ CRÉATION DU PROJET

```bash
nest new military-api
cd military-api
```

---

# 2️⃣ INSTALLATION DES LIBRAIRIES (OBLIGATOIRE)

```bash
npm install @nestjs/sequelize sequelize sequelize-typescript
npm install pg pg-hstore
npm install @nestjs/jwt passport passport-jwt
npm install bcrypt
npm install class-validator class-transformer
```

---

# 3️⃣ CONFIGURATION SEQUELIZE (app.module.ts)

```ts
SequelizeModule.forRoot({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'exam_db',
  autoLoadModels: true,
  synchronize: true,
})
```

👉 `synchronize: true` = création auto des tables (EXAMEN ❤️)

---

# 4️⃣ MODULE USERS (AUTH OBLIGATOIRE)

```bash
nest g module users
nest g service users
```

## user.model.ts

```ts
@Table
export class User extends Model {
  @Column(DataType.STRING)
  username: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  role: string;
}
```

---

# 5️⃣ MODULE AUTH (LOGIN)

```bash
nest g module auth
nest g controller auth
nest g service auth
```

## auth.service.ts (ESSENTIEL)

```ts
async validateUser(username: string, password: string) {
  const user = await this.usersService.findByUsername(username);
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }
  return null;
}

async login(user: User) {
  return {
    access_token: this.jwtService.sign({
      sub: user.id,
      role: user.role,
    }),
  };
}
```

---

# 6️⃣ JWT STRATEGY

```ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    });
  }

  validate(payload: any) {
    return payload;
  }
}
```

---

# 7️⃣ ROLES (TRÈS IMPORTANT POUR LES POINTS)

## roles.decorator.ts

```ts
export const Roles = (...roles: string[]) =>
  SetMetadata('roles', roles);
```

## roles.guard.ts

```ts
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const roles = this.reflector.get('roles', ctx.getHandler());
    if (!roles) return true;

    const req = ctx.switchToHttp().getRequest();
    return roles.includes(req.user.role);
  }
}
```

---

# 8️⃣ CRUD PRINCIPAL (EX: SHIFTS)

```bash
nest g module shifts
nest g controller shifts
nest g service shifts
```

## shift.model.ts

```ts
@Table
export class Shift extends Model {
  @Column(DataType.DATE)
  startTime: Date;

  @Column(DataType.DATE)
  endTime: Date;

  @Column(DataType.STRING)
  location: string;
}
```

---

## shifts.controller.ts

```ts
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('COMMANDER')
@Get()
findAll() {
  return this.shiftsService.findAll();
}
```

👉 **Commander seul** peut voir tous les shifts

---

# 9️⃣ VALIDATION (BONUS IMPORTANT)

Dans `main.ts` :

```ts
app.useGlobalPipes(
  new ValidationPipe({ whitelist: true }),
);
```

👉 empêche les champs non autorisés

---

# 🔐 ENDPOINTS ATTENDUS

| Route            | Rôle      |
| ---------------- | --------- |
| POST /auth/login | Tous      |
| GET /shifts      | COMMANDER |
| GET /shifts/me   | SOLDIER   |
| POST /shifts     | COMMANDER |

---

# 🧠 ASTUCE D’OR POUR L’EXAMEN

Si tu bloques :

* ❌ GraphQL
* ❌ Features complexes
* ✅ AUTH + CRUD SIMPLE

> **Simple + fonctionnel = excellente note**

---

# 🧾 CHECKLIST FINALE (À COCHER)

* [ ] Sequelize connecté
* [ ] User + Auth fonctionnent
* [ ] JWT reçu
* [ ] 1 CRUD OK
* [ ] Guards actifs
* [ ] Rôles fonctionnels

---

## 🔥 SI TU VEUX

Je peux encore te faire :

* ✅ **anti-sèche A4 “Nest examen”**
* ✅ **CRUD GraphQL version examen**
* ✅ **erreurs classiques + solutions**

Dis-moi 💪
