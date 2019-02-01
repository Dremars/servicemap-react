import React from 'react';
import { ListItem, List, ListItemText } from '@material-ui/core';
import './UnitList.css';
import { Link } from "react-router-dom";


interface UnitListProps {
    units: any[];
}

// Unit list component
const UnitList: any = (props: UnitListProps) => {
  if (props.units && props.units.length > 0) {
    const listItems = props.units.map(unit => {
      return (
        <Link to={`/detail/${unit.id}`} key={unit.id} style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemText primary={unit.name.fi} />
          </ListItem>
        </Link>
      )
    })
    return (
      <List className="UnitList">
        {listItems}
      </List>
    );
  }
  return false; 
}

export default UnitList;