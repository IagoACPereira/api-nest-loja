import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/EmailEhUnico.validator";

export class CriaUsuarioDTO {
  @IsNotEmpty({
    message: 'O nome não pode ser vazio',
  })
  nome: string;

  @IsEmail(undefined, {
    message: 'O email informado é inválido',
  })
  @EmailEhUnico({ 
    message: 'Já existe um usuário com este email' 
  })
  email: string;

  @MinLength(6, {
    message: `A senha deve ter no mínimo 6 caracteres`,
  })
  senha: string;
}