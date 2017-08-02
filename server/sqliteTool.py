import sqlite3
conn = sqlite3.connect('data/demodb')

c = conn.cursor()

for row in c.execute("SELECT name FROM developer"):
    print(row)