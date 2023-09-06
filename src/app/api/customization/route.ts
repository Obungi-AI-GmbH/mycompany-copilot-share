import { getBlob, getLogoData } from "@/features/common/blob";
import { writeBlob } from "@/features/common/blob";

export async function GET() {
    const result = await getBlob('customization.json');
    const logo = await getLogoData('logo.jpg');
    const resultString = new TextDecoder("utf-8").decode(result);
    const resultJSON = JSON.parse(resultString);
    const logoJSON = {
        "logo":logo
    }
    const mergedObject = {...logoJSON, ...resultJSON}
    // Convert the merged object to a JSON string
    const mergedJSON = JSON.stringify(mergedObject);
    // The "double" stringify is on purpose and is only recognized in the frontend if doing so
    return new Response(JSON.stringify(mergedJSON))
    //return new Response(mergedJSON);
}

export async function PATCH(req: Request) {
    const updatedData = await req.json();
    writeBlob(updatedData);

    return new Response("Successfully updated the customization", { status: 200 });
}
