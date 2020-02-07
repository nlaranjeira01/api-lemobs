import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import * as moment from 'moment';

@ValidatorConstraint({ async: false })
export class IsDateConstraint implements ValidatorConstraintInterface {
  validate(date: string, args: ValidationArguments): boolean {
    const moment_date = moment(date, 'DD/MM/YYYY');

    return moment_date.isValid();
  }
}

export function IsDate(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateConstraint,
    });
  };
}
