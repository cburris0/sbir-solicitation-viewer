require('dotenv/config');

async function loadSolicitationData()
{
    try
    {
        const response = await fetch(`${process.env.API_ENDPOINT}/solicitations.loadSolicitations`);
        const result = await response.json();
        console.log('Result:', result)
        console.log("Data loaded successfully");
    }
    catch (error)
    {
        console.error("Failed to load data: ", error);
        process.exit(1);
    }
}

loadSolicitationData();