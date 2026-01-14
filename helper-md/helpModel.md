Parfait 👍
Voici **un README / fiche de révision spéciale “MODELS Sequelize + NestJS”**, pensée **exactement pour l’examen**.
Lis-la 2–3 fois et tu pourras **recréer des models de zéro sans réfléchir**.

---

# 📘 FICHE EXAMEN – MODELS (NestJS + Sequelize)

## 🎯 Objectif

Savoir :

* créer un **model Sequelize**
* comprendre **chaque décorateur**
* savoir **quand utiliser interface / generics**
* éviter les **erreurs classiques d’examen**

---

## 1️⃣ C’est quoi un Model ?

Un **Model** :

* représente **une table SQL**
* chaque propriété = **une colonne**
* permet :

  * `create`
  * `findAll`
  * `findOne`
  * `update`
  * `destroy`

👉 **1 model = 1 table**

---

## 2️⃣ Structure MINIMALE d’un model

```ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  username: string;
}
```

➡️ Sequelize crée la table automatiquement si `sync` est activé.

---

## 3️⃣ Pourquoi `extends Model` ❓

```ts
export class User extends Model {}
```

Parce que :

* `Model` fournit :

  * `.create()`
  * `.findAll()`
  * `.update()`
  * `.destroy()`

❌ Sans `extends Model` → **ce n’est PAS un model Sequelize**

---

## 4️⃣ Pourquoi `@Table` ❓

```ts
@Table
export class User extends Model {}
```

* dit à Sequelize :
  👉 **“Cette classe correspond à une table SQL”**

Sans `@Table` → Sequelize ignore la classe.

---

## 5️⃣ `@Column` = colonne SQL

```ts
@Column
username: string;
```

équivaut à :

```sql
username VARCHAR
```

---

## 6️⃣ Pourquoi `DataType.STRING` et pas `string` ❓

```ts
@Column({
  type: DataType.STRING,
})
```

### 🔍 Explication

* `string` → TypeScript (compile-time)
* `DataType.STRING` → SQL (runtime)

👉 Sequelize parle **SQL**, pas TypeScript.

---

## 7️⃣ Exemple COMPLET (User)

```ts
@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  role: string;
}
```

---

## 8️⃣ Pourquoi parfois `declare` ❓

```ts
@Column
declare username: string;
```

### 👉 Utilisé quand :

* `strict: true`
* Sequelize gère l’initialisation

📌 À l’examen :

* **facultatif**
* pas obligatoire si TypeScript n’est pas strict

---

## 9️⃣ Relations – le PLUS IMPORTANT 🔥

---

### 🔹 One To Many

#### User → Assignments

```ts
@HasMany(() => Assignment)
assignments: Assignment[];
```

➡️ **Un User a plusieurs Assignments**

---

### 🔹 Many To One

```ts
@BelongsTo(() => User)
user: User;
```

➡️ **Un Assignment appartient à un User**

---

### 🔹 Foreign Key

```ts
@ForeignKey(() => User)
@Column
userId: number;
```

📌 OBLIGATOIRE sinon erreur Sequelize

---

## 🔟 Exemple Assignment (parfait examen)

```ts
@Table
export class Assignment extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Shift)
  @Column
  shiftId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Shift)
  shift: Shift;
}
```

---

## 1️⃣1️⃣ `findAll({ include })` c’est quoi ?

```ts
Assignment.findAll({
  include: [User, Shift],
});
```

👉 Fait un **JOIN SQL**

```sql
SELECT * FROM Assignments
JOIN Users
JOIN Shifts
```

➡️ Retourne des objets complets

---

## 1️⃣2️⃣ Pourquoi interface + generics ?

### Exemple :

```ts
export interface ShiftAttributes {
  id: number;
  startTime: Date;
  endTime: Date;
}

export interface ShiftCreationAttributes
  extends Omit<ShiftAttributes, 'id'> {}
```

```ts
export class Shift extends Model<
  ShiftAttributes,
  ShiftCreationAttributes
> {}
```

### Pourquoi ?

* Typage fort
* Corrige erreurs `.create()`
* Recommandé mais **PAS obligatoire à l’examen**

📌 À l’examen :

* **Model simple suffit**

---

## 1️⃣3️⃣ Pourquoi User sans interface ?

Parce que :

* plus simple
* rapide
* acceptable

👉 Les interfaces = **bonus pro**, pas exigées.

---

## 1️⃣4️⃣ Pourquoi la table s’appelle `users` et pas `User` ?

Par défaut Sequelize :

* prend le nom de la classe
* met au **pluriel**
* en **minuscule**

### Pour forcer :

```ts
@Table({ tableName: 'users' })
```

---

## 1️⃣5️⃣ Où les tables sont créées ?

Dans `app.module.ts` :

```ts
SequelizeModule.forRoot({
  autoLoadModels: true,
  synchronize: true,
})
```

👉 Sequelize crée les tables au démarrage

---

## 1️⃣6️⃣ Erreurs classiques à l’examen ❌

❌ oublier `@Column`
❌ oublier `@ForeignKey`
❌ utiliser `string` au lieu de `DataType.STRING`
❌ relation sans `BelongsTo`
❌ créer une table mais pas l’importer dans SequelizeModule

---

## 🧠 Phrase magique pour l’examen 🎓

> *“Un model Sequelize est une classe TypeScript décorée avec @Table et @Column qui étend Model afin de représenter une table SQL et ses relations.”*

---

## ✅ Checklist rapide (à mémoriser)

✔ `@Table`
✔ `extends Model`
✔ `@Column`
✔ `DataType`
✔ `@ForeignKey`
✔ `@BelongsTo / @HasMany`

---

Si tu veux, au prochain message je peux :

* te faire **une fiche CRUD Sequelize**
* une **anti-séche des erreurs d’examen**
* ou une **fiche Guards + JWT + Roles**

Tu choisis 💪
