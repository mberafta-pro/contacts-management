export interface Mapper<TDomain, TModel> {
  toDomain(model: TModel): TDomain;
  toModel(domain: TDomain): TModel;
}
