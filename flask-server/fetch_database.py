import database
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
#fetch all champion averages
def fetch_champions(player_id, engine):

    sql = """
    SELECT * FROM champions
    WHERE player_id = :id
    """
    with engine.connect() as connection:
        result = connection.execute(text(sql), {
            "id": player_id
        })
        rows = result.fetchall()
        processed_rows = [list(row[:-1]) for row in rows]
        processed_rows.sort(key=lambda x: x[3], reverse=True)
        return processed_rows
#fetch champion averages
def fetch_champ_averages(player_id, champion, engine):

    sql = """
    SELECT * FROM champions
    WHERE player_id = :id
    AND champ_name = :champ
    """
    with engine.connect() as connection:
        result = connection.execute(text(sql), {
            "id": player_id,
            "champ": champion
        })
        row = result.fetchall()
        return list(row[0])

#fetches all the runes
def fetch_rune_averages(player_id, champion, engine):

    sql = """
    SELECT * FROM runes
    WHERE player_id = :id
    AND champ_name = :champ
    """
    with engine.connect() as connection:
        result = connection.execute(text(sql), {
            "id": player_id,
            "champ": champion
        })
        rows = result.fetchall()
        processed_rows = [list(row[:-1]) for row in rows]
        processed_rows.sort(key=lambda x: x[4], reverse=True)
        return processed_rows


#fetches all matchups in a lane
def fetch_matchups(player_id, champion, lane, engine):
    sql = """
    SELECT * FROM matchups
    WHERE player_id = :id
    AND champ_name = :champ
    AND lane = :lane
    """
    with engine.connect() as connection:
        result = connection.execute(text(sql), {
            "id": player_id,
            "champ": champion,
            "lane": lane
        })
        rows = result.fetchall()
        processed_rows = [list(row[:-1]) for row in rows]
        processed_rows.sort(key=lambda x: x[5], reverse=True)
        return processed_rows


from sqlalchemy import text

#fetches all matches
def fetch_matches_all(player_id, engine):

    sql = """
    SELECT * FROM matches
    WHERE player_id = :id
    ORDER BY date DESC
    """
    with engine.connect() as connection:
        result = connection.execute(text(sql), {
            "id": player_id
        })
        rows = result.fetchall()
        processed_rows = [list(row[:-1]) for row in rows]
        return processed_rows


def fetch_item_all(player_id, champion, engine):
    sql = """
    SELECT * FROM items
    WHERE player_id = :id
    AND champ_name = :champ
    """
    with engine.connect() as connection:
        result = connection.execute(text(sql), {
            "id": player_id,
            "champ": champion
        })
        rows = result.fetchall()
        processed_rows = [list(row) for row in rows]
        processed_rows.sort(key=lambda x: x[4], reverse=True)
        return processed_rows
