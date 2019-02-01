import React from 'react';
import UnitList from '../../components/UnitList/UnitList';
import { inject, observer } from 'mobx-react';
import UnitStore from '../../stores/UnitStore';


/*
lang = p13n.getLanguage()
servicemapEngine = new Bloodhound
    name: 'suggestions'
    remote:
        url: appSettings.service_map_backend + "/search/?language=#{lang}&type=unit,service&page_size=4&input="
        replace: (url, query) =>
            url += query
            cities = p13n.getCities()
            if cities && cities.length
                url += "&municipality=#{cities.join(',')}"
            url
        ajax: settings.applyAjaxDefaults {}
        filter: (parsedResponse) ->
            parsedResponse.results
        rateLimitWait: 50
    datumTokenizer: (datum) -> Bloodhound.tokenizers.whitespace datum.name[lang]
    queryTokenizer: Bloodhound.tokenizers.whitespace
linkedeventsEngine = new Bloodhound
    name: 'events_suggestions'
    remote:
        url: appSettings.linkedevents_backend + "/search/?type=event&language=#{lang}&page_size=4&input=%QUERY"
        ajax: settings.applyAjaxDefaults {}
        filter: (parsedResponse) ->
            parsedResponse.data
        rateLimitWait: 50
    datumTokenizer: (datum) -> Bloodhound.tokenizers.whitespace datum.name[lang]
    queryTokenizer: Bloodhound.tokenizers.whitespace


*/
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
    console.log(units);
    return (
      <UnitList units={units}
      />
    );
  }
}

export default Search;