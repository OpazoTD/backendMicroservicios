// Este script inserta un usuario directamente usando Prisma
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 1. Encriptar contraseña
  const hashedPassword = await bcrypt.hash('123456', 10);

  // 2. Crear usuario
  const user = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      email: 'admin@test.com',
      name: 'Admin Test',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Usuario creado:', user);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
// ```

// Ejecútalo con:
// `npx ts-node seed-test.ts` (quizás necesites instalar `npm i -D ts-node` si no lo tienes).

// Si ves **"Usuario creado: { ... }"**, ¡Felicidades! Tu microservicio de Usuarios y la base de datos Postgres están conectados correctamente.

// ---

// ### 5. La Prueba de Fuego (End-to-End)
// Ahora probaremos si el **Gateway** es capaz de hablar con el **Microservicio**.

// Usaremos `curl` (o Postman si lo prefieres) para intentar loguearnos.

// **Petición HTTP al Gateway:**

// ```bash
// curl -X POST http://localhost:3000/auth/login \
//    -H "Content-Type: application/json" \
//    -d '{"email": "admin@test.com", "password": "123456"}'
// ```

// **¿Qué debería pasar?**
// 1.  El Gateway recibe el JSON en puerto 3000.
// 2.  Envía mensaje TCP al puerto 3001 (Usuarios MS).
// 3.  Usuarios MS busca en Postgres, valida hash y responde "OK".
// 4.  Gateway genera JWT.

// ✅ **Resultado Esperado:**
// Deberías recibir un JSON con el token:
// ```json
// {"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}