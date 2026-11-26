This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
prisma/
  migrations/
    20261118154357_create_initial_logistics_schema/
      migration.sql
    20261121165645_add_description_to_docks/
      migration.sql
    20261123003842_add_cargo_type_and_shipment_fields/
      migration.sql
    migration_lock.toml
  schema.prisma
requests/
  setup.hurl
  shipments.hurl
src/
  @types/
    fastify-jwt.d.ts
  cryptography/
    hasher-bcrypt.ts
    hasher.ts
  entities/
    dock.ts
    shipment.ts
    user.ts
  env/
    index.ts
  http/
    controllers/
      docks/
        create.ts
        list.ts
        routes.ts
      shipments/
        create.ts
        dispatch.ts
        fetch.ts
        routes.ts
      users/
        authenticate.ts
        profile.ts
        register.ts
        routes.ts
    middlewares/
      verify-jwt.ts
      verify-role.ts
  lib/
    prisma.ts
  repositories/
    in-memory/
      in-memory-docks-repository.ts
      in-memory-shipments-repository.ts
      in-memory-users-repository.ts
    prisma/
      prisma-docks-repository.ts
      prisma-shipments-repository.ts
      prisma-users-repository.ts
    docks-repository.ts
    shipments-repository.ts
    users-repository.ts
  use-cases/
    errors/
      dock-already-exists-error.ts
      dock-not-found-error.ts
      dock-unavailable-error.ts
      invalid-credential-errors.ts
      resource-not-found-error.ts
      shipment-already-dispatched.ts
      shipment-already-exists.ts
      user-already-exists-error.ts
    factories/
      make-authenticate-use-case.ts
      make-create-dock-use-case.ts
      make-create-shipment-use-case.ts
      make-dispatch-shipment-use-case.ts
      make-fetch-shipments-use-case.ts
      make-get-user-profile-use-case.ts
      make-list-docks-use-case.ts
      make-register-use-case.ts
    authenticate.spec.ts
    authenticate.ts
    create-dock.spec.ts
    create-dock.ts
    create-shipment.spec.ts
    create-shipment.ts
    dispatch-shipment.spec.ts
    dispatch-shipment.ts
    fetch-shipments.spec.ts
    fetch-shipments.ts
    get-user-profile.spec.ts
    get-user-profile.ts
    list-docs.spec.ts
    list-docs.ts
    register-user.spec.ts
    register-user.ts
  app.ts
  server.ts
.env.example
.gitignore
docker-compose.yml
package.json
prisma.config.ts
tsconfig.json
```

# Files

## File: prisma/migrations/20261118154357_create_initial_logistics_schema/migration.sql
```sql
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'OPERATOR');

