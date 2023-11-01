import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, from, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../shareds/models/user.model';
import jwt_decode from 'jwt-decode';
import { UserRequestLogin, UserResponseLogin } from '../../shareds/interfaces/userLogin.interface';
import { TokenResponse, TokenResponseGoogle } from '../../shareds/models/token.interface';
const KEY = 'authToken';

import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, UserCredential, getAuth, signInWithPopup } from "firebase/auth";
import { UserCredentialImp } from '../../shareds/interfaces/UserCredentialImp.interface';
import { UserUpdate } from '../../shareds/models/user.interface';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
    private apiUrl = environment.baseUrl;
    private tokenSubject: BehaviorSubject<string | null>;
    private userSubject = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private afAuth: AngularFireAuth, private userService: UsersService) {
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
        let tokenDecodificado: TokenResponseGoogle | TokenResponse;

        try {
            tokenDecodificado = jwt_decode(token);
        } catch (error) {
            console.error('Erro ao decodificar token:', error);
            return;
        }

        if('aud' in tokenDecodificado){
            const user: User = {
                name: tokenDecodificado.name,
                profile_id: 1,
                email: tokenDecodificado.email,
                id: tokenDecodificado.user_id,
                whatsapp: 'não informado',
            }
            this.userSubject.next(user);


        } else {
            const user: User = {
                name: tokenDecodificado.user.name,
                profile_id: tokenDecodificado.user.profile_id,
                email: tokenDecodificado.user.email,
                id: tokenDecodificado.user.id,
                whatsapp: tokenDecodificado.user.whatsapp,
            }
            this.userSubject.next(user);
        }

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


    loginGoogle(): Observable<string> {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        return from(signInWithPopup(auth, provider)).pipe(
            map((userCredentialImpl: any) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(userCredentialImpl);
                const token = userCredentialImpl.user.accessToken;

                // You can include your logic here to handle the token and user data
                if (token) {
                    this.updateUserDate(userCredentialImpl.user);
                }

                // Return the user data or an appropriate response
                // Adjust this part to return the user data as needed
                return token;
            }),
            catchError((error) => {
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log('Erro: ', credential);
                // Handle the error or return an appropriate error response
                // Adjust this part as needed
                throw new Error('Google login error');
            })
        );
    }

    async updateUserDate(u: any ) {
        try {
          const newUser: UserUpdate = {
            uuid: u.uid,
            email: u.email,
            name: u.displayName,
          }
          await this.userService.updateGoogle(newUser, u.uid).subscribe()

          return
        } catch(e) {
          throw new Error(e);
        }
      }

    loginGoogleToken(idToken: string) {
        return this.http.get(`${this.apiUrl}sessions/google/${idToken}`)
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
