export interface UserCredentialImp {
    user: {
      uid: string;
      email: string;
      emailVerified: boolean;
      displayName: string;
      isAnonymous: boolean;
      photoURL: string;
      providerData: {
        providerId: string;
        uid: string;
        displayName: string;
        email: string;
        phoneNumber: string | null;
        photoURL: string;
      }[];
      stsTokenManager: {
        refreshToken: string;
        accessToken: string;
        expirationTime: number;
      };
      createdAt: string;
      lastLoginAt: string;
      apiKey: string;
      appName: string;
    };
    providerId: string;
    _tokenResponse: {
      federatedId: string;
      providerId: string;
      email: string;
      emailVerified: boolean;
      firstName: string;
      fullName: string;
      lastName: string;
      photoUrl: string;
      localId: string;
      displayName: string;
      idToken: string;
      context: string;
      oauthAccessToken: string;
      oauthExpireIn: number;
      refreshToken: string;
      expiresIn: string;
      oauthIdToken: string;
      rawUserInfo: string;
      kind: string;
    };
    operationType: string;
  }
