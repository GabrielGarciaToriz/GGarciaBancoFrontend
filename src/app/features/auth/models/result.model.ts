export interface Result<T> {
  correct: boolean;
  errorMessage?: string | null;
  errorCode?: string | null;
  object?: T | null;
  objects?: T[] | null;
  ex?: any;
}