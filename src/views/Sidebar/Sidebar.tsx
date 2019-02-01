import React, { Component } from 'react';
import { withStyles, createStyles } from '@material-ui/core';
import './Sidebar.css';

const styles = createStyles({});

interface SidebarProps {
  isActive: boolean;
  children?: any;
  classes?: any;
}

class Sidebar extends React.Component<SidebarProps> {
  state: any = {};
  constructor(props: any) {
    super(props);
  }

  render() {
    const {classes} = this.props;

    // If no content hide
    if (!this.props.children!! || this.props.children.length === 0)
      return <div />;
    console.log(this.props.children);

    return (
      <div className="Sidebar">
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);