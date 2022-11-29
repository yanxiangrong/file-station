import {IFileInfo, IFilePath} from "./models";

export const fetchData = async (path: string) => {
    const requestOptions: RequestInit = {
        method: 'post',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({path: path} as IFilePath)
    }
    // return []
    const response = await fetch("http://localhost:8000/api/path_info", requestOptions)
    if (response.status != 200) return []

    const data: IFileInfo[] = await response.json()

    return data
}
