from pydantic import BaseModel, constr
from typing import Optional
from datetime import datetime

class CustomerBase(BaseModel):
    name: str
    phone_last_digits: constr(min_length=4, max_length=4) # type: ignore
    created_at: datetime

class CustomerCreate(CustomerBase):
    image_vector: list[float]

class CustomerUpdate(CustomerBase):
    pass

class CustomerResponse(CustomerBase):
    customer_id: int