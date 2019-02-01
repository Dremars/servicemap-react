import React from "react";
import { observer, inject } from "mobx-react";
import UnitStore from "../../stores/UnitStore";
import './DetailView.css';
import CustomExpansionPanel from "../../components/CustomExpansionPanel/CustomExpansionPanel";

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
  class DetailView extends React.Component<any> {
    state: any = {};
    constructor(props: any) {
      super(props);
    }
    get injectedProps() {
      return this.props as InjectedProps;
    }

    componentDidMount() {
      const {unitStore} = this.injectedProps;

      if (unitStore && this.props.match.params.unit) {
        const unit: any = unitStore.getUnit(this.props.match.params.unit as number);

        if (unit)
          return;
          
        unitStore.fetchUnit(this.props.match.params.unit);
      }
    }
    render() {
      const {classes, unitStore} = this.props;
      const unit: any = unitStore && unitStore.getUnit(this.props.match.params.unit as number);
      console.log(unit);
      console.log(this.props.match.params.unit);
      
      if (unit) {
        return (
            <div className="DetailView">
                <h3>ID: {unit.id}</h3>
                {
                  unit.picture_url
                  &&
                  <img src={unit.picture_url} />
                }
                <h3>{unit.name.fi}</h3>
                {
                  unit.contract_type && unit.contract_type.description.fi
                  &&
                  <p className="text-small">{unit.contract_type.description.fi}</p>
                }
                
                <p>{`${unit.street_address.fi}, ${unit.address_zip} ${unit.municipality ? unit.municipality.charAt(0).toUpperCase() + unit.municipality.slice(1) : ''}`}</p>
                <CustomExpansionPanel content={[
                  {
                    label: "Esteettömyys",
                    children: (
                      <p>Esteettömyys sisältö</p>
                    )
                  },
                  {
                    label: "Tilavaraukset",
                    children: (
                      <p>Tilavaraukset sisältö</p>
                    )
                  },
                  {
                    label: "Reitti tänne",
                    children: (
                      <p>Reitti tänne sisältö</p>
                    )
                  },
                  {
                    label: "Tapahtumat",
                    children: (
                      <p>Tapahtumat sisältö</p>
                    )
                  },
                  {
                    label: "Verkossa",
                    children: (
                      <p>Verkossa sisältö</p>
                    )
                  },
                  {
                    label: "Palaute",
                    children: (
                      <p>Palaute sisältö</p>
                    )
                  },
                ]}/>
            </div>
          );
      }
      return <div>No unit found</div>
    }
  }
  
  export default DetailView;