export function useStorage() {
    const client = useSupabaseClient();

    async function uploadDocument(
        file: File,
        owner_id: string,
        type: string,
        to: string,
        options = {
            upsert: true,
        }
    ): Promise<boolean> {
        const name = owner_id + "/" + type;
        const { data, error } = await client.storage.from(to).upload(name, file, options);

        if (error) {
            console.log("Error Uploading File: ", error);
            return false;
        }

        return true;
    }

    async function downloadFile(from: string, path: string) {
        const { data, error } = await client.storage.from(from).download(path);

        if (error) {
            console.error("Error downloading file: ", error);
        }
        if (data) {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(data);
            a.setAttribute("download", path);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    return { uploadDocument, downloadFile };
}
