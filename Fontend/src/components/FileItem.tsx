import Link from "next/link";
import style from "../../styles/Home.module.scss";
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {fileIcon, numberToFileSize, timeConverter} from "../utils";
import React, {MouseEventHandler} from "react";
import {IFileInfo} from "../models";


interface IProps {
    fileInfo: IFileInfo
    url: string
    onClick?: MouseEventHandler | undefined;
    onContextMenu?: MouseEventHandler | undefined;
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
