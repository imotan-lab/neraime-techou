#!/usr/bin/env python3
"""
YouTube Data API v3 を使って各機種のスロット動画数を取得し、
machines.json を人気順（動画数順）に並び替えるスクリプト。
"""

import os
import json
import time
import urllib.request
import urllib.parse

API_KEY = os.environ["YOUTUBE_API_KEY"]
MACHINES_PATH = "assets/data/machines.json"

# 機種ごとのYouTube検索キーワード
SEARCH_KEYWORDS = {
    "baki":          "バキ スロット",
    "banchou4":      "押忍!番長4 スロット",
    "biohazard":     "バイオハザード スロット",
    "chibaryo2":     "チバリヨ2 スロット",
    "dumbbell":      "ダンベル何キロ持てる スロット",
    "goblin":        "ゴブリンスレイヤー スロット",
    "godeater":      "ゴッドイーター スロット",
    "hokuto":        "スマスロ北斗の拳",
    "hokuto_tensei2":"北斗の拳転生2 スロット",
    "kabaneri":      "甲鉄城のカバネリ スロット",
    "kaguya":        "かぐや様は告らせたい スロット",
    "koukaku":       "攻殻機動隊 スロット",
    "monkeyv":       "モンキーターンV スロット",
    "sf5":           "ストリートファイター5 スロット",
    "tekken6":       "鉄拳6 スロット",
    "tensura":       "転生したらスライムだった件 スロット",
    "tokyo_ghoul":   "東京喰種 スロット",
    "valvrave2":     "革命機ヴァルヴレイヴ2 スロット",
}

def get_video_count(keyword):
    """指定キーワードでYouTube検索して過去7日間の動画数を返す"""
    params = urllib.parse.urlencode({
        "part": "snippet",
        "q": keyword,
        "type": "video",
        "publishedAfter": get_7days_ago(),
        "maxResults": 50,
        "key": API_KEY,
    })
    url = f"https://www.googleapis.com/youtube/v3/search?{params}"
    try:
        with urllib.request.urlopen(url, timeout=10) as res:
            data = json.loads(res.read())
            return data.get("pageInfo", {}).get("totalResults", 0)
    except Exception as e:
        print(f"  ERROR: {keyword} -> {e}")
        return 0

def get_7days_ago():
    """7日前のRFC3339形式の日時を返す"""
    import datetime
    dt = datetime.datetime.utcnow() - datetime.timedelta(days=7)
    return dt.strftime("%Y-%m-%dT%H:%M:%SZ")

def main():
    # machines.json を読み込む
    with open(MACHINES_PATH, "r", encoding="utf-8") as f:
        machines = json.load(f)

    # 各機種のYouTube動画数を取得
    scores = {}
    for machine in machines:
        slug = machine["slug"]
        keyword = SEARCH_KEYWORDS.get(slug, machine["name"] + " スロット")
        print(f"検索中: {machine['name']} ({keyword})")
        count = get_video_count(keyword)
        scores[slug] = count
        print(f"  -> {count}件")
        time.sleep(0.5)  # API制限対策

    # 動画数順（降順）に並び替え
    machines.sort(key=lambda m: scores.get(m["slug"], 0), reverse=True)

    # machines.json を上書き保存
    with open(MACHINES_PATH, "w", encoding="utf-8") as f:
        json.dump(machines, f, ensure_ascii=False, indent=2)

    print("\n並び替え完了:")
    for i, m in enumerate(machines, 1):
        print(f"  {i}. {m['name']} ({scores.get(m['slug'], 0)}件)")

if __name__ == "__main__":
    main()
