"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const httpPort = process.env.PORT || 3000;
    await app.listen(httpPort);
    console.log(`HTTP server is running on port ${httpPort}`);
    await app.startAllMicroservices();
    console.log('NATS microservice is running');
}
bootstrap();
//# sourceMappingURL=main.js.map