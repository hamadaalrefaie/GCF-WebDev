import { ProjektModel } from "./Models";


export async function FetchProjects () {
    const reqHeaders = new Headers();
    reqHeaders.append("accept", "application/json");
    reqHeaders.append("Access-Control-Allow-Origin", "*");
    reqHeaders.append("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS");
    reqHeaders.append("Access-Control-Allow-Origin", "http://localhost:3000/");

    const res = await fetch("https://api.gcfund.org/v1/projects", {
        method: "Get",
        redirect :"follow",
        headers: reqHeaders

    });

    if(res.ok) {
        const resJson: ProjektModel[] = await res.json();
        return resJson;
    }

    return [];
}

export interface hasHTable {
    [key: string]: any; // 👈️ variable key
};