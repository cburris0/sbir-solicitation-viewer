import { SolicitationRequestParams, SolicitationsQueryParams } from "router/solicitations";
import * as data from "data/sbir-resp.json";

export async function listSolicitations(query: SolicitationsQueryParams): Promise<String[]>
{
    // return solicitations from database table
    console.log("Fetching list of solicitations");
    return [];
}

export async function getSolicitation(req: SolicitationRequestParams): Promise<Object>
{
    // return single solicitation based on id
    console.log("Getting solicitation");
    return {};
}

export async function loadSolicitations(): Promise<string>
{
    try
    {
        console.log("Loading solicitation data...");

        // fetch data from SBIR endpoint
        // const url = new URL(process.env.SBIR_SOLICITATION_ENDPOINT);
        // const response = await fetch(url);
        // console.log(`Response from API: ${response.json()}`);

        // but actually get them from the json file
        const solicitations = data;
        console.log(`We have ${solicitations.length} solicitations`);

        return "200"; // TODO: Replace with an http status package
    }
    catch (err)
    {
        // TODO: Better error responses
        throw err;
    }

}