from sqlalchemy import create_engine, text

DATABASE_URL="postgresql://postgres.bxzqmvoaeirqqsjfdgzv:hzh%402025ZSS@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
engine = create_engine(DATABASE_URL)

queries = [
    # Drop existing FK constraints pointing to auth.users
    "ALTER TABLE events DROP CONSTRAINT IF EXISTS events_user_id_fkey;",
    "ALTER TABLE recommendations DROP CONSTRAINT IF EXISTS recommendations_user_id_fkey;",
    "ALTER TABLE goals DROP CONSTRAINT IF EXISTS goals_user_id_fkey;",
    "ALTER TABLE resumes DROP CONSTRAINT IF EXISTS resumes_user_id_fkey;",

    # Add new FK constraints pointing to public.users (our FastAPI users table)
    "ALTER TABLE events ADD CONSTRAINT events_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;",
    "ALTER TABLE recommendations ADD CONSTRAINT recommendations_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;",
    "ALTER TABLE goals ADD CONSTRAINT goals_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;",
    "ALTER TABLE resumes ADD CONSTRAINT resumes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;"
]

with engine.connect() as conn:
    for query in queries:
        try:
            conn.execute(text(query))
            print(f"Executed: {query}")
        except Exception as e:
            print(f"Error on {query}: {e}")
    conn.commit()
    print("Database schema fixed.")
