# OvaSense Chatbot - AI-Powered PCOS Assistant

## 📌 Project Overview
OvaSense Chatbot is an AI-powered virtual assistant designed to provide accurate and helpful information about **Polycystic Ovary Syndrome (PCOS)**. It leverages **Google Gemini API** to generate intelligent responses based on user queries. 

## 🛠️ Technologies Used
### Frontend
- React.js
- Vite
- CSS

### Backend
- Node.js + Express.js
- Google Gemini API
- LangChain
- Retrieval-Augmented Generation (RAG)
- dotenv
- CORS

## 🚀 Getting Started
### Prerequisites
Ensure you have the following installed:
- Node.js
- NPM

### Clone the Repository
```sh
git clone https://github.com/LuziaManuel22/OvaSense-Chatbot.git
cd OvaSense-Chatbot
```

### Backend Setup
```sh
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```
Start the backend server:
```sh
npm start
```

### Frontend Setup
```sh
cd ../frontend
npm install
npm run dev
```

## 🔄 How It Works
### System Architecture
1. User sends a query in the chatbot UI (React.js).
2. Frontend calls the backend API (`/chat`).
3. Backend forwards the request to the Google Gemini API.
4. Gemini API generates a response.
5. Backend returns the response to the frontend.
6. User sees the chatbot's response on the UI.

### Example API Call
```sh
POST http://localhost:5000/chat
{
  "message": "What are the symptoms of PCOS?"
}
```
Response:
```json
{
  "response": "Common symptoms of PCOS include irregular periods"
