import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthSinginDto } from './dto/auth-singin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authSinginDto: AuthSinginDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authSinginDto);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  test(@Req() req): string {
    console.log(req.user);

    return 'good!';
  }
}
