const saveToken = async (token: string, expiresInSeconds: number) => {
    const expiry = Date.now() + expiresInSeconds * 1000;
    const data = JSON.stringify({ token, expiry });
    localStorage.setItem('token', data);
};

export default saveToken;
