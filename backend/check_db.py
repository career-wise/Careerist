from sqlalchemy import create_engine, text
engine = create_engine('postgresql://postgres.bxzqmvoaeirqqsjfdgzv:hzh%402025ZSS@aws-0-ap-south-1.pooler.supabase.com:6543/postgres')
with engine.connect() as conn:
    res = conn.execute(text("SELECT id FROM users WHERE id='c7f67805-1286-44ee-a05c-d0488c717e6b'")).fetchall()
    print("USERS TABLE:", res)
    try:
        events_fk = conn.execute(text("""
        SELECT
            tc.table_schema, 
            tc.constraint_name, 
            tc.table_name, 
            kcu.column_name, 
            ccu.table_schema AS foreign_table_schema,
            ccu.table_name AS foreign_table_name,
            ccu.column_name AS foreign_column_name 
        FROM 
            information_schema.table_constraints AS tc 
            JOIN information_schema.key_column_usage AS kcu
              ON tc.constraint_name = kcu.constraint_name
              AND tc.table_schema = kcu.table_schema
            JOIN information_schema.constraint_column_usage AS ccu
              ON ccu.constraint_name = tc.constraint_name
              AND ccu.table_schema = tc.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name='events';
        """)).fetchall()
        print("EVENTS FK:", events_fk)
    except Exception as e:
        print(e)
