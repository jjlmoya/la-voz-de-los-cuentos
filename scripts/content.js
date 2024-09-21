import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const KEYFILEPATH = path.join(__dirname, 'credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const SPREADSHEET_IDS = {
    es: '1stmw3Uy70JloMCnQpCG5wjLtAFbaIFN1Aqe1gK9JM7A',
    en: '1E8J8Q5uVQxdZ1sNHusSumLXPNXYaYFnTBAh6PEsTagg' 
};

const SPREADSHEET_RANGES = {
    stories: 'Cuentos!A1:L999', 
    sagas: 'Sagas!A1:I999',
    newsletters: 'Newsletter!A1:E999',
    characters: 'Characters!A1:N999',
    landings: 'Landings!A1:N999',
};

const OUTPUT_DIRS = {
    es: '../src/data/es/',
    en: '../src/data/en/'
};

async function authenticateGoogleSheets() {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES,
    });
    const client = await auth.getClient();
    const sheets = google.sheets({
        version: 'v4',
        auth: client
    });
    return sheets;
}

async function readSpreadsheet(sheets, spreadsheetId, range) {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: range,
    });

    const rows = response.data.values;
    if (rows.length) {
        const headers = rows[0];
        return rows.slice(1).map(row => {
            let obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index] || '';
            });
            return obj;
        });
    } else {
        console.log(`No se encontró data en la hoja: ${range}`);
        return [];
    }
}

async function writeJsonToFile(data, filePath) {
    return new Promise((resolve, reject) => {
        const dir = path.dirname(filePath);
        fs.mkdirSync(dir, { recursive: true });

        fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function processLanguage(language, spreadsheetId, outputDir) {
    const sheets = await authenticateGoogleSheets();

    for (const [key, range] of Object.entries(SPREADSHEET_RANGES)) {
        const adjustedRange = range;
        const data = await readSpreadsheet(sheets, spreadsheetId, adjustedRange);
        const filteredData = data.filter(entry => (entry.order || entry.id) && (entry.name || entry.title))

        const outputPath = path.join(__dirname, `${outputDir}${key}.json`);
        await writeJsonToFile(filteredData, outputPath);
        console.log(`JSON created ${key}.json for ${language}`);
    }
}

async function main() {
    for (const [language, spreadsheetId] of Object.entries(SPREADSHEET_IDS)) {
        await processLanguage(language, spreadsheetId, OUTPUT_DIRS[language]);
    }
}

main().catch(err => console.error('Error processing spreadsheets:', err));
