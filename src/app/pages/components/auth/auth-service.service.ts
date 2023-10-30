import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../shareds/models/user.model';
import jwt_decode from 'jwt-decode';
import { UserRequestLogin, UserResponseLogin } from '../../shareds/interfaces/userLogin.interface';
import { TokenResponse } from '../../shareds/models/token.interface';
const KEY = 'authToken';

import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
    private apiUrl = environment.baseUrl;
    private tokenSubject: BehaviorSubject<string | null>;
    private userSubject = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private afAuth: AngularFireAuth) {
        this.tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('authToken'));
    }

    get authToken(): Observable<string | null> {
        return this.tokenSubject.asObservable();
      }

      hasToken() {
        return !!this.getToken();
      }

      getToken() {
        return window.localStorage.getItem(KEY)
      }

      private decodeAndNotify() {
        const token = this.getToken();
        const tokenDecodificado: TokenResponse = jwt_decode(token);

        const user: User = {
            name: tokenDecodificado.user.name,
            profile_id: tokenDecodificado.user.profile_id,
            email: tokenDecodificado.user.email,
            id: tokenDecodificado.user.id,
            whatsapp: tokenDecodificado.user.whatsapp,
        }
        this.userSubject.next(user);
      }

    cadastrarUsuario(usuario: User): Observable<any> {
      return this.http.post(`${this.apiUrl}users`, usuario);
    }

    login(userLogin: UserRequestLogin): Observable<UserResponseLogin> {
        return this.http.post(`${this.apiUrl}sessions`, userLogin)
                .pipe(
                    map(
                        (response : UserResponseLogin ) => {
                            const token = response.token;
                            if (token) {
                                localStorage.setItem(KEY, token); // Armazene o token no localStorage
                                this.tokenSubject.next(token); // Atualize o BehaviorSubject
                                this.decodeAndNotify();
                              }
                              return response;
                          }
                    )
                )
    }


      loginGoogle(): void {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log('Resultado: ', result);
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                console.log('Credentials: ', credential);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);

                // ...
            });
      }

    logout(): void {
        localStorage.removeItem('authToken'); // Remova o token do localStorage
        this.tokenSubject.next(null); // Atualize o BehaviorSubject para null
      }

      getUser(): Observable<User> {
        if(!this.userSubject.value){
            this.decodeAndNotify()
        }
        return this.userSubject.asObservable();
      }


}
