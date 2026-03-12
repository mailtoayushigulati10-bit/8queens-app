from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Home page
@app.route("/")
def home():
    return render_template("index.html")

# Instructions page
@app.route("/instructions")
def instructions():
    return render_template("instructions.html")

# Play page
@app.route("/play")
def play():
    return render_template("play.html")

# Solve API - returns optimal solution
@app.route("/solve")
def solve():
    solution = [0, 4, 7, 5, 2, 6, 1, 3]  # optimal 8-queens solution
    return jsonify({"solution": solution})

if __name__ == "__main__":
    app.run(debug=True)