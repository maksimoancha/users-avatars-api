import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AvatarModule } from './avatar/avatar.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    AvatarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
