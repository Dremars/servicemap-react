import { observable, computed, action } from 'mobx';


// Search urls TODO move to config file
const apiRootPath = 'https://api.hel.fi/servicemap/v2';
const unitPath = (unitID: number) => {
  return apiRootPath + '/unit/' + unitID + '/?include=services'
};
const searchPath = (search: string, type: 'event' | 'unit,service', language: string) => {
  return apiRootPath + '/search/?type=' + type + '&language=' + language + '&input=' + search;
}


export default class UnitStore {

  @observable private _cache: any[] = [];//new Map<string, Unit>();

  @observable private _errorMsg: string | undefined | null;
  @observable private _successMsg: string | undefined | null;

  constructor() {
  }

  @action
  fetchUnits = (search: string) => {
    console.log('Fetching with search: ', search)
    try {
      fetch(searchPath(search, 'unit,service', 'fi'), {
        method: 'get',
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          this._cache = data.results;
        })
    } catch (error) {
      this._errorMsg = 'Error fetching units';
      return Promise.reject(this._errorMsg);
    }
  }


  @action
  fetchUnit = (unitID: number) => {
    console.log('Fetching unit with id: ', unitID)
    try {
      fetch(unitPath(unitID), {
        method: 'get',
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log('Unit fetch data: ',data)
          // TODO: Not necessarily needed. Needs check for if data exists
          this._cache.push(data);
        })
    } catch (error) {
      this._errorMsg = 'Error fetching unit';
      return Promise.reject(this._errorMsg);
    }
  }

  @computed
  get errorMessage(): string | null {
    return !this._errorMsg ? null : this._errorMsg;
  }

  @computed
  get successMessage(): string | null {
    return !this._successMsg ? null : this._successMsg;
  }

  @computed
  get units(): any[] {
    return this._cache;
  }

  //TODO: Get unit
  getUnit(id: number): any {
    console.log('cache after push: ',this._cache);
    const units = Array.from(this._cache).filter(unit => {
      return unit && unit.id && unit.id == id;
    });
    return units && units.length === 1 && units[0] || undefined;
  }
  /** Cache of reservations */
  /*
  @observable private _cache = new Map<string, Reservations.ReservationParsed>();

  @observable private _errorMsg: Maybe<string>;
  @observable private _successMsg: Maybe<string>;

  constructor() {
    this.fetchReservations();
  }

  @action
  fetchReservations = () => {
    try {
      Reservations.forEach(reservation => {
        const data = {...reservation, start_at: new Date(reservation.start_at), end_at: new Date(reservation.end_at)};
        this._cache.set(reservation.id.toString(), data);
      });
      return true;
    } catch (error) {
      return Promise.reject('Error fetching reservations');
    }
  }

  @action
  createReservation = (data: Reservations.ReservationParsed) => {
    try {
      if (validateReservation(data, Array.from(this._cache.values()))) {
        this._cache.set(data.id.toString(), data);
        return true;
      }
      throw new Error('Invalid reservation data');
    } catch (e) {
      console.warn(e);
    }
    return false;
  }

  @computed
  get errorMessage(): string | null {
    return !this._errorMsg ? null : this._errorMsg;
  }

  @computed
  get successMessage(): string | null {
    return !this._successMsg ? null : this._successMsg;
  }

  @computed
  get reservations(): Maybe<Reservations.ReservationParsed[]> {
    return Array.from(this._cache.values());
  }

  getReservations(date: Date, space_id: number | undefined = undefined, comparison: string | undefined = undefined): Maybe<Reservations.ReservationParsed[]> {
    let comparisonFunction: Function | undefined = undefined;
    switch (comparison) {
      case 'day': 
        comparisonFunction = dateFns.isSameDay;
        break;
      case 'month': 
        comparisonFunction = dateFns.isSameMonth;
        break;
      default:
        comparisonFunction = dateFns.isSameDay;
    }

    return Array.from(this._cache.values()).filter(reservation => {
      return (
        (space_id === undefined || space_id === reservation.space_id)
        && comparisonFunction && comparisonFunction(date, new Date(reservation.start_at))
      );
    });
  }

  getReservation(id: number): Maybe<Reservations.ReservationParsed> {
    return this._cache.get(id.toString());
  }
  */
}