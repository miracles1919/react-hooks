type Destory = () => void;
type EffectCallback = () => void | Destory;

export function useEffect(effetc: EffectCallback, depts: unknown[]) {}
