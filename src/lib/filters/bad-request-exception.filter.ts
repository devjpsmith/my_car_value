import { BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { ConstraintViolationException } from '../errors/constraint-violation.exception';

@Catch(ConstraintViolationException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: ConstraintViolationException) {
    throw new BadRequestException(exception);
  }
}
