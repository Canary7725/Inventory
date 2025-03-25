from flask import Flask, request, jsonify
from sklearn.linear_model import LinearRegression
import numpy as np

app = Flask(__name__)

@app.route("/api/forecast/predict", methods=["POST"])
def predict():
    data = request.json["data"]

    # Prepare the data for regression
    months = np.array([d["month_index"] for d in data]).reshape(-1, 1)
    quantities = np.array([d["quantity"] for d in data])
    demands = np.array([d["demand"] for d in data])

    # Fit linear regression models
    model_quantity = LinearRegression().fit(months, quantities)
    model_demand = LinearRegression().fit(months, demands)

    # Predict future months (next 6 months)
    future_months = np.arange(max(months) + 1, max(months) + 7).reshape(-1, 1)
    predicted_quantities = model_quantity.predict(future_months)
    predicted_demands = model_demand.predict(future_months)

    # Format the response
    predictions = [
        {"month": f"Month {int(m[0])}", "quantity": q, "demand": d}
        for m, q, d in zip(future_months, predicted_quantities, predicted_demands)
    ]

    return jsonify(predictions)

if __name__ == "__main__":
    app.run(debug=True)
