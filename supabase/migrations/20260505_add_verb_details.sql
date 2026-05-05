-- 為 vocabulary 表格新增「自動詞/他動詞」與「動詞類別」欄位
ALTER TABLE vocabulary ADD COLUMN IF NOT EXISTS transitivity TEXT;
ALTER TABLE vocabulary ADD COLUMN IF NOT EXISTS verb_group TEXT;

-- 也可以順便幫 adjectives 表格檢查，但目前需求主要是動詞
-- ALTER TABLE adjectives ADD COLUMN IF NOT EXISTS ...
