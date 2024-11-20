import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: false,
        logging: false,
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
        migrations: [__dirname + '/migrations/*{.js, .ts}'],
        subscribers: [],
        parseInt8: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
})
export class AppModule {}
