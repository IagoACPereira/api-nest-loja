import { IsNotEmpty } from "class-validator";

export class ValidaCaracteristicaProdutoDTO {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  descricao: string;
}