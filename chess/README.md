# Chess

## Resources

- Code2care: [HTML + CSS chessboard](http://code2care.org/pages/chessboard-with-pieces-using-pure-html-and-css/)
- Wikipedia: [Chess Symbols in Unicode](https://en.wikipedia.org/wiki/Chess_symbols_in_Unicode)

## Short Term Todo

- [ ] piees can move if king is in check; need to figure out how to check this; sounds like we need to simulate a move
  - related, we can move somewhere and still be in check, need to have that test to ensure we don't make those valid positions
- [ ] move history
- [ ] have an `EmptyPiece`

## Todo (Long Term)

- separate out logic so we can implement [chessboard.js](https://chessboardjs.com/)
- compose Queen movement from Rook and Bishop movement

- king
- castling
- check
- forfeit
