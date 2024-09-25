import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dtos/criaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from "uuid";
import { ListaUsuarioDTO } from "./dtos/listaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dtos/atualizaUsuario.dto";

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
      usuario: new ListaUsuarioDTO(
        usuarioEntity.id,
        usuarioEntity.nome,
      ),
    };
  }

  @Get()
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listarTodos();
    const usuariosLista = usuariosSalvos.map(
      usuario => new ListaUsuarioDTO(
        usuario.id,
        usuario.nome,
      )
    )

    return usuariosLista;
  }

  @Put('/:id')
  async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
    const usuarioAtualizado = await this.usuarioRepository.atualiza(
      id,
      novosDados,
    )

    return {
      mensagem: 'Usuário atualizado com sucesso',
      usuario: usuarioAtualizado,
    }
  }
}