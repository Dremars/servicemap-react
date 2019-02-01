import React from "react";
import { observer, inject } from "mobx-react";
import UnitStore from "../../stores/UnitStore";

interface DetailProps {
    isActive: boolean;
    children?: any;
    classes?: any;
    unitStore?: UnitStore;
  }
  
  interface InjectedProps {
    unitStore: UnitStore;
  }
  
  @inject('unitStore')
  @observer
  class Detail extends React.Component<any> {
    state: any = {};
    constructor(props: any) {
      super(props);
    }
    get injectedProps() {
      return this.props as InjectedProps;
    }
    render() {
      const {classes, unitStore} = this.props;
      const unit: any = unitStore && unitStore.getUnit(this.props.match.params.unit as number);
      console.log(unit);
      console.log(this.props.match.params.unit);
      
      if (unit) {
        return (
            <div>
                <h3>ID: {unit.id}</h3>
                <h3>ID: {unit.name.fi}</h3>
            </div>
          );
      }
      return <div> No unit found</div>
    }
  }
  
  export default Detail;