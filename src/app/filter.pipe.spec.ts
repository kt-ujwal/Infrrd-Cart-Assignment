import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original array if filter string is empty', () => {
    const arr = [{ name: 'product 1' }, { name: 'product 2' }];
    const result = pipe.transform(arr, '', 'name');
    expect(result).toEqual(arr);
  });

  it('should return the original array if property name is empty', () => {
    const arr = [{ name: 'product 1' }, { name: 'product 2' }];
    const result = pipe.transform(arr, 'product', '');
    expect(result).toEqual(arr);
  });

  it('should return the original array if value array is empty', () => {
    const arr: any[] = [];
    const result = pipe.transform(arr, 'product', 'name');
    expect(result).toEqual(arr);
  });

  it('should filter the array based on property name and filter string', () => {
    const arr = [
      { name: 'product 1' },
      { name: 'product 2' },
      { name: 'another product' }
    ];
    const result = pipe.transform(arr, 'product', 'name');
    expect(result.length).toBe(3);
    expect(result[0]).toEqual(arr[0]);
    expect(result[1]).toEqual(arr[1]);
  });

});
