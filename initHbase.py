import happybase

connection = happybase.Connection('localhost')

#create table

connection.create_table(
    'photo',
    {
        'cf':dict(),
    }
)