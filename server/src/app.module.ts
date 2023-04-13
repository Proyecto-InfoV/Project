import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoUsuariosModule } from './tipo_usuarios/tipo_usuarios.module';



@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    database: 'sh_db',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'liceedu12',
    autoLoadEntities: true,
    synchronize: true,
  }),
  UsuariosModule,
  TipoUsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
