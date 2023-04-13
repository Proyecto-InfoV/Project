import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';
import { TipoUsuario } from 'src/tipo_usuarios/entities/tipo_usuario.entity';

@Resolver(() => Usuario)
export class UsuariosResolver {
  constructor(private readonly usuariosServicio: UsuariosService) {}

  /**
   *Mutation se refiere a aquellas operaciones POST
   * En donde interactuamos directo con el el usuario
   *CREATE en CRUD
   */
  @Mutation((returns)=> Usuario, {name: 'crearUsuario'})
  create(@Args('usuarioInput') usuarioInput: CreateUsuarioInput){
    return this.usuariosServicio.create(usuarioInput);
  }

  /**
   * Query indica que es una consulta
   * En este caso nuestro Query va a mostrar usuarios, haciendo
   *  Uso de un servicio de usuario declarado en el constructor
   * READ en CRUD
   */

  @Query((returns)=> [Usuario], {name: 'usuarios'})
  usuarios(){
    return this.usuariosServicio.findAll();
  }

  @Query((returns)=> Usuario, {name: 'usuario'})
  usuario(@Args('id') id: number){
    return this.usuariosServicio.findOne(id);
  }

  @ResolveField((returns)=> TipoUsuario)
  async tipoUsuario(@Parent() usuario: Usuario): Promise<TipoUsuario>{
    const tipoUsuario = await this.usuariosServicio.getTipoUsuario(usuario.tipoUsr_id);

    //Esta comprobacion se hace para que en caso de que no haya un tipo de usuario
    //Se devuelva una alternativa de respuesta y no solo null
    if (tipoUsuario){

      return tipoUsuario;

    } else {
      return{
        id: parseInt('0', 10),
        nombre: 'No hay un tipo de usuario asociado a este usuario',
        usuarios: [],
      }
    } 


  }
  //Fin de READ

  //UPDATE en CRUD
  //Args es un decorador que indica a GraphQl que argumentos espera
  //para el servicio
  @Mutation(()=> Usuario, {name: 'actualizarUsuario'})
  update(@Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput){
    return this.usuariosServicio.update(updateUsuarioInput.id, updateUsuarioInput);
  }

  //DELETE en CRUD
  @Mutation((returns)=> String, {name: 'borrarUsuario'})
  remove(@Args('id') id: number): Promise<any>{
    return this.usuariosServicio.remove(id);
  }

}
