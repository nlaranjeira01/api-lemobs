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
    //(1 a 3 dígitos, ponto, 3 dígitos, ponto, 3 dígitos, traço, 2 dígitos) OU (9 a 11 dígitos)
    const cpf_regex: RegExp = /(^[0-9]{1,3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$)|(^[0-9]{9,11}$)/g;
    const cpf_trimmed: string = cpf.trim();

    const is_cpf_formatted: boolean = cpf_regex.test(cpf_trimmed);

    if (!is_cpf_formatted) {
      return false;
    }

    return true;
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
