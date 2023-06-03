import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CostsService } from './costs.service';
import { CostsController } from './costs.controller';
import { Cost, CostsSchema } from '../schemas/costs.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cost.name, schema: CostsSchema }]),
    AuthModule,
  ],
  providers: [CostsService],
  controllers: [CostsController],
})
export class CostsModule {}
