import { IsNotEmpty } from "class-validator";

export class ValidaImagemProdutoDTO {
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  descricao: string;
}