from fastapi import HTTPException
import asyncpg
from fastapi import FastAPI
from datetime import datetime
from pydantic import BaseModel


app = FastAPI()

#Classes
class Prompt(BaseModel):
    prompt: str
class Response(BaseModel):
    response: str

# Database path string
DatabaseURL = "postgresql://adminuser:postgrepass@localhost:5432/DevBotBasics"

# function to connect to database
async def connectToDatabase():
    return await asyncpg.create_pool(DatabaseURL)

# Default message at root
@app.get("/")
def read_root():
    return {"message:" "welcome to the devbot API"}


# Endpoint for posting new prompts
@app.post("/userprompts")
async def createUserPrompt(prompt: Prompt):
    # Connect to database
    pool = await connectToDatabase()

    try: 
        async with pool.acquire() as connection:
            current_timestamp = datetime.now()

            # SQL to insert prompt into database
            await connection.execute(
                "INSERT INTO inputs (input_text, timestamp) values ($1, $2)",
                prompt.prompt,
                current_timestamp
            )

            return {"message": "Prompt stored successfuly"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    finally: 
        await pool.close()
