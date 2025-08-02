const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('settings.env'))
    require('dotenv').config({ path: __dirname + '/settings.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0piMzFpWWgvTHgvTGc5NFBCV0JxTXBSNy85NXRyRGpObGJxc3VYSTZWYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTjA4OUkraUFYZE1LZCtkWHYrd09LYVZDQ2ZxSVpnRmwrekVVNlVvK0Vqaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhQmdJU1FIZlkrM2tNNTl3TS80Z3ZJNDBCSi9TWlN4bnZobFdCbE5Tb1ZnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIeldtMWVhSkdqT29OYm5GdStGQlpoN2tLMzFsaXZ4N09EUk1uTExWZHdVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndMZGVwRnNmWXcwb0U0amRkMTVNNkQxTEtXT1lWZE11SktPTFZ2RVFEMlk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVnZkpOdnByNWFkVFhkV1VocHdDWk1OM2hSb0txRVU2TjZ4YmJQeUk0QnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEFHSlhTTkVsbERiSHhZd0tTbjFTUkhwTi9BanJtZCthdytMY3ZJbnExTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL28yKzhPYWZ4enI1bmZDeGQ2V0dja2g2L0F0NWhIbkdnWTFxQXNqbjh5bz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImM5emlHazFKNDZIc0JwYlNkZzhsajRZQmhKb2hIUE5hZG1SaGZUaWtrdVlyOERwSGwyVFk1T1A4Z2tXY0FEOVhaWi9Ib3V3bzRQR25zN2VMZ083L0JRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAsImFkdlNlY3JldEtleSI6IlduWXlzSUw2SFZNWDhveUpKTVVoRlRzekZKS3QxbURtcXVxQVZTTnY2NG89IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0NzAzMDY3NDAwOEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3MDU5RERFNDg0QUJEMzlDQjA0N0IzRDVBNjg2NjJCQiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU0MTQ3NzUyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ3MDMwNjc0MDA4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkM0NzdGMDRGQTg5QzJGN0JGMjY4OTRFODg0NzFFRDBBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQxNDc3NTN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzNDcwMzA2NzQwMDhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOEFDN0FFMkM0REQ4QTQ1MkJDNTcxREQ2NTQzMkM0NkYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NDE0Nzc3MH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0NzAzMDY3NDAwOEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1NjI3RjVERUJDRDg1Q0IwRTU4MERDOTQ4MEFCQjM3MyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU0MTQ3NzgwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ3MDMwNjc0MDA4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjJDMjZGMjU0MjYyQ0VBNUNDREEzQjlBQjRDRjUxN0Q4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQxNDc3OTJ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkNGNTM5OENCIiwibWUiOnsiaWQiOiIyMzQ3MDMwNjc0MDA4OjI3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ik9wZW1pcG/igbciLCJsaWQiOiIxMjAzMjg0NzQ4NjE1Nzg6MjdAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJN3QrTnNHRUpiWHVNUUdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJFNElLVnNFWHJIQVRFRERCbU9kSVhqRStDdWJDN2F2d0pOOW1YOHVLZ1FjPSIsImFjY291bnRTaWduYXR1cmUiOiJ1ZHJtYjdnSzdNUENBTFpRSmVvWnU0cUxGdzd1dkl0a1loVVFYRjFkQkxQZk1aM1NUanAySEI4b1ZlZTZxeWhVbFJqOTA4V1dDOExIaHB6VzFmN0dCdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTk1XQmhUUVpneTZBQXNETlM2cEMwSHRLWGFzRHhjSTNvUEZQcGtlcFRyTCtpUEN0clh6cDE1M1pWa1RDYW5MUnZwV0tyUGRuNG50VGJ5Tnk2a3VsQlE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDMwNjc0MDA4OjI3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlJPQ0NsYkJGNnh3RXhBd3daam5TRjR4UGdybXd1MnI4Q1RmWmwvTGlvRUgifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1NDE0Nzc0NywibGFzdFByb3BIYXNoIjoiMkc0QW11IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFIbXgifQ==',
    PREFIXE: process.env.PREFIX || "@",
    OWNER_NAME: process.env.OWNER_NAME || "Arikeh",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2347030674008",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY, // ✅
    WARN_COUNT : process.env.WARN_COUNT || '3',
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    CHAT_BOT: process.env.CHAT_BOT || 'yes', // ✅
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway"
        : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
