from fastapi import FastAPI, File
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import openai
import requests
app=FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "http://localhost:3000",
]

# CORS - Middleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

 
@app.get("/test")
async def check_health():
    return {'ABC':"PQR"}

 

@app.post("/post-text/")
async def post_text(file = File()):
   openai.organisation="org-4P4CySLqDKXlwYv4aDtSjfjz"
   openai.api_key="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"
   message=file
   responseFromChatGPT=openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": message},
        ]
   )
   chatgptanswer = responseFromChatGPT["choices"][0]['message']["content"]
   #response=requests.post('http://127.0.0.1:8000/post-text/',json=chatgptanswer)
   return chatgptanswer