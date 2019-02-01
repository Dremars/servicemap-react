import React, { Component } from 'react';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = createStyles({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  NavItem: {
    boxShadow: 'none'
  }
});

function NavItem(props: any,) {
	const { classes } = props;
	return (
    <Button variant="contained" color="primary" className="NavItem" style={styles.NavItem} onClick={props.onClick}>
      {props.icon}
      {props.label}
    </Button>
	);
}

export default withStyles(styles)(NavItem);
