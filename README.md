# FactCheck Bot – AI-Powered Real-Time Fact Verification

FactCheck Bot is an AI-powered web chatbot that helps users verify the credibility of information in real time. It intelligently distinguishes between **factual** and **hallucinated** statements using advanced LLMs combined with reliable fact-checking APIs.

---

##  Features

-  **Real-Time Fact Verification**  
  Instantly checks if a statement is factually accurate using external data sources and APIs.

-  **LLM + Verified Mode**  
  Toggle between LLM-generated responses or verified-only responses from credible sources.

-  **Transformer-Powered**  
  Uses models like Bloomz-560m or Falcon via Hugging Face for fast and lightweight response generation.

-  **Hallucination Filtering**  
  Reduces AI hallucinations by cross-verifying data with multiple trusted fact-checking APIs.

-  **Simple & Intuitive UI**  
  Built using React for a clean user experience.

---

##  Tech Stack

| Layer         | Technology                    |
|---------------|-------------------------------|
| Frontend      | React, Tailwind CSS           |
| Backend       | Flask, Python, HuggingFace    |
| APIs Used     | Fact-checking APIs (custom)   |
| LLMs          | Bloomz-560m / Falcon (via Transformers) |
| Hosting       | GitHub + Render  |

---

##  Project Structure

```
factcheck-bot/
├── frontend/               # React + Tailwind-based UI
│   └── src/
│       ├── components/
│       └── App.js
├── backend/                # Flask backend with model and API integration
│   ├── app.py
│   └── fact_checker.py
└── README.md
```

---

##  How to Run Locally

### Prerequisites
- Node.js & npm
- Python 3.9+
- Hugging Face Transformers
- Flask

### Steps

```bash
# Clone the repo
git clone https://github.com/GLITCHINvision/factcheck-bot.git
cd factcheck-bot

# Run frontend
cd frontend
npm install
npm run dev

# Run backend
cd ../backend
pip install -r requirements.txt
python app.py
```

Open `https://factcheck-frontend.vercel.app/` to use the chatbot locally.

---

##  Use Cases

- Verifying news or social media content
- Helping students cross-check academic facts
- Assisting journalists, researchers, and bloggers
- Reducing misinformation in digital content

---

##  Future Improvements

-  Add memory/context window for better follow-up answers  
-  Support multilingual fact-checking  
-  Integrate user credibility score  
-  Admin panel to add trusted sources manually

---

##  Contributing

Pull requests and feedback are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

##  License

This project is licensed under the **MIT License**.

---

##  Author

**Raman Sharma**  
🔗 [GitHub](https://github.com/GLITCHINvision) | 🔗 [LinkedIn](https://www.linkedin.com/in/raman-sharma-71371024a/)

