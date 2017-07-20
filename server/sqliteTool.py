import sqlite3
conn = sqlite3.connect('data/demodb')

c = conn.cursor()

for row in c.execute("SELECT * FROM project WHERE name = 'dummy'"):
    print row