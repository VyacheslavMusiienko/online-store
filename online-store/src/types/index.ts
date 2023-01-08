type OptionType = { [key: string]: () => Promise<void | string> };
type PromiseStringType = Promise<string>;
type PromiseVoidType = Promise<void>;
export { OptionType, PromiseStringType, PromiseVoidType };
