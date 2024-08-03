export interface ILoader {
  load(): Promise<void>;
}

export const ILoader = Symbol('ILoader');
