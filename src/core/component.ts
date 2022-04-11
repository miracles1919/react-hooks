import { Component } from 'react';
import {
  HooksComponentState,
  HooksComponentStateSetter,
  HooksComponentEffects,
  runEffects,
  cleanupEffects,
} from '../hooks';
import { withContext } from './context';

export interface HooksComponent<P = {}>
  extends Component<P, HooksComponentState> {
  state: HooksComponentState;
  __hooks__: {
    setter: HooksComponentStateSetter;
    effects: HooksComponentEffects;
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
      effects: {},
    };

    constructor(props: P) {
      super(props);
      this.render = bind(this, component);
    }

    componentDidMount() {
      console.log('did mount');
      runEffects(this.__hooks__.effects);
    }

    componentDidUpdate() {
      console.log('did update');
      runEffects(this.__hooks__.effects);
    }

    componentWillMount() {
      cleanupEffects(this.__hooks__.effects);
    }
  };

  return HooksWrap;
}
