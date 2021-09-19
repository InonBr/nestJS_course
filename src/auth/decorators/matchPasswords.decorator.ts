import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'MatchPasswords', async: false })
export class MatchPasswords implements ValidatorConstraintInterface {
  validate(passwordConfirm: string, args: ValidationArguments) {
    if (passwordConfirm !== (args.object as any)[args.constraints[0]])
      return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Passwords do not match!';
  }
}
