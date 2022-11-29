import React from "react";
import {
    Box,
    Divider,
    Fade,
    FormControl,
    LinearProgress,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from '@mui/material';
import ListView from "./ListView";
import {LoadingContext} from "../context";
import {ViewMode} from "../models";
import GridView from "./GridView";
import {readViewMode, saveViewMode} from "../torage";


interface IProps {
    directories: string[]
}

interface IState {
    loading: boolean
    view: ViewMode
}


class Home extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {loading: false, view: ViewMode.LIST}
    }


    setLoading = (value: boolean) => {
        this.setState({loading: value})
    }

    handleChange = (event: SelectChangeEvent) => {
        this.setState({view: Number(event.target.value) as ViewMode});
        saveViewMode(Number(event.target.value) as ViewMode)
    };

    view = (v: ViewMode) => {
        switch (v) {
            case ViewMode.GRID:
                return <GridView directories={this.props.directories}/>
            default:
                return <ListView directories={this.props.directories}/>
        }
    }

    componentDidMount() {
        this.setState({view: readViewMode()})
    }

    render() {
        const {loading, view} = this.state

        return (
            <>
                <Box sx={{height: 8}}>
                    <Fade in={loading} style={{transitionDelay: loading ? '800ms' : '0ms',}} unmountOnExit>
                        <LinearProgress/>
                    </Fade>
                </Box>

                <Box sx={{mr: 2}} display="flex" justifyContent={"flex-end"}>
                    <Typography sx={{mr: 1}}>查看:</Typography>
                    <FormControl sx={{minWidth: 80}} size="small">
                        <Select value={view.toString()} onChange={this.handleChange} title='查看' variant="standard">
                            <MenuItem value={ViewMode.LIST}>列表</MenuItem>
                            <MenuItem value={ViewMode.GRID}>小图标</MenuItem>
                        </Select>
                    </FormControl>

                </Box>
                <Divider/>
                <LoadingContext.Provider value={{setLoading: this.setLoading}}>
                    {this.view(view)}
                </LoadingContext.Provider>
            </>
        )
    }
}

export default Home;
