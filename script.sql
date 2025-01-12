CREATE TABLE type(
   id_type SERIAL,
   nom VARCHAR(50)  NOT NULL,
   est_actif BOOLEAN NOT NULL,
   PRIMARY KEY(id_type)
);


INSERT INTO type VALUES(DEFAULT,'Actifs courants',true);
INSERT INTO type VALUES(DEFAULT,'Actifs non courants',true);
INSERT INTO type VALUES(DEFAULT,'Passifs courants',false);
INSERT INTO type VALUES(DEFAULT,'Passifs non courants',false);
INSERT INTO type VALUES(DEFAULT,'Capitaux propres',false);

CREATE TABLE section_resultat(
   numero_section INTEGER,
   libelle VARCHAR(250)  NOT NULL,
   sql_query VARCHAR(350)  NOT NULL,
   PRIMARY KEY(numero_section)
);

CREATE TABLE rubriques(
   id_rubrique SERIAL,
   rubrique VARCHAR(2)  NOT NULL UNIQUE,
   montant NUMERIC(18,2)  ,
   n_compte VARCHAR(50) ,
   id_type INTEGER,
   id_rubrique_mere INTEGER,
   PRIMARY KEY(id_rubrique),
   FOREIGN KEY(id_type) REFERENCES type(id_type),
   FOREIGN KEY(id_rubrique_mere) REFERENCES rubriques(id_rubrique)
);

CREATE TABLE compte_resultat(
   id_rubrique SERIAL,
   rubrique VARCHAR(2)  NOT NULL,
   est_important BOOLEAN NOT NULL,
   montant NUMERIC(18,2)  ,
   numero_section INTEGER NOT NULL,
   PRIMARY KEY(id_rubrique)
);



INSERT INTO compte_resultat (rubrique, est_important, montant, numero_section) VALUES
('CA', FALSE, 0, 1),   -- Chiffre d'affaire
('PS', FALSE, 0, 1),   -- Production stockée
('PI', FALSE, 0, 1),   -- Production immobilisée
-- ('P1', TRUE, 0, 0),    -- I - Production de l'exercice
('AC', FALSE, 0, 2),   -- Achats consommés
('SE', FALSE, 0, 2),   -- Services extérieurs
-- ('C2', TRUE, 0, 0),    -- II - Consommation de l'exercice
-- ('V3', TRUE, 0, 0),    -- III - Valeur ajoutée d'exploitation
('CP', FALSE, 0, 3),   -- Charges de personnel
('IT', FALSE, 0, 3),   -- Impots, taxes et versement assimilés
-- ('E4', TRUE, 0, 0),    -- IV - Exédents brut d'exploitation
('AO', FALSE, 0, 4),   -- Autres produits opérationnels
('CO', FALSE, 0, 5),   -- Autres charges opérationnels
('DP', FALSE, 0, 5),   -- Dotations aux amortissements, aux provisions et aux pertes de valeurs
('RP', FALSE, 0, 6),   -- Reprises aux provisions et aux pertes de valeur
-- ('R5', TRUE, 0, 0),    -- V - Résultat opérationnel
('PF', FALSE, 0, 7),   -- Produits financiers
('CF', FALSE, 0, 8),   -- Charges financières
-- ('F6', TRUE, 0, 0),    -- VI - Résultat financier
-- ('AI', TRUE, 0, 0),    -- VII - Résultat avant impôt
('IE', FALSE, 0, 9),   -- Impôts exigibles sur résultat
('ID', FALSE, 0, 9),   -- Impôts différés (Variations)
-- ('TP', TRUE, 0, 0),    -- Totat des produits des activités ordinaires
-- ('TC', TRUE, 0, 0),    -- Total des charges des activités ordinaires
-- ('RN', TRUE, 0, 0),    -- VII - Résultat net des activités ordinaires
('EP', FALSE, 0, 10),  -- Elements extraordinaires (Produits)
('EC', FALSE, 0, 11);  -- Elements extraordinaires (charges)
-- ('RX', TRUE, 0, 0),    -- IX - Résultat extraordinaire
-- ('NX', TRUE, 0, 0);    -- X - Résultat net de l'exercice



CREATE OR REPLACE FUNCTION calculate_section_result(section_id INTEGER)
RETURNS NUMERIC AS $$
DECLARE
    result NUMERIC;
    query TEXT;
BEGIN
    SELECT sql_query INTO query
    FROM section_resultat
    WHERE numero_section = section_id;

    EXECUTE query INTO result;

    RETURN result;
END;
$$ LANGUAGE plpgsql;

CREATE VIEW vue_compte_resultat AS
SELECT 
    sr.numero_section,
    sr.libelle AS section,
    calculate_section_result(sr.numero_section) AS montant_total
FROM section_resultat sr;

CREATE OR REPLACE VIEW production_exercice as 
SELECT sum(montant) as montant FROM compte_resultat WHERE numero_section = 1;

CREATE OR REPLACE VIEW consommation_exercice as 
SELECT sum(montant) as montant FROM compte_resultat WHERE numero_section = 2;

CREATE OR REPLACE VIEW valeur_ajoute_exploitation as 
SELECT ((SELECT montant from production_exercice) - (SELECT montant from consommation_exercice)) as montant;

CREATE OR REPLACE VIEW excedent_brut_exploitation as 
SELECT ((SELECT montant from valeur_ajoute_exploitation) - (SELECT sum(montant) as montant from consommation_exercice WHERE numero_section = 3)) as montant;

CREATE OR REPLACE VIEW resultat_operationnel as 
SELECT (
    (SELECT montant from excedent_brut_exploitation) 
    + 
    (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 4) 
    - 
    (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 5) 
    +
    (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 6)
) as montant;


CREATE OR REPLACE VIEW resultat_financier as SELECT (
(SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 7) 
    - 
(SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 8)) as montant;

CREATE OR REPLACE VIEW resultat_avant_impots as SELECT (
    (SELECT montant from resultat_financier) + (SELECT montant from resultat_operationnel) 
) as montant;

CREATE OR REPLACE VIEW total_produit_ordinaire as SELECT(
    (SELECT montant from production_exercice) + 
    (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 4) + 
    (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 6) + 
    (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 7)  
) as montant;

CREATE OR REPLACE VIEW total_charge_ordinaire as SELECT (
    (SELECT montant from consommation_exercice) +
    (SELECT montant from excedent_brut_exploitation) + 
    (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 5) +
    (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 8) +
    (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 9)  
) as montant;

CREATE OR REPLACE VIEW resultat_net_ordinaire as SELECT (
    (SELECT montant from resultat_avant_impots) -
    (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 9)  
) as montant;

CREATE OR REPLACE VIEW resultat_extraordinaire as SELECT (
    (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 10)  -
    (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 11)  
) as montant;

CREATE OR REPLACE VIEW resultat_net as SELECT (
    (SELECT montant from resultat_net_ordinaire) + 
    (SELECT montant from resultat_extraordinaire) 
) as montant;

CREATE VIEW vue_rubrique_type AS 
SELECT rubriques.*,est_actif,nom FROM rubriques JOIN type on rubriques.id_type = type.id_type;