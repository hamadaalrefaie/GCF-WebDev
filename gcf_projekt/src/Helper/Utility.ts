import { ProjektModel } from "./Models";

export async function FetchProjects () {
    const reqHeaders = new Headers();
    reqHeaders.append("accept", "application/json");
    reqHeaders.append("Access-Control-Allow-Origin", "*");

    const res = await fetch("/v1/projects", {
        method: "Get",
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

