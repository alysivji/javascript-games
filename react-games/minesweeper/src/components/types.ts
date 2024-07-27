export class Point {
  constructor(public row: number, public col: number) { }

  toString(): string {
    return `${this.row}-${this.col}`
  }

  static fromString(value: string): Point {
    const [row, col] = value.split("-").map(v => Number(v));
    return new Point(row, col)
  }

  adjacent8(): Point[] {
    return [
      new Point(this.row - 1, this.col - 1),
      new Point(this.row - 1, this.col),
      new Point(this.row - 1, this.col + 1),
      new Point(this.row, this.col - 1),
      new Point(this.row, this.col + 1),
      new Point(this.row + 1, this.col - 1),
      new Point(this.row + 1, this.col),
      new Point(this.row + 1, this.col + 1),
    ];
  }
}

export interface Square {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  numNeighborMines: number; // if mine = true, this will be -1
}
