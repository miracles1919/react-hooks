import { useCounter } from '../core/context';
import { isDepsEqual } from '../utils/is-deps-equal';

type Destroy = () => void;
type EffectCallback = () => void | Destroy;
type Deps = unknown[] | undefined;

export type HooksComponentEffects = {
  [counter: number]: [EffectCallback | null, Destroy | null, Deps];
};

export function useEffect(effect: EffectCallback, deps: Deps) {
  const { component, counter } = useCounter();
  useEffectHandler(component.__hooks__.effects, counter, effect, deps);
}

function useEffectHandler(
  effects: HooksComponentEffects,
  counter: number,
  callback: EffectCallback,
  deps: Deps
) {
  if (effects[counter] === undefined) {
    effects[counter] = [callback, null, deps];
  } else {
    const [, , prevDeps] = effects[counter];
    if (!isDepsEqual(prevDeps, deps)) {
      effects[counter][0] = callback;
      effects[counter][2] = deps;
    }
  }
}

export function runEffects(effects: HooksComponentEffects) {
  const pendingEffects = Object.keys(effects);
  for (let c of pendingEffects) {
    const counter = Number(c);
    const [create, destroy] = effects[counter];

    if (typeof destroy === 'function') {
      destroy();
    }

    if (typeof create === 'function') {
      const nextDestroy = create();
      effects[counter][0] = null;
      effects[counter][1] =
        typeof nextDestroy === 'function' ? nextDestroy : null;
    }
  }
}

export function cleanupEffects(effects: HooksComponentEffects) {
  const pendingEffects = Object.keys(effects);

  for (let c in pendingEffects) {
    const counter = Number(c);
    const [, destroy] = effects[counter];

    if (typeof destroy === 'function') {
      destroy();
    }

    delete effects[counter];
  }
}
