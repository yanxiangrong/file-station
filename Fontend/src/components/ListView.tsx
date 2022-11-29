import React from "react";
import {Container, List} from "@mui/material";
import {Directories} from "./Directories";
import FileContextMenu from "./FileContextMenu";
import path from "path";
import {FileItem} from "./FileItem";
import {IFileInfo} from "../models";
import {fetchData} from "../api";
import {LoadingContext} from "../context";
import {sortByIsDir} from "../utils";


interface IState {
    files: IFileInfo[]
    contextMenu: {
        mouseX: number;
        mouseY: number;
        props: { item: IFileInfo, url: string }
    } | null
}

interface IProps {
    directories: string[]
}

class ListView extends React.Component<IProps, IState> {
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

        const infoItems = files.map((item) => {
            let url = '/' + directories.join('/')
            if (item.name == '.') {
            } else if (item.name == '..') {
                url = path.join(url, '..')
            } else {
                url = path.join(url, item.name)
            }

            const handleFileItemMenu = (event: React.MouseEvent) => {
                this.handleContextMenu(event, item, url)
            }

            const itemClickHandler = () => {
                if (url != window.location.pathname) {
                    this.context?.setLoading(true)
                }
            }

            return (
                <FileItem onContextMenu={handleFileItemMenu} onClick={itemClickHandler} key={key++} fileInfo={item}
                          url={url}/>
            )
        });


        return (
            <Container sx={{mt: 1}} maxWidth="md">
                <Directories directories={directories}/>
                <List dense={true}>
                    {infoItems}
                </List>

                <FileContextMenu contextMenu={contextMenu}/>
            </Container>
        );
    }
}

ListView.contextType = LoadingContext
export default ListView;
