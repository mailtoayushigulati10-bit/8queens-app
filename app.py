from flask import Flask, render_template, request, jsonify
from utils import calculate_conflicts
from ai_solver import solve_queens

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/play")
def play():
    return render_template("play.html")

@app.route("/instructions")
def instructions():
    return render_template("instructions.html")

@app.route("/conflicts", methods=["POST"])
def conflicts():
    board = request.json["board"]
    return jsonify({"conflicts": calculate_conflicts(board)})

@app.route("/solve", methods=["POST"])
def solve():
    solution = solve_queens()
    return jsonify({"solution": solution})

if __name__ == "__main__":
    app.run(debug=True)
