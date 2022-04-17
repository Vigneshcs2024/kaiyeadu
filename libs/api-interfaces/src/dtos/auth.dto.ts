export interface AdminAuthCredentialsDto {
	email: string;
	password: string;
}

export interface ResetPasswordDto {
	email: string;
}

export interface UserAuthCredentials {
	gpf: string;
	password: string;
}
