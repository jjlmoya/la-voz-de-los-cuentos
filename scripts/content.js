import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const KEYFILEPATH = path.join(__dirname, 'credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

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

async function readStoriesSpreedsheet() {
    const spreadsheetId = '1stmw3Uy70JloMCnQpCG5wjLtAFbaIFN1Aqe1gK9JM7A';
    const range = 'Cuentos!A1:L999';
    const sheets = await authenticateGoogleSheets();

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: range,
    });

    const rows = response.data.values;
    if (rows.length) {
        const headers = rows[0];
        const data = rows.slice(1).map(row => {
            let obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index] || '';
            });
            return obj;
        }).filter(e => e.order && e.name);
        return data;
    } else {
        console.log('No se encontró data en la hoja.');
        return [];
    }
}

async function readSagasSpreedsheet() {
    const spreadsheetId = '1stmw3Uy70JloMCnQpCG5wjLtAFbaIFN1Aqe1gK9JM7A';
    const range = 'Sagas!A1:I999';
    const sheets = await authenticateGoogleSheets();

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: range,
    });

    const rows = response.data.values;
    if (rows.length) {
        const headers = rows[0];
        const data = rows.slice(1).map(row => {
            let obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index] || '';
            });
            return obj;
        });
        return data;
    } else {
        console.log('No se encontró data en la hoja.');
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

readStoriesSpreedsheet()
    .then(data => {
        return writeJsonToFile(data, path.join(__dirname, '../src/data/stories.json'));
    })
    .then(() => {
        console.log('JSON created stories.json');
    })
    .catch(err => console.error('Error creating stories.json:', err));

readSagasSpreedsheet()
    .then(data => {
        return writeJsonToFile(data, path.join(__dirname, '../src/data/sagas.json'));
    })
    .then(() => {
        console.log('JSON created sagas.json');
    })
    .catch(err => console.error('Error Creating sagas.json', err));
