export const isDev = () => {
    return (getNodeEnv() === 'development');
};

export const getNodeEnv = () => {
    return process.env.NODE_ENV;
};