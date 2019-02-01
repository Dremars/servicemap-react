import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


interface CustomExpansionProps {
  content: {
    label: string;
    children: any;
  }[];
  classes: any
}

// Custom expansion panel component
const CustomExpansionPanel: any = (props: CustomExpansionProps) => {
  const { classes, content } = props;
  if(content && content.length > 0) {
    const listItems = props.content.map(content => {
      return (
        <ExpansionPanel key={content.label}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{content.label}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {content.children}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
    return listItems;
  }
  return false;
}

export default CustomExpansionPanel;