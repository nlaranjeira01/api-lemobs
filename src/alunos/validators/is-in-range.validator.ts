import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsInRangeConstraint implements ValidatorConstraintInterface {
  //Como na ordem das validações da nota primeiro é verificado se a nota é um number, posso assumir que basta verificar se min <= nota <= max sem fazer casts
  validate(nota: number, args: ValidationArguments): boolean {
    const [min, max] = args.constraints;

    return nota >= min && nota <= max;
  }
}

export function IsInRange(
  min: number,
  max: number,
  validationOptions?: ValidationOptions,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [min, max],
      validator: IsInRangeConstraint,
    });
  };
}