-- CreateEnum
CREATE TYPE "DockStatus" AS ENUM ('AVAILABLE', 'OCCUPIED', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "ShipmentStatus" AS ENUM ('PENDING', 'IN_TRANSIT', 'DELIVERED', 'CANCELED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'OPERATOR',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "docks" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" "DockStatus" NOT NULL DEFAULT 'AVAILABLE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "docks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipments" (
    "id" TEXT NOT NULL,
    "tracking_code" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "weight_kg" DOUBLE PRECISION NOT NULL,
    "status" "ShipmentStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "operator_id" TEXT NOT NULL,
    "dock_id" TEXT,

    CONSTRAINT "shipments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "docks_code_key" ON "docks"("code");

-- CreateIndex
CREATE UNIQUE INDEX "shipments_tracking_code_key" ON "shipments"("tracking_code");

-- AddForeignKey
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_dock_id_fkey" FOREIGN KEY ("dock_id") REFERENCES "docks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
```

## File: prisma/migrations/20261121165645_add_description_to_docks/migration.sql
```sql
-- AlterTable
ALTER TABLE "docks" ADD COLUMN     "description" TEXT;
```

## File: prisma/migrations/20261123003842_add_cargo_type_and_shipment_fields/migration.sql
```sql
/*
  Warnings:

  - Added the required column `driver_name` to the `shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `license_plate` to the `shipments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CargoType" AS ENUM ('GENERAL', 'REFRIGERATED', 'HAZARDOUS', 'FRAGILE', 'BULK');

-- AlterTable
ALTER TABLE "shipments" ADD COLUMN     "cargo_type" "CargoType" NOT NULL DEFAULT 'GENERAL',
ADD COLUMN     "driver_name" TEXT NOT NULL,
ADD COLUMN     "license_plate" TEXT NOT NULL;
```

## File: prisma/migrations/migration_lock.toml
```toml
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"
```

## File: requests/setup.hurl
```
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
```

## File: src/@types/fastify-jwt.d.ts
```typescript
import '@fastify/jwt';
import { Role } from '../entities/user.js';

declare module '@fastify/jwt' {
    export interface FastifyJWT {
        payload: {
            role: Role;
        };
        user: {
            sub: string;
            role: Role;
        };
    }
}
```

## File: src/cryptography/hasher-bcrypt.ts
```typescript
import { Hasher } from "./hasher";
import bcrypt from "bcryptjs";

export class HasherBcrypt implements Hasher {
    public async hash(password: string): Promise<string> {
        const hashed = await bcrypt.hash(password, 6);
        return hashed;
    };

    public async compare(password: string, passwordHash: string): Promise<boolean> {
        const isCorrectlyhashed = bcrypt.compare(password, passwordHash);
        return isCorrectlyhashed;
    }
}
```

## File: src/cryptography/hasher.ts
```typescript
export interface Hasher {
    hash(password: string): Promise<string>;
    compare(password: string, passwordHash: string): Promise<boolean>;
}
```

## File: src/entities/user.ts
```typescript
export type Role = 'ADMIN' | 'OPERATOR'

export interface User {
    id: string
    name: string
    email: string
    passwordHash: string
    role: Role
    createdAt: Date
}

export interface UserCreateInput {
    name: string
    email: string
    passwordHash: string
    role?: Role
}
```

## File: src/http/controllers/docks/create.ts
```typescript
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { makeCreateDockUseCase } from "../../../use-cases/factories/make-create-dock-use-case";
import { DockAlreadyExistsError } from "../../../use-cases/errors/dock-already-exists-error";

export async function create(req: FastifyRequest, rep: FastifyReply) {
    const createDockBodySchema = z.object({
        code: z.string().min(2),
        description: z.string().nullable().optional(),
        status: z.enum(['AVAILABLE', 'OCCUPIED', 'MAINTENANCE']).optional(),
    })

    const { code, description, status } = createDockBodySchema.parse(req.body);

    try {
        const createDockUseCase = makeCreateDockUseCase();

        const { dock } = await createDockUseCase.execute({
            code,
            description,
            status
        });

        return rep.status(201).send({ dock });

    } catch (err) {
        if (err instanceof DockAlreadyExistsError) {
            return rep.status(409).send({ message: err.message });
        }

        throw err;
    }
}
```

## File: src/http/controllers/docks/list.ts
```typescript
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { makeListDocksUseCase } from "../../../use-cases/factories/make-list-docks-use-case";

export async function list(req: FastifyRequest, rep: FastifyReply) {
    const listDockUseCase = makeListDocksUseCase()

    const { docks } = await listDockUseCase.execute();

    return rep.status(200).send({ docks });
}
```

## File: src/http/controllers/docks/routes.ts
```typescript
import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-role";
import { list } from "./list";
import { create } from "./create";

export async function docksRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt);

    app.get('/docks', list);
    app.post('/docks', { onRequest: [verifyUserRole('ADMIN')] }, create);
}
```

## File: src/http/controllers/shipments/create.ts
```typescript
import { FastifyReply, FastifyRequest } from "fastify";
import { currencyCode, z } from "zod";
import { makeCreateShipmentUseCase } from "../../../use-cases/factories/make-create-shipment-use-case";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { DockUnavailableError } from "../../../use-cases/errors/dock-unavailable-error";
import { ShipmentAlreadyExistsError } from "../../../use-cases/errors/shipment-already-exists";

export async function create(req: FastifyRequest, rep: FastifyReply) {
    const createShipmentBodySchema = z.object({
        trackingCode: z.string().min(3),
        cargoType: z.enum(['GENERAL', 'REFRIGERATED', 'HAZARDOUS', 'FRAGILE', 'BULK']),
        driverName: z.string(),
        licensePlate: z.string(),
        origin: z.string(),
        destination: z.string(),
        weightKg: z.float64(),
        status: z.enum(['PENDING', 'IN_TRANSIT', 'DELIVERED', 'CANCELED']).optional(),
        dockId: z.string(),
    })

    const {
        trackingCode,
        cargoType,
        driverName,
        licensePlate,
        origin,
        destination,
        weightKg,
        status,
        dockId,
    } = createShipmentBodySchema.parse(req.body);

    try {
        const createShipmentUseCase = makeCreateShipmentUseCase();

        const { shipment } = await createShipmentUseCase.execute({
            trackingCode,
            cargoType,
            driverName,
            licensePlate,
            origin,
            destination,
            weightKg,
            status,
            operatorId: req.user.sub,
            dockId,
        });

        return rep.status(201).send({ shipment });

    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return rep.status(404).send({ message: err.message });
        }

        if (err instanceof DockUnavailableError) {
            return rep.status(409).send({ message: err.message });
        }

        if (err instanceof ShipmentAlreadyExistsError) {
            return rep.status(409).send({ message: err.message });
        }

        throw err;
    }

}
```

## File: src/http/controllers/shipments/fetch.ts
```typescript
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { makeFetchShipmentsUseCase } from "../../../use-cases/factories/make-fetch-shipments-use-case";

export async function fetch(req: FastifyRequest, rep: FastifyReply) {
    const fetchShipmentsUseCase = makeFetchShipmentsUseCase()

    const fetchQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
        perPage: z.coerce.number().min(1).max(50).default(20),
        status: z.enum(['PENDING', 'IN_TRANSIT', 'DELIVERED', 'CANCELED']).optional(),
        cargoType: z.enum(['GENERAL', 'REFRIGERATED', 'HAZARDOUS', 'FRAGILE', 'BULK']).optional(),
    });

    const { page, perPage, status, cargoType } = fetchQuerySchema.parse(req.query);

    const { shipments } = await fetchShipmentsUseCase.execute({
        page,
        perPage,
        status,
        cargoType,
    });

    return rep.status(200).send({ shipments });
}
```

## File: src/http/controllers/users/authenticate.ts
```typescript
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { makeAuthenticateUseCase } from "../../../use-cases/factories/make-authenticate-use-case";
import { InvalidCredentialsError } from "../../../use-cases/errors/invalid-credential-errors";

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(req.body);

    try {
        const authenticateUseCase = makeAuthenticateUseCase();

        const { user } = await authenticateUseCase.execute({
            email,
            password,
        });

        const token = await rep.jwtSign(
            {
                role: user.role,
            },
            {
                sign: {
                    sub: user.id,
                },
            },
        );

        return rep.status(200).send({ token });

    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return rep.status(400).send({ message: err.message })
        }

        throw (err);
    }
}
```

## File: src/http/controllers/users/profile.ts
```typescript
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { makeGetUserProfileUseCase } from "../../../use-cases/factories/make-get-user-profile-use-case";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export async function profile(req: FastifyRequest, rep: FastifyReply) {
    try {
        const getUserProfile = makeGetUserProfileUseCase();

        const { user } = await getUserProfile.execute({
            userID: req.user.sub,
        });

        const { passwordHash: _passwordHash, ...userWithoutPassword } = user;

        return rep.status(200).send({
            user: userWithoutPassword,
        });

    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return rep.status(404).send({ message: err.message });
        }

        throw err;
    }
}
```

## File: src/use-cases/errors/dock-already-exists-error.ts
```typescript
export class DockAlreadyExistsError extends Error {
    constructor() {
        super("Dock code already exists.");
    }
}
```

## File: src/use-cases/errors/dock-not-found-error.ts
```typescript
export class DockNotFoundError extends Error {
    constructor() {
        super("Dock not found.");
    }
}
```

## File: src/use-cases/errors/dock-unavailable-error.ts
```typescript
export class DockUnavailableError extends Error {
    constructor() {
        super("Dock is not available for check-in.");
    }
}
```

## File: src/use-cases/errors/invalid-credential-errors.ts
```typescript
export class InvalidCredentialsError extends Error {
    constructor() {
        super("Invalid Credentials.");
    }
}
```

## File: src/use-cases/errors/resource-not-found-error.ts
```typescript
export class ResourceNotFoundError extends Error {
    constructor() {
        super('Resource not found.');
    }
}
```

## File: src/use-cases/errors/shipment-already-dispatched.ts
```typescript
export class ShipmentAlreadyDispatchedError extends Error {
    constructor() {
        super("Shipment has already been dispatched.");
    }
}
```

## File: src/use-cases/errors/shipment-already-exists.ts
```typescript
export class ShipmentAlreadyExistsError extends Error {
    constructor() {
        super("Tracking code already exists.");
    }
}
```

## File: src/use-cases/errors/user-already-exists-error.ts
```typescript
export class UserAlreadyExistsError extends Error {
  constructor() {
    super("E-mail already exists.");
  }
}
```

## File: src/use-cases/factories/make-authenticate-use-case.ts
```typescript
import { HasherBcrypt } from "../../cryptography/hasher-bcrypt";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
    const usersRepository = new PrismaUsersRepository;
    const hasher = new HasherBcrypt;
    const authenticateUseCase = new AuthenticateUseCase(usersRepository, hasher);

    return authenticateUseCase;
}
```

## File: src/use-cases/factories/make-dispatch-shipment-use-case.ts
```typescript
import { PrismaDocksRepository } from "../../repositories/prisma/prisma-docks-repository";
import { PrismaShipmentsRepository } from "../../repositories/prisma/prisma-shipments-repository";
import { DispatchShipmentUseCase } from "../dispatch-shipment";

export function makeDispatchShipmentUseCase(): DispatchShipmentUseCase {
    const shipmentsRepo = new PrismaShipmentsRepository();
    const docksRepo = new PrismaDocksRepository();
    const dispatchShipmentsUseCase = new DispatchShipmentUseCase(shipmentsRepo, docksRepo);

    return dispatchShipmentsUseCase;
}
```

## File: src/use-cases/factories/make-get-user-profile-use-case.ts
```typescript
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeGetUserProfileUseCase() {
    const usersRepo = new PrismaUsersRepository();
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepo);

    return getUserProfileUseCase;
}
```

## File: src/use-cases/factories/make-list-docks-use-case.ts
```typescript
import { PrismaDocksRepository } from "../../repositories/prisma/prisma-docks-repository";
import { ListDocksUseCase } from "../list-docs";

export function makeListDocksUseCase(): ListDocksUseCase {
    const usersRepository = new PrismaDocksRepository;
    const listDocksUseCase = new ListDocksUseCase(usersRepository);

    return listDocksUseCase;
}
```

## File: src/use-cases/authenticate.spec.ts
```typescript
import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository"
import { HasherBcrypt } from "../cryptography/hasher-bcrypt";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credential-errors";

let usersRepo: InMemoryUsersRepository;
const hasher = new HasherBcrypt;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
    beforeEach(() => {
        usersRepo = new InMemoryUsersRepository();
        sut = new AuthenticateUseCase(usersRepo, hasher);
    });

    it("should be able to authenticate w/ valid credentials.", async () => {
        const email = "tzuzuhi@gmail.com";
        const password = "password123";

        await usersRepo.create({
            name: "Suzuna Tzuzuhi",
            email,
            passwordHash: await hasher.hash(password),
        });

        const { user } = await sut.execute({
            email,
            password
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it("should not be able to authenticate w/ wrong credentials.", async () => {
        await expect(
            sut.execute({
                email: "tzuzuhi@gmail.com",
                password: "password123",
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it("should not be able to authenctica w/ wrong password", async () => {
        const email = "tzuzuhi@gmail.com";

        await usersRepo.create({
            name: "Suzuna Tzuzuhi",
            email,
            passwordHash: await hasher.hash("password123"),
        });

        await expect(
            sut.execute({
                email,
                password: "wrong_password",

            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    })
})
```

## File: src/use-cases/authenticate.ts
```typescript
import { User } from "../entities/user";
import { UsersRepository } from "../repositories/users-repository";
import { Hasher } from "../cryptography/hasher";
import { InvalidCredentialsError } from "./errors/invalid-credential-errors";

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    user: User;
}

export class AuthenticateUseCase {
    private usersRepository: UsersRepository;
    private hasher: Hasher;

    constructor(usersRepository: UsersRepository, hasher: Hasher) {
        this.usersRepository = usersRepository;
        this.hasher = hasher
    }

    async execute({
        email,
        password
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatch = await this.hasher.compare(password, user.passwordHash);

        if (!doesPasswordMatch) {
            throw new InvalidCredentialsError();
        }

        return { user };
    }
}
```

## File: src/use-cases/create-dock.spec.ts
```typescript
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryDocksRepository } from "../repositories/in-memory/in-memory-docks-repository";
import { CreateDockUseCase } from "./create-dock";
import { DockAlreadyExistsError } from "./errors/dock-already-exists-error";

let docksRepo: InMemoryDocksRepository;
let sut: CreateDockUseCase;

describe("Create Dock Use Case", () => {
    beforeEach(() => {
        docksRepo = new InMemoryDocksRepository();
        sut = new CreateDockUseCase(docksRepo);
    });

    it('should be able to create a new dock', async () => {
        const { dock } = await sut.execute({
            code: 'DOCA-01',
            description: 'Doca principal de carga seca',
        })

        expect(dock.id).toEqual(expect.any(String));
        expect(dock.status).toEqual('AVAILABLE');
    });

    it('should not be able to create dock w/ existent code', async () => {
        await sut.execute({
            code: 'DOCA-01',
            description: 'Preexistent dock',
        });

        await expect(sut.execute({
            code: 'DOCA-01',
            description: 'New dock',
        })).rejects.toBeInstanceOf(DockAlreadyExistsError);
    })
})
```

## File: src/use-cases/create-dock.ts
```typescript
import { Dock, DockStatus } from "../entities/dock";
import { DocksRepository } from "../repositories/docks-repository";
import { DockAlreadyExistsError } from "./errors/dock-already-exists-error";

interface CreateDockUseCaseRequest {
    code: string,
    description?: string | null,
    status?: DockStatus
}

interface CreateDockUseCaseResponse {
    dock: Dock,
}

export class CreateDockUseCase {
    constructor(private docksRepo: DocksRepository) { }

    async execute({
        code,
        description,
        status,
    }: CreateDockUseCaseRequest): Promise<CreateDockUseCaseResponse> {
        const dockWithSameCode = await this.docksRepo.findByCode(code);

        if (dockWithSameCode) {
            throw new DockAlreadyExistsError();
        }

        const dock = await this.docksRepo.create({
            code,
            description,
            status,
        })

        return { dock };
    }
}
```

## File: src/use-cases/dispatch-shipment.spec.ts
```typescript
import { describe, it, beforeEach, expect } from "vitest"
import { InMemoryShipmentsRepository } from "../repositories/in-memory/in-memory-shipments-repository";
import { InMemoryDocksRepository } from "../repositories/in-memory/in-memory-docks-repository";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { DispatchShipmentUseCase } from "./dispatch-shipment";
import { ShipmentAlreadyDispatchedError } from "./errors/shipment-already-dispatched";

let shipmentsRepo: InMemoryShipmentsRepository;
let docksRepo: InMemoryDocksRepository;
let usersRepo: InMemoryUsersRepository;
let sut: DispatchShipmentUseCase;

describe('Dispatch Shipment Use Case', () => {
    beforeEach(() => {
        shipmentsRepo = new InMemoryShipmentsRepository();
        docksRepo = new InMemoryDocksRepository();
        usersRepo = new InMemoryUsersRepository();
        sut = new DispatchShipmentUseCase(shipmentsRepo, docksRepo);
    });

    it('should be able to dispatch a shipment correctly', async () => {
        const user = await usersRepo.create({
            email: "tzuzuri@gmail.com",
            name: "Suzuna Tzuzuri",
            passwordHash: "hashed-password"
        })

        const dock = await docksRepo.create({
            code: 'DOCA-01',
            description: 'Doca principal de carga seca',
            status: 'OCCUPIED',
        });

        const shipment = await shipmentsRepo.create({
            trackingCode: "000001",
            driverName: "Vivi",
            licensePlate: "ABC2026",
            origin: "Belem",
            destination: "Osaka",
            weightKg: 200,
            dockId: dock.id,
            operatorId: user.id,
        });

        await sut.execute({
            shipmentId: shipment.id,
        })

        expect(shipment.status).toEqual('IN_TRANSIT');
        expect(dock.status).toEqual('AVAILABLE');
    })

    it("It shouldn't be able to dispatch aleady dispatched shipment", async () => {
        const user = await usersRepo.create({
            email: "tzuzuri@gmail.com",
            name: "Suzuna Tzuzuri",
            passwordHash: "hashed-password"
        })

        const dock = await docksRepo.create({
            code: 'DOCA-01',
            description: 'Doca principal de carga seca',
        });

        const shipment = await shipmentsRepo.create({
            trackingCode: "000001",
            driverName: "Vivi",
            licensePlate: "ABC2026",
            origin: "Belem",
            destination: "Osaka",
            weightKg: 200,
            dockId: dock.id,
            operatorId: user.id,
            status: "IN_TRANSIT",
        });

        await expect(sut.execute({
            shipmentId: shipment.id
        })).rejects.toBeInstanceOf(ShipmentAlreadyDispatchedError);
    })
})
```

## File: src/use-cases/fetch-shipments.spec.ts
```typescript
import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryShipmentsRepository } from "../repositories/in-memory/in-memory-shipments-repository"
import { FetchShipmentsUseCase } from "./fetch-shipments";

let shipmentsRepo: InMemoryShipmentsRepository;
let sut: FetchShipmentsUseCase;

describe('Fetch Shipments Use Case', () => {
    beforeEach(() => {
        shipmentsRepo = new InMemoryShipmentsRepository();
        sut = new FetchShipmentsUseCase(shipmentsRepo);
    });

    it('should be able to fetch paginated shipments', async () => {
        for (let i = 1; i <= 15; i++) {
            await shipmentsRepo.create({
                trackingCode: `TRACK-${i}`,
                cargoType: "GENERAL",
                driverName: "John Guy",
                licensePlate: "ABC4030",
                origin: "Belém - BR",
                destination: "Hokkaido - JP",
                weightKg: 200,
                status: "IN_TRANSIT",
                operatorId: `operator-${i}`,
                dockId: `dock-${i}`,
            })
        }

        const { shipments } = await sut.execute({
            page: 2,
            perPage: 10,
        });

        expect(shipments).toHaveLength(5);
    });

    it('should be able to filter shipments by cargo type and status', async () => {
        await shipmentsRepo.create({
            trackingCode: "TR1",
            cargoType: "GENERAL",
            driverName: "John Guy",
            licensePlate: "ABC4030",
            origin: "Belém - BR",
            destination: "Hokkaido - JP",
            weightKg: 200,
            operatorId: `operator1`,
            dockId: `dock2`,
        });

        await shipmentsRepo.create({
            trackingCode: "TR2",
            cargoType: "REFRIGERATED",
            driverName: "Sopia",
            licensePlate: "ABC8888",
            origin: "São Paulo - BR",
            destination: "Paris - FR",
            weightKg: 800,
            status: "IN_TRANSIT",
            operatorId: `operator1`,
            dockId: `dock2`,
        });

        const { shipments } = await sut.execute({
            page: 1,
            perPage: 10,
            status: 'IN_TRANSIT',
            cargoType: 'REFRIGERATED',
        });

        expect(shipments).toHaveLength(1);
        expect(shipments[0].cargoType).toEqual('REFRIGERATED');
    });
});
```

## File: src/use-cases/get-user-profile.spec.ts
```typescript
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { GetUserProfileUseCase } from "./get-user-profile";
import { beforeEach, describe, expect, it } from "vitest"

let usersRepo: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
    beforeEach(() => {
        usersRepo = new InMemoryUsersRepository();
        sut = new GetUserProfileUseCase(usersRepo);
    });

    it('should be able to get user profile', async () => {
        const name = 'Achichi Mela';

        const createdUser = await usersRepo.create({
            name,
            email: 'mela@logitrack.com',
            passwordHash: "hashed-password",
        });

        const { user } = await sut.execute({
            userID: createdUser.id,
        });

        expect(user.name).toEqual(name);
    });

    it('should not be able to get user profile w/ wrong id', async () => {
        await expect(
            sut.execute({
                userID: "doesn't exit",
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
```

## File: src/use-cases/get-user-profile.ts
```typescript
import { User } from "../entities/user";
import { UsersRepository } from "../repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
    userID: string,
}

interface GetUserProfileUseCaseResponse {
    user: User,
}

export class GetUserProfileUseCase {
    constructor(private usersRepo: UsersRepository) { }

    async execute({
        userID,
    }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.usersRepo.findByID(userID);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        return { user };
    }
}
```

## File: src/use-cases/list-docs.spec.ts
```typescript
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryDocksRepository } from "../repositories/in-memory/in-memory-docks-repository";
import { ListDocksUseCase } from "./list-docs";

let docksRepo: InMemoryDocksRepository;
let sut: ListDocksUseCase;

describe("List Docks Use Case", () => {
    beforeEach(() => {
        docksRepo = new InMemoryDocksRepository();
        sut = new ListDocksUseCase(docksRepo);
    });

    it('should be able to list all docks', async () => {
        await docksRepo.create({ code: 'DOCA-01' });
        await docksRepo.create({ code: 'DOCA-02' });

        const { docks } = await sut.execute();

        expect(docks).toHaveLength(2);
        expect(docks).toEqual([
            expect.objectContaining({ code: 'DOCA-01' }),
            expect.objectContaining({ code: 'DOCA-02' }),
        ]);
    });
});
```

## File: src/use-cases/list-docs.ts
```typescript
import { Dock } from "../entities/dock";
import { DocksRepository } from "../repositories/docks-repository";

interface ListDocksUseCaseResponse {
    docks: Dock[],
}

export class ListDocksUseCase {
    constructor(private docksRepo: DocksRepository) { }

    async execute(): Promise<ListDocksUseCaseResponse> {
        const docks = await this.docksRepo.findMany();

        return { docks };
    }
}
```

## File: docker-compose.yml
```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: logitrack-pg
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: docker
      POSTGRES_PASSWORD: dockerpassword
      POSTGRES_DB: logitrack
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

## File: prisma.config.ts
```typescript
// This file was generated by Prisma and assumes you have installed the following:
// npm install --save-dev prisma dotenv
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

## File: src/entities/dock.ts
```typescript
export type DockStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';

export interface Dock {
    id: string,
    code: string,
    description: string | null,
    status: DockStatus,
    createdAt: Date,
}

export interface DockCreateInput {
    code: string;
    description?: string | null,
    status?: DockStatus;
}
```

## File: src/http/controllers/shipments/dispatch.ts
```typescript
import { FastifyReply, FastifyRequest } from "fastify";
import { makeDispatchShipmentUseCase } from "../../../use-cases/factories/make-dispatch-shipment-use-case";
import { z } from 'zod';
import { ShipmentAlreadyDispatchedError } from "../../../use-cases/errors/shipment-already-dispatched";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export async function dispatch(req: FastifyRequest, rep: FastifyReply) {
    const dispatchShipmentBodySchema = z.object({
        id: z.string().uuid(),
    })

    const { id: shipmentId } = dispatchShipmentBodySchema.parse(req.params);

    try {
        const dispatchShipmentUseCase = makeDispatchShipmentUseCase();

        const { shipment } = await dispatchShipmentUseCase.execute({
            shipmentId
        });

        return rep.status(200).send({ shipment });
    } catch (err) {

        if (err instanceof ResourceNotFoundError) {
            return rep.status(404).send({ message: err.message });
        }
        if (err instanceof ShipmentAlreadyDispatchedError) {
            return rep.status(409).send({ message: err.message });
        }

        throw err;
    }
}
```

## File: src/http/controllers/users/register.ts
```typescript
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'
import { makeRegisterUserUseCase } from "../../../use-cases/factories/make-register-use-case";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error";


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        role: z.enum(['ADMIN', 'OPERATOR']).optional(),
    });

    const { name, email, password, role } = registerBodySchema.parse(request.body);

    try {
        const registerUserUseCase = makeRegisterUserUseCase();

        await registerUserUseCase.execute({
            name,
            email,
            password,
            role,
        });
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }

        throw (err);
    }

    return reply.status(201).send();
}
```

## File: src/http/middlewares/verify-jwt.ts
```typescript
import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJwt(req: FastifyRequest, rep: FastifyReply) {
    try {
        await req.jwtVerify();
    } catch {
        return rep.status(401).send({ message: 'Unauthorized.' });
    }
}
```

## File: src/http/middlewares/verify-role.ts
```typescript
import { FastifyReply, FastifyRequest } from "fastify";
import { Role } from "../../entities/user";

export function verifyUserRole(roleToVerify: Role) {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        const role = req.user.role;

        if (role !== roleToVerify) {
            return rep.status(403).send({ message: 'Forbidden' });
        }
    }
}
```

## File: src/repositories/in-memory/in-memory-docks-repository.ts
```typescript
import { randomUUID } from "node:crypto";
import { Dock, DockCreateInput, DockStatus } from "../../entities/dock";
import { DocksRepository } from "../docks-repository";
import { DockNotFoundError } from "../../use-cases/errors/dock-not-found-error";

export class InMemoryDocksRepository implements DocksRepository {
    public items: Dock[] = [];

    async findById(id: string): Promise<Dock | null> {
        return this.items.find((item) => item.id === id) ?? null;
    }

    async findByCode(code: string): Promise<Dock | null> {
        return this.items.find((item) => item.code === code) ?? null;
    }

    async findMany(): Promise<Dock[]> {
        return this.items;
    }

    async create(data: DockCreateInput): Promise<Dock> {
        const dock: Dock = {
            id: randomUUID(),
            code: data.code,
            description: data.description ?? null,
            status: data.status ?? 'AVAILABLE',
            createdAt: new Date(),
        }

        this.items.push(dock);

        return dock;
    }

    async updateStatus(id: string, status: DockStatus): Promise<Dock> {
        const dockIndex = this.items.findIndex((item) => item.id === id);

        if (dockIndex === -1) {
            throw new DockNotFoundError();
        }

        this.items[dockIndex].status = status;

        return this.items[dockIndex];
    }
}
```

## File: src/repositories/prisma/prisma-docks-repository.ts
```typescript
import { Dock, DockCreateInput, DockStatus } from "../../entities/dock";
import { DocksRepository } from "../docks-repository";
import { prisma } from "../../lib/prisma";

export class PrismaDocksRepository implements DocksRepository {

    async findById(id: string): Promise<Dock | null> {
        return await prisma.dock.findUnique({ where: { id } });
    }

    async findByCode(code: string): Promise<Dock | null> {
        return await prisma.dock.findUnique({ where: { code } });
    }

    async findMany(): Promise<Dock[]> {
        return await prisma.dock.findMany({ orderBy: { code: 'asc' } })
    }

    async create(data: DockCreateInput): Promise<Dock> {
        return await prisma.dock.create({
            data,
        });
    }

    async updateStatus(id: string, status: DockStatus): Promise<Dock> {
        return await prisma.dock.update({
            where: { id },
            data: { status },
        });
    }
}
```

## File: src/repositories/prisma/prisma-shipments-repository.ts
```typescript
import { Shipment, ShipmentCreateInput } from "../../entities/shipment";
import { prisma } from "../../lib/prisma";
import { FetchShipmentsParams, ShipmentsRepository } from "../shipments-repository";

export class PrismaShipmentsRepository implements ShipmentsRepository {

    async findById(id: string): Promise<Shipment | null> {
        return await prisma.shipment.findUnique({ where: { id } });
    }

    async findByTrackingCode(trackingCode: string): Promise<Shipment | null> {
        return await prisma.shipment.findUnique({ where: { trackingCode } });
    }

    async findMany({ page, perPage, status, cargoType }: FetchShipmentsParams): Promise<Shipment[]> {
        return await prisma.shipment.findMany({
            where: {
                ...(status && { status }),
                ...(cargoType && { cargoType }),
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: perPage,
            skip: (page - 1) * perPage,
        });
    }

    async create(data: ShipmentCreateInput): Promise<Shipment> {
        return await prisma.shipment.create({ data });
    }

    async save(shipment: Shipment): Promise<Shipment> {
        return await prisma.shipment.update({
            where: { id: shipment.id },
            data: shipment,
        });
    }
}
```

## File: src/repositories/shipments-repository.ts
```typescript
import { CargoType, Shipment, ShipmentCreateInput, ShipmentStatus } from "../entities/shipment";

export interface ShipmentsRepository {
    findById(id: string): Promise<Shipment | null>;
    findByTrackingCode(trackingCode: string): Promise<Shipment | null>;
    findMany(params: FetchShipmentsParams): Promise<Shipment[]>;
    create(data: ShipmentCreateInput): Promise<Shipment>;
    save(shipment: Shipment): Promise<Shipment>;
}

export interface FetchShipmentsParams {
    page: number;
    perPage: number;
    status?: ShipmentStatus;
    cargoType?: CargoType;
}
```

## File: src/use-cases/factories/make-create-dock-use-case.ts
```typescript
import { PrismaDocksRepository } from "../../repositories/prisma/prisma-docks-repository";
import { CreateDockUseCase } from "../create-dock";

export function makeCreateDockUseCase(): CreateDockUseCase {
    const docksRepo = new PrismaDocksRepository;
    const createDockUseCase = new CreateDockUseCase(docksRepo);

    return createDockUseCase;
}
```

## File: src/use-cases/factories/make-create-shipment-use-case.ts
```typescript
import { PrismaDocksRepository } from "../../repositories/prisma/prisma-docks-repository";
import { PrismaShipmentsRepository } from "../../repositories/prisma/prisma-shipments-repository";
import { CreateShipmentUseCase } from "../create-shipment";

export function makeCreateShipmentUseCase(): CreateShipmentUseCase {
    const shipmentsRepo = new PrismaShipmentsRepository();
    const docksRepo = new PrismaDocksRepository();
    const createShipmentsUseCase = new CreateShipmentUseCase(shipmentsRepo, docksRepo);

    return createShipmentsUseCase;
}
```

## File: src/use-cases/factories/make-fetch-shipments-use-case.ts
```typescript
import { PrismaShipmentsRepository } from "../../repositories/prisma/prisma-shipments-repository";
import { FetchShipmentsUseCase } from "../fetch-shipments";

export function makeFetchShipmentsUseCase(): FetchShipmentsUseCase {
    const shipmentsRepo = new PrismaShipmentsRepository();
    const fetchShipmentsUseCase = new FetchShipmentsUseCase(shipmentsRepo);

    return fetchShipmentsUseCase;
}
```

## File: src/use-cases/factories/make-register-use-case.ts
```typescript
import { HasherBcrypt } from "../../cryptography/hasher-bcrypt";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { RegisterUserUseCase } from "../register-user";

export function makeRegisterUserUseCase(): RegisterUserUseCase {
    const usersRepository = new PrismaUsersRepository;
    const hasher = new HasherBcrypt;
    const registerUserUseCase = new RegisterUserUseCase(usersRepository, hasher);

    return registerUserUseCase;
}
```

## File: src/use-cases/create-shipment.ts
```typescript
import { CargoType, Shipment, ShipmentStatus } from "../entities/shipment";
import { DocksRepository } from "../repositories/docks-repository";
import { ShipmentsRepository } from "../repositories/shipments-repository";
import { DockUnavailableError } from "./errors/dock-unavailable-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ShipmentAlreadyExistsError } from "./errors/shipment-already-exists";

interface CreateShipmentUseCaseRequest {
    trackingCode: string;
    cargoType?: CargoType;
    driverName: string;
    licensePlate: string;
    origin: string;
    destination: string;
    weightKg: number;
    status?: ShipmentStatus;
    operatorId: string;
    dockId: string;
}

interface CreateShipmentUseCaseResponse {
    shipment: Shipment;
}

export class CreateShipmentUseCase {
    constructor(
        private shipmentsRepo: ShipmentsRepository,
        private docksRepo: DocksRepository,
    ) { }

    async execute({
        trackingCode,
        cargoType,
        driverName,
        licensePlate,
        origin,
        destination,
        weightKg,
        status,
        dockId,
        operatorId,
    }: CreateShipmentUseCaseRequest): Promise<CreateShipmentUseCaseResponse> {
        const existingShipment = await this.shipmentsRepo.findByTrackingCode(trackingCode);

        if (existingShipment) {
            throw new ShipmentAlreadyExistsError();
        }

        const dock = await this.docksRepo.findById(dockId);

        if (!dock) {
            throw new ResourceNotFoundError();
        }

        if (dock.status !== 'AVAILABLE') {
            throw new DockUnavailableError();
        }

        const shipment = await this.shipmentsRepo.create({
            trackingCode,
            cargoType,
            driverName,
            licensePlate,
            origin,
            destination,
            weightKg,
            status,
            dockId,
            operatorId,
        });

        await this.docksRepo.updateStatus(dock.id, 'OCCUPIED');

        return { shipment };
    }
}
```

## File: src/use-cases/dispatch-shipment.ts
```typescript
import { Shipment } from "../entities/shipment";
import { DocksRepository } from "../repositories/docks-repository";
import { ShipmentsRepository } from "../repositories/shipments-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ShipmentAlreadyDispatchedError } from "./errors/shipment-already-dispatched";

interface DispatchShipmentUseCaseRequest {
    shipmentId: string;
}

interface DispatchShipmentUseCaseResponse {
    shipment: Shipment;
}

export class DispatchShipmentUseCase {
    constructor(
        private shipmentsRepo: ShipmentsRepository,
        private docksRepo: DocksRepository,
    ) { }

    async execute({ shipmentId }: DispatchShipmentUseCaseRequest): Promise<DispatchShipmentUseCaseResponse> {
        const shipment = await this.shipmentsRepo.findById(shipmentId);

        if (!shipment) {
            throw new ResourceNotFoundError();
        }

        if (shipment.status === 'IN_TRANSIT') {
            throw new ShipmentAlreadyDispatchedError();
        }

        shipment.status = 'IN_TRANSIT';

        await this.shipmentsRepo.save(shipment);

        if (shipment.dockId) {
            await this.docksRepo.updateStatus(shipment.dockId, 'AVAILABLE');
        }

        return { shipment };
    }
}
```

## File: src/use-cases/fetch-shipments.ts
```typescript
import { CargoType, Shipment, ShipmentStatus } from "../entities/shipment";
import { ShipmentsRepository } from "../repositories/shipments-repository";

interface FetchShipmentsUseCaseRequest {
    page: number,
    perPage: number,
    status?: ShipmentStatus,
    cargoType?: CargoType,
}

interface FetchShipmentsUseCaseResponse {
    shipments: Shipment[],
}

export class FetchShipmentsUseCase {
    constructor(
        private shipmentsRepo: ShipmentsRepository
    ) { }

    async execute({
        page,
        perPage,
        status,
        cargoType,
    }: FetchShipmentsUseCaseRequest): Promise<FetchShipmentsUseCaseResponse> {
        const shipments = await this.shipmentsRepo.findMany({
            page,
            perPage,
            status,
            cargoType,
        });

        return { shipments };
    }
}
```

## File: src/use-cases/register-user.spec.ts
```typescript
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository.js";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js";
import { RegisterUserUseCase } from "./register-user.js";
import { HasherBcrypt } from "../cryptography/hasher-bcrypt.js";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUserUseCase;
const hasher = new HasherBcrypt()

describe("Register User Use Case", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new RegisterUserUseCase(usersRepository, hasher);
    });

    it("should be able to register a new user", async () => {
        const { user } = await sut.execute({
            name: "Suzuna Tzuzuhi",
            email: "tzuzuhi@gmail.com",
            password: "password123",
        });

        expect(user.id).toEqual(expect.any(String));
        expect(user.role).toEqual("OPERATOR");
    });

    it("should hash user password upon registration", async () => {
        const password = "password123";

        const { user } = await sut.execute({
            name: "Suzuna Tzuzuhi",
            email: "tzuzuhi@gmail.com",
            password,
        });

        const isPasswordCorrectlyHashed = await hasher.compare(
            password,
            user.passwordHash,
        );

        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it("should not be able to register with same email twice", async () => {
        const email = "tzuzuhi@gmail.com";
        const name = "Suzuna Tzuzuhi";
        const password = "password123";

        await sut.execute({
            name,
            email,
            password,
        });

        await expect(
            sut.execute({
                name,
                email,
                password,
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});
```

## File: .gitignore
```
node_modules/
dist/
.env

/src/generated/prisma
```

## File: tsconfig.json
```json
{
    "compilerOptions": {
        "target": "ES2023",
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "rootDir": "./src",
        "outDir": "./dist",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    },
    "include": [
        "src/**/*"
    ]
}
```

## File: requests/shipments.hurl
```
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
```

## File: src/entities/shipment.ts
```typescript
export type ShipmentStatus = 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELED';

export type CargoType = 'GENERAL' | 'REFRIGERATED' | 'HAZARDOUS' | 'FRAGILE' | 'BULK';

export interface Shipment {
    id: string;
    trackingCode: string;
    cargoType: CargoType;
    driverName: string;
    licensePlate: string;
    origin: string;
    destination: string;
    weightKg: number;
    status: ShipmentStatus;
    createdAt: Date;
    updatedAt: Date;
    operatorId: string;
    dockId: string | null;
}

export interface ShipmentCreateInput {
    trackingCode: string;
    cargoType?: CargoType;
    driverName: string;
    licensePlate: string;
    origin: string;
    destination: string;
    weightKg: number;
    status?: ShipmentStatus;
    operatorId: string;
    dockId: string;
}
```

## File: src/env/index.ts
```typescript
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(6),
});

