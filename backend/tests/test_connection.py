from app.database.database import engine

try:
    with engine.connect() as connection:
        print("✅ Connected to Supabase successfully!")
except Exception as e:
    print("❌ Connection failed")
    print(e)