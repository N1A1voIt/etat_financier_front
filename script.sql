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

CREATE TABLE financial_data (
    year INTEGER PRIMARY KEY,
    ca NUMERIC(18, 2),
    ps NUMERIC(18, 2),
    pi NUMERIC(18, 2),
    ac NUMERIC(18, 2),
    se NUMERIC(18, 2),
    cp NUMERIC(18, 2),
    it NUMERIC(18, 2),
    ao NUMERIC(18, 2),
    co NUMERIC(18, 2),
    dp NUMERIC(18, 2),
    rp NUMERIC(18, 2),
    pf NUMERIC(18, 2),
    cf NUMERIC(18, 2),
    ie NUMERIC(18, 2),
    id NUMERIC(18, 2),
    ep NUMERIC(18, 2),
    ec NUMERIC(18, 2)
);

-- CREATE VIEW vue_compte_resultat AS
-- SELECT 
--     sr.numero_section,
--     sr.libelle AS section,
--     calculate_section_result(sr.numero_section) AS montant_total
-- FROM section_resultat sr;

-- CREATE OR REPLACE VIEW production_exercice as 
-- SELECT sum(montant) as montant FROM compte_resultat WHERE numero_section = 1;

-- CREATE OR REPLACE VIEW consommation_exercice as 
-- SELECT sum(montant) as montant FROM compte_resultat WHERE numero_section = 2;

-- CREATE OR REPLACE VIEW valeur_ajoute_exploitation as 
-- SELECT ((SELECT montant from production_exercice) - (SELECT montant from consommation_exercice)) as montant;

-- CREATE OR REPLACE VIEW excedent_brut_exploitation as 
-- SELECT ((SELECT montant from valeur_ajoute_exploitation) - (SELECT sum(montant) as montant from consommation_exercice WHERE numero_section = 3)) as montant;

-- CREATE OR REPLACE VIEW resultat_operationnel as 
-- SELECT (
--     (SELECT montant from excedent_brut_exploitation) 
--     + 
--     (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 4) 
--     - 
--     (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 5) 
--     +
--     (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 6)
-- ) as montant;


-- CREATE OR REPLACE VIEW resultat_financier as SELECT (
-- (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 7) 
--     - 
-- (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 8)) as montant;

-- CREATE OR REPLACE VIEW resultat_avant_impots as SELECT (
--     (SELECT montant from resultat_financier) + (SELECT montant from resultat_operationnel) 
-- ) as montant;

-- CREATE OR REPLACE VIEW total_produit_ordinaire as SELECT(
--     (SELECT montant from production_exercice) + 
--     (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 4) + 
--     (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 6) + 
--     (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 7)  
-- ) as montant;

-- CREATE OR REPLACE VIEW total_charge_ordinaire as SELECT (
--     (SELECT montant from consommation_exercice) +
--     (SELECT montant from excedent_brut_exploitation) + 
--     (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 5) +
--     (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 8) +
--     (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 9)  
-- ) as montant;

-- CREATE OR REPLACE VIEW resultat_net_ordinaire as SELECT (
--     (SELECT montant from resultat_avant_impots) -
--     (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 9)  
-- ) as montant;

-- CREATE OR REPLACE VIEW resultat_extraordinaire as SELECT (
--     (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 10)  -
--     (SELECT SUM(montant) as montant from consommation_exercice WHERE numero_section = 11)  
-- ) as montant;

-- CREATE OR REPLACE VIEW resultat_net as SELECT (
--     (SELECT montant from resultat_net_ordinaire) + 
--     (SELECT montant from resultat_extraordinaire) 
-- ) as montant;

CREATE VIEW vue_rubrique_type AS 
SELECT rubriques.*,est_actif,nom FROM rubriques JOIN type on rubriques.id_type = type.id_type;