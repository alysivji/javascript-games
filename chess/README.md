# Chess

## Resources

- Code2care: [HTML + CSS chessboard](http://code2care.org/pages/chessboard-with-pieces-using-pure-html-and-css/)
- Wikipedia: [Chess Symbols in Unicode](https://en.wikipedia.org/wiki/Chess_symbols_in_Unicode)

## Short Term Todo

- [x] write test to ensure we get the required information back
- [ ] piees can move if king is in check; need to figure out how to check this; sounds like we need to simulate a move
- [ ] move history
- [ ] have an `EmptyPiece`
- [ ] have a `isValidMove` check versus using CSS from front-end (state is spread everywhere, well not everywhere; just )

## Todo (Long Term)

- separate out logic so we can implement [chessboard.js](https://chessboardjs.com/)
- compose Queen movement from Rook and Bishop movement
