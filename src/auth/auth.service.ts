import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService, 
    ){}

    async signUp(authCreddentialsDto: AuthCredentialsDto): Promise<void>{
        return this.userRepository.signUp(authCreddentialsDto); 
    }

    async signIn(authCreddentialsDto: AuthCredentialsDto): Promise <{accessToken: string}>{
        const username = await this.userRepository.validateUserPassword(authCreddentialsDto); 

        if(!username){
            throw new UnauthorizedException('Invalid credentionals');
        }

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
