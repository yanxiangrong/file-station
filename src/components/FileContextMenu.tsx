import {FileType, IFileInfo} from "../models";
import {Divider, Menu, MenuItem, Typography} from "@mui/material";
import React from "react";
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import path from "path";
import {Router, withRouter} from "next/router";


interface IProps {
  contextMenu: {
    mouseX: number;
    mouseY: number;
    props: { item: IFileInfo, url: string }
  } | null
  router: Router
}

interface IState {
  open: boolean
}

const openNewTabDisable = (t: FileType) => {
  switch (t) {
    case FileType.FOLDER:
    case FileType.TEXT:
    case FileType.AUDIO:
    case FileType.VIDEO:
    case FileType.IMAGE:
      return false
    default:
      return true
  }
}

class FileContextMenu extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {open: false}
  }

  componentDidMount() {
    if (this.props.contextMenu !== null && !this.state.open) {
      this.setState({open: true})
    }
  }

  handleMenuClick = (event: React.MouseEvent) => {
    event.preventDefault();
    this.setState({open: false})
  }

  handleClose = () => {
    this.setState({open: false})
  };

  openInNewTab = () => {
    if (this.props.contextMenu) {
      window.open(this.props.contextMenu.props.url, '_blank', 'noopener,noreferrer');
    }
    this.handleClose()
  };

  openUrl = () => {
    if (this.props.contextMenu) {
      if (this.props.contextMenu.props.item.isDir) {
        this.props.router.push(this.props.contextMenu.props.url).then()
      } else {
        window.open(this.props.contextMenu.props.url, '_self', 'noopener,noreferrer');
      }
    }
    this.handleClose()
  }

  download = () => {
    if (this.props.contextMenu) {
      const url = new URL(path.join(window.location.href, this.props.contextMenu.props.item.name))
      url.searchParams.append('download', String(1))
      window.open(url, '_self', 'noopener,noreferrer');
    }
    this.handleClose()
  }


  handleCopyName = () => {
    if (this.props.contextMenu) {
      navigator.clipboard.writeText(this.props.contextMenu.props.item.name).then();
    }
    this.handleClose()
  }

  handleCopyUrl = () => {
    if (this.props.contextMenu) {
      navigator.clipboard.writeText(path.join(window.location.href, this.props.contextMenu.props.item.name)).then();
    }
    this.handleClose()
  }


  componentDidUpdate(prevProps: Readonly<IProps>) {
    if (prevProps.contextMenu !== this.props.contextMenu && this.props.contextMenu !== null) {
      this.setState({open: true})
    }
  }

  render() {
    const {contextMenu} = this.props
    const {open} = this.state
    let fType = FileType.UNKNOWN
    let downloadable = false
    if (contextMenu) {
      fType = contextMenu.props.item.type
      downloadable = !contextMenu.props.item.isDir
    }

    return (
      <Menu
        onContextMenu={this.handleMenuClick}
        open={open}
        anchorReference="anchorPosition"
        onClose={this.handleClose}
        anchorPosition={
          contextMenu !== null
            ? {top: contextMenu.mouseY, left: contextMenu.mouseX}
            : undefined
        }>
        <MenuItem disabled={openNewTabDisable(fType)} onClick={this.openUrl}>
          <FileOpenOutlinedIcon fontSize={'small'}/><Typography ml={1}>打开</Typography>
        </MenuItem>
        <MenuItem disabled={openNewTabDisable(fType)} onClick={this.openInNewTab}>
          <OpenInNewOutlinedIcon fontSize={'small'}/><Typography ml={1}>在新标签页打开</Typography>
        </MenuItem>

        <Divider/>
        <MenuItem disabled={!downloadable} onClick={this.download}>
          <FileDownloadOutlinedIcon fontSize={'small'}/><Typography ml={1}>下载</Typography>
        </MenuItem>
        <MenuItem onClick={this.handleCopyName}>
          <ContentCopyOutlinedIcon fontSize={'small'}/><Typography ml={1}>复制文件名</Typography>
        </MenuItem>
        <MenuItem onClick={this.handleCopyUrl}>
          <InsertLinkOutlinedIcon fontSize={'small'}/><Typography ml={1}>复制链接</Typography>
        </MenuItem>
      </Menu>
    )
  }
}

export default withRouter(FileContextMenu)
