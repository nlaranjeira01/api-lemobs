import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import * as moment from 'moment';

@ValidatorConstraint({ async: false })
export class IsDateStringConstraint implements ValidatorConstraintInterface {
  validate(date: string, args: ValidationArguments): boolean {
    const parts = date.split('/');

    if (parts.length !== 3) {
      return false;
    }

    if (
      parts[0].length !== 2 ||
      parts[1].length !== 2 ||
      parts[2].length !== 4
    ) {
      return false;
    }

    const moment_date = moment(
      new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0])),
    );

    return moment_date.isValid();
  }
}

export function IsDateString(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateStringConstraint,
    });
  };
}
