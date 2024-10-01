export abstract class Presenter<TDomain = unknown, TOutput = unknown> {
  abstract content?: TOutput;
  abstract present(domain: TDomain): void;
}
