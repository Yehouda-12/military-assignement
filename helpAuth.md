Parfait 🔐
Maintenant on fait **LA FICHE EXAMEN COMPLÈTE – AUTHENTIFICATION / LOGIN (NestJS)**.
Lis-la bien : **c’est exactement ce qu’on attend à un examen**.

---

# 📕 FICHE EXAMEN – AUTHENTIFICATION & LOGIN (NestJS + JWT)

---

## 🎯 Objectif de l’authentification

* Vérifier l’identité d’un utilisateur
* Générer un **JWT**
* Protéger les routes
* Gérer les rôles (COMMANDER, SOLDIER…)

---

## 1️⃣ Bibliothèques à installer

```bash
npm i @nestjs/passport passport passport-local
npm i @nestjs/jwt passport-jwt
npm i bcrypt
```

Types (si besoin) :

```bash
npm i -D @types/passport-local @types/passport-jwt @types/bcrypt
```

---

## 2️⃣ Principe global (à mémoriser)

```
Login → vérification password → JWT
JWT → envoyé au client
Client → Authorization: Bearer TOKEN
AuthGuard('jwt') → valide le token
req.user → contient l’utilisateur
```

---

## 3️⃣ Hash du mot de passe (bcrypt)

### Création (register)

```ts
import * as bcrypt from 'bcrypt';

const hash = await bcrypt.hash(password, 10);
```

* `10` = saltRounds
* On ne stocke **JAMAIS** le mot de passe en clair

---

### Vérification (login)

```ts
const isValid = await bcrypt.compare(
  password,
  user.password,
);
```

---

## 4️⃣ AuthModule

```ts
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
```

---

## 5️⃣ AuthService (cœur du login ❤️)

```ts
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user) return null;

    const isMatch = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isMatch) return null;

    return user;
  }

  login(user: any) {
    const payload = {
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
```

---

## 6️⃣ LocalStrategy (login username/password)

```ts
@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(
      username,
      password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
```

---

## 7️⃣ AuthController (login endpoint)

```ts
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }
}
```

📌 Le guard appelle automatiquement `LocalStrategy`.

---

## 8️⃣ JwtStrategy (protection des routes)

```ts
@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
) {
  constructor() {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRET_KEY',
    });
  }

  async validate(payload: any) {
    return {
      sub: payload.sub,
      role: payload.role,
    };
  }
}
```

➡️ Résultat disponible dans `req.user`.

---

## 9️⃣ Protéger une route

```ts
@UseGuards(AuthGuard('jwt'))
@Get('profile')
getProfile(@Req() req) {
  return req.user;
}
```

---

## 🔟 Auth + Roles (COMBINÉS)

```ts
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.COMMANDER)
@Get('secure')
secureRoute() {}
```

---

## 1️⃣1️⃣ Authorization header (client)

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## 1️⃣2️⃣ Flux COMPLET (examen)

```
POST /auth/login
↓
LocalStrategy
↓
AuthService.validateUser
↓
bcrypt.compare
↓
JWT généré
↓
Client stocke le token
↓
Authorization Bearer TOKEN
↓
JwtStrategy
↓
req.user
↓
RolesGuard
```

---

## 1️⃣3️⃣ Erreurs classiques à l’examen ❌

❌ comparer password sans bcrypt
❌ stocker password en clair
❌ oublier `PassportModule`
❌ oublier `JwtStrategy`
❌ oublier `AuthGuard('jwt')`
❌ oublier `secret` identique partout

---

## 🧠 Phrase parfaite pour l’examen 🎓

> *“L’authentification NestJS repose sur Passport, une stratégie locale pour le login, bcrypt pour le hash, et JWT pour sécuriser les routes.”*

---

## 🧪 Cheat Sheet ultra-rapide

```ts
bcrypt.hash()      → création password
bcrypt.compare()   → login
AuthGuard('local') → login
AuthGuard('jwt')   → protection
req.user           → utilisateur connecté
```

---

## 🚀 Niveau avancé (si demandé)

* Refresh Token
* Logout
* Expiration JWT
* Blacklist token
* Auth GraphQL

Si tu veux, je te fais **une fiche express “tout en 1 page” pour réviser avant l’exam** 🔥
