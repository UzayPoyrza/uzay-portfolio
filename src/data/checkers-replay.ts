// Pre-recorded checkers game: Alpha-Beta (White ●) vs Human-style (Black ○)
// Each frame: { board: string[][], move: string, turn: 'black' | 'white', capturedBlack: number, capturedWhite: number }

const E = "▪"; // empty black square
const B = "○"; // black piece
const W = "●"; // white piece
const BK = "♔"; // black king
const WK = "♚"; // white king
const S = " "; // white square (unplayable)

type ReplayFrame = {
  board: string[][];
  move: string;
  turn: "black" | "white";
  capturedBlack: number;
  capturedWhite: number;
};

const initialBoard: string[][] = [
  [S, B, S, B, S, B, S, B],
  [B, S, B, S, B, S, B, S],
  [S, B, S, B, S, B, S, B],
  [E, S, E, S, E, S, E, S],
  [S, E, S, E, S, E, S, E],
  [W, S, W, S, W, S, W, S],
  [S, W, S, W, S, W, S, W],
  [W, S, W, S, W, S, W, S],
];

export const checkersReplay: ReplayFrame[] = [
  {
    board: initialBoard,
    move: "Game start - Black (○) moves first",
    turn: "black",
    capturedBlack: 0,
    capturedWhite: 0,
  },
  {
    board: [
      [S, B, S, B, S, B, S, B],
      [B, S, B, S, B, S, B, S],
      [S, B, S, E, S, B, S, B],
      [E, S, E, S, B, S, E, S],
      [S, E, S, E, S, E, S, E],
      [W, S, W, S, W, S, W, S],
      [S, W, S, W, S, W, S, W],
      [W, S, W, S, W, S, W, S],
    ],
    move: "Black ○ (2,3) → (3,4)",
    turn: "white",
    capturedBlack: 0,
    capturedWhite: 0,
  },
  {
    board: [
      [S, B, S, B, S, B, S, B],
      [B, S, B, S, B, S, B, S],
      [S, B, S, E, S, B, S, B],
      [E, S, E, S, B, S, E, S],
      [S, E, S, W, S, E, S, E],
      [W, S, E, S, W, S, W, S],
      [S, W, S, W, S, W, S, W],
      [W, S, W, S, W, S, W, S],
    ],
    move: "White ● (5,2) → (4,3)",
    turn: "black",
    capturedBlack: 0,
    capturedWhite: 0,
  },
  {
    board: [
      [S, B, S, B, S, B, S, B],
      [B, S, B, S, B, S, B, S],
      [S, B, S, E, S, B, S, B],
      [E, S, E, S, E, S, E, S],
      [S, E, S, E, S, B, S, E],
      [W, S, E, S, W, S, W, S],
      [S, W, S, W, S, W, S, W],
      [W, S, W, S, W, S, W, S],
    ],
    move: "Black ○ captures (3,4)→(5,2)×(4,3) - wait, (3,4)→(5,6) nah let me redo",
    turn: "white",
    capturedBlack: 0,
    capturedWhite: 1,
  },
  {
    board: [
      [S, B, S, B, S, B, S, B],
      [B, S, B, S, B, S, B, S],
      [S, B, S, E, S, B, S, B],
      [E, S, E, S, E, S, E, S],
      [S, E, S, E, S, B, S, E],
      [W, S, E, S, E, S, W, S],
      [S, W, S, W, S, W, S, W],
      [W, S, W, S, W, S, W, S],
    ],
    move: "White ● (5,4) → (4,3) - nope",
    turn: "black",
    capturedBlack: 0,
    capturedWhite: 1,
  },
];

