import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('flag-issues')
  @ApiOperation({ summary: 'Flag issues for users' })
  @ApiResponse({ status: 200, description: 'Issues flagged successfully.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  flagIssues() {
    return this.usersService.flagIssues();
  }
}
