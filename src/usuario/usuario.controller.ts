import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dtos/criaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from "uuid";
import { ListaUsuarioDto } from "./dtos/listaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.id = uuid();
    usuarioEntity.nome = dadosUsuario.nome;
    usuarioEntity.email = dadosUsuario.email;
    usuarioEntity.senha = dadosUsuario.senha;

    this.usuarioRepository.salvar(usuarioEntity);

    return {
      mensagem: 'Usuário criado com sucesso!',
      usuario: new ListaUsuarioDto(
        usuarioEntity.id,
        usuarioEntity.nome,
      ),
    };
  }

  @Get()
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listarTodos();
    const usuariosLista = usuariosSalvos.map(
      usuario => new ListaUsuarioDto(
        usuario.id,
        usuario.nome,
      )
    )

    return usuariosLista;
  }
}