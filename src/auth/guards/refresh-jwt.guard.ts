import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { refresh_token, username } = request.body;

    if (!refresh_token) {
      throw new UnauthorizedException('refresh token field is required');
    }
    if (!username) {
      throw new UnauthorizedException('username field is required');
    }

    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    return true;
  }
}