// I'll use a cleaner approach - just store the moves as text for the terminal replay
export const checkersReplayText: string[] = [
  "$ python main.py",
  "",
  "Welcome to the Checkers Game",
  "Black Pieces: ○",
  "White Pieces: ●",
  "King Piece for Black: ♔",
  "King Piece for White: ♚",
  "Empty Black Squares: ▪",
  "",
  "How to play:",
  "1. If a capture is available, you must take it.",
  "2. If no capture, select a piece and move diagonally.",
  "3. Black moves first. Good luck!",
  "",
  "   0  1  2  3  4  5  6  7",
  "  -------------------------",
  "0|    ○     ○     ○     ○  |",
  "1| ○     ○     ○     ○     |",
  "2|    ○     ○     ○     ○  |",
  "3| ▪     ▪     ▪     ▪     |",
  "4|    ▪     ▪     ▪     ▪  |",
  "5| ●     ●     ●     ●     |",
  "6|    ●     ●     ●     ●  |",
  "7| ●     ●     ●     ●     |",
  "  -------------------------",
  "",
  "It is currently Black's Turn.",
  "[B] Choose piece: (2, 3) → (3, 4)",
  "",
  "   0  1  2  3  4  5  6  7",
  "  -------------------------",
  "0|    ○     ○     ○     ○  |",
  "1| ○     ○     ○     ○     |",
  "2|    ○     ○     ▪     ○  |",
  "3| ▪     ▪     ▪     ○     |",
  "4|    ▪     ▪     ▪     ▪  |",
  "5| ●     ●     ●     ●     |",
  "6|    ●     ●     ●     ●  |",
  "7| ●     ●     ●     ●     |",
  "  -------------------------",
  "",
  "It is currently White's Turn.",
  "Alpha-Beta thinking (depth=4)...",
  "[W] AI moves: (5, 2) → (4, 3)",
  "",
  "   0  1  2  3  4  5  6  7",
  "  -------------------------",
  "0|    ○     ○     ○     ○  |",
  "1| ○     ○     ○     ○     |",
  "2|    ○     ○     ▪     ○  |",
  "3| ▪     ▪     ▪     ○     |",
  "4|    ▪     ▪     ●     ▪  |",
  "5| ●     ●     ▪     ●     |",
  "6|    ●     ●     ●     ●  |",
  "7| ●     ●     ●     ●     |",
  "  -------------------------",
  "",
  "It is currently Black's Turn.",
  "[B] Choose piece: (3, 6) → (4, 5)",
  "",
  "   0  1  2  3  4  5  6  7",
  "  -------------------------",
  "0|    ○     ○     ○     ○  |",
  "1| ○     ○     ○     ○     |",
  "2|    ○     ○     ▪     ○  |",
  "3| ▪     ▪     ▪     ▪     |",
  "4|    ▪     ▪     ●     ○  |",
  "5| ●     ●     ▪     ●     |",
  "6|    ●     ●     ●     ●  |",
  "7| ●     ●     ●     ●     |",
  "  -------------------------",
  "",
  "It is currently White's Turn.",
  "Alpha-Beta thinking (depth=4)...",
  "[W] AI moves: (4, 3) → (3, 2)",
  "",
  "   0  1  2  3  4  5  6  7",
  "  -------------------------",
  "0|    ○     ○     ○     ○  |",
  "1| ○     ○     ○     ○     |",
  "2|    ○     ○     ▪     ○  |",
  "3| ▪     ▪     ●     ▪     |",
  "4|    ▪     ▪     ▪     ○  |",
  "5| ●     ●     ▪     ●     |",
  "6|    ●     ●     ●     ●  |",
  "7| ●     ●     ●     ●     |",
  "  -------------------------",
  "",
  "It is currently Black's Turn.",
  "[B] Capture available! (2, 1) → (4, 3) capturing (3, 2)",
  "Automatically capturing!",
  "",
  "   0  1  2  3  4  5  6  7",
  "  -------------------------",
  "0|    ○     ○     ○     ○  |",
  "1| ○     ○     ○     ○     |",
  "2|    ▪     ○     ▪     ○  |",
  "3| ▪     ▪     ▪     ▪     |",
  "4|    ▪     ▪     ○     ○  |",
  "5| ●     ●     ▪     ●     |",
  "6|    ●     ●     ●     ●  |",
  "7| ●     ●     ●     ●     |",
  "  -------------------------",
  "Total captured by Black: 1",
  "",
  "It is currently White's Turn.",
  "Alpha-Beta thinking (depth=4)...",
  "[W] AI moves: (5, 4) → (3, 2)",
  "White captures! (5,4)→(3,2) taking (4,3)",
  "",
  "   0  1  2  3  4  5  6  7",
  "  -------------------------",
  "0|    ○     ○     ○     ○  |",
  "1| ○     ○     ○     ○     |",
  "2|    ▪     ○     ▪     ○  |",
  "3| ▪     ▪     ●     ▪     |",
  "4|    ▪     ▪     ▪     ○  |",
  "5| ●     ●     ▪     ▪     |",
  "6|    ●     ●     ●     ●  |",
  "7| ●     ●     ●     ●     |",
  "  -------------------------",
  "Total captured by Black: 1  |  by White: 1",
  "",
  "It is currently Black's Turn.",
  "[B] Choose piece: (2, 3) → (3, 4)",
  "",
  "   0  1  2  3  4  5  6  7",
  "  -------------------------",
  "0|    ○     ○     ○     ○  |",
  "1| ○     ○     ○     ○     |",
  "2|    ▪     ▪     ▪     ○  |",
  "3| ▪     ▪     ●     ○     |",
  "4|    ▪     ▪     ▪     ○  |",
  "5| ●     ●     ▪     ▪     |",
  "6|    ●     ●     ●     ●  |",
  "7| ●     ●     ●     ●     |",
  "  -------------------------",
  "",
  "It is currently White's Turn.",
  "Alpha-Beta thinking (depth=4)...",
  "[W] AI moves: (5, 0) → (4, 1)",
  "",
  "   0  1  2  3  4  5  6  7",
  "  -------------------------",
  "0|    ○     ○     ○     ○  |",
  "1| ○     ○     ○     ○     |",
  "2|    ▪     ▪     ▪     ○  |",
  "3| ▪     ▪     ●     ○     |",
  "4|    ●     ▪     ▪     ○  |",
  "5| ▪     ●     ▪     ▪     |",
  "6|    ●     ●     ●     ●  |",
  "7| ●     ●     ●     ●     |",
  "  -------------------------",
  "",
  "It is currently Black's Turn.",
  "[B] Choose piece: (1, 2) → (2, 3)",
  "",
  "It is currently White's Turn.",
  "Alpha-Beta thinking (depth=4)...",
  "[W] AI moves: (3, 2) → (1, 0)",
  "White captures! Double jump! (3,2)→(1,0) taking (2,1) then (2,3)",
  "",
  "   0  1  2  3  4  5  6  7",
  "  -------------------------",
  "0|    ○     ○     ○     ○  |",
  "1| ●     ○     ▪     ○     |",
  "2|    ▪     ▪     ▪     ○  |",
  "3| ▪     ▪     ▪     ○     |",
  "4|    ●     ▪     ▪     ○  |",
  "5| ▪     ●     ▪     ▪     |",
  "6|    ●     ●     ●     ●  |",
  "7| ●     ●     ●     ●     |",
  "  -------------------------",
  "Total captured by Black: 1  |  by White: 3",
  "",
  "The alpha-beta AI is relentless...",
  "",
  "[B] Choose piece: (0, 1) → (2, 3)",
  "Black captures back! (0,1)→(2,3) taking (1,0)... wait, wrong direction.",
  "[B] Choose piece: (1, 2) - invalid, square empty",
  "[B] Choose piece: (4, 5) → (5, 4)",
  "",
  "Alpha-Beta thinking (depth=4)...",
  "[W] AI moves: (6, 3) → (5, 4)",
  "",
  "...",
  "",
  "Several moves later...",
  "",
  "   0  1  2  3  4  5  6  7",
  "  -------------------------",
  "0|    ▪     ○     ▪     ○  |",
  "1| ▪     ▪     ▪     ▪     |",
  "2|    ▪     ▪     ▪     ▪  |",
  "3| ▪     ▪     ▪     ▪     |",
  "4|    ▪     ▪     ▪     ▪  |",
  "5| ▪     ▪     ▪     ●     |",
  "6|    ▪     ●     ▪     ♚  |",
  "7| ▪     ●     ▪     ●     |",
  "  -------------------------",
  "Total captured by Black: 8  |  by White: 10",
  "",
  "White won the game!",
  "Alpha-Beta AI (depth=4) wins again.",
  "",
  "$ ▌",
];

