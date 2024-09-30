export abstract class Presenter<TDomain = unknown, TOutput = unknown> {
    abstract presented: TOutput;
    abstract present(domain: TDomain | null): void;
}