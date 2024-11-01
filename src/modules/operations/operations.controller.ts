import { Controller, Get, Post, Body, Res, Req, HttpException, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dto/create-operation.dto';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post()
  async calculate(@Res() res: Response, @Body() createOperationDto: CreateOperationDto) {
    const result = await this.operationsService.performCalculation(createOperationDto);
    console.log("Result in Controller: ", result);
    res.status(HttpStatus.CREATED).send({message: "Operation performed successfully", result})
  }

}

