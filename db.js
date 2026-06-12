import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function initDb() {
  return open({
    filename: './mundiales.sqlite',
    driver: sqlite3.Database
  });
}