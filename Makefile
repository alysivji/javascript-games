.PHONY: chess

chess:
	parcel chess/index.html

tictactoe:
	parcel tic-tac-toe/index.html

pong:
	parcel pong-mouse/index.html

test:
	./node_modules/.bin/jest