const _env = envSchema.safeParse(process.env);

if (_env.success == false) {
    console.error("Invalid enviroment variables:", z.treeifyError(_env.error));
    throw new Error("Invalid enviroment variables.");
}

export const env = _env.data;
```

## File: src/http/controllers/shipments/routes.ts
```typescript
import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-role";
import { create } from "./create";
import { fetch } from "./fetch";
import { dispatch } from "./dispatch";

export async function shipmentsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt);

    app.post('/shipments', create);
    app.get('/shipments', fetch);
    app.patch('/shipments/:id/dispatch', dispatch)
}
```

## File: src/http/controllers/users/routes.ts
```typescript
import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJwt } from "../../middlewares/verify-jwt";

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/sessions', authenticate)

    app.get('/me', { onRequest: verifyJwt }, profile)
}
```

## File: src/lib/prisma.ts
```typescript
import { PrismaClient } from "@prisma/client";
import { env } from "../env/index";

export const prisma = new PrismaClient({
    log: env.NODE_ENV === "dev" ? ["query"] : [],
});
```

## File: src/repositories/in-memory/in-memory-shipments-repository.ts
```typescript
import { randomUUID } from "node:crypto";
import { Shipment, ShipmentCreateInput } from "../../entities/shipment";
import { FetchShipmentsParams, ShipmentsRepository } from "../shipments-repository";
import { DockNotFoundError } from "../../use-cases/errors/dock-not-found-error";

