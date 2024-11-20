import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async flagIssues() {
    try {
      const usersWithIssues = await this.userRepository.count({
        where: { hasIssues: true },
      });

      await this.userRepository.update(
        { hasIssues: true },
        { hasIssues: false },
      );

      return { data: { userWithIssues: usersWithIssues } };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
