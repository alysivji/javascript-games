import { Point } from './types';

describe('Point', () => {
  test('toString should return a coordinate string', () => {
    const point = new Point(3, 5);
    expect(point.toString()).toBe('3-5');
  });

  test('fromString should correctly parse a coordinate string', () => {
    const point = Point.fromString('3-5');
    expect(point).toEqual(new Point(3, 5));
  });

  test('adjacent8 should return correct adjacent points', () => {
    const point = new Point(3, 5);
    const expectedPoints = [
      new Point(2, 4),
      new Point(2, 5),
      new Point(2, 6),
      new Point(3, 4),
      new Point(3, 6),
      new Point(4, 4),
      new Point(4, 5),
      new Point(4, 6)
    ];
    expect(point.adjacent8()).toEqual(expect.arrayContaining(expectedPoints));
    expect(point.adjacent8().length).toBe(8);
  });
});
