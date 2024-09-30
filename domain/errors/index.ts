export abstract class DomainError<TContext = {}> extends Error {
    protected constructor(
        readonly code: string,
        readonly context: TContext,
    ) { super(); }
}