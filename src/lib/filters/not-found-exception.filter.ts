import { Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { EntityNotFoundException } from '../errors/entity-not-found.exception';

@Catch(EntityNotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundException) {
    throw new NotFoundException(exception.message);
  }
}