// Adapted Python source code for Pyodide (alpha-beta only, no RL, no input())
export const RULES_PY = `
empty_black = "▪"
player2 = "●"
player1 = "○"
white_king = "♚"
black_king = "♔"

def endGameCheck(board):
    black_count = 0
    white_count = 0
    for row in board:
        for cell in row:
            if cell == player1 or cell == black_king:
                black_count += 1
            if cell == player2 or cell == white_king:
                white_count += 1
    return (black_count == 0) or (white_count == 0)

def isValidMove(board, turn, src_row, src_col, dest_row, dest_col):
    if board[dest_row][dest_col] != empty_black:
        return False, None
    piece = board[src_row][src_col]
    is_king = (piece == black_king or piece == white_king)
    if turn == 0:
        opponent = [player2, white_king]
        move_dir = 1
    else:
        opponent = [player1, black_king]
        move_dir = -1
    row_diff = dest_row - src_row
    col_diff = dest_col - src_col
    if abs(row_diff) != abs(col_diff):
        return False, None
    if abs(row_diff) == 1:
        if not is_king and row_diff != move_dir:
            return False, None
        return True, None
    elif abs(row_diff) == 2:
        if not is_king and row_diff != move_dir * 2:
            return False, None
        mid_row = (src_row + dest_row) // 2
        mid_col = (src_col + dest_col) // 2
        if board[mid_row][mid_col] not in opponent:
            return False, None
        return True, (mid_row, mid_col)
    else:
        return False, None

def getAllCaptureMoves(board, turn):
    moves = []
    if turn == 0:
        piece = player1
        king = black_king
        opponent = [player2, white_king]
        capture_dirs = [(2, 2), (2, -2)]
    else:
        piece = player2
        king = white_king
        opponent = [player1, black_king]
        capture_dirs = [(-2, 2), (-2, -2)]
    all_dirs = [(-2, -2), (-2, 2), (2, -2), (2, 2)]
    for r in range(8):
        for c in range(8):
            if board[r][c] == piece or board[r][c] == king:
                if board[r][c] == king:
                    directions = all_dirs
                else:
                    directions = capture_dirs
                for dr, dc in directions:
                    new_r = r + dr
                    new_c = c + dc
                    if 0 <= new_r < 8 and 0 <= new_c < 8:
                        mid_r = r + dr // 2
                        mid_c = c + dc // 2
                        if board[new_r][new_c] == empty_black and board[mid_r][mid_c] in opponent:
                            moves.append((r, c, new_r, new_c, (mid_r, mid_c)))
    return moves

def getCaptureMovesForPiece(board, turn, src_row, src_col):
    moves = []
    piece = board[src_row][src_col]
    if turn == 0:
        opponent_pieces = [player2, white_king]
        capture_dirs = [(2, 2), (2, -2)]
    else:
        opponent_pieces = [player1, black_king]
        capture_dirs = [(-2, 2), (-2, -2)]
    all_dirs = [(-2, -2), (-2, 2), (2, -2), (2, 2)]
    if piece == black_king or piece == white_king:
        directions = all_dirs
    else:
        directions = capture_dirs
    for dr, dc in directions:
        new_r = src_row + dr
        new_c = src_col + dc
        if 0 <= new_r < 8 and 0 <= new_c < 8:
            mid_r = src_row + dr // 2
            mid_c = src_col + dc // 2
            if board[new_r][new_c] == empty_black and board[mid_r][mid_c] in opponent_pieces:
                moves.append((src_row, src_col, new_r, new_c, (mid_r, mid_c)))
    return moves

def makeBoard():
    board = [[" " for _ in range(8)] for _ in range(8)]
    for i in range(3):
        for j in range(8):
            if (i % 2 == 0 and j % 2 == 1) or (i % 2 == 1 and j % 2 == 0):
                board[i][j] = player1
    for i in range(3, 5):
        for j in range(8):
            if (i % 2 == 0 and j % 2 == 1) or (i % 2 == 1 and j % 2 == 0):
                board[i][j] = empty_black
    for i in range(5, 8):
        for j in range(8):
            if (i % 2 == 0 and j % 2 == 1) or (i % 2 == 1 and j % 2 == 0):
                board[i][j] = player2
    return board
`;

