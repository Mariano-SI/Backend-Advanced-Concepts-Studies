import nodemailer from 'nodemailer';
import HandleBarsMailTemplate from './HandleBarsMailTemplate';

interface ITemplateVariable{
    [key: string]: string | number;
}
interface IParserMailTemplate{
    file: string;
    variables: ITemplateVariable 
}

interface IMailContact {
    name: string;
    email: string;
}
interface ISendEmail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParserMailTemplate;
}




export default class EtherealMail {
    public static async sendMail({to, from, subject, templateData}: ISendEmail): Promise<void>{
        const account = await nodemailer.createTestAccount();

        const mailTemplate = new HandleBarsMailTemplate();

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth:{
                user: account.user,
                pass: account.pass
            }
        });

        const message = await transporter.sendMail({
            from:{
                name: from?.name || 'Equipe API Vendas',
                address: from?.email || 'equipe@apivendas.com.br'
            },
            to:{
                 name: to.name,
                 address: to.email 
            },
            subject,
            html: await mailTemplate.parse(templateData),
        })

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}