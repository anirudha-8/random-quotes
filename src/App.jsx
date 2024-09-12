// src/App.jsx
import React, { useState, useEffect } from "react";
import "./App.css"; // Import the updated CSS file

const QuoteCard = ({ quote, onSave }) => {
	return (
		<div className="card">
			<p className="quote">{quote}</p>
			<button className="button" onClick={onSave}>
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
		<div className="container">
			<h1>Ron Swanson Quotes</h1>
			<QuoteCard quote={quote} onSave={saveQuote} />
			<button className="button" onClick={fetchQuote}>
				Get Another Quote
			</button>

			<h2>Saved Quotes</h2>
			<ul>
				{savedQuotes.map((savedQuote, index) => (
					<li key={index} className="savedQuote">
						{savedQuote}
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
