from sqlalchemy import create_engine, text
engine = create_engine('postgresql://postgres.bxzqmvoaeirqqsjfdgzv:hzh%402025ZSS@aws-0-ap-south-1.pooler.supabase.com:6543/postgres')
with engine.connect() as conn:
    fk_query = conn.execute(text("""
    SELECT tc.table_name, tc.constraint_name, pg_get_constraintdef(c.oid)
    FROM pg_constraint c
    JOIN pg_namespace n ON n.oid = c.connamespace
    JOIN information_schema.table_constraints tc ON tc.constraint_name = c.conname
    WHERE pg_get_constraintdef(c.oid) LIKE '%auth.users%';
    """)).fetchall()
    print("FKS to auth.users:", fk_query)
