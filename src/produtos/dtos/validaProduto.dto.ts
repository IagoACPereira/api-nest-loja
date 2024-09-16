import { IsArray, IsDateString, IsDecimal, IsInt, IsNotEmpty, IsPositive, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import { ValidaCaracteristicaProdutoDTO } from "./validaCaracteristicaProduto.dto";
import { ValidaImagemProdutoDTO } from "./validaImagemProduto.dto";
import { Type } from "class-transformer";

export class ValidaProdutoDTO {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsPositive()
  @IsDecimal({ force_decimal: true, decimal_digits: '2' })
  valor: number;

  @IsNotEmpty()
  @Min(0)
  quantidadeDisponivel: number;

  @IsNotEmpty()
  @MaxLength(1000)
  descricao: string;

  @ValidateNested()
  @IsArray()
  @Type(() => ValidaCaracteristicaProdutoDTO)
  @MinLength(3)
  caracteristicas: Array<ValidaCaracteristicaProdutoDTO>

  @ValidateNested()
  @IsArray()
  @Type(() => ValidaImagemProdutoDTO)
  @MinLength(1)
  imagens: Array<ValidaImagemProdutoDTO>

  @IsNotEmpty()
  categoria: string;

  @IsDateString()
  dataCriacao: Date;

  @IsDateString()
  dataAtualizacao: Date;
}