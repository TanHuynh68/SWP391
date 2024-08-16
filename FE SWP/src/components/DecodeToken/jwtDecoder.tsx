// src/utils/jwtDecoder.ts

// Hàm này chuyển đổi Base64Url thành Base64
function base64UrlDecode(base64Url: string): string {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Thêm padding nếu cần thiết
    switch (base64.length % 4) {
      case 0: break;
      case 2: base64 += '=='; break;
      case 3: base64 += '='; break;
      default: throw new Error('Invalid base64 string');
    }
  
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
  }
  
  // Hàm này giải mã và phân tích payload của JWT
  export function decodeJwt(token: string): any {
    const [header, payload, signature] = token.split('.');
  
    if (!payload) {
      throw new Error('Invalid JWT');
    }
  
    const decodedPayload = base64UrlDecode(payload);
    return JSON.parse(decodedPayload);
  }
  