export class InMemoryShipmentsRepository implements ShipmentsRepository {
    public items: Shipment[] = [];

    async findById(id: string): Promise<Shipment | null> {
        return await this.items.find((item) => item.id === id) ?? null;
    }

    async findByTrackingCode(trackingCode: string): Promise<Shipment | null> {
        return await this.items.find((item) => item.trackingCode === trackingCode) ?? null;
    }

    async findMany({
        page,
        perPage,
        status,
        cargoType,
    }: FetchShipmentsParams): Promise<Shipment[]> {
        return this.items
            .filter((item) => {
                if (status && item.status !== status) return false;
                if (cargoType && item.cargoType !== cargoType) return false;
                return true
            })
            .toSorted((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice((page - 1) * perPage);
    }

    async create(data: ShipmentCreateInput): Promise<Shipment> {
        const shipment: Shipment = {
            id: randomUUID(),
            trackingCode: data.trackingCode,
            cargoType: data.cargoType ?? "GENERAL",
            driverName: data.driverName,
            licensePlate: data.licensePlate,
            origin: data.origin,
            destination: data.destination,
            weightKg: data.weightKg,
            status: data.status ?? 'PENDING',
            createdAt: new Date(),
            updatedAt: new Date(),
            operatorId: data.operatorId,
            dockId: data.dockId,
        }

        this.items.push(shipment);

        return shipment;
    }

    async save(shipment: Shipment): Promise<Shipment> {
        const index = this.items.findIndex((item) => item.id === shipment.id);

        if (index === -1) {
            throw new DockNotFoundError();
        }

        this.items[index] = shipment;

        return this.items[index];
    }
}
```

## File: src/repositories/prisma/prisma-users-repository.ts
```typescript
import { User, UserCreateInput } from "../../entities/user";
import { prisma } from "../../lib/prisma";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        return user;
    }

