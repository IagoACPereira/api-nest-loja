import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}

  @Post()
  async criaProduto(@Body() dadosProduto) {
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