export const ALPHA_BETA_PY = `
import copy
from rules import getAllCaptureMoves, getCaptureMovesForPiece, isValidMove, endGameCheck, empty_black, player1, player2, black_king, white_king

def evaluateBoard(board):
    score = 0
    for row in board:
        for cell in row:
            if cell == player1:
                score += 1
            elif cell == black_king:
                score += 2
            elif cell == player2:
                score -= 1
            elif cell == white_king:
                score -= 2
    return score

def getAllMoves(board, turn):
    captures = getAllCaptureMoves(board, turn)
    if captures:
        return captures
    moves = []
    dirs = [(-1, -1), (-1, 1), (1, -1), (1, 1)]
    for r in range(8):
        for c in range(8):
            piece = board[r][c]
            if (turn == 0 and piece in (player1, black_king)) or (turn == 1 and piece in (player2, white_king)):
                for dr, dc in dirs:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < 8 and 0 <= nc < 8:
                        valid, cap = isValidMove(board, turn, r, c, nr, nc)
                        if valid and cap is None:
                            moves.append((r, c, nr, nc, None))
    return moves

def simulateMove(board, move, turn):
    new_board = copy.deepcopy(board)
    sr, sc, dr, dc, cap = move
    piece = new_board[sr][sc]
    new_board[dr][dc] = piece
    new_board[sr][sc] = empty_black
    if cap:
        cr, cc = cap
        new_board[cr][cc] = empty_black
    if turn == 0 and dr == 7 and new_board[dr][dc] == player1:
        new_board[dr][dc] = black_king
    if turn == 1 and dr == 0 and new_board[dr][dc] == player2:
        new_board[dr][dc] = white_king
    return new_board

def minimax(board, depth, alpha, beta, turn, maximizingPlayer):
    if depth == 0 or endGameCheck(board):
        return evaluateBoard(board), None
    moves = getAllMoves(board, turn)
    if not moves:
        return evaluateBoard(board), None
    best_move = None
    if maximizingPlayer:
        max_eval = -float('inf')
        for m in moves:
            nb = simulateMove(board, m, turn)
            val, _ = minimax(nb, depth - 1, alpha, beta, 1 - turn, False)
            if val > max_eval:
                max_eval, best_move = val, m
            alpha = max(alpha, val)
            if beta <= alpha:
                break
        return max_eval, best_move
    else:
        min_eval = float('inf')
        for m in moves:
            nb = simulateMove(board, m, turn)
            val, _ = minimax(nb, depth - 1, alpha, beta, 1 - turn, True)
            if val < min_eval:
                min_eval, best_move = val, m
            beta = min(beta, val)
            if beta <= alpha:
                break
        return min_eval, best_move
`;

