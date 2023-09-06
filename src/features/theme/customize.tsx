export async function fetchAIName() {
    try {
        const response = await fetch('/api/customization')
        const data = await response.json();
        let dataName = JSON.parse(data).name;

        return dataName;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function fetchLogoData() {
    try {
        const response = await fetch('/api/customization')
        const data = await response.json();
        let logoData = JSON.parse(data).logo;

        //console.log(logoData)
        return logoData;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const aiName = fetchAIName();

export const AI_NAME = aiName;