    async create(data: UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data,
        });

        return user;
    }

    async findByID(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id: id },
        });

        return user;
    }
}
```

## File: src/repositories/docks-repository.ts
```typescript
import { Dock, DockCreateInput, DockStatus } from "../entities/dock";

export interface DocksRepository {
    findById(id: string): Promise<Dock | null>;
    findByCode(code: string): Promise<Dock | null>
    findMany(): Promise<Dock[]>;
    create(data: DockCreateInput): Promise<Dock>;
    updateStatus(id: string, status: DockStatus): Promise<Dock>;
}
```

## File: src/repositories/users-repository.ts
```typescript
import { User, UserCreateInput } from "../entities/user";

export interface UsersRepository {
    findByID(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>;
    create(data: UserCreateInput): Promise<User>;
}
```

## File: src/use-cases/create-shipment.spec.ts
```typescript
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryDocksRepository } from "../repositories/in-memory/in-memory-docks-repository";
import { InMemoryShipmentsRepository } from "../repositories/in-memory/in-memory-shipments-repository"
import { CreateShipmentUseCase } from "./create-shipment";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { ShipmentAlreadyExistsError } from "./errors/shipment-already-exists";
import { DockUnavailableError } from "./errors/dock-unavailable-error";

let shipmentsRepo: InMemoryShipmentsRepository;
let docksRepo: InMemoryDocksRepository;
let usersRepo: InMemoryUsersRepository;
let sut: CreateShipmentUseCase;

