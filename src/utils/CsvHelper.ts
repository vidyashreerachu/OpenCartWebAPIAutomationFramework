// help to interact and get the data from csv file

//npm install csv-parse
//utf-8 helps to consider special char's in csv file as it is
//record - existing object/interface available in TS it holds data in the form of key & value

//excel file will get corrupted very soon
//if test data is mentioned in fixtures it will be running in sequential mode, so please avoid


import fs from 'fs';
import { parse } from 'csv-parse/sync';

export class CsvHelper
{
    static readCsv(filePath: string): Record<string , string>[]
    {
        return parse(fs.readFileSync(filePath, 'utf-8'),
            {
                columns: true, //consider first row as header
                skip_empty_lines: true,
                trim: true //trim unneccessary spaces
            }) as Record<string, string>[];
    }
}