import happybase

HOST = 'localhost'
POOL_SIZE=3
TABLE_NAME='photo'

def uploadToHbase(row,data):
    pool = happybase.ConnectionPool(size=POOL_SIZE,host=HOST)
    with pool.connection() as connection:
        table = connection.table(TABLE_NAME)
    try:
        col = table.counter_inc(row,b'cf:counter')
        key_str = 'cf:col'+str(col)
        key = key_str.encode('utf-8')
        table.put(row,{key:data})
    except ValueError:
        table.counter_dec(row,b'cf:counter')

def getFromHbase(rowkey):
    pool = happybase.ConnectionPool(size=POOL_SIZE,host=HOST)
    with pool.connection() as connection:
        table = connection.table(TABLE_NAME)
        row = table.row(rowkey)
        
        return row