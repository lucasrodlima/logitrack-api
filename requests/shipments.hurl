# 1. Login como ADMIN (usuário já existe no banco)
POST http://localhost:3333/sessions
Content-Type: application/json
{
  "email": "admin@logitrack.com",
  "password": "password123"
}
HTTP 200
[Captures]
token: jsonpath "$.token"


# 2. Cria uma doca com código único a cada execução
POST http://localhost:3333/docks
Authorization: Bearer {{token}}
Content-Type: application/json
{
  "code": "DOCA-{{newUuid}}",
  "description": "Doca para teste automatizado via Hurl"
}
HTTP 201
[Captures]
dock_id: jsonpath "$.dock.id"
[Asserts]
jsonpath "$.dock.status" == "AVAILABLE"


# 3. Cria a primeira carga (Check-in na doca)
POST http://localhost:3333/shipments
Authorization: Bearer {{token}}
Content-Type: application/json
{
  "trackingCode": "TRK-{{newUuid}}",
  "cargoType": "GENERAL",
  "driverName": "Carlos Silva",
  "licensePlate": "QWE-1234",
  "origin": "Belém - PA",
  "destination": "Marabá - PA",
  "weightKg": 1250.5,
  "dockId": "{{dock_id}}"
}
HTTP 201
[Captures]
shipment_id: jsonpath "$.shipment.id"
[Asserts]
jsonpath "$.shipment.status" == "PENDING"


# 4. Tenta alocar outra carga na MESMA doca ocupada (Deve falhar com 409)
POST http://localhost:3333/shipments
Authorization: Bearer {{token}}
Content-Type: application/json
{
  "trackingCode": "TRK-{{newUuid}}",
  "cargoType": "FRAGILE",
  "driverName": "João Souza",
  "licensePlate": "ABC-9999",
  "origin": "Ananindeua - PA",
  "destination": "Santarém - PA",
  "weightKg": 500,
  "dockId": "{{dock_id}}"
}
HTTP 409


# 5. Despacha a carga
PATCH http://localhost:3333/shipments/{{shipment_id}}/dispatch
Authorization: Bearer {{token}}
HTTP 200
[Asserts]
jsonpath "$.shipment.status" == "IN_TRANSIT"


# 6. Tenta despachar a mesma carga novamente (Deve falhar com 409)
PATCH http://localhost:3333/shipments/{{shipment_id}}/dispatch
Authorization: Bearer {{token}}
HTTP 409


# 7. Lista as docas e garante que a doca voltou para AVAILABLE
GET http://localhost:3333/docks
Authorization: Bearer {{token}}
HTTP 200
[Asserts]
jsonpath "$.docks[?(@.id=='{{dock_id}}')].status" == "AVAILABLE"

# 8. Lista cargas filtrando por status IN_TRANSIT e paginação
GET http://localhost:3333/shipments?page=1&perPage=3&status=IN_TRANSIT
Authorization: Bearer {{token}}
HTTP 200
[Asserts]
jsonpath "$.shipments" isCollection
jsonpath "$.shipments[?(@.id=='{{shipment_id}}')].status" == "IN_TRANSIT"
