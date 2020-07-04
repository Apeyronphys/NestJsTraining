import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService, 
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentionaksDto: AuthCredentialsDto): Promise<void>{
        return this.authService.signUp(authCredentionaksDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }>{
        return this.authService.signIn(authCredentialsDto); 
    }

}
