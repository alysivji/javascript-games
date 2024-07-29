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

export interface TileDetails {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  numNeighborMines: number; // if mine = true, this will be -1
}

export enum Difficulty {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  EXPERT = "EXPERT",
}

interface DifficultyDetails {
  rows: number
  cols: number,
  numMines: number,
}

export const difficultyDetails = new Map<Difficulty, DifficultyDetails>();
difficultyDetails.set(Difficulty.BEGINNER, {
  rows: 10,
  cols: 10,
  numMines: 10,
})
difficultyDetails.set(Difficulty.INTERMEDIATE, {
  rows: 16,
  cols: 16,
  numMines: 40,
})
difficultyDetails.set(Difficulty.EXPERT, {
  rows: 16,
  cols: 30,
  numMines: 99,
})
