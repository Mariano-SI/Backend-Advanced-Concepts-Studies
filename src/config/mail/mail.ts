import 'dotenv/config';
interface IMailConfig {
    driver: 'ethereal' | 'ses';
    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER|| 'ethereal',
    defaults: {
        from: {
            email: 'mariano@marianosilva.dev.br',
            name: 'Mariano Silva',
        }
    }
} as IMailConfig;