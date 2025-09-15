require('dotenv/config');

async function loadSolicitationData()
{
    try
    {
        console.log("BEGINNING DATA LOAD...");
    await fetch(`${process.env.API_ENDPOINT}/api/load-solicitations`, {
        method: "POST"
    });
        console.log("SBIR DATA LOAD COMPLETE");
    }
    catch (error)
    {
        console.error("Failed to load data: ", error);
        process.exit(1);
    }
}

loadSolicitationData();