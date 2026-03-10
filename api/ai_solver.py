def is_safe(board, row, col):
    for i in range(row):
        if board[i] == col or abs(board[i] - col) == row - i:
            return False
    return True

def backtrack(board, row):
    if row == 8:
        return True

    for col in range(8):
        if is_safe(board, row, col):
            board[row] = col
            if backtrack(board, row + 1):
                return True
            board[row] = -1

    return False

def solve_queens():
    board = [-1] * 8
    backtrack(board, 0)
    return board
