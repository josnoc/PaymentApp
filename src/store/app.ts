import { Subject } from "rxjs";
import { setAppState, IAppState, visualizerOpenMode } from "../Types";

const subject = new Subject<IAppState>();

export const initialState: IAppState = {
  isPaymentVisualizerOpened: false,
  isContextMenuOpened: false,
  visualizerOpenMode: "adding",
  visualizerId: undefined,
  contextId: undefined,
};

let state = initialState;

const appStore = {
  init: () => subject.next(state),
  subscribe: (setState: setAppState) => subject.subscribe(setState),
  openPaymentVisualizer: (mode: visualizerOpenMode, id?: number) => {
    state = {
      ...state,
      isPaymentVisualizerOpened: true,
      visualizerId: id,
      visualizerOpenMode: mode,
    };
    subject.next(state);
  },
  closePaymentVisualizer: () => {
    state = {
      ...state,
      isPaymentVisualizerOpened: false,
    };
    subject.next(state);
  },
  openContextMenu: (id: number) => {
    state = {
      ...state,
      isContextMenuOpened: true,
      contextId: id,
    };
    subject.next(state);
  },
  closeContextMenu: () => {
    state = {
      ...state,
      isContextMenuOpened: false,
      contextId: undefined,
    };
    subject.next(state);
  },
};

export default appStore;
