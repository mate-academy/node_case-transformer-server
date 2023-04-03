/* eslint-disable no-console */
import axios from 'axios';

const BASE = 'http://localhost:3000';
const pathName = '/users/3/friends';
const search = '?name=John&lastname=Doe';

const href = BASE + pathName + search;

console.log(href);

axios.get(href).catch(() => console.log('Some error!'));
