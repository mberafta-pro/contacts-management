export abstract class DomainError<TContext = unknown> extends Error {
    protected constructor(
        readonly code: string,
        readonly context: TContext,
    ) { super(); }
}