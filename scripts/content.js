const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Cambia el nombre de tu archivo de credenciales aquí
const KEYFILEPATH = path.join(__dirname, 'credentials.json');
// Si sólo necesitas leer archivos, este scope es suficiente
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

async function readSpreadsheet(spreadsheetId, range) {
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
        fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

const spreadsheetId = '1stmw3Uy70JloMCnQpCG5wjLtAFbaIFN1Aqe1gK9JM7A';
const range = 'Cuentos!A1:H999'; // Ajusta el rango según tus necesidades
const destinationPath = path.join(__dirname, '../src/assets/stories.json');

readSpreadsheet(spreadsheetId, range)
    .then(data => {
        return writeJsonToFile(data, destinationPath);
    })
    .then(() => {
        console.log('JSON escrito correctamente en ../src/assets/stories.json');
    })
    .catch(err => console.error('Error durante la operación:', err));
