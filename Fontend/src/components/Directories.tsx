import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from "next/link";
import style from "../../styles/Home.module.scss"
import React from "react";

interface IProps {
    directories: string[]
}

export function Directories(props: IProps) {
    let key = 0
    let url = ""
    let links: any[] = []

    for (let i = 0; i < props.directories.length - 1; i++) {
        url += "/" + props.directories[i]
        links.push(
            <Link key={key++} aria-label={props.directories[i]} className={style.hoverUnderline}
                  href={url}>{props.directories[i]}</Link>
        )
    }


    return (
        <Breadcrumbs sx={{fontSize: 18}} className={style.directories} aria-label="breadcrumb">
            <Link aria-label={"根"} className={style.hoverUnderline} href="/">根</Link>
            {links}
            <Typography sx={{fontSize: 18}} aria-label={props.directories[props.directories.length - 1]}
                        color="text.primary">{props.directories[props.directories.length - 1]}</Typography>
        </Breadcrumbs>
    )
}
