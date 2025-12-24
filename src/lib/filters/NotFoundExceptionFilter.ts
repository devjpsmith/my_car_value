import { Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { EntityNotFoundException } from '../errors/entityNotFoundException';

@Catch(EntityNotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundException) {
    throw new NotFoundException(exception.message);
  }
}
