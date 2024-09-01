import 'dotenv/config';
import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import mailConfig from '../../config/mail/mail';
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




export default class SESMail {
    public static async sendMail({to, from, subject, templateData}: ISendEmail): Promise<void>{
        
        const mailTemplate = new HandleBarsMailTemplate();

        const transporter = nodemailer.createTransport({
           SES: new aws.SES({
                apiVersion: '2010-12-01',
           })
        });

        const {email, name} = mailConfig.defaults.from;

        const message = await transporter.sendMail({
            from:{
                name: from?.name || name,
                address: from?.email || email
            },
            to:{
                 name: to.name,
                 address: to.email 
            },
            subject,
            html: await mailTemplate.parse(templateData),
        })

    }
}