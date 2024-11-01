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

  @Get()
  async getUserHistory(@Req() req: Request, @Res() res: Response) {
    const email = req.headers['email'] as string; 

    if (!email) {
      throw new HttpException("Email required", HttpStatus.PRECONDITION_REQUIRED);
    }

    const result = await this.operationsService.userHistory(email);
    console.log("Result: ", result);
    return res.send({ result }); // Send the result back to the client
  }

}

