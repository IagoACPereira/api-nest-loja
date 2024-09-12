import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dtos/criaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {
    this.usuarioRepository.salvar(dadosUsuario);

    return {
      mensagem: 'Usuário criado!',
      dadosUsuario,
    };
  }

  @Get()
  async listaUsuarios() {
    return this.usuarioRepository.listarTodos();
  }
}