import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  //
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJ3yRARFSx0wNMFZ2D9H9tSFyDzwS1tkQ',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorResponse => {
      let errorMessage = 'An unknoen error occured!';
      if (!errorResponse.error || !errorResponse.error.error) {
        return throwError(errorMessage);
      }
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS': errorMessage = 'This e-mail already exists';
      }
      return throwError(errorMessage);
    }));
  }

}
