type Arr = unknown[] | undefined;
export function isDepsEqual(arr: Arr, arr2: Arr) {
  if (arr && arr2) {
    if (arr.length && arr2.length) {
      if (arr.length !== arr2.length) {
        return false;
      }

      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== arr2[i]) {
          return false;
        }
      }
    }

    return true;
  }

  return false;
}
