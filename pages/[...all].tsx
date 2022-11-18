import Home from "../src/components/Home";
import React from "react";


interface IProps {
  directories: string[]
}

class All extends React.Component<IProps, any> {
  render() {
    return (
      <Home directories={this.props.directories}/>
    )
  }
}

export default All;

export async function getServerSideProps(context: any) {
  return {props: {directories: context.params.all}}
}
