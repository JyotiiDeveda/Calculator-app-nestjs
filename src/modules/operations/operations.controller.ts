import { Controller, Get, Post, Delete, Body, Param, Res, Req, HttpException, HttpStatus } from '@nestjs/common';
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

    if(!result || result.length === 0) {
      return res.status(HttpStatus.NOT_FOUND).send({message: "No user history found"})
    }
    return res.send({ result }); // Send the result back to the client
  }


  @Delete(':id')
  async clear(@Param('id') id: string, @Res() res: Response) {
    if (!id) {
      throw new HttpException("Id required", HttpStatus.PRECONDITION_REQUIRED);
    }
    if(await this.operationsService.clearHistory(id)) {
      return res.status(HttpStatus.OK).send({message: "Operation deleted successfully"})
    }
    return res.status(HttpStatus.BAD_REQUEST).send({message: "Failed to clear history"})
  }


  @Delete()
  async reset(@Req() req: Request, @Res() res: Response) {
    const email = req.headers['email'] as string; 

    if (!email) {
      throw new HttpException("Email required", HttpStatus.PRECONDITION_REQUIRED);
    }

    if(await this.operationsService.resetHistory(email)) {
      return res.status(HttpStatus.OK).send({message: "Operation deleted successfully"})
    }
    return res.status(HttpStatus.BAD_REQUEST).send({message: "Failed to clear history"})

  }
}

