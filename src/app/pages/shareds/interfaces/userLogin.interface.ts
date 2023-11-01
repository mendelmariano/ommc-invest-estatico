export interface UserRequestLogin {
    email: string;
    password: string;
  }

export interface UserResponseLogin {
    user : {
        id: number,
        name: string,
        email: string,
    },
    token: string;
    accessToken?: string;
}
