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
SELECT COALESCE(ca, 0) + COALESCE(ps, 0) + COALESCE(pi, 0) AS montant
FROM financial_data;

CREATE OR REPLACE VIEW consommation_exercice AS
SELECT COALESCE(ac, 0) + COALESCE(se, 0) AS montant
FROM financial_data;

CREATE OR REPLACE VIEW valeur_ajoute_exploitation AS
SELECT (SELECT montant FROM production_exercice) - (SELECT montant FROM consommation_exercice) AS montant;

CREATE OR REPLACE VIEW excedent_brut_exploitation AS
SELECT (SELECT montant FROM valeur_ajoute_exploitation) - (COALESCE(cp, 0) + COALESCE(it, 0)) AS montant
FROM financial_data;

CREATE OR REPLACE VIEW resultat_operationnel AS
SELECT (
           (SELECT montant FROM excedent_brut_exploitation)
               +
           COALESCE(ao, 0)
               -
           COALESCE(co, 0)
               -
           COALESCE(dp, 0)
                +
           COALESCE(rp,0)
           ) AS montant
FROM financial_data;

CREATE OR REPLACE VIEW resultat_financier AS
SELECT COALESCE(pf, 0) - COALESCE(cf, 0) AS montant
FROM financial_data;

CREATE OR REPLACE VIEW resultat_avant_impots AS
SELECT (
           (SELECT montant FROM resultat_operationnel) + (SELECT montant FROM resultat_financier)
           ) AS montant;

CREATE OR REPLACE VIEW total_produit_ordinaire AS
SELECT (
           (SELECT montant FROM production_exercice)
               +
           COALESCE(ao, 0)
               +
           COALESCE(rp, 0)
               +
           COALESCE(pf, 0)
           ) AS montant
FROM financial_data;

CREATE OR REPLACE VIEW total_charge_ordinaire AS
SELECT (
           (SELECT montant FROM consommation_exercice)
               +
           COALESCE(cp,0)
               +
           COALESCE(it,0)
               +
           COALESCE(co, 0)
               +
           COALESCE(dp, 0)
               +
           COALESCE(cf, 0)
           +
           COALESCE(ie,0)
            +
           COALESCE(id,0)
           ) AS montant
FROM financial_data;

CREATE OR REPLACE VIEW resultat_net_ordinaire AS
SELECT (
           (SELECT montant FROM resultat_avant_impots)
               -
           COALESCE(ie, 0)
           ) AS montant
FROM financial_data;

CREATE OR REPLACE VIEW resultat_extraordinaire AS
SELECT COALESCE(ep, 0) - COALESCE(ec, 0) AS montant
FROM financial_data;

CREATE OR REPLACE VIEW resultat_net AS
SELECT (
           (SELECT montant FROM resultat_net_ordinaire)
               +
           (SELECT montant FROM resultat_extraordinaire)
           ) AS montant;
CREATE OR REPLACE VIEW vue_compte_resultat_transpose AS
SELECT
    ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS id, -- Génère un id unique
    rubriques,
    montant,
    isImportant
FROM (
    SELECT
        'Chiffre d''affaire' AS rubriques,
        ca AS montant,
        false AS isImportant
    FROM financial_data

    UNION ALL

    SELECT
        'Production stockée',
        ps,
        false
    FROM financial_data

    UNION ALL

    SELECT
        'Production immobilisée',
        pi,
        false
    FROM financial_data

    UNION ALL

    SELECT
        'I - Production de l''exercice',
        (SELECT montant FROM production_exercice),
        true
    FROM financial_data

    UNION ALL

    SELECT
        'Achats consommés',
        ac,
        false
    FROM financial_data

    UNION ALL

    SELECT
        'Services extérieurs',
        se,
        false
    FROM financial_data

    UNION ALL

    SELECT
        'II - Consommation de l''exercice',
        (SELECT montant FROM consommation_exercice),
        true
    FROM financial_data

    UNION ALL

    SELECT
        'III - Valeur ajoutée d''exploitation',
        (SELECT montant FROM valeur_ajoute_exploitation),
        true
    FROM financial_data

    UNION ALL

    SELECT
        'Charges de personnel',
        cp,
        false
    FROM financial_data

    UNION ALL

    SELECT
        'Impots, taxes et versement assimilés',
        it,
        false
    FROM financial_data

    UNION ALL

    SELECT
        'IV - Exédents brut d''exploitation',
        (SELECT montant FROM excedent_brut_exploitation),
        true
    FROM financial_data

    UNION ALL

    SELECT
        'Autres produits opérationnels',
        ao,
        false
    FROM financial_data

    UNION ALL

    SELECT
        'Autres charges opérationnels',
        co,
        false
    FROM financial_data

    UNION ALL

    SELECT
        'Dotations aux amortissements, aux provisions et aux pertes de valeurs',
        dp,
        false
    FROM financial_data

    UNION ALL

    SELECT
        'Reprises aux provisions et aux pertes de valeur',
        rp,
        false
    FROM financial_data

    UNION ALL

    SELECT
        'V - Résultat opérationnel',
        (SELECT montant FROM resultat_operationnel),
        true
    FROM financial_data

    UNION ALL

    SELECT
        'Produits financiers',
        pf,
        false
    FROM financial_data

    UNION ALL

    SELECT
        'Charges financiers',
        cf,
        false
    FROM financial_data

    UNION ALL

    SELECT
        'VI - Résultat financier',
        (SELECT montant FROM resultat_financier),
        true
    FROM financial_data

    UNION ALL

    SELECT
        'VII - Résultat avant impôt',
        (SELECT montant FROM resultat_avant_impots),
        true
    FROM financial_data

    UNION ALL

    SELECT
        'Impôts exigibles sur résultat',
        ie,
        false
    FROM financial_data

    UNION ALL

    SELECT
        'Impôts différés (Variations)',
        id,
        false
    FROM financial_data

    UNION ALL

    SELECT
        'Total des produits des activités ordinaires',
        (SELECT montant FROM total_produit_ordinaire),
        true
    FROM financial_data

    UNION ALL

    SELECT
        'Total des charges des activités ordinaires',
        (SELECT montant FROM total_charge_ordinaire),
        true
    FROM financial_data

    UNION ALL

    SELECT
        'VII - Résultat net des activités ordinaires',
        (SELECT montant FROM resultat_net_ordinaire),
        true
    FROM financial_data

    UNION ALL

    SELECT
        'Elements extraordinaires (Produits)',
        ep,
        false
    FROM financial_data

    UNION ALL

    SELECT
        'Elements extraordinaires (charges)',
        ec,
        false
    FROM financial_data

    UNION ALL

    SELECT
        'IX - Résultat extraordinaire',
        (SELECT montant FROM resultat_extraordinaire),
        true
    FROM financial_data

    UNION ALL

    SELECT
        'X - Résultat net de l''exercice',
        (SELECT montant FROM resultat_net),
        true
    FROM financial_data
) AS subquery;

CREATE VIEW vue_rubrique_type AS 
SELECT rubriques.*,est_actif,nom FROM rubriques JOIN type on rubriques.id_type = type.id_type;