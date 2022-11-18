import React from "react";
import {Fade, Box, LinearProgress} from '@mui/material';
import ListView from "./ListView";
import {LoadingContext} from "../context";


interface IProps {
  directories: string[]
}

interface IState {
  loading: boolean
}


class Home extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {loading: false}
  }


  setLoading = (value: boolean) => {
    this.setState({loading: value})
  }

  render() {
    const {loading} = this.state

    return (
      <>
        <Box sx={{height: 8}}>
          <Fade
            in={loading}
            style={{
              transitionDelay: loading ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <LinearProgress/>
          </Fade>
        </Box>
        <LoadingContext.Provider value={{setLoading: this.setLoading}}>
          <ListView directories={this.props.directories}/>
        </LoadingContext.Provider>
      </>
    )
  }
}

export default Home;
