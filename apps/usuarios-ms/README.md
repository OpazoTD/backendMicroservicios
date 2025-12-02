# Microservicio de Usuarios - Setup

## Pasos para configurar el microservicio:

### 1. Generar Prisma Client
```bash
cd apps/usuarios-ms
npx prisma generate
```

### 2. Ejecutar migraciones de Prisma
```bash
# Crear la base de datos y tablas
npx prisma migrate dev --name init

# O si prefieres hacer push directo (sin migraciones)
npx prisma db push
```

### 3. Instalar dependencias (si falta bcrypt)
```bash
cd ../..
npm install bcrypt @types/bcrypt
```

### 4. Iniciar el microservicio
```bash
npm run start:usuarios
```

## Estructura del microservicio:

```
usuarios-ms/
├── prisma/
│   ├── schema.prisma          # Definición de modelos User y CartItem
│   └── prisma.service.ts      # Servicio de Prisma con lifecycle hooks
├── src/
│   ├── users/
│   │   ├── users.controller.ts  # Message patterns para usuarios
│   │   ├── users.service.ts     # Lógica de negocio de usuarios
│   │   └── users.module.ts      # Módulo de usuarios
│   ├── cart/
│   │   ├── cart.controller.ts   # Message patterns para carrito
│   │   ├── cart.service.ts      # Lógica de negocio de carrito
│   │   └── cart.module.ts       # Módulo de carrito
│   ├── usuarios-ms.controller.ts # Health check
│   ├── usuarios-ms.service.ts    # Servicio base
│   ├── usuarios-ms.module.ts     # Módulo principal
│   └── main.ts                   # Bootstrap del microservicio TCP
└── .env                          # Variables de entorno

```

## Message Patterns disponibles:

### Usuarios:
- `create_user`: Crear nuevo usuario
- `get_all_users`: Obtener todos los usuarios
- `get_user_by_id`: Obtener usuario por ID
- `get_user_by_email`: Obtener usuario por email
- `update_user`: Actualizar usuario
- `delete_user`: Eliminar usuario
- `validate_user`: Validar credenciales de usuario

### Carrito:
- `add_to_cart`: Agregar producto al carrito
- `get_cart`: Obtener carrito de usuario
- `update_cart_item`: Actualizar cantidad de item
- `remove_from_cart`: Remover item del carrito
- `clear_cart`: Limpiar carrito completo
- `get_cart_items_by_ids`: Obtener items por IDs

### Health:
- `health_check`: Verificar estado del microservicio
