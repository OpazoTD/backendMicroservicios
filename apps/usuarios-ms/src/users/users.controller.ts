import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '../../../../libs/common/src/dtos/user.dto';

@Controller()
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create_user' })
  async create(dto: CreateUserDto) {
    try {
      this.logger.log(`Received create_user command for email: ${dto.email}`);
      const result = await this.usersService.create(dto);
      this.logger.log(`User created successfully: ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error(`Error in create_user: ${error.message}`, error.stack);
      throw new RpcException({
        statusCode: error.status || 500,
        message: error.message,
        error: error.name,
      });
    }
  }

  @MessagePattern({ cmd: 'get_all_users' })
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  findOne(id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: 'get_user_by_email' })
  findByEmail(email: string) {
    return this.usersService.findByEmail(email);
  }

  @MessagePattern({ cmd: 'update_user' })
  update(payload: { id: number; dto: UpdateUserDto }) {
    return this.usersService.update(payload.id, payload.dto);
  }

  @MessagePattern({ cmd: 'delete_user' })
  remove(id: number) {
    return this.usersService.remove(id);
  }

  @MessagePattern({ cmd: 'validate_user' })
  validateUser(payload: { email: string; password: string }) {
    return this.usersService.validateUser(payload.email, payload.password);
  }
}
