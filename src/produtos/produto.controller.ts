import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { ValidaProdutoDTO } from "./dtos/validaProduto.dto";

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}

  @Post()
  async criaProduto(@Body() dadosProduto: ValidaProdutoDTO) {
    this.produtoRepository.salvar(dadosProduto)

    return {
      mensagem: 'Produto cadastrado!',
      dadosProduto,
    };
  }

  @Get()
  async listaProduto() {
    return this.produtoRepository.listarTodos();
  }
}