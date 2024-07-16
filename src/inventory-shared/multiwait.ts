type MulitWait = {
    keys: string[],
    values: ((...args: any[]) => Promise<any>)[]
  };
  
  type baseObjectType =  {[key:string]: any};
  
  export const multiwait = async <T>(MulitWait: MulitWait) => {
    const {keys, values} = MulitWait;
    if (keys.length !== values.length) throw new Error(`cannot multiwait`);
    const obj: baseObjectType = {};
    const results = await Promise.all(values.map(async (fn) => await fn()));
    for (let i = 0; i < keys.length; i++){
      obj[keys[i]] = results[i];
    }
    return obj as T;
  };
  