from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import database
import fetch_data
import fetch_database
app = Flask(__name__)
CORS(app)  # Enable CORS
API_KEY = database.get_json("API_KEY")
@app.route("/", methods=['POST'])
def profile():
    data = request.get_json()
    ign = data.get('summonerName', '')
    region = data.get('region', '')
    puuid = fetch_data.fetch_id(region, ign, API_KEY) #Checks if theres a correlated Riot User to the ign and region
    if isinstance(puuid, str): #Checks if user exists
        print("Not an actual user")
        return "Error: Not an actual user"
    engine = database.establish_connection()
    player_id, icon, level, rank, soloq_rank, soloq_lp, soloq_wins, soloq_losses = database.check_id(region, ign, engine, puuid[0]) #finds the puuid and checks if it exists in the db, updates all the stuff thats not puuid thats in players table, fethces player_id in db
    merged_update_map = fetch_data.fetch_matches(region, puuid[0], puuid[1], API_KEY, engine, player_id)
    for key, item in merged_update_map.items():
        database.fetch_games(player_id, key, item, engine)
    matches = fetch_database.fetch_matches_all(player_id, engine)
    champions = fetch_database.fetch_champions(player_id, engine)
    user_json = {}
    user_json["champions"] = champions
    user_json["matches"] = matches
    user_json["icon"] = icon
    user_json["level"] = level
    user_json["rank"] = rank
    user_json["soloq_rank"] = soloq_rank
    user_json["soloq_lp"] = soloq_lp
    user_json["soloq_wins"] = soloq_wins
    user_json["soloq_losses"] = soloq_losses
    return jsonify(user_json)

@app.route("/profile/<region>/<ign>/<tag>/<champion>", methods=['GET'])
def champion(region, ign, tag, champion):
    engine = database.establish_connection()
    fullign = ign + '#' + tag
    player_id = database.fetch_player(fullign, region, engine)
    if isinstance(player_id, str):
        print("Player not Detected: ")
        print("Please wait, entering your data in")
    champion_averages = fetch_database.fetch_champ_averages(player_id, champion, engine)
    champion_runes = fetch_database.fetch_rune_averages(player_id, champion, engine)
    champion_items = fetch_database.fetch_item_all(player_id, champion, engine)
    champion_matchups_top = fetch_database.fetch_matchups(player_id, champion, "TOP", engine)
    champion_matchups_jg = fetch_database.fetch_matchups(player_id, champion, "JUNGLE", engine)
    champion_matchups_mid = fetch_database.fetch_matchups(player_id, champion, "MIDDLE", engine)
    champion_matchups_bot = fetch_database.fetch_matchups(player_id, champion, "BOTTOM", engine)
    champion_matchups_sup = fetch_database.fetch_matchups(player_id, champion, "UTILITY", engine)
    icon, level, rank, soloq_rank, soloq_lp, soloq_wins, soloq_losses = database.fetch_info(fullign, region, engine)
    champion_json = {}
    champion_json = {
            'icon': icon,
            'level': level,
            'runes': champion_runes,
            'items': champion_items,
            'averages': champion_averages,
            'matchups_top': champion_matchups_top,
            'matchups_jg': champion_matchups_jg,
            'matchups_mid': champion_matchups_mid,
            'matchups_bot': champion_matchups_bot,
            'matchups_sup': champion_matchups_sup
    }
    return jsonify(champion_json)
@app.route("/profile/<region>/<ign>/<tag>", methods=['POST'])
def updateprofile(region, ign, tag):
    puuid = fetch_data.fetch_id(region, ign + '#' + tag, API_KEY)
    engine = database.establish_connection()
    player_id, icon, level, rank, soloq_rank, soloq_lp, soloq_wins, soloq_losses = database.check_id(region, ign + '#' + tag, engine, puuid[0])
    merged_update_map = fetch_data.fetch_matches(region, puuid[0], puuid[1], API_KEY, engine, player_id)
    for key, item in merged_update_map.items():
        database.fetch_games(player_id, key, item, engine)
    matches = fetch_database.fetch_matches_all(player_id, engine)
    champions = fetch_database.fetch_champions(player_id, engine)
    user_json = {}
    user_json["champions"] = champions
    user_json["matches"] = matches
    user_json["icon"] = icon
    user_json["level"] = level
    user_json["rank"] = rank
    user_json["soloq_rank"] = soloq_rank
    user_json["soloq_lp"] = soloq_lp
    user_json["soloq_wins"] = soloq_wins
    user_json["soloq_losses"] = soloq_losses
    return jsonify(user_json)

@app.route("/profile/<region>/<ign>/<tag>/<champion>", methods=['POST'])
def updatechampion(region, ign, tag, champion):
    puuid = fetch_data.fetch_id(region, ign + '#' + tag, API_KEY)
    engine = database.establish_connection()
    player_id, icon, level, rank, soloq_rank, soloq_lp, soloq_wins, soloq_losses = database.check_id(region, ign + '#' + tag, engine, puuid[0])
    merged_update_map = fetch_data.fetch_matches(region, puuid[0], puuid[1], API_KEY, engine, player_id)
    for key, item in merged_update_map.items():
        database.fetch_games(player_id, key, item, engine)
    matches = fetch_database.fetch_matches_all(player_id, engine)
    champions = fetch_database.fetch_champions(player_id, engine)
    user_json = {}
    user_json["champions"] = champions
    user_json["matches"] = matches
    user_json["icon"] = icon
    user_json["level"] = level
    user_json["rank"] = rank
    user_json["soloq_rank"] = soloq_rank
    user_json["soloq_lp"] = soloq_lp
    user_json["soloq_wins"] = soloq_wins
    user_json["soloq_losses"] = soloq_losses
    return jsonify(user_json)
@app.route('//riot.txt', methods=['GET'])
def riot_file():
    return send_file('riot.txt')

if __name__ == "__main__":
    app.run(debug=True, port=5000)
