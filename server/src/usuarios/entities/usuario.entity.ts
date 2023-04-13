import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TipoUsuario } from 'src/tipo_usuarios/entities/tipo_usuario.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';



@Entity('usuario')//Aqui se coloca el nombre que tendrá la tabla en la bd
@ObjectType()
export class Usuario {

  //Aqui colocarán todos los atributos de la tabla 'usuario'

   @PrimaryGeneratedColumn()//Genera el id automáticamente
   @Field()
   id: number;

   @Column()
   @Field((type) => String)
   nombre: string;

   @Column()
   @Field((type) => String)
   apPaterno: string;
   
   @Column()
   @Field((type) => String, {nullable: true})
   apMaterno?: string;
 
   @Column()
   @Field((type) => String)
   fech_nacimiento: string;
 
   @Column()
   @Field((type) => String)
   numTelefono: string;
 
   @Column()
   @Field()
   tipoUsr_id: number;

   //Aqui es donde se hará el enlace con la otra entidad (tabla)
   //En este caso la tabla tipo_usuario
   @ManyToOne(()=> TipoUsuario, (tipoUsuario) => tipoUsuario.usuarios)
   @Field({nullable:true, deprecationReason: 'Este campo ha cambiado su valor' })
   tipoUsr?: TipoUsuario;
   

   



}
