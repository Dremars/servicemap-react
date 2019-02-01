import React from 'react';
import UnitList from '../../components/UnitList/UnitList';
import { inject, observer } from 'mobx-react';
import UnitStore from '../../stores/UnitStore';

interface SearchProps {
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
class Search extends React.Component<SearchProps> {
  state: any = {};
  constructor(props: any) {
    super(props);
  }
  get injectedProps() {
    return this.props as InjectedProps;
  }

  render() {
    const {classes, unitStore} = this.props;
    const units: any[] = unitStore && unitStore.units || [];
    return (
      <UnitList units={units}
      />
    );
  }
}

export default Search;