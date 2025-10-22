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