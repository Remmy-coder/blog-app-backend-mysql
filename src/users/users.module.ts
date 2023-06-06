import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SerializedUser, User } from './entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/roles/guards/roles.guard';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, SerializedUser])],
  controllers: [UsersController],
  providers: [UsersService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class UsersModule {}
