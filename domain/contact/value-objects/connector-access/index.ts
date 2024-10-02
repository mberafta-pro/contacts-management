export abstract class ConnectorAccess {
  protected abstract validate(): void;

  public toJson() {
    return JSON.parse(JSON.stringify(this)) as Record<string, string>;
  }
}
