import { Module } from '@nestjs/common';
// controllers
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
// Services
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
// Modules
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [CustomersController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
