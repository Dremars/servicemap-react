import * as React from "react";
import { createStyles } from "@material-ui/core";

import './DropdownContent.css';

const styles = createStyles({
  
});

interface DropdownContentProps {
  isActive: boolean;
  children?: any;
  style?: any;
}

class DropdownContent extends React.Component<DropdownContentProps> {
  state = {};
  // Default props
  props: DropdownContentProps = {
    isActive: false,
  };
  constructor(props: any) {
    super(props);
  }

  render() {
    if (!this.props.isActive) {
      return <div/>;
    }
    return (
      <div className="DropdownContent " style={this.props.style}>
        {this.props.isActive && 'IsActive'}
        {this.props.children}
      </div>
    );
  }
}

export default DropdownContent;