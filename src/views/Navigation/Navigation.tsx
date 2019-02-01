import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { theme } from '../../theme';
import NavItem from './NavItem';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import './Navigation.css';
import DropdownContent from '../../components/DropdownContent/DropdownContent';
import { inject } from 'mobx-react';
import UnitStore from '../../stores/UnitStore';
import { keyboardHandler } from '../../utils';
import { withRouter } from 'react-router';

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
  title: {
    display: 'none',
    color: '#fff'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 6,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 6,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

interface NavigationProps {
  isActive: boolean;
  children?: any;
  classes?: any;
  unitStore?: UnitStore;
  searchWord: string;
  history?: any;
}

interface InjectedProps {
  unitStore: UnitStore;
}

@inject('unitStore')
class Navigation extends React.Component<NavigationProps> {
  state: any = {
    isActive: false,
    searchWord: ''
  };
  contentRef: any;
  constructor(props: any) {
    super(props);
    this.setContentRef = this.setContentRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  get injectedProps() {
    return this.props as InjectedProps;
  }

  /**
   * Set the wrapper ref
   */
  setContentRef(node: any) {
    this.contentRef = node;
  }

  /**
   *  TEST
   * Alert if clicked on outside of element
   * DOESN'T WORK
   */
  handleClickOutside(event: any) {
    if (this.contentRef && !this.contentRef.contains(event.target)) {
      alert('You clicked outside of me!');
      this.setState({
        isActive: false
      });
    }
  }

  // Handle NavItem click events
  handleNavItemClick(e:any, element: any) {
    const event = e;
    const offset = e.currentTarget.getBoundingClientRect();
    //console.log('event', event);
    //console.log('offset', offset);
    //console.log('target', e.target);
    this.setState({
      offset: offset.left,
      isActive: true
    });
  }

  handleInputChange(e: any) {
    this.setState({
      searchWord: e.target.value
    })
  }

  handleSearch(e:any) {
    const {unitStore} = this.injectedProps;
    const {history} = this.props;
    if (unitStore && unitStore.fetchUnits) {
      keyboardHandler(() => {
        unitStore.fetchUnits(this.state.searchWord);
        try {
          history && history.push("/search")
        } catch(e) {
          console.log(e);
          new Error('Router history context doesn\'t exist.')
        }
      }, ['enter'])(e)
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                name="search"
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onKeyPress={(e: any) => {
                  this.handleInputChange(e);
                  this.handleSearch(e);
                }}
              />
            </div>
            <Typography className={classes.title} variant="h6" color="default" noWrap>
              Material-UI
            </Typography>
            <NavItem
              label="Omat asetukset"
              icon={<DeleteIcon className={classes.rightIcon} />}
              onClick={this.handleNavItemClick.bind(this)}
            />
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <NavItem
                label="Svenska | English"
              />
            </div>
          </Toolbar>
        </AppBar>
        {/*<DropdownContent ref={this.contentRef} isActive={this.state.isActive} style={{ left: this.state.offset}} />*/}
      </div>
    );
  }
}

export default withRouter<any>(withStyles(styles)(Navigation));
