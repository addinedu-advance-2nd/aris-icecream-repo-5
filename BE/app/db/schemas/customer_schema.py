from pymilvus import FieldSchema, CollectionSchema, DataType

def get_customer_schema():
    fields = [
        FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True, description="Primary Key ID"),
        FieldSchema(name="customer_id", dtype=DataType.INT64, description="주문자 ID"),
        FieldSchema(name="image_vector", dtype=DataType.FLOAT_VECTOR, dim=512, description="얼굴 특징 벡터"),
        FieldSchema(name="name", dtype=DataType.VARCHAR, max_length=50, description="이름"),
        FieldSchema(name="phone_last_digits", dtype=DataType.VARCHAR, max_length=4, description="전화번호 뒤 4자리"),
        FieldSchema(name="created_at", dtype=DataType.VARCHAR, max_length=50, description="생성 시간 (ISO 형식)"), 
    ]
    return CollectionSchema(fields, description="주문자 정보 컬렉션")
