import React from "react";
import {Directories} from "./Directories";
import FileContextMenu from "./FileContextMenu";
import {FileType, IFileInfo} from "../models";
import {ButtonBase, Card, CardMedia, Container, Grid, Typography} from "@mui/material";
import path from "path";
import {LoadingContext} from "../context";
import {fetchData} from "../api";
import {fileIcon, sortByIsDir} from "../utils";
import Link from "next/link";
import style from "../../styles/Home.module.scss";


interface IProps {
    directories: string[]
}

interface IState {
    files: IFileInfo[]
    contextMenu: {
        mouseX: number;
        mouseY: number;
        props: { item: IFileInfo, url: string }
    } | null
}


class GridView extends React.Component<IProps, IState> {
    context!: React.ContextType<typeof LoadingContext>;

    constructor(props: IProps) {
        super(props);
        this.state = {files: [], contextMenu: null}
    }

    handleContextMenu = (event: React.MouseEvent, item: IFileInfo, url: string) => {
        event.preventDefault();
        this.setState({
            contextMenu: {
                mouseX: event.clientX + 2,
                mouseY: event.clientY - 6,
                props: {item: item, url: url}
            }
        });
    };

    updateFiles = () => {
        fetchData(this.props.directories.join('/')).then((serverFiles: IFileInfo[]) => {
            sortByIsDir(serverFiles)
            this.setState({files: serverFiles})
            this.context?.setLoading(false)
        })
    }


    componentDidMount() {
        this.updateFiles()
    }

    componentDidUpdate(prevProps: Readonly<IProps>) {
        if (this.props.directories.join() != prevProps.directories.join()) {
            this.updateFiles()
        }
    }

    render() {
        let key = 0
        const {directories} = this.props
        const {files, contextMenu} = this.state

        const infoItems = files.map((file) => {
            let url = '/' + directories.join('/')
            if (file.name == '.') {
            } else if (file.name == '..') {
                url = path.join(url, '..')
            } else {
                url = path.join(url, file.name)
            }

            const handleFileItemMenu = (event: React.MouseEvent) => {
                this.handleContextMenu(event, file, url)
            }

            const itemClickHandler = () => {
                if (url != window.location.pathname) {
                    this.context?.setLoading(true)
                }
            }

            const fileItem = (
                <ButtonBase onContextMenu={handleFileItemMenu} onClick={itemClickHandler}>
                    <Card variant="outlined" sx={{Width: 120}}>
                        {file.type != FileType.IMAGE ? (
                            <CardMedia>
                                {fileIcon(file.type, {width: 1, height: 100})}
                            </CardMedia>
                        ) : (
                            <CardMedia>
                                <img style={{width: 120, height: 100, objectFit: "contain"}} src={url + '?preview=1'}
                                     alt={file.name}
                                     loading="lazy"/>
                            </CardMedia>
                        )
                        }
                        <CardMedia sx={{pl: 0.5, pr: 0.5}}>
                            <Typography sx={{fontSize: 14, width: 104, wordBreak: 'break-all'}} gutterBottom>
                                {file.name}
                            </Typography>

                        </CardMedia>
                    </Card>
                </ButtonBase>
            )

            return (
                <Grid key={key++} item>
                    {
                        file.isDir ?
                            <Link href={url} className={style.fileItem}>
                                {fileItem}
                            </Link> :
                            <a href={url} className={style.fileItem}>
                                {fileItem}
                            </a>
                    }
                </Grid>
            )
        });

        return (
            <Container sx={{mt: 1}}>
                <Directories directories={directories}/>

                <Grid sx={{mt: -0.5}} container spacing={2}>
                    {infoItems}
                </Grid>

                <FileContextMenu contextMenu={contextMenu}/>
            </Container>
        );
    }
}

GridView
    .contextType = LoadingContext
export default GridView;