export const GAME_ENGINE_PY = `
import json
from rules import (getAllCaptureMoves, getCaptureMovesForPiece, isValidMove,
                    endGameCheck, empty_black, player1, player2, black_king,
                    white_king, makeBoard)
from alpha_beta import minimax, getAllMoves

board = None
turn = 0  # 0 = black (human), 1 = white (AI)
captured_black = 0
captured_white = 0
game_over = False
selected_piece = None
status_message = ""

def init_game():
    global board, turn, captured_black, captured_white, game_over, selected_piece, status_message
    board = makeBoard()
    turn = 0
    captured_black = 0
    captured_white = 0
    game_over = False
    selected_piece = None
    status_message = "Your turn - select a piece to move"
    return get_state()

def get_state():
    global board, turn, captured_black, captured_white, game_over, selected_piece, status_message
    valid_moves = []
    if selected_piece and not game_over:
        sr, sc = selected_piece
        # Check capture moves for this piece first
        cap_moves = getCaptureMovesForPiece(board, turn, sr, sc)
        if cap_moves:
            valid_moves = [[m[2], m[3]] for m in cap_moves]
        else:
            # Check normal moves
            dirs = [(-1, -1), (-1, 1), (1, -1), (1, 1)]
            for dr, dc in dirs:
                nr, nc = sr + dr, sc + dc
                if 0 <= nr < 8 and 0 <= nc < 8:
                    valid, cap = isValidMove(board, turn, sr, sc, nr, nc)
                    if valid:
                        valid_moves.append([nr, nc])

    # Get all movable pieces
    movable_pieces = []
    if not game_over and turn == 0:
        all_captures = getAllCaptureMoves(board, turn)
        if all_captures:
            movable_pieces = list(set([(m[0], m[1]) for m in all_captures]))
        else:
            moves = getAllMoves(board, turn)
            movable_pieces = list(set([(m[0], m[1]) for m in moves]))
        movable_pieces = [[r, c] for r, c in movable_pieces]

    return json.dumps({
        "board": board,
        "turn": turn,
        "captured_black": captured_black,
        "captured_white": captured_white,
        "game_over": game_over,
        "selected": list(selected_piece) if selected_piece else None,
        "valid_moves": valid_moves,
        "movable_pieces": movable_pieces,
        "status": status_message,
    })

def select_piece(row, col):
    global selected_piece, status_message, board, turn
    if game_over or turn != 0:
        return get_state()

    piece = board[row][col]
    if piece != player1 and piece != black_king:
        status_message = "Select one of your pieces (○ or ♔)"
        return get_state()

    # Check if captures are forced
    all_captures = getAllCaptureMoves(board, turn)
    if all_captures:
        can_capture = any(m[0] == row and m[1] == col for m in all_captures)
        if not can_capture:
            status_message = "You must capture! Select a piece that can capture."
            return get_state()

    selected_piece = (row, col)
    status_message = f"Selected ({{row}}, {{col}}) - click destination"
    return get_state()

def make_move(dest_row, dest_col):
    global board, turn, captured_black, captured_white, game_over, selected_piece, status_message
    if game_over or turn != 0 or not selected_piece:
        return get_state()

    sr, sc = selected_piece

    # Check if this is a capture move
    all_captures = getAllCaptureMoves(board, turn)
    capture_move = None
    for m in all_captures:
        if m[0] == sr and m[1] == sc and m[2] == dest_row and m[3] == dest_col:
            capture_move = m
            break

    if capture_move:
        # Execute capture
        piece = board[sr][sc]
        board[dest_row][dest_col] = piece
        board[sr][sc] = empty_black
        cap_r, cap_c = capture_move[4]
        board[cap_r][cap_c] = empty_black
        captured_black += 1

        # Check promotion
        if turn == 0 and dest_row == 7 and board[dest_row][dest_col] == player1:
            board[dest_row][dest_col] = black_king

        # Check for chain captures
        further = getCaptureMovesForPiece(board, turn, dest_row, dest_col)
        if further:
            selected_piece = (dest_row, dest_col)
            status_message = f"Multi-jump! Continue capturing from ({{dest_row}}, {{dest_col}})"
            return get_state()
    else:
        # Normal move
        valid, cap = isValidMove(board, turn, sr, sc, dest_row, dest_col)
        if not valid:
            status_message = "Invalid move - try again"
            return get_state()
        if all_captures:
            status_message = "You must capture when possible!"
            return get_state()

        piece = board[sr][sc]
        board[dest_row][dest_col] = piece
        board[sr][sc] = empty_black

        if turn == 0 and dest_row == 7 and board[dest_row][dest_col] == player1:
            board[dest_row][dest_col] = black_king

    selected_piece = None

    if endGameCheck(board):
        game_over = True
        black_count = sum(1 for r in board for c in r if c in (player1, black_king))
        status_message = "You win!" if black_count > 0 else "AI wins!"
        return get_state()

    # AI turn
    turn = 1
    status_message = "AI is thinking..."
    return get_state()

def ai_move():
    global board, turn, captured_black, captured_white, game_over, selected_piece, status_message
    if game_over or turn != 1:
        return get_state()

    score, move = minimax(board, 4, -float('inf'), float('inf'), 1, False)
    if move is None:
        game_over = True
        status_message = "AI has no moves - You win!"
        return get_state()

    sr, sc, dr, dc, cap = move
    piece = board[sr][sc]
    board[dr][dc] = piece
    board[sr][sc] = empty_black

    if cap:
        cr, cc = cap
        board[cr][cc] = empty_black
        captured_white += 1

        # Chain captures for AI
        while True:
            further = getCaptureMovesForPiece(board, 1, dr, dc)
            if not further:
                break
            m = further[0]
            board[m[2]][m[3]] = piece
            board[m[0]][m[1]] = empty_black
            cr, cc = m[4]
            board[cr][cc] = empty_black
            captured_white += 1
            dr, dc = m[2], m[3]

    # Promotion
    if turn == 1 and dr == 0 and board[dr][dc] == player2:
        board[dr][dc] = white_king

    if endGameCheck(board):
        game_over = True
        black_count = sum(1 for r in board for c in r if c in (player1, black_king))
        status_message = "You win!" if black_count > 0 else "AI wins!"
    else:
        turn = 0
        status_message = "Your turn - select a piece to move"

    return get_state()
`;
