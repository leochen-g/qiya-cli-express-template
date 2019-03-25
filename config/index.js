const { env } = process;
const config = {
    HOST: env.HOST,
    PORT: env.PORT,
    RDS_PORT: env.RDS_PORT,
    RDS_HOST: env.RDS_HOST,
    RDS_PWD: env.RDS_PWD,
    JWTSECRET: env.JWTSECRET
}