describe("Create Shipment Use Case", () => {
    beforeEach(() => {
        shipmentsRepo = new InMemoryShipmentsRepository();
        docksRepo = new InMemoryDocksRepository();
        usersRepo = new InMemoryUsersRepository();
        sut = new CreateShipmentUseCase(shipmentsRepo, docksRepo);
    });

    it("should be able to create a new shipment", async () => {
        const user = await usersRepo.create({
            email: "tzuzuri@gmail.com",
            name: "Suzuna Tzuzuri",
            passwordHash: "hashed-password"
        })

        const dock = await docksRepo.create({
            code: 'DOCA-01',
            description: 'Doca principal de carga seca',
        });

        const { shipment } = await sut.execute({
            trackingCode: "000001",
            driverName: "Vivi",
            licensePlate: "ABC2026",
            origin: "Belem",
            destination: "Osaka",
            weightKg: 200,
            dockId: dock.id,
            operatorId: user.id,
        });

        expect(shipment.id).toEqual(expect.any(String));
        expect(shipment.status).toEqual("PENDING");
        expect(shipment.cargoType).toEqual("GENERAL");

        expect(dock.status).toEqual('OCCUPIED');
    })


    it('should not be able to create shipment w/ existent code', async () => {
        const user = await usersRepo.create({
            email: "tzuzuri@gmail.com",
            name: "Suzuna Tzuzuri",
            passwordHash: "hashed-password"
        })

        const dock1 = await docksRepo.create({
            code: 'DOCA-01',
            description: 'Doca principal de carga seca',
        });

        const dock2 = await docksRepo.create({
            code: 'DOCA-02',
            description: 'Doca secundária de carga seca',
        });

        await sut.execute({
            trackingCode: "000001",
            driverName: "Vivi",
            licensePlate: "ABC2026",
            origin: "Belem",
            destination: "Osaka",
            weightKg: 200,
            dockId: dock1.id,
            operatorId: user.id,
        });

        await expect(sut.execute({
            trackingCode: "000001",
            driverName: "Pekora",
            licensePlate: "ABH7696",
            origin: "New York",
            destination: "Dallas",
            weightKg: 132,
            dockId: dock2.id,
            operatorId: user.id,
        })).rejects.toBeInstanceOf(ShipmentAlreadyExistsError);
    });

    it('should not be able to create shipment w/ occupied dock', async () => {
        const user = await usersRepo.create({
            email: "tzuzuri@gmail.com",
            name: "Suzuna Tzuzuri",
            passwordHash: "hashed-password"
        })

        const dock = await docksRepo.create({
            code: 'DOCA-01',
            description: 'Doca principal de carga seca',
            status: 'OCCUPIED',
        });

        await expect(sut.execute({
            trackingCode: "000001",
            driverName: "Vivi",
            licensePlate: "ABC2026",
            origin: "Belem",
            destination: "Osaka",
            weightKg: 200,
            dockId: dock.id,
            operatorId: user.id,
        })).rejects.toBeInstanceOf(DockUnavailableError);
    })

    it('should not be able to create shipment w/ in-maintenance dock', async () => {
        const user = await usersRepo.create({
            email: "tzuzuri@gmail.com",
            name: "Suzuna Tzuzuri",
            passwordHash: "hashed-password"
        })

        const dock = await docksRepo.create({
            code: 'DOCA-01',
            description: 'Doca principal de carga seca',
            status: 'MAINTENANCE',
        });

        await expect(sut.execute({
            trackingCode: "000001",
            driverName: "Vivi",
            licensePlate: "ABC2026",
            origin: "Belem",
            destination: "Osaka",
            weightKg: 200,
            dockId: dock.id,
            operatorId: user.id,
        })).rejects.toBeInstanceOf(DockUnavailableError);
    })
});
```

## File: src/use-cases/register-user.ts
```typescript
import { User, Role } from "../entities/user";
import { Hasher } from "../cryptography/hasher";
import { UsersRepository } from "../repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUserUseCaseRequest {
    name: string;
    email: string;
    password: string;
    role?: Role;
}

