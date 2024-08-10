import handlebars from 'handlebars';
import fs from 'fs';
import e from 'express';

interface ITemplateVariable{
    [key: string]: string | number;
}
interface IParserMailTemplate{
    file: string;
    variables: ITemplateVariable 
}

export default class HandleBarsMailTemplate {
  public async parse({file, variables} : IParserMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
        encoding: 'utf-8'
    })

    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}