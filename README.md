# 狙い目手帖（整理版）

GitHub Pages でそのまま公開できる構成のまま、量産しやすいように整理した版です。

## 主な変更点

- `index.html` は `assets/data/machines.json` を読んで機種一覧を自動描画
- 共通スタイルを `assets/css/` に分離
- 新規追加のたたき台として `templates/` を追加
- `privacy.html` `contact.html` を共通デザインに統一
- 既存の機種ページは URL を変えずに維持

## 新機種追加手順

1. `templates/article-template.html` を複製して `slug_article.html` を作成
2. `templates/checker-template.html` を複製して `slug_checker.html` を作成
3. テンプレート内のプレースホルダを差し替え
4. `assets/data/machines.json` に1件追加
5. GitHub に push

## いま残している方針

既存の各 article / checker の本文や判定ロジックは大きく崩さず残しています。
まずは「量産時の入口」と「共通管理箇所」を作ることを優先しています。
次の段階では article / checker ごとの inline style をさらに整理できます。
