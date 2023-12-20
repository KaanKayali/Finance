import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { getHeaders, getServerUrl } from './http-environment';
import { Account } from './account.service';

export interface Credential {
  token: string,
  owner: Account
}
export interface LoginInfo {
  login: string,
  password: string
}
export interface RegistrationInfo extends LoginInfo {
  firstname: string,
  lastname: string
}

/**
 * Mit dem Authentication Service können neue Benutzer angelegt und
 * kann in existierende Accounts eingeloggt werden.
 */
@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  /**
   * Validiert ein Token eines Benutzer im System. Gibt den HTTP Status Code 200
   * zurück, falls des Token noch gültig ist und der Zugriff über das Token
   * auf die API gewährleistet werden kann.
   * @param jwtToken Diese Methode benötigt das JWT Token des aktuell eingeloggten Benutzers (siehe {@link login}(LoginInfo)).
   * @example Gibt den HTTP Status 200 für eine gültiges Token zurück, ansonsten einen 500er Status.
   */
  public validate(jwtToken: string): Observable<HttpResponse<null>> {
    return this.http.post<null>(
      getServerUrl('/auth/validate'),
      null,
      { ...getHeaders(jwtToken), observe: 'response' });
  }

  /**
   * Registriert einen neuen Benutzer im System und gibt den Benutzer mit der
   * generierten Account Nummer zurück. Ein neuer Benutzer erhält 1000.- CHF
   * Startguthaben vom System. Neue Accounts enthalten noch keine Transaktionen.
   * @param model Spezifiziert den Namen, sowie den Benutzernamen und das Password des neuen Users.
   * @example Gibt das Resultat im folgenden Format zurück:
   * ```json
   * {
   *    "login": "mHans",
   *    "firstname": "Hans",
   *    "lastname": "Muster",
   *    "accountNr": "1000004"
   * }
   * ```
   */
  public register(model: RegistrationInfo): Observable<Account> {
    return this.http.post<Account>(
      getServerUrl('/auth/register'),
      JSON.stringify(model),
      getHeaders());
  }

  /**
   * Sucht nach dem angegebenen Login und überprüft das spezifizierte Passwort.
   * Gibt das JWT Token sowie den gefundenen Account zurück, falls der User gefunden wurde.
   * Ansonsten wird der Request mit einem Status-Code 404 beantwortet.
   * @param model Spezifiziert den Benutzernamen und das Password des Users.
   * @example Gibt das Resultat im folgenden Format zurück:
   * ```json
   * {
   *    "token": "eyJhbGci...",
   *    "owner":
   *    {
   *       "login": "user1",
   *       "firstname": "Bob",
   *       "lastname": "Müller",
   *       "accountNr": "1000001"
   *    }
   * }
   * ```
   */
  public login(model: LoginInfo): Observable<Credential> {
    return this.http.post<Credential>(
      getServerUrl('/auth/login'),
      JSON.stringify(model),
      getHeaders());
  }
}
