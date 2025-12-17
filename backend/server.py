from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, timezone
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import uvicorn


# -------------------- SMTP CONFIG --------------------
# USE ENVIRONMENT VARIABLES (SAFE)

SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

if not SMTP_EMAIL or not SMTP_PASSWORD:
    raise RuntimeError("SMTP_EMAIL or SMTP_PASSWORD not set")


# -------------------- APP SETUP --------------------

app = FastAPI(title="Tripoday Backend API")

api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("tripoday-api")


# -------------------- MODELS --------------------

class LeadCreate(BaseModel):
    full_name: str
    phone: str
    email: EmailStr
    destination: str
    travel_date: Optional[str] = ""
    travelers: Optional[str] = ""


class LeadResponse(BaseModel):
    message: str
    sent_to: EmailStr
    submitted_at: datetime


# -------------------- EMAIL FUNCTION --------------------

def send_confirmation_email(lead: LeadCreate) -> None:
    msg = MIMEMultipart()
    msg["From"] = SMTP_EMAIL
    msg["To"] = lead.email
    msg["Subject"] = "We received your enquiry – Tripoday Holidays"
    msg["Reply-To"] = "support@tripoday.com"

    body = f"""
Hi {lead.full_name},

Thank you for contacting Tripoday Holidays! 🌍✈️

We’ve received your enquiry with the following details:

Destination: {lead.destination}
Travel Date: {lead.travel_date or "Not specified"}
Number of Travelers: {lead.travelers or "Not specified"}

Our travel expert will contact you shortly.

Best regards,
Tripoday Holidays Team
"""

    msg.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_EMAIL, SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()

        logger.info(f"Email sent to {lead.email}")

    except Exception as e:
        logger.error(f"Email sending failed: {e}")
        raise RuntimeError("Failed to send confirmation email")


# -------------------- ROUTES --------------------

@api_router.get("/")
async def root():
    return {"message": "Tripoday API running (email confirmation mode)"}


@api_router.post("/leads", response_model=LeadResponse)
async def submit_lead(lead: LeadCreate):
    try:
        send_confirmation_email(lead)

        return LeadResponse(
            message="Lead submitted successfully. Confirmation email sent.",
            sent_to=lead.email,
            submitted_at=datetime.now(timezone.utc),
        )

    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))


# -------------------- MIDDLEWARE --------------------

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------- RUN SERVER --------------------

if __name__ == "__main__":
    print("🚀 Tripoday FastAPI server is running")
    print("📍 API:  http://127.0.0.1:8000/api/")
    print("📘 Docs: http://127.0.0.1:8000/docs")

    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
