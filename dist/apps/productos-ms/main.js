/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/productos-ms/src/entities/product.entity.ts":
/*!**********************************************************!*\
  !*** ./apps/productos-ms/src/entities/product.entity.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Product = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const reservation_entity_1 = __webpack_require__(/*! ./reservation.entity */ "./apps/productos-ms/src/entities/reservation.entity.ts");
let Product = class Product {
    id;
    name;
    price;
    stock;
    reservedStock;
    createdAt;
    reservations;
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "reservedStock", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_entity_1.Reservation, reservation => reservation.product),
    __metadata("design:type", Array)
], Product.prototype, "reservations", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products_table')
], Product);


/***/ }),

/***/ "./apps/productos-ms/src/entities/reservation.entity.ts":
/*!**************************************************************!*\
  !*** ./apps/productos-ms/src/entities/reservation.entity.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Reservation = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const product_entity_1 = __webpack_require__(/*! ./product.entity */ "./apps/productos-ms/src/entities/product.entity.ts");
let Reservation = class Reservation {
    id;
    productId;
    product;
    userId;
    quantity;
    createdAt;
};
exports.Reservation = Reservation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Reservation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Reservation.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.reservations),
    __metadata("design:type", typeof (_a = typeof product_entity_1.Product !== "undefined" && product_entity_1.Product) === "function" ? _a : Object)
], Reservation.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Reservation.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Reservation.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Reservation.prototype, "createdAt", void 0);
exports.Reservation = Reservation = __decorate([
    (0, typeorm_1.Entity)('product_reservations')
], Reservation);


/***/ }),

/***/ "./apps/productos-ms/src/main.ts":
/*!***************************************!*\
  !*** ./apps/productos-ms/src/main.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const productos_ms_module_1 = __webpack_require__(/*! ./productos-ms.module */ "./apps/productos-ms/src/productos-ms.module.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
dotenv.config();
const logger = new common_1.Logger('ProductsMicroservice');
async function bootstrap() {
    const port = parseInt(process.env.MS_PRODUCTS_PORT ?? '3002', 10);
    const app = await core_1.NestFactory.createMicroservice(productos_ms_module_1.ProductosMsModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: port,
        },
    });
    await app.listen();
    logger.log(`[Nest] ${process.pid}  - ${new Date().toLocaleString('es-CL')}     LOG [NestMicroservice] Nest microservice successfully started +1ms`);
    logger.log(`Microservicio de Productos corriendo en: tcp://0.0.0.0:${port}`);
    logger.log(`No typescript errors found.`);
}
bootstrap();


/***/ }),

/***/ "./apps/productos-ms/src/productos-ms.controller.ts":
/*!**********************************************************!*\
  !*** ./apps/productos-ms/src/productos-ms.controller.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductosMsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const productos_ms_service_1 = __webpack_require__(/*! ./productos-ms.service */ "./apps/productos-ms/src/productos-ms.service.ts");
let ProductosMsController = class ProductosMsController {
    productosMsService;
    constructor(productosMsService) {
        this.productosMsService = productosMsService;
    }
    healthCheck() {
        return this.productosMsService.getHello();
    }
};
exports.ProductosMsController = ProductosMsController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'health_check' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], ProductosMsController.prototype, "healthCheck", null);
exports.ProductosMsController = ProductosMsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof productos_ms_service_1.ProductosMsService !== "undefined" && productos_ms_service_1.ProductosMsService) === "function" ? _a : Object])
], ProductosMsController);


/***/ }),

/***/ "./apps/productos-ms/src/productos-ms.module.ts":
/*!******************************************************!*\
  !*** ./apps/productos-ms/src/productos-ms.module.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductosMsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const schedule_1 = __webpack_require__(/*! @nestjs/schedule */ "@nestjs/schedule");
const products_module_1 = __webpack_require__(/*! ./products/products.module */ "./apps/productos-ms/src/products/products.module.ts");
const productos_ms_controller_1 = __webpack_require__(/*! ./productos-ms.controller */ "./apps/productos-ms/src/productos-ms.controller.ts");
const productos_ms_service_1 = __webpack_require__(/*! ./productos-ms.service */ "./apps/productos-ms/src/productos-ms.service.ts");
let ProductosMsModule = class ProductosMsModule {
};
exports.ProductosMsModule = ProductosMsModule;
exports.ProductosMsModule = ProductosMsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 3306),
                    username: configService.get('DB_USERNAME', 'root'),
                    password: configService.get('DB_PASSWORD', ''),
                    database: configService.get('DB_DATABASE', 'productos_db'),
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: configService.get('DB_SYNC', 'true') === 'true',
                    logging: false,
                }),
            }),
            schedule_1.ScheduleModule.forRoot(),
            products_module_1.ProductsModule,
        ],
        controllers: [productos_ms_controller_1.ProductosMsController],
        providers: [productos_ms_service_1.ProductosMsService],
    })
], ProductosMsModule);


/***/ }),

