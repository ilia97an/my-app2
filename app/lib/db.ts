// generic singleton creator:
export function createSingleton<T>(name: string, create: () => T): T {
    const s = Symbol.for(name);
    let scope = (global as any)[s];
    if (!scope) {
        scope = {...create()};
        (global as any)[s] = scope;
    }
    return scope;
}

import * as pgLib from 'pg-promise';
//const pgp = pgLib();
const pgp = require('pg-promise')();
//import * as pgp from 'pg-promise';
//import pgPromise from 'pg-promise';
//const pgp = pgPromise();

interface IDatabaseScope {
    // db: pgp.IDatabase<any>;
    // pgp: pgp.IMain;
    db: pgLib.IDatabase<any>;
    pgp: pgLib.IMain;
}

export function getDB(): IDatabaseScope {
    return createSingleton<IDatabaseScope>('my-app-db-space', () => {
        return {
            db: pgp(process.env.PG_CONNECTION_STRING),
            pgp
        };
    });
}

