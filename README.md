# 🏢 Sistema de Reservas de Salas

API para gestionar reservas de salas en una oficina.

## 🚀 Tecnologías

- NestJS
- TypeORM
- PostgreSQL
- JWT
- Docker
- Swagger

## 📋 Requisitos

- Node.js 18+
- Docker y Docker Compose
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio
```bash
git clone <tu-repo>
cd reservas-salas-api
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

4. Levantar la base de datos
```bash
docker-compose up -d
```

5. Iniciar el servidor
```bash
npm run start:dev
```

## 📚 Documentación

La documentación de la API está disponible en:
- Swagger UI: http://localhost:3000/api

## 🧪 Endpoints

### Autenticación
- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Iniciar sesión

### Salas
- `GET /rooms` - Listar salas disponibles

### Reservas
- `POST /reservations` - Crear reserva
- `GET /reservations/user` - Ver mis reservas
- `DELETE /reservations/:id` - Cancelar reserva

## 🗄️ Base de Datos

La aplicación usa PostgreSQL corriendo en Docker.

### Credenciales por defecto:
- Host: localhost
- Puerto: 5432
- Usuario: admin
- Contraseña: admin123
- Base de datos: reservas_salas

### Comandos útiles:
```bash
# Ver logs de la base de datos
docker-compose logs postgres

# Detener la base de datos
docker-compose down

# Detener y borrar datos
docker-compose down -v
```

## 🌱 Datos de Prueba

Al iniciar la aplicación, se crean automáticamente 5 salas de ejemplo.

## 👤 Autor

David Chiriboga



## Prueba

**1. Registrar usuario:**
```
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "password": "123456"
}
```

**2. Login:**
```
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "juan@email.com",
  "password": "123456"
}
```

Copia el `access_token` de la respuesta.

**3. Ver salas (requiere token):**
```
GET http://localhost:3000/rooms
Authorization: Bearer TU_TOKEN_AQUI
```

**4. Crear reserva:**
```
POST http://localhost:3000/reservations
Authorization: Bearer TU_TOKEN_AQUI
Content-Type: application/json

{
  "roomId": 1,
  "fecha": "2025-10-25",
  "horaInicio": "09:00",
  "horaFin": "11:00"
}
```

**5. Ver mis reservas:**
```
GET http://localhost:3000/reservations/user
Authorization: Bearer TU_TOKEN_AQUI
```

**6. Cancelar reserva:**
```
DELETE http://localhost:3000/reservations/1
Authorization: Bearer TU_TOKEN_AQUI