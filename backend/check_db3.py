from sqlalchemy import create_engine, text
engine = create_engine('postgresql://postgres.bxzqmvoaeirqqsjfdgzv:hzh%402025ZSS@aws-0-ap-south-1.pooler.supabase.com:6543/postgres')
with engine.connect() as conn:
    fk_query = conn.execute(text("""
    SELECT conname, pg_get_constraintdef(c.oid)
    FROM pg_constraint c
    JOIN pg_namespace n ON n.oid = c.connamespace
    WHERE conname = 'events_user_id_fkey';
    """)).fetchall()
    print("FK DETAILS:", fk_query)