interface RegisterUserUseCaseResponse {
    user: User;
}

export class RegisterUserUseCase {
    private usersRepository: UsersRepository;
    private hasher: Hasher;

    constructor(usersRepository: UsersRepository, hasher: Hasher) {
        this.usersRepository = usersRepository;
        this.hasher = hasher
    }

    async execute({
        name,
        email,
        password,
        role,
    }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        const passwordHash = await this.hasher.hash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            passwordHash,
            role,
        });

        return { user };
    }
}
```

## File: prisma/schema.prisma
```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
  // output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  OPERATOR
}

enum DockStatus {
  AVAILABLE
  OCCUPIED
  MAINTENANCE
}

enum ShipmentStatus {
  PENDING
  IN_TRANSIT
  DELIVERED
  CANCELED
}

enum CargoType {
  GENERAL
  REFRIGERATED
  HAZARDOUS
  FRAGILE
  BULK
}

model User {
  id           String @id @default(uuid())
  name         String
  email        String @unique
  passwordHash String @map("password_hash")
  role         Role @default(OPERATOR)
  createdAt    DateTime @default(now()) @map("created_at")

  shipments Shipment[]

  @@map("users")
}

model Dock {
  id          String     @id @default(uuid())
  code        String     @unique
  description String?
  status      DockStatus @default(AVAILABLE)
  createdAt   DateTime   @default(now()) @map("created_at")

  shipments Shipment[]

  @@map("docks")
}

