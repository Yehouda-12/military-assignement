Parfait. Là on va faire **un vrai cours de A à Z**, calmement, comme si tu devais **le refaire à l’examen sans internet**.
Je vais avancer **pas à pas**, avec **pourquoi**, **comment**, et **exemples concrets NestJS**.

---

# 🎯 Objectif final

Pouvoir écrire ça 👇 :

```ts
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('COMMANDER', 'ADMIN')
@Get()
findAll()
```

👉 Et que **SEULEMENT** les utilisateurs avec **COMMANDER OU ADMIN** puissent accéder.

---

# 🧠 Étape 0 – Rappel important (base)

* L’utilisateur se connecte
* Il reçoit un **JWT**
* Le JWT contient :

```ts
{
  sub: user.id,
  role: user.role
}
```

➡️ `req.user.role` existe déjà quand le guard s’exécute.

---

# 🧩 Étape 1 – Créer les rôles (enum propre)

📁 `src/auth/roles.enum.ts`

```ts
export enum Role {
  COMMANDER = 'COMMANDER',
  SOLDIER = 'SOLDIER',
  ADMIN = 'ADMIN',
}
```

✅ Pourquoi un enum ?

* Pas de fautes de frappe
* Autocomplétion
* Propre pour l’examen

---

# 🧩 Étape 2 – Créer le décorateur @Roles

📁 `src/auth/roles.decorator.ts`

```ts
import { SetMetadata } from '@nestjs/common';
import { Role } from './roles.enum';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) =>
  SetMetadata(ROLES_KEY, roles);
```

### 🔍 Explication ligne par ligne

* `SetMetadata` → colle des infos sur la route
* `ROLES_KEY` → clé sous laquelle on stocke les rôles
* `...roles` → permet plusieurs rôles

👉 Exemple réel :

```ts
@Roles('COMMANDER', 'ADMIN')
```

---

# 🧩 Étape 3 – Créer le RolesGuard

📁 `src/auth/roles.guard.ts`

```ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1️⃣ Récupérer les rôles autorisés sur la route
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [
        context.getHandler(),
        context.getClass(),
      ],
    );

    // 2️⃣ Si aucune règle → accès libre
    if (!requiredRoles) {
      return true;
    }

    // 3️⃣ Récupérer l'utilisateur depuis le JWT
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 4️⃣ Vérifier si le rôle est autorisé
    return requiredRoles.includes(user.role);
  }
}
```

---

## 🧠 Compréhension CLAIRE du Guard

### Exemple :

```ts
@Roles('COMMANDER', 'ADMIN')
```

`requiredRoles = ['COMMANDER', 'ADMIN']`

Si :

* user.role = `COMMANDER` ✅
* user.role = `ADMIN` ✅
* user.role = `SOLDIER` ❌

---

# 🧩 Étape 4 – Utilisation dans un controller

```ts
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.COMMANDER, Role.ADMIN)
@Get()
findAll() {
  return this.service.findAll();
}
```

📌 Important :

* `AuthGuard('jwt')` **DOIT être avant**
* Sinon `req.user` n’existe pas

---

# 🧩 Étape 5 – Rôles sur toute une classe

```ts
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.COMMANDER)
@Controller('assignments')
export class AssignmentsController {
```

➡️ Toutes les routes héritent de la règle

---

# 🧩 Étape 6 – Exemple réel complet

```ts
// COMMANDER + ADMIN
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.COMMANDER, Role.ADMIN)
@Get()
getAllAssignments() {}

// SOLDIER uniquement
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.SOLDIER)
@Get('me')
getMyAssignments() {}
```

---

# 🧪 Étape 7 – Cas sans décorateur @Roles

```ts
@Get('public')
getPublicData() {}
```

➡️ Le guard laisse passer car `requiredRoles === undefined`

---

# 🧠 Pourquoi cette méthode est la MEILLEURE

✅ Propre
✅ Lisible
✅ Scalable
✅ Standard NestJS
✅ Impressionne à l’examen

---

# 📝 Phrase PARFAITE pour l’examen 🎓

> *“J’utilise un décorateur @Roles combiné à un RolesGuard qui lit les métadonnées de la route pour autoriser l’accès selon le rôle contenu dans le JWT.”*

---

# 🔥 BONUS – Schéma mental à retenir

```
@Roles → metadata
↓
RolesGuard
↓
Reflector
↓
req.user.role
↓
AUTORISÉ / REFUSÉ
```

---

Si tu veux, au prochain message je peux :

* te faire **un résumé 1 page pour réviser**
* te donner **les erreurs pièges d’examen**
* t’expliquer comment faire **un Guard global**

Dis-moi 💪

