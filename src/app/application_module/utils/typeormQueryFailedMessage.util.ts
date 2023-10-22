export default (context: any): [string, string] => {
  const { code } = context;

  switch (code) {
    case '23505':
      return ['Property Must Be Unique!', context.detail];
    case '22P02':
      return ['Invalid uuid!', context.message];
    case '23503':
      return ['Wrong Foreign Key', context.detail];
    case '23502':
      return ['Property must not be NULL', context.detail];
    default:
      return ['Operation Failed!', JSON.stringify(context)];
  }
};
