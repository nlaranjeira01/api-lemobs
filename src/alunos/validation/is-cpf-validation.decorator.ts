import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsCPFConstraint implements ValidatorConstraintInterface {
  validate(cpf: string, args: ValidationArguments): boolean {
    return this.isFormatted(cpf) && this.isValid(cpf);
  }

  private isValid(cpf: string): boolean {
    const cpf_trimmed: string = cpf.trim();
    let cpf_numeric: string = cpf_trimmed.replace(/\D/g, '').padStart(11, '0'); //remove tudo o que não é numérico da string (traços e pontos) e insere zeros no começo da string até chegar a 11 caracteres

    if (this.isRepeated(cpf_numeric)) {
      //cpfs com todos os dígitos iguais são inválidos
      return false;
    }

    //baseado em https://dicasdeprogramacao.com.br/algoritmo-para-validar-cpf/
    for (let i = 9; i < 11; i++) {
      let acc = 0;
      for (let j = 0; j < i; j++) {
        acc += parseInt(cpf_numeric[j]) * (i + 1 - j);
      }

      let verif_dgt = (acc * 10) % 11;
      if (verif_dgt === 10) {
        verif_dgt = 0;
      }

      if (parseInt(cpf_numeric[i]) !== verif_dgt) {
        return false;
      }
    }

    return true;
  }

  //verifica se um cpf (já sem os traços e pontos) tem todos os dígitos repetidos
  private isRepeated(cpf: string): boolean {
    for (let i = 1; i < cpf.length; i++) {
      if (cpf[i] !== cpf[0]) {
        return false;
      }
    }

    return true;
  }

  //verifica se um cpf obedece o formato [XX]X.XXX.XXX-XX ou [XX]XXXXXXXXX (os dois primeiros dígitos podem ser omitidos caso sejam 0)
  private isFormatted(cpf: string): boolean {
    //(1 a 3 dígitos, ponto, 3 dígitos, ponto, 3 dígitos, traço, 2 dígitos) OU (9 a 11 dígitos)
    const cpf_regex: RegExp = /(^[0-9]{1,3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$)|(^[0-9]{9,11}$)/g;
    const cpf_trimmed: string = cpf.trim();

    return cpf_regex.test(cpf_trimmed);
  }
}

export function IsCPF(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCPFConstraint,
    });
  };
}
