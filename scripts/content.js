import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const KEYFILEPATH = path.join(__dirname, 'credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];


const SPREADSHEET_CARD_ID = '1XnlycHz6-l7MKHS3dr9OwOvz5vzb00ctTcsIMHISRo8'

const SPREADSHEET_IDS = {
    es: '1stmw3Uy70JloMCnQpCG5wjLtAFbaIFN1Aqe1gK9JM7A',
    en: '1E8J8Q5uVQxdZ1sNHusSumLXPNXYaYFnTBAh6PEsTagg' 
};

const SPREADSHEET_RANGES = {
    stories: 'Cuentos!A1:N999',
    sagas: 'Sagas!A1:I999',
    newsletters: 'Newsletter!A1:E999',
    characters: 'Characters!A1:P999',
    landings: 'Landings!A1:N999'
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
        const filteredData = data.filter(hasMandatoryStoryFields)
        const outputPath = path.join(__dirname, `${outputDir}${key}.json`);
        await writeJsonToFile(filteredData, outputPath);

        console.log(`JSON created ${key}.json for ${language}`);

        // Generate songs.json from stories that have a song field
        if (key === 'stories') {
            const songs = filteredData
                .filter(story => story.song && story.song.trim() !== '')
                .map(story => {
                    const lyricsField = story.lyrics || '';

                    // Si tiene formato SBV, parsear
                    if (hasSBVFormat(lyricsField)) {
                        const parsed = parseSBV(lyricsField);
                        return {
                            order: story.order,
                            name: story.name,
                            key: story.key,
                            song: story.song,
                            saga: story.saga,
                            date: story.date,
                            lyrics: parsed.lyrics,
                            syncedLyrics: parsed.syncedLyrics
                        };
                    }

                    // Si no tiene formato SBV, dejar como está (retrocompatibilidad)
                    return {
                        order: story.order,
                        name: story.name,
                        key: story.key,
                        song: story.song,
                        saga: story.saga,
                        date: story.date,
                        lyrics: lyricsField
                    };
                });
            const outputPathSongs = path.join(__dirname, `${outputDir}songs.json`);
            await writeJsonToFile(songs, outputPathSongs);
            console.log(`JSON created songs.json for ${language} (${songs.length} songs)`);
        }
    }
}

const hasMandatoryCardFields = (card) =>  card.order && card.storyId && card.es && card.en
const hasMandatoryStoryFields = (story) => (story.order || story.id) && (story.name || story.title)

// Detecta si el texto tiene formato SBV (timestamps)
function hasSBVFormat(text) {
    if (!text || text.trim() === '') return false;
    // Busca patrón de timestamp SBV: 0:00:00.000,0:00:00.000
    const sbvPattern = /\d+:\d{2}:\d{2}\.\d{3},\d+:\d{2}:\d{2}\.\d{3}/;
    return sbvPattern.test(text);
}

// Convierte timestamp SBV (0:00:07.280) a segundos (7.28)
function sbvTimestampToSeconds(timestamp) {
    const parts = timestamp.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseFloat(parts[2]);
    return hours * 3600 + minutes * 60 + seconds;
}

// Parsea formato SBV y devuelve {lyrics: string, syncedLyrics: array}
function parseSBV(sbvText) {
    if (!sbvText || sbvText.trim() === '') {
        return { lyrics: '', syncedLyrics: [] };
    }

    const lines = sbvText.trim().split('\n');
    const syncedLyrics = [];
    const cleanLyrics = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i].trim();

        // Si es una línea de timestamp
        if (line.match(/\d+:\d{2}:\d{2}\.\d{3},\d+:\d{2}:\d{2}\.\d{3}/)) {
            const [startStr, endStr] = line.split(',');
            const start = sbvTimestampToSeconds(startStr);
            const end = sbvTimestampToSeconds(endStr);

            // Recoger todas las líneas de texto hasta la siguiente línea vacía o timestamp
            const textLines = [];
            i++;
            while (i < lines.length && lines[i].trim() !== '' && !lines[i].match(/\d+:\d{2}:\d{2}\.\d{3},\d+:\d{2}:\d{2}\.\d{3}/)) {
                textLines.push(lines[i]);
                i++;
            }

            const text = textLines.join('\n');
            if (text.trim()) {
                syncedLyrics.push({ start, end, text });
                cleanLyrics.push(text);
            }
        } else {
            i++;
        }
    }

    return {
        lyrics: cleanLyrics.join('\n\n'),
        syncedLyrics: syncedLyrics
    };
} 

async function retrieveCards() {
    const sheets = await authenticateGoogleSheets();
    const adjustedRange = 'Cards!A1:N999';
    const data = await readSpreadsheet(sheets, SPREADSHEET_CARD_ID, adjustedRange);
    const filteredData = data.filter(hasMandatoryCardFields)

    const outputPath = path.join(__dirname, `../src/data/cards.json`);
    await writeJsonToFile(filteredData, outputPath);
    console.log(`JSON created cards.json`);


    await writeJsonToFile(filteredData, outputPath);
}

async function main() {
    for (const [language, spreadsheetId] of Object.entries(SPREADSHEET_IDS)) {
        await processLanguage(language, spreadsheetId, OUTPUT_DIRS[language]);
    }
    await retrieveCards()
}

main().catch(err => console.error('Error processing spreadsheets:', err));
