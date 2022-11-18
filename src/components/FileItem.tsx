import Link from "next/link";
import style from "../../styles/Home.module.scss";
import {ListItemButton, ListItem, ListItemIcon} from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ListItemText from "@mui/material/ListItemText";
import {numberToFileSize, timeConverter} from "../utils";
import React, {MouseEventHandler} from "react";
import {FileType, IFileInfo} from "../models";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FolderIcon from '@mui/icons-material/Folder';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import ImageIcon from '@mui/icons-material/Image';
import VideoFileIcon from '@mui/icons-material/VideoFile';


interface IProps {
  fileInfo: IFileInfo
  url: string
  onClick?: MouseEventHandler | undefined;
  onContextMenu?: MouseEventHandler | undefined;
}

function fileIcon(t: FileType) {
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

export function FileItem(props: IProps) {
  let listItem = (
    <ListItemButton>
      <ListItemIcon>
        {fileIcon(props.fileInfo.type)}
      </ListItemIcon>
      <ListItemText className={style.itemName} primary={props.fileInfo.name}/>
      <div className={style.pInline}>
        <ListItemText className={style.itemSize} primary={numberToFileSize(props.fileInfo.size)}/>
        <ListItemText className={style.itemData}
                      primary={timeConverter(props.fileInfo.modifyTime)}/>
      </div>
    </ListItemButton>
  )

  return (
    <ListItem disablePadding onContextMenu={props.onContextMenu} onClick={props.onClick}>
      {props.fileInfo.isDir ?
        <Link href={props.url} className={style.fileItem}>
          {listItem}
        </Link> :
        <a href={props.url} className={style.fileItem}>
          {listItem}
        </a>
      }
    </ListItem>
  )
}
