import type { HooksComponent } from './component';

type HooksContext = {
  component: HooksComponent;
  counter: number;
};

const hooksContextStack: HooksContext[] = [];

export function useCounter() {
  const context = hooksContextStack[hooksContextStack.length - 1];
  return {
    component: context.component,
    counter: context.counter++,
  };
}

export function withContext<T, Args extends unknown[]>(
  component: HooksComponent,
  func: (...args: Args) => T
): (...args: Args) => T {
  return function (...args) {
    hooksContextStack.push({ component, counter: 0 });
    const res = func(...args);
    hooksContextStack.pop();
    return res;
  };
}
