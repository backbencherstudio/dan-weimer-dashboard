export const authConfig = {
    httpOnly:       false,   // backend returns token, you store it
    refreshEnabled: true,    // backend provides refresh_token ✅
  
    cookieName:    "access_token",
    refreshCookie: "refresh_token",
    // tokenExpiry:   1,        // access token expires in 1hr — set short
    // refreshExpiry: 7,        // refresh token — 7 days
  } as const;