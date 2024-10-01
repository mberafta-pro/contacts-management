export interface CommandHandler<TCommand, TOutput = string | void> {
  handle(command: TCommand): Promise<TOutput>;
}
