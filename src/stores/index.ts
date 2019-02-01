import UnitStore from './UnitStore';

class RootStore {
  public unitStore: UnitStore;

  constructor() {
    this.unitStore = new UnitStore();
  }
}

const rootStore = new RootStore();

export default rootStore;
