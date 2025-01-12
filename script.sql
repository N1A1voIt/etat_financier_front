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

CREATE OR REPLACE VIEW production_exercice AS
SELECT (ca + ps + pi) AS montant
FROM financial_data;

CREATE OR REPLACE VIEW consommation_exercice AS
SELECT (ac + se) AS montant
FROM financial_data;

CREATE OR REPLACE VIEW valeur_ajoute_exploitation AS
SELECT (SELECT montant FROM production_exercice) - (SELECT montant FROM consommation_exercice) AS montant;

CREATE OR REPLACE VIEW excedent_brut_exploitation AS
SELECT (SELECT montant FROM valeur_ajoute_exploitation) - (cp + it) AS montant
FROM financial_data;

CREATE OR REPLACE VIEW resultat_operationnel AS
SELECT (
    (SELECT montant FROM excedent_brut_exploitation) 
    + 
    ao 
    - 
    co 
    +
    dp
) AS montant
FROM financial_data;

CREATE OR REPLACE VIEW resultat_financier AS
SELECT (pf - cf) AS montant
FROM financial_data;

CREATE OR REPLACE VIEW resultat_avant_impots AS
SELECT (
    (SELECT montant FROM resultat_operationnel) + (SELECT montant FROM resultat_financier)
) AS montant;

CREATE OR REPLACE VIEW total_produit_ordinaire AS
SELECT (
    (SELECT montant FROM production_exercice) 
    + 
    ao 
    + 
    dp 
    + 
    pf
) AS montant
FROM financial_data;

CREATE OR REPLACE VIEW total_charge_ordinaire AS
SELECT (
    (SELECT montant FROM consommation_exercice) 
    + 
    (SELECT montant FROM excedent_brut_exploitation) 
    + 
    co 
    + 
    cf 
    + 
    ie
) AS montant
FROM financial_data;

CREATE OR REPLACE VIEW resultat_net_ordinaire AS
SELECT (
    (SELECT montant FROM resultat_avant_impots) 
    - 
    ie
) AS montant;

CREATE OR REPLACE VIEW resultat_extraordinaire AS
SELECT (ep - ec) AS montant
FROM financial_data;

CREATE OR REPLACE VIEW resultat_net AS
SELECT (
    (SELECT montant FROM resultat_net_ordinaire) 
    + 
    (SELECT montant FROM resultat_extraordinaire)
) AS montant;


CREATE VIEW vue_rubrique_type AS 
SELECT rubriques.*,est_actif,nom FROM rubriques JOIN type on rubriques.id_type = type.id_type;