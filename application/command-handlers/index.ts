export interface CommandHandler<TCommand extends Object, TOutput extends string | void = void> {
    handle(command: TCommand): Promise<TOutput>;
}