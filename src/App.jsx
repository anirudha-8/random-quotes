import React, { useState, useEffect } from "react";
import "./App.css";

const QuoteCard = ({ quote, onSave }) => {
	return (
		<div style={styles.card}>
			<p style={styles.quote}>{quote}</p>
			<button style={styles.button} onClick={onSave}>
				Save to List
			</button>
		</div>
	);
};

function App() {
	const [quote, setQuote] = useState("");
	const [savedQuotes, setSavedQuotes] = useState([]);

	const fetchQuote = async () => {
		try {
			const response = await fetch(
				"https://ron-swanson-quotes.herokuapp.com/v2/quotes"
			);
			const data = await response.json();
			setQuote(data[0]);
		} catch (error) {
			console.error("Error fetching quote:", error);
		}
	};

	const saveQuote = () => {
		if (quote && !savedQuotes.includes(quote)) {
			setSavedQuotes([...savedQuotes, quote]);
		}
	};

	useEffect(() => {
		fetchQuote();
	}, []);

	return (
		<div style={styles.container}>
			<h1>Ron Swanson Quotes</h1>
			<QuoteCard quote={quote} onSave={saveQuote} />
			<button style={styles.button} onClick={fetchQuote}>
				Get Another Quote
			</button>

			<h2>Saved Quotes</h2>
			<ul>
				{savedQuotes.map((savedQuote, index) => (
					<li key={index} style={styles.savedQuote}>
						{savedQuote}
					</li>
				))}
			</ul>
		</div>
	);
}

const styles = {
	container: {
		textAlign: "center",
		padding: "20px",
	},
	card: {
		border: "1px solid #ddd",
		borderRadius: "8px",
		padding: "20px",
		marginBottom: "10px",
		backgroundColor: "#f9f9f9",
		maxWidth: "400px",
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
		margin: "auto",
	},
	quote: {
		fontSize: "18px",
		fontStyle: "italic",
		marginBottom: "10px",
	},
	button: {
		backgroundColor: "#007BFF",
		color: "#fff",
		border: "none",
		padding: "10px 15px",
		borderRadius: "4px",
		cursor: "pointer",
		marginTop: "10px",
	},
	savedQuote: {
		listStyle: "none",
		padding: "10px",
		borderBottom: "1px solid #ddd",
		maxWidth: "400px",
		margin: "auto",
	},
};

export default App;
