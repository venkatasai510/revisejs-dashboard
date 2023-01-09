import { Revise } from "revise-sdk";


export const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIxZHNoYXRiaCIsImlhdCI6MTY3MTUyNzI5N30.furSPxyZagtP9KRReIOaa0QNn-DvWhzMXtoeNti8PqM";
export const revise = new Revise({ auth: AUTH_TOKEN, serverURL: 'http://localhost:3000' });

export const baseUrl = "http://localhost:3000";