import {jwtDecode} from 'jwt-decode';

interface JwtPayload {

  name?: string;
  email: string;
  role: string;
  // Add any other properties you expect in the JWT payload
}

export function decodeJWT(token: string): JwtPayload | null {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}
