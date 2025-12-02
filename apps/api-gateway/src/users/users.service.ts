import { Injectable, Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { CreateUserDto, UpdateUserDto } from '../../../../libs/common/src/dtos/user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject('USUARIOS_SERVICE') private readonly usersClient: ClientProxy,
  ) {}

  async createUser(dto: CreateUserDto) {
    try {
      this.logger.log(`Creating user with email: ${dto.email}`);
      const result = await firstValueFrom(
        this.usersClient.send({ cmd: 'create_user' }, dto).pipe(
          timeout(5000),
          catchError((error) => {
            this.logger.error(`Error from Users MS: ${JSON.stringify(error)}`);
            throw error;
          }),
        ),
      );
      this.logger.log(`User created successfully: ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw new InternalServerErrorException(`Failed to create user: ${error.message}`);
    }
  }

  async getAllUsers() {
    try {
      return await firstValueFrom(
        this.usersClient.send({ cmd: 'get_all_users' }, {}).pipe(timeout(5000)),
      );
    } catch (error) {
      this.logger.error(`Failed to get users: ${error.message}`);
      throw new InternalServerErrorException(`Failed to get users: ${error.message}`);
    }
  }

  async getUserById(id: number) {
    try {
      return await firstValueFrom(
        this.usersClient.send({ cmd: 'get_user_by_id' }, id).pipe(timeout(5000)),
      );
    } catch (error) {
      this.logger.error(`Failed to get user ${id}: ${error.message}`);
      throw new InternalServerErrorException(`Failed to get user: ${error.message}`);
    }
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    try {
      return await firstValueFrom(
        this.usersClient.send({ cmd: 'update_user' }, { id, dto }).pipe(timeout(5000)),
      );
    } catch (error) {
      this.logger.error(`Failed to update user ${id}: ${error.message}`);
      throw new InternalServerErrorException(`Failed to update user: ${error.message}`);
    }
  }

  async deleteUser(id: number) {
    try {
      return await firstValueFrom(
        this.usersClient.send({ cmd: 'delete_user' }, id).pipe(timeout(5000)),
      );
    } catch (error) {
      this.logger.error(`Failed to delete user ${id}: ${error.message}`);
      throw new InternalServerErrorException(`Failed to delete user: ${error.message}`);
    }
  }
}
