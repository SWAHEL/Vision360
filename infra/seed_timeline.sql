-- =========================================================
-- Seed timelines for 5 taxpayers
-- Uses identifiant_fiscal you inserted earlier:
--   IF-REN-0001, IF-ARA-0001, IF-ZEN-0001, IF-NOV-0001, IF-SAH-0001
-- =========================================================

 DELETE FROM public.timeline_event
 WHERE taxpayer_id IN (
   SELECT id FROM public.taxpayer
   WHERE identifiant_fiscal IN ('IF-REN-0001','IF-ARA-0001','IF-ZEN-0001','IF-NOV-0001','IF-SAH-0001')
 );

-- ============== RENACO S.A. =================================
WITH t AS (
  SELECT id FROM public.taxpayer WHERE identifiant_fiscal = 'IF-REN-0001'
)
INSERT INTO public.timeline_event (taxpayer_id, type, severity, occurred_at, payload) VALUES
((SELECT id FROM t),'DECLARATION_TVA','LOW','2024-12-31 10:00:00+00','{"period":"T4 2024","status":"traitee","attachment":"declaration_tva_q4.pdf"}'),
((SELECT id FROM t),'PAIEMENT_IS','LOW','2025-03-25 09:30:00+00','{"amount":25000,"currency":"MAD","method":"virement bancaire","status":"recu"}'),
((SELECT id FROM t),'CONTROLE_FISCAL','HIGH','2022-02-12 14:00:00+00','{"inspector":"M. Lahlou","non_conformite":true,"report_file":"controle_2022.pdf"}'),
((SELECT id FROM t),'DECLARATION_IS_ANNUELLE','LOW','2022-03-31 11:00:00+00','{"exercice":2021,"resultat":150000,"currency":"MAD","status":"traitee"}');

-- ============== ARAVO Group ===============================
WITH t AS (
  SELECT id FROM public.taxpayer WHERE identifiant_fiscal = 'IF-ARA-0001'
)
INSERT INTO public.timeline_event (taxpayer_id, type, severity, occurred_at, payload) VALUES
((SELECT id FROM t),'DECLARATION_TVA','LOW','2024-09-30 10:20:00+00','{"period":"T3 2024","status":"traitee","attachment":"aravo_tva_q3.pdf"}'),
((SELECT id FROM t),'PAIEMENT_TVA','LOW','2024-10-10 09:00:00+00','{"amount":8200,"currency":"MAD","method":"virement bancaire","status":"recu"}'),
((SELECT id FROM t),'AVIS_DE_RECTIFICATION','MEDIUM','2023-05-18 15:00:00+00','{"motif":"Ecart TVA intracom.","delai_reponse_jours":30,"doc":"avis_rectif_2023.pdf"}'),
((SELECT id FROM t),'DECLARATION_IS_ANNUELLE','LOW','2023-03-31 12:00:00+00','{"exercice":2022,"resultat":210000,"currency":"MAD","status":"traitee"}');

-- ============== Zenitech SARL =============================
WITH t AS (
  SELECT id FROM public.taxpayer WHERE identifiant_fiscal = 'IF-ZEN-0001'
)
INSERT INTO public.timeline_event (taxpayer_id, type, severity, occurred_at, payload) VALUES
((SELECT id FROM t),'DECLARATION_TVA','LOW','2025-03-31 08:45:00+00','{"period":"T1 2025","status":"en_cours"}'),
((SELECT id FROM t),'PAIEMENT_IS','LOW','2024-03-25 10:15:00+00','{"amount":33000,"currency":"MAD","method":"cheque","status":"recu"}'),
((SELECT id FROM t),'CONTROLE_FISCAL','LOW','2023-07-05 09:30:00+00','{"inspector":"Mme. Kabbaj","non_conformite":false,"report_file":"rapport_controle_2023.pdf"}'),
((SELECT id FROM t),'DECLARATION_IS_ANNUELLE','LOW','2024-03-31 13:00:00+00','{"exercice":2023,"resultat":275000,"currency":"MAD","status":"traitee"}');

-- ============== Nova Food Industries ======================
WITH t AS (
  SELECT id FROM public.taxpayer WHERE identifiant_fiscal = 'IF-NOV-0001'
)
INSERT INTO public.timeline_event (taxpayer_id, type, severity, occurred_at, payload) VALUES
((SELECT id FROM t),'DECLARATION_TVA','LOW','2024-06-30 10:00:00+00','{"period":"T2 2024","status":"traitee"}'),
((SELECT id FROM t),'PAIEMENT_TVA','LOW','2024-07-08 09:00:00+00','{"amount":12950,"currency":"MAD","method":"espece","status":"recu"}'),
((SELECT id FROM t),'MISE_EN_DEMEURE','MEDIUM','2022-11-20 16:30:00+00','{"objet":"Retard declaration TVA","delai_reglement_jours":15,"doc":"mise_demeure_2022.pdf"}'),
((SELECT id FROM t),'DECLARATION_IS_ANNUELLE','LOW','2023-03-31 10:30:00+00','{"exercice":2022,"resultat":98000,"currency":"MAD","status":"traitee"}');

-- ============== Sahara Logistics ==========================
WITH t AS (
  SELECT id FROM public.taxpayer WHERE identifiant_fiscal = 'IF-SAH-0001'
)
INSERT INTO public.timeline_event (taxpayer_id, type, severity, occurred_at, payload) VALUES
((SELECT id FROM t),'DECLARATION_TVA','LOW','2024-03-31 08:30:00+00','{"period":"T1 2024","status":"traitee"}'),
((SELECT id FROM t),'PAIEMENT_IS','LOW','2024-04-10 09:20:00+00','{"amount":20500,"currency":"MAD","method":"virement bancaire","status":"recu"}'),
((SELECT id FROM t),'CONTROLE_FISCAL','HIGH','2023-01-15 14:15:00+00','{"inspector":"M. Zahid","non_conformite":true,"observations":"Factures manquantes transport","report_file":"controle_2023_transport.pdf"}'),
((SELECT id FROM t),'DECLARATION_IS_ANNUELLE','LOW','2023-03-31 12:30:00+00','{"exercice":2022,"resultat":122000,"currency":"MAD","status":"traitee"}');