/***/ "./apps/productos-ms/src/productos-ms.service.ts":
/*!*******************************************************!*\
  !*** ./apps/productos-ms/src/productos-ms.service.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductosMsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let ProductosMsService = class ProductosMsService {
    getHello() {
        return 'Productos Microservice is running!';
    }
};
exports.ProductosMsService = ProductosMsService;
exports.ProductosMsService = ProductosMsService = __decorate([
    (0, common_1.Injectable)()
], ProductosMsService);


/***/ }),

/***/ "./apps/productos-ms/src/products/products.controller.ts":
/*!***************************************************************!*\
  !*** ./apps/productos-ms/src/products/products.controller.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const products_service_1 = __webpack_require__(/*! ./products.service */ "./apps/productos-ms/src/products/products.service.ts");
const create_product_dto_1 = __webpack_require__(/*! ../../../../libs/common/src/dtos/create-product.dto */ "./libs/common/src/dtos/create-product.dto.ts");
const purchase_items_dto_1 = __webpack_require__(/*! ../../../../libs/common/src/dtos/purchase-items.dto */ "./libs/common/src/dtos/purchase-items.dto.ts");
let ProductsController = class ProductsController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    create(dto) {
        return this.productsService.create(dto);
    }
    findAll() {
        return this.productsService.findAll();
    }
    getByIds(ids) {
        return this.productsService.getProductsByIds(ids);
    }
    createReservation(dto) {
        return this.productsService.createReservation(dto);
    }
    confirmPurchase(dto) {
        return this.productsService.confirmPurchase(dto.items);
    }
    cancelReservation(reservationId) {
        return this.productsService.cancelReservation(reservationId);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_product' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_product_dto_1.CreateProductDto !== "undefined" && create_product_dto_1.CreateProductDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_all_products' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_products_by_ids' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getByIds", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_reservation' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_product_dto_1.ReservationDto !== "undefined" && create_product_dto_1.ReservationDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "createReservation", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'confirm_purchase' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof purchase_items_dto_1.PurchaseItemsDto !== "undefined" && purchase_items_dto_1.PurchaseItemsDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "confirmPurchase", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'cancel_reservation' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "cancelReservation", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _a : Object])
], ProductsController);


/***/ }),

/***/ "./apps/productos-ms/src/products/products.module.ts":
/*!***********************************************************!*\
  !*** ./apps/productos-ms/src/products/products.module.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const products_controller_1 = __webpack_require__(/*! ./products.controller */ "./apps/productos-ms/src/products/products.controller.ts");
const products_service_1 = __webpack_require__(/*! ./products.service */ "./apps/productos-ms/src/products/products.service.ts");
const product_entity_1 = __webpack_require__(/*! ../entities/product.entity */ "./apps/productos-ms/src/entities/product.entity.ts");
const reservation_entity_1 = __webpack_require__(/*! ../entities/reservation.entity */ "./apps/productos-ms/src/entities/reservation.entity.ts");
const tasks_service_1 = __webpack_require__(/*! ../tasks/tasks.service */ "./apps/productos-ms/src/tasks/tasks.service.ts");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, reservation_entity_1.Reservation]),
        ],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService, tasks_service_1.TasksService],
        exports: [products_service_1.ProductsService]
    })
], ProductsModule);


/***/ }),

/***/ "./apps/productos-ms/src/products/products.service.ts":
/*!************************************************************!*\
  !*** ./apps/productos-ms/src/products/products.service.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const product_entity_1 = __webpack_require__(/*! ../entities/product.entity */ "./apps/productos-ms/src/entities/product.entity.ts");
