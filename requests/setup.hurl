# 1. Cria o usuário ADMIN
POST http://localhost:3333/users
Content-Type: application/json
{
  "name": "Admin LogiTrack",
  "email": "admin@logitrack.com",
  "password": "password123",
  "role": "ADMIN"
}
HTTP 201


# 2. Cria um usuário OPERATOR (útil para testar bloqueios de RBAC)
POST http://localhost:3333/users
Content-Type: application/json
{
  "name": "Lucas Operador",
  "email": "lucas@logitrack.com",
  "password": "password123",
  "role": "OPERATOR"
}
HTTP 201
