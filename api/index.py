from flask import Flask, render_template, request, jsonify
import sys
import os

# Add parent folder to sys.path so api package can be found
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from utils import calculate_conflicts
    from ai_solver import solve_queens
except ModuleNotFoundError:
    # fallback if running from project root
    from api.utils import calculate_conflicts
    from api.ai_solver import solve_queens

app = Flask(__name__, template_folder="../templates", static_folder="../static")


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


# For Vercel deployment
handler = app