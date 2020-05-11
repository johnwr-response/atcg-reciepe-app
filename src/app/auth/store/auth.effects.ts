import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";
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
          return of(new AuthActions.Login({
            email: responseData.email,
            userId: responseData.localId,
            token: responseData.idToken,
            exirationDate: expirationDate
          }));
        }),
        catchError(error => {
          // ...
          return of();
        }),
      );
    }),

  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
