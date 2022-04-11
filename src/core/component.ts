import { Component } from 'react';
import type { SetState } from '../hooks/useState';
import { withContext } from './context';

type HooksComponentState = {
  [counter: number]: any;
};
type HooksComponentStateSetter = {
  [counter: number]: SetState<any>;
};

export interface HooksComponent<P = {}>
  extends Component<P, HooksComponentState> {
  state: HooksComponentState;
  __hooks__: {
    setter: HooksComponentStateSetter;
  };
}

export type Render<P extends {} = {}> = (
  props: P
) => JSX.Element | null | false;

export function bind<P extends {} = {}>(
  classComponent: HooksComponent,
  render: Render<P>
) {
  return withContext(classComponent, () => render(classComponent.props as P));
}

export function withHooks<P extends {} = {}>(component: Render<P>) {
  const HooksWrap = class extends Component<P, HooksComponentState> {
    public state: HooksComponentState = {};
    public __hooks__: HooksComponent['__hooks__'] = {
      setter: {},
    };

    constructor(props: P) {
      super(props);
      this.render = bind(this, component);
    }

    componentDidMount() {
      console.log('did mount');
    }

    componentDidUpdate() {
      console.log('did update');
    }

    // this.__hooks__ = {

    // }
  };

  return HooksWrap;
}
