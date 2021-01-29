import db from '../../db.json';

export default function dbHandler (req, res) {
    if(req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('AccessControl-Allow-Origin', '*');
    res.setHeader('AccessControl-Allow-Methods', 'GET, OPTIONS,PATCH,DELETE,POST,PUT');

    res.json(db);
}