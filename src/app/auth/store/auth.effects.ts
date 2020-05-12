import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from "@angular/router";
import {of} from "rxjs";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import * as AuthActions from './auth.actions'
import {environment} from "../../../environments/environment";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {

  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.SIGN_UP_START)
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        map(responseData => {
          const expirationDate = new Date(new Date().getTime() + (+responseData.expiresIn * 1000));
          return new AuthActions.AuthenticateSuccess({
            email: responseData.email,
            userId: responseData.localId,
            token: responseData.idToken,
            exirationDate: expirationDate
          });
        }),
        catchError(errorResponse => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorResponse.error || !errorResponse.error.error) {
            return of(new AuthActions.AuthenticateFail(errorMessage));
          }
          switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS': errorMessage = 'This e-mail already exists';break;
            case 'EMAIL_NOT_FOUND': errorMessage = 'This e-mail does not exist';break;
            case 'INVALID_PASSWORD': errorMessage = 'This password is not correct';break;
          }
          return of(new AuthActions.AuthenticateFail(errorMessage));
        }),
      );
    }),

  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}
