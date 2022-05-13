import {
	Injectable,
	NotAcceptableException,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { Op } from 'sequelize';
import { User } from 'database';
import { UserStatus } from 'src/enums/userStatus';

import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwtPayload.interface';

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) { }
	async register(payload): Promise<any> {
		const data = payload;

		const user = new User(data);

		const existingUsers = await User.findAndCountAll({
			where: {
				[Op.and]: [{ username: user.username }, { type: user.type }],
			},
		});

		data.status = UserStatus.ACTIVE;

		if (existingUsers.count > 0) {
			throw new NotAcceptableException(
				'User with this username and type already exists',
			);
		}
		await user.save();

		return user;
	}

	async login(payload): Promise<any> {
		const data = payload;

		if (!data.username || !data.password) {
			throw new HttpException(
				'Please enter valid credentials',
				HttpStatus.PARTIAL_CONTENT,
			);
		}
		const result = await this.verifyUserAndPassword(
			data.username,
			data.password,
		);
		return result;
	}

	async verifyUserAndPassword(
		username: string,
		password: string,
	): Promise<any> {
		const verifiedUser = await User.findOne({
			where: {
				username: username,
				password: password,
			},
		});

		if (!verifiedUser) {
			throw new HttpException(
				'Please enter valid credentials',
				HttpStatus.UNAUTHORIZED,
			);
		}

		const accessToken = await this.generateToken(username, 'topSecret51', '4h');

		return accessToken;
	}

	async generateToken(
		username: string,
		secret: string,
		expiresIn: string,
	): Promise<any> {
		const payload: JwtPayload = {
			username: username,
		};

		const token = await this.jwtService.sign(payload, {
			secret: secret,
			expiresIn: expiresIn,
		});
		return { access_token: token };
	}
}
