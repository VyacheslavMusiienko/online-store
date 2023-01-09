export interface URL {
  get(name: string): string | null;
  set(name: string, value: string): void;
}
