export class UserRegisterDto {
    constructor(
        public username: string,
        public email: string,
        public password: string
    ) { }
}