model Shipment {
  id           String         @id @default(uuid())
  trackingCode String         @unique @map("tracking_code")
  cargoType    CargoType      @default(GENERAL) @map("cargo_type")
  driverName   String         @map("driver_name")
  licensePlate String         @map("license_plate")
  origin       String
  destination  String
  weightKg     Float          @map("weight_kg")
  status       ShipmentStatus @default(PENDING)
  createdAt    DateTime       @default(now()) @map("created_at")
  updatedAt    DateTime       @updatedAt @map("updated_at")

  operatorId String @map("operator_id")
  operator   User   @relation(fields: [operatorId], references: [id])

  dockId String? @map("dock_id")
  dock   Dock?   @relation(fields: [dockId], references: [id])

  @@map("shipments")
}
```

## File: src/repositories/in-memory/in-memory-users-repository.ts
```typescript
import { User, UserCreateInput } from "../../entities/user";
import { randomUUID } from "node:crypto";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = [];

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find((item) => item.email === email);
        return user ?? null;
    }

    async create(data: UserCreateInput): Promise<User> {
        const user: User = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            passwordHash: data.passwordHash,
            role: data.role ?? "OPERATOR",
            createdAt: new Date(),
        };

        this.items.push(user);
        return user;
    }

    async findByID(id: string): Promise<User | null> {
        const user = this.items.find((item) => item.id === id);

        if (!user) {
            return null;
        }

        return user;
    }
}
```

## File: src/server.ts
```typescript
import { app } from "./app";
import { env } from "./env/index";

const start = async () => {
    try {
        console.log(`🚀 Server running on http://localhost:${env.PORT}`);
        await app.listen({ port: env.PORT, host: "0.0.0.0" });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
```

## File: src/app.ts
```typescript
import Fastify from "fastify";
import { env } from "./env/index";
import { usersRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import { docksRoutes } from "./http/controllers/docks/routes";
import { shipmentsRoutes } from "./http/controllers/shipments/routes";

export const app = Fastify({
    logger: env.NODE_ENV === "dev",
});

app.get("/health", async () => {
    return { status: "ok", timestamp: new Date().toISOString() };
});

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
});

app.register(usersRoutes);
app.register(docksRoutes);
app.register(shipmentsRoutes);

app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: error.message,
            issues: error.format(),
        });
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    } else {
        // in production log tool in the future
    }

    return reply.status(500).send({ message: 'Internal server error.' })
})
```

## File: package.json
```json
{
    "name": "logitrack-api",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "dev": "tsx watch src/server.ts",
        "build": "tsc",
        "start": "node dist/server.js",
        "test": "vitest run",
        "test:watch": "vitest"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "type": "commonjs",
    "dependencies": {
        "@fastify/jwt": "^10.2.8",
        "@prisma/client": "^6.19.3",
        "bcryptjs": "^3.0.3",
        "dotenv": "^18.0.10",
        "fastify": "^5.12.8",
        "zod": "^4.6.7"
    },
    "devDependencies": {
        "@types/bcryptjs": "^2.4.6",
        "@types/node": "^26.6.6",
        "prisma": "^6.19.3",
        "tsx": "^4.23.15",
        "typescript": "^7.0.2",
        "vitest": "^5.1.1"
    }
}
```
