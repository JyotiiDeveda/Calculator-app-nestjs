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

   userHistory(email: string): Promise<Operation[]> {
    return this.operationRepository.find({ where: { email}});
  }


  async clearHistory(id: string) {
    const deletedOperation = await this.operationRepository.delete({ id });
    console.log("deletedOperation: ", deletedOperation);
    if(!deletedOperation || deletedOperation?.affected <= 0) {
      throw new HttpException(
        "Operation to be deleted not found",
        HttpStatus.NOT_FOUND
      )
    }
    return true;
  }


  async resetHistory(email: string) {
    const deletedOperations = await this.operationRepository.delete({ email });
    console.log("deletedOperation: ", deletedOperations);
    if(!deletedOperations || deletedOperations?.affected <= 0) {
      throw new HttpException(
        "No Operations for given email",
        HttpStatus.NOT_FOUND
      )
    }
    return true;
  }
}
