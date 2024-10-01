export type NodeEnvironment = 'test' | 'development' | 'production';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV?: NodeEnvironment;
            PORT?: string;
            JWT_SECRET?: string;
            POSTGRES_USER?: string;
            POSTGRES_PASSWORD?: string;
            POSTGRES_DB?: string;
            POSTGRES_HOST?: string;
            POSTGRES_PORT?: string;
        }
    }
}

export { };