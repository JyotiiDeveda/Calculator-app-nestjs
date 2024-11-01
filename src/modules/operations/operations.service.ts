import { Injectable } from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operation } from './entities/operation.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(Operation)
    private operationRepository: Repository<Operation>,
  ) {}

  async performCalculation(
    createOperationDto: CreateOperationDto,
  ): Promise<Number> {
    const { email, operand1, operand2, operator } = createOperationDto;
    console.log(`Fetched data: ${email} ${operand1} ${operand2}, ${operator}`);

    let result = 0;

    switch (operator) {
      case '+':
        result = operand1 + operand2;
        break;
      case '-':
        result = operand1 - operand2;
        break;
      case '*':
        result = operand1 * operand2;
        break;
      case '/': {
        if (operand2 === 0) {
          throw new HttpException(
            "Zero division error denominator can't be zero in division",
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        result = Math.round(operand1 / operand2);
        break;
      }
    }

    console.log('Computed result: ', result);

    const newOperation = this.operationRepository.create({
      email,
      operand1,
      operand2,
      result,
      operator,
    });
    console.log('Created new operation code: ', newOperation);

    await this.operationRepository.save(newOperation);

    return result;
  }

  
}