const reservation_entity_1 = __webpack_require__(/*! ../entities/reservation.entity */ "./apps/productos-ms/src/entities/reservation.entity.ts");
let ProductsService = class ProductsService {
    productRepository;
    reservationRepository;
    dataSource;
    constructor(productRepository, reservationRepository, dataSource) {
        this.productRepository = productRepository;
        this.reservationRepository = reservationRepository;
        this.dataSource = dataSource;
    }
    async create(dto) {
        const newProduct = this.productRepository.create(dto);
        return this.productRepository.save(newProduct);
    }
    async findAll() {
        return this.productRepository.find();
    }
    async getProductsByIds(ids) {
        return this.productRepository.findBy({
            id: (0, typeorm_2.In)(ids)
        });
    }
    async createReservation(dto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const { productId, userId, quantity } = dto;
            const product = await queryRunner.manager.findOne(product_entity_1.Product, {
                where: { id: productId }
            });
            if (!product) {
                throw new common_1.NotFoundException(`Product with ID ${productId} not found.`);
            }
            if (product.stock - product.reservedStock < quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for product ${productId}. Available: ${product.stock - product.reservedStock}`);
            }
            const newReservation = queryRunner.manager.create(reservation_entity_1.Reservation, {
                productId,
                userId,
                quantity,
            });
            await queryRunner.manager.save(newReservation);
            await queryRunner.manager.increment(product_entity_1.Product, { id: productId }, 'reservedStock', quantity);
            await queryRunner.commitTransaction();
            return newReservation;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(`Reservation failed: ${error.message}`);
        }
        finally {
            await queryRunner.release();
        }
    }
    async cancelReservation(reservationId) {
        const reservation = await this.reservationRepository.findOne({
            where: { id: reservationId }
        });
        if (!reservation) {
            return;
        }
        const { productId, quantity } = reservation;
        await this.dataSource.transaction(async (manager) => {
            await manager.decrement(product_entity_1.Product, { id: productId }, 'reservedStock', quantity);
            await manager.delete(reservation_entity_1.Reservation, reservationId);
        });
    }
    async confirmPurchase(items) {
        return this.dataSource.transaction(async (manager) => {
            const results = [];
            for (const item of items) {
                const product = await manager.findOne(product_entity_1.Product, {
                    where: { id: item.productId }
                });
                if (!product) {
                    throw new common_1.NotFoundException(`Product with ID ${item.productId} not found.`);
                }
                if (product.stock < item.quantity) {
                    throw new common_1.BadRequestException(`Insufficient stock for product ${item.productId}. Available: ${product.stock}, Requested: ${item.quantity}`);
                }
                if (product.reservedStock < item.quantity) {
                    throw new common_1.BadRequestException(`Reserved stock mismatch for product ${item.productId}. Reserved: ${product.reservedStock}, Requested: ${item.quantity}`);
                }
                const result = await manager.update(product_entity_1.Product, { id: item.productId }, {
                    stock: () => `stock - ${item.quantity}`,
                    reservedStock: () => `reservedStock - ${item.quantity}`,
                });
                results.push(result);
            }
            return results;
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _c : Object])
], ProductsService);


/***/ }),

/***/ "./apps/productos-ms/src/tasks/tasks.service.ts":
/*!******************************************************!*\
  !*** ./apps/productos-ms/src/tasks/tasks.service.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TasksService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TasksService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const schedule_1 = __webpack_require__(/*! @nestjs/schedule */ "@nestjs/schedule");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const reservation_entity_1 = __webpack_require__(/*! ../entities/reservation.entity */ "./apps/productos-ms/src/entities/reservation.entity.ts");
const product_entity_1 = __webpack_require__(/*! ../entities/product.entity */ "./apps/productos-ms/src/entities/product.entity.ts");
let TasksService = TasksService_1 = class TasksService {
    resRepo;
    prodRepo;
    dataSource;
    logger = new common_1.Logger(TasksService_1.name);
    constructor(resRepo, prodRepo, dataSource) {
        this.resRepo = resRepo;
        this.prodRepo = prodRepo;
        this.dataSource = dataSource;
    }
    async handleCron() {
        this.logger.log('TASK: Buscando y limpiando reservas vencidas...');
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        const expiredReservations = await this.resRepo.find({
            where: {
                createdAt: (0, typeorm_2.LessThan)(threeDaysAgo)
            }
        });
        if (expiredReservations.length === 0) {
            this.logger.log('No se encontraron reservas vencidas.');
            return;
        }
        this.logger.warn(`Liberando stock y eliminando ${expiredReservations.length} reservas vencidas.`);
        await this.dataSource.transaction(async (manager) => {
            for (const res of expiredReservations) {
                const productId = res.productId;
                const quantity = res.quantity;
                await manager.decrement(product_entity_1.Product, { id: productId }, 'reservedStock', quantity);
                await manager.delete(reservation_entity_1.Reservation, res.id);
            }
        });
        this.logger.log('Limpieza de reservas finalizada.');
    }
};
exports.TasksService = TasksService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_6_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksService.prototype, "handleCron", null);
exports.TasksService = TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _c : Object])
], TasksService);


/***/ }),

/***/ "./libs/common/src/dtos/create-product.dto.ts":
/*!****************************************************!*\
  !*** ./libs/common/src/dtos/create-product.dto.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservationDto = exports.CreateProductDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateProductDto {
    name;
    price;
    stock;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
class ReservationDto {
    productId;
    userId;
    quantity;
}
exports.ReservationDto = ReservationDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ReservationDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ReservationDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ReservationDto.prototype, "quantity", void 0);


/***/ }),

/***/ "./libs/common/src/dtos/purchase-items.dto.ts":
/*!****************************************************!*\
  !*** ./libs/common/src/dtos/purchase-items.dto.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PurchaseItemsDto = exports.PurchaseItemDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class PurchaseItemDto {
    productId;
    quantity;
}
exports.PurchaseItemDto = PurchaseItemDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], PurchaseItemDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], PurchaseItemDto.prototype, "quantity", void 0);
class PurchaseItemsDto {
    items;
}
exports.PurchaseItemsDto = PurchaseItemsDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PurchaseItemDto),
    __metadata("design:type", Array)
], PurchaseItemsDto.prototype, "items", void 0);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/schedule":
/*!***********************************!*\
  !*** external "@nestjs/schedule" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/productos-ms/src/main.ts");
/******/ 	
/******/ })()
;