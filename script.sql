CREATE TABLE type(
   id_type SERIAL,
   nom VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id_type)
);

CREATE TABLE section_resultat(
   numero_section INTEGER,
   libelle VARCHAR(250)  NOT NULL,
   sql_query VARCHAR(350)  NOT NULL,
   PRIMARY KEY(numero_section)
);

CREATE TABLE rubriques(
   id_rubrique SERIAL,
   rubrique VARCHAR(250)  NOT NULL,
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
   PRIMARY KEY(id_rubrique),
   FOREIGN KEY(numero_section) REFERENCES section_resultat(numero_section)
);

INSERT INTO section_resultat (numero_section, libelle, sql_query) VALUES 
(1, 'Production de l exercice', 
 'SELECT coalesce(SUM(montant),0) FROM compte_resultat WHERE numero_section = 1'),
(2, 'Consommation de l exercice', 
 'SELECT coalesce(SUM(montant),0) FROM compte_resultat WHERE numero_section = 2'),
(3, 'Valeur ajoutée d exploitation (I - II)', 
 '(SELECT coalesce(SUM(montant),0) FROM compte_resultat WHERE numero_section = 1) - 
  (SELECT coalesce(SUM(montant),0) FROM compte_resultat WHERE numero_section = 2)'),
(4, 'Excédent brut d exploitation', 
 'SELECT coalesce(SUM(montant),0) FROM compte_resultat WHERE numero_section = 4'),
(5, 'Résultat opérationnel', 
 'SELECT coalesce(SUM(montant),0) FROM compte_resultat WHERE numero_section = 5'),
(6, 'Résultat financier', 
 'SELECT coalesce(SUM(montant),0) FROM compte_resultat WHERE numero_section = 6'),
(7, 'Résultat avant impôts (V + VI)', 
 '(SELECT coalesce(SUM(montant),0) FROM compte_resultat WHERE numero_section = 5) + 
  (SELECT coalesce(SUM(montant),0) FROM compte_resultat WHERE numero_section = 6)'),
(8, 'Résultat net des activités ordinaires', 
 'SELECT coalesce(SUM(montant),0) FROM compte_resultat WHERE numero_section = 8'),
(9, 'Résultat extraordinaire', 
 'SELECT coalesce(SUM(montant),0) FROM compte_resultat WHERE numero_section = 9'),
(10, 'Résultat net de l exercice', 
 'SELECT coalesce(SUM(montant),0) FROM compte_resultat WHERE numero_section = 10'),
(11, 'Résultat net de l ensemble consolidé', 
 'SELECT coalesce(SUM(montant),0) FROM compte_resultat WHERE numero_section = 11');


 CREATE VIEW vue_compte_resultat AS
SELECT 
    sr.libelle AS section, EXECUTE IMMEDIATE sr.formula AS montant_total
FROM section_resultat sr;

