export interface IUser {
  email: string;
  displayName: string;
  isAdmin: boolean;
  token: string;
}

/** What the sign-in form sends; `api/user/login` accepts exactly these two fields. */
export interface ILoginCredentials {
  email: string;
  password: string;
}

/** What the sign-up form sends; `api/user/register` accepts exactly these three. */
export interface IRegisterDetails extends ILoginCredentials {
  displayName: string;
}
