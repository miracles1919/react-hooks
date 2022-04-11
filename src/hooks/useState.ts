import { useCounter } from '../core/context';

export type HooksComponentStateSetters = {
  [counter: number]: SetState<any>;
};

type State<T> = T | (() => T);
export type SetState<T> = (state: T | ((prevState: T) => T)) => void;

export function useState<T>(initialState: State<T>): [T, SetState<T>] {
  const { component, counter } = useCounter();

  const componentState: { [counter: number]: T } = component.state;
  const componentSetter = component.__hooks__.setter;

  if (componentState[counter] === undefined) {
    if (typeof initialState === 'function') {
      initialState = (initialState as () => T)();
    }
    componentState[counter] = initialState;
    componentSetter[counter] = (state) => {
      if (typeof state === 'function') {
        const prevState = (component.state as { [counter: number]: T })[
          counter
        ];
        state = state(prevState);
      }

      component.setState({ [counter]: state });
    };
  }

  const state = componentState[counter];
  const setState = componentSetter[counter];

  return [state, setState];
}
