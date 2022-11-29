import {FileType, IFileInfo} from "./models";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import ImageIcon from "@mui/icons-material/Image";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import React from "react";
import {SxProps} from "@mui/material";


export const numberToFileSize = (num: number) => {
    const units = ["B", "KB", "MB", "GB", "TB", "PB"]
    let p = 0

    while (num >= 1024) {
        num /= 1024
        p++
    }

    let numStr = num.toFixed(2).toString()
    let i = numStr.length - 1
    while (numStr[i] == '0') i--
    if (numStr[i] == '.') i--

    return numStr.slice(0, i + 1) + units[p]
}

export function timeConverter(UNIX_timestamp: number) {
    const a = new Date(UNIX_timestamp * 1000);
    const year = a.getFullYear();
    const month = a.getMonth() + 1;
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    return year + '年-' + month + '月-' + date + '日 ' + hour + ':' + min + ':' + sec;
}

export function fileIcon(t: FileType, sx?: SxProps) {
    if (sx) {
        switch (t) {
            case FileType.FOLDER:
                return <FolderIcon color={"action"} sx={sx}/>
            case FileType.UNKNOWN:
                return <InsertDriveFileIcon color={"action"} sx={sx}/>
            case FileType.TEXT:
                return <TextSnippetIcon color={"action"} sx={sx}/>
            case FileType.IMAGE:
                return <ImageIcon color={"action"} sx={sx}/>
            case FileType.VIDEO:
                return <VideoFileIcon color={"action"} sx={sx}/>
            case FileType.AUDIO:
                return <AudioFileIcon color={"action"} sx={sx}/>
            default:
                return <InsertDriveFileIcon color={"action"} sx={sx}/>
        }
    }
    switch (t) {
        case FileType.FOLDER:
            return <FolderIcon/>
        case FileType.UNKNOWN:
            return <InsertDriveFileIcon/>
        case FileType.TEXT:
            return <TextSnippetIcon/>
        case FileType.IMAGE:
            return <ImageIcon/>
        case FileType.VIDEO:
            return <VideoFileIcon/>
        case FileType.AUDIO:
            return <AudioFileIcon/>
        default:
            return <InsertDriveFileIcon/>
    }
}

export function sortByIsDir(files: IFileInfo[]) {
    files.sort((a, b) => {
        if (a.isDir && !b.isDir) return -1;
        if (a.isDir && b.isDir) return 0;
        if (!a.isDir && !b.isDir) return 0;
        if (!a.isDir && b.isDir) return 1;
        return 0;
    })
}
