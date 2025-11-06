const saveToken = async (token: string, expiresInSeconds: number, refreshToken: string, role: string) => {
    const expiry = Date.now() + expiresInSeconds * 1000;
    const data = JSON.stringify({ token, expiry });
    localStorage.setItem('token', data);

    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('role', role);
};

export default saveToken;
