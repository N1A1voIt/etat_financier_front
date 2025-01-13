--
-- PostgreSQL database dump
--

-- Dumped from database version 12.19
-- Dumped by pg_dump version 12.19

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: calculate_section_result(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.calculate_section_result(section_id integer) RETURNS numeric
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.calculate_section_result(section_id integer) OWNER TO postgres;

--
-- Name: get_financial_data(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_financial_data() RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
    json_array JSON := '[]';
    current_detailed_row compte_resultat%ROWTYPE;
    detailed_cursor CURSOR FOR SELECT * FROM compte_resultat ORDER BY id_rubrique;
    summary_positions INT[] := ARRAY[4,7,8,11,15,18,19,21,22,23,27,28];
    summary_views TEXT[] := ARRAY[
        'production_exercice',
        'consommation_exercice',
        'valeur_ajoute_exploitation',
        'excedent_brut_exploitation',
        'resultat_operationnel',
        'resultat_financier',
        'resultat_avant_impots',
        'total_produit_ordinaire',
        'total_charge_ordinaire',
        'resultat_net_ordinaire',
        'resultat_extraordinaire',
        'resultat_net'
    ];
    summary_index INT := 1;
    detailed_index INT := 1;
    current_summary NUMERIC;
    position INT;
BEGIN
    OPEN detailed_cursor;
    LOOP
        FOR position IN 1..28 LOOP
            IF position = ANY(summary_positions) THEN
                -- Fetch from corresponding view
                EXECUTE 'SELECT montant FROM ' || summary_views[summary_index] INTO current_summary;
                -- Add to JSON array
                json_array := json_array || json_build_object(
                    'rubrique', (SELECT libelle FROM section_resultat WHERE numero_section = 0 OFFSET summary_index - 1 LIMIT 1),
                    'est_important', TRUE,
                    'montant', current_summary,
                    'numero_section', 0
                );
                summary_index := summary_index + 1;
            ELSE
                -- Fetch next detailed row
                FETCH NEXT FROM detailed_cursor INTO current_detailed_row;
                IF NOT FOUND THEN
                    EXIT;
                END IF;
                json_array := json_array || json_build_object(
                    'rubrique', current_detailed_row.rubrique,
                    'est_important', current_detailed_row.est_important,
                    'montant', current_detailed_row.montant,
                    'numero_section', current_detailed_row.numero_section
                );
            END IF;
        END LOOP;
        EXIT;
    END LOOP;
    CLOSE detailed_cursor;
    RETURN json_array;
END;
$$;


ALTER FUNCTION public.get_financial_data() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: compte_resultat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.compte_resultat (
    id_rubrique integer NOT NULL,
    rubrique character varying(2) NOT NULL,
    est_important boolean NOT NULL,
    montant numeric(18,2),
    numero_section integer NOT NULL
);


ALTER TABLE public.compte_resultat OWNER TO postgres;

--
-- Name: compte_resultat_id_rubrique_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.compte_resultat_id_rubrique_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.compte_resultat_id_rubrique_seq OWNER TO postgres;

--
-- Name: compte_resultat_id_rubrique_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.compte_resultat_id_rubrique_seq OWNED BY public.compte_resultat.id_rubrique;


--
-- Name: financial_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.financial_data (
    year integer NOT NULL,
    ca numeric(18,2),
    ps numeric(18,2),
    pi numeric(18,2),
    ac numeric(18,2),
    se numeric(18,2),
    cp numeric(18,2),
    it numeric(18,2),
    ao numeric(18,2),
    co numeric(18,2),
    dp numeric(18,2),
    rp numeric(18,2),
    pf numeric(18,2),
    cf numeric(18,2),
    ie numeric(18,2),
    id numeric(18,2),
    ep numeric(18,2),
    ec numeric(18,2)
);


ALTER TABLE public.financial_data OWNER TO postgres;

--
-- Name: consommation_exercice; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.consommation_exercice AS
 SELECT (COALESCE(financial_data.ac, (0)::numeric) + COALESCE(financial_data.se, (0)::numeric)) AS montant
   FROM public.financial_data;


ALTER TABLE public.consommation_exercice OWNER TO postgres;

--
-- Name: production_exercice; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.production_exercice AS
 SELECT ((COALESCE(financial_data.ca, (0)::numeric) + COALESCE(financial_data.ps, (0)::numeric)) + COALESCE(financial_data.pi, (0)::numeric)) AS montant
   FROM public.financial_data;


ALTER TABLE public.production_exercice OWNER TO postgres;

--
-- Name: valeur_ajoute_exploitation; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.valeur_ajoute_exploitation AS
 SELECT (( SELECT production_exercice.montant
           FROM public.production_exercice) - ( SELECT consommation_exercice.montant
           FROM public.consommation_exercice)) AS montant;


ALTER TABLE public.valeur_ajoute_exploitation OWNER TO postgres;

--
-- Name: excedent_brut_exploitation; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.excedent_brut_exploitation AS
 SELECT (( SELECT valeur_ajoute_exploitation.montant
           FROM public.valeur_ajoute_exploitation) - (COALESCE(financial_data.cp, (0)::numeric) + COALESCE(financial_data.it, (0)::numeric))) AS montant
   FROM public.financial_data;


ALTER TABLE public.excedent_brut_exploitation OWNER TO postgres;

--
-- Name: couverture_interets; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.couverture_interets AS
 SELECT (ro.montant / COALESCE(fd.cf, (0)::numeric)) AS couverture_interets
   FROM (public.excedent_brut_exploitation ro
     JOIN public.financial_data fd ON ((1 = 1)));


ALTER TABLE public.couverture_interets OWNER TO postgres;

--
-- Name: rubriques; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rubriques (
    id_rubrique integer NOT NULL,
    rubrique character varying(250) NOT NULL,
    montant numeric(18,2),
    n_compte character varying(50),
    id_type integer,
    id_rubrique_mere integer,
    est_stock boolean DEFAULT false NOT NULL
);


ALTER TABLE public.rubriques OWNER TO postgres;

--
-- Name: type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type (
    id_type integer NOT NULL,
    nom character varying(50) NOT NULL,
    est_actif boolean NOT NULL
);


ALTER TABLE public.type OWNER TO postgres;

--
-- Name: vue_rubrique_type; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.vue_rubrique_type AS
 SELECT rubriques.id_rubrique,
    rubriques.rubrique,
    rubriques.montant,
    rubriques.n_compte,
    rubriques.id_type,
    rubriques.id_rubrique_mere,
    rubriques.est_stock,
    type.est_actif,
    type.nom
   FROM (public.rubriques
     JOIN public.type ON ((rubriques.id_type = type.id_type)));


ALTER TABLE public.vue_rubrique_type OWNER TO postgres;

--
-- Name: levier_financier; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.levier_financier AS
 SELECT (ta.montant / cp.montant) AS levier_financier
   FROM ( SELECT sum(vue_rubrique_type.montant) AS montant
           FROM public.vue_rubrique_type
          WHERE ((vue_rubrique_type.nom)::text ~~ 'Actifs%'::text)) ta,
    ( SELECT sum(vue_rubrique_type.montant) AS montant
           FROM public.vue_rubrique_type
          WHERE ((vue_rubrique_type.nom)::text = 'Capitaux propres'::text)) cp;


ALTER TABLE public.levier_financier OWNER TO postgres;

--
-- Name: liquidite_generale; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.liquidite_generale AS
 SELECT (ac.montant / pc.montant) AS ratio_liquidite_generale
   FROM ( SELECT sum(vue_rubrique_type.montant) AS montant
           FROM public.vue_rubrique_type
          WHERE ((vue_rubrique_type.nom)::text = 'Actifs courants'::text)) ac,
    ( SELECT sum(vue_rubrique_type.montant) AS montant
           FROM public.vue_rubrique_type
          WHERE ((vue_rubrique_type.nom)::text = 'Passifs courants'::text)) pc;


ALTER TABLE public.liquidite_generale OWNER TO postgres;

--
-- Name: resultat_financier; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.resultat_financier AS
 SELECT (COALESCE(financial_data.pf, (0)::numeric) - COALESCE(financial_data.cf, (0)::numeric)) AS montant
   FROM public.financial_data;


ALTER TABLE public.resultat_financier OWNER TO postgres;

--
-- Name: resultat_operationnel; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.resultat_operationnel AS
 SELECT ((((( SELECT excedent_brut_exploitation.montant
           FROM public.excedent_brut_exploitation) + COALESCE(financial_data.ao, (0)::numeric)) - COALESCE(financial_data.co, (0)::numeric)) - COALESCE(financial_data.dp, (0)::numeric)) + COALESCE(financial_data.rp, (0)::numeric)) AS montant
   FROM public.financial_data;


ALTER TABLE public.resultat_operationnel OWNER TO postgres;

--
-- Name: resultat_avant_impots; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.resultat_avant_impots AS
 SELECT (( SELECT resultat_operationnel.montant
           FROM public.resultat_operationnel) + ( SELECT resultat_financier.montant
           FROM public.resultat_financier)) AS montant;


ALTER TABLE public.resultat_avant_impots OWNER TO postgres;

--
-- Name: resultat_extraordinaire; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.resultat_extraordinaire AS
 SELECT (COALESCE(financial_data.ep, (0)::numeric) - COALESCE(financial_data.ec, (0)::numeric)) AS montant
   FROM public.financial_data;


ALTER TABLE public.resultat_extraordinaire OWNER TO postgres;

--
-- Name: resultat_net_ordinaire; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.resultat_net_ordinaire AS
 SELECT (( SELECT resultat_avant_impots.montant
           FROM public.resultat_avant_impots) - COALESCE(financial_data.ie, (0)::numeric)) AS montant
   FROM public.financial_data;


ALTER TABLE public.resultat_net_ordinaire OWNER TO postgres;

--
-- Name: resultat_net; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.resultat_net AS
 SELECT (( SELECT resultat_net_ordinaire.montant
           FROM public.resultat_net_ordinaire) + ( SELECT resultat_extraordinaire.montant
           FROM public.resultat_extraordinaire)) AS montant;


ALTER TABLE public.resultat_net OWNER TO postgres;

--
-- Name: marge_nette; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.marge_nette AS
 SELECT ((rn.montant / pe.montant) * (100)::numeric) AS marge_nette
   FROM (public.resultat_net rn
     JOIN public.production_exercice pe ON ((1 = 1)));


ALTER TABLE public.marge_nette OWNER TO postgres;

--
-- Name: ratio_endettement; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.ratio_endettement AS
 SELECT ((td.montant / ta.montant) * (100)::numeric) AS ratio_endettement
   FROM ( SELECT sum(vue_rubrique_type.montant) AS montant
           FROM public.vue_rubrique_type
          WHERE ((vue_rubrique_type.nom)::text ~~ 'Passifs%'::text)) td,
    ( SELECT sum(vue_rubrique_type.montant) AS montant
           FROM public.vue_rubrique_type
          WHERE ((vue_rubrique_type.nom)::text ~~ 'Actifs%'::text)) ta;


ALTER TABLE public.ratio_endettement OWNER TO postgres;

--
-- Name: ratio_liquidite_reduite; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.ratio_liquidite_reduite AS
 SELECT ((ac.montant - COALESCE(stocks.montant, (0)::numeric)) / pc.montant) AS ratio_liquidite_reduite
   FROM ( SELECT sum(vue_rubrique_type.montant) AS montant
           FROM public.vue_rubrique_type
          WHERE ((vue_rubrique_type.nom)::text = 'Actifs courants'::text)) ac,
    ( SELECT sum(vue_rubrique_type.montant) AS montant
           FROM public.vue_rubrique_type
          WHERE ((vue_rubrique_type.nom)::text = 'Passifs courants'::text)) pc,
    ( SELECT sum(vue_rubrique_type.montant) AS montant
           FROM public.vue_rubrique_type
          WHERE (vue_rubrique_type.est_stock = true)) stocks;


ALTER TABLE public.ratio_liquidite_reduite OWNER TO postgres;

--
-- Name: roa; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.roa AS
 SELECT ((rn.montant / ta.montant) * (100)::numeric) AS roa
   FROM (public.resultat_net rn
     JOIN ( SELECT sum(vue_rubrique_type.montant) AS montant
           FROM public.vue_rubrique_type
          WHERE ((vue_rubrique_type.nom)::text ~~ 'Actifs%'::text)) ta ON ((1 = 1)));


ALTER TABLE public.roa OWNER TO postgres;

--
-- Name: roe; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.roe AS
 SELECT ((rn.montant / cp.montant) * (100)::numeric) AS roe
   FROM (public.resultat_net rn
     JOIN ( SELECT sum(vue_rubrique_type.montant) AS montant
           FROM public.vue_rubrique_type
          WHERE ((vue_rubrique_type.nom)::text = 'Capitaux propres'::text)) cp ON ((1 = 1)));


ALTER TABLE public.roe OWNER TO postgres;

--
-- Name: roe_avec_levier; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.roe_avec_levier AS
 SELECT (subquery.roa + ((subquery.roa - COALESCE(subquery.taux_interet_dette, (0)::numeric)) * subquery.levier_financier)) AS roe_avec_levier
   FROM ( SELECT (rn.montant / ta.montant) AS roa,
            (ta.montant / (cp.montant + resultat_net.montant)) AS levier_financier,
            (cf.montant / td.montant) AS taux_interet_dette
           FROM (((((public.resultat_net rn
             JOIN ( SELECT sum(vue_rubrique_type.montant) AS montant
                   FROM public.vue_rubrique_type
                  WHERE ((vue_rubrique_type.nom)::text ~~ 'Actifs%'::text)) ta ON ((1 = 1)))
             JOIN ( SELECT sum(vue_rubrique_type.montant) AS montant
                   FROM public.vue_rubrique_type
                  WHERE ((vue_rubrique_type.nom)::text = 'Capitaux propres'::text)) cp ON ((1 = 1)))
             JOIN ( SELECT sum(vue_rubrique_type.montant) AS montant
                   FROM public.vue_rubrique_type
                  WHERE ((vue_rubrique_type.nom)::text ~~ 'Passifs%'::text)) td ON ((1 = 1)))
             JOIN ( SELECT sum(vue_rubrique_type.montant) AS montant
                   FROM public.vue_rubrique_type
                  WHERE ((vue_rubrique_type.nom)::text = 'Charges financiers'::text)) cf ON ((1 = 1)))
             JOIN public.resultat_net ON ((1 = 1)))) subquery;


ALTER TABLE public.roe_avec_levier OWNER TO postgres;

--
-- Name: interpretations; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.interpretations AS
 SELECT 'marge_nette'::text AS view_name,
    marge_nette.marge_nette AS resultat
   FROM public.marge_nette
UNION ALL
 SELECT 'couverture_interets'::text AS view_name,
    couverture_interets.couverture_interets AS resultat
   FROM public.couverture_interets
UNION ALL
 SELECT 'ROA'::text AS view_name,
    roa.roa AS resultat
   FROM public.roa
UNION ALL
 SELECT 'liquidite_generale'::text AS view_name,
    liquidite_generale.ratio_liquidite_generale AS resultat
   FROM public.liquidite_generale
UNION ALL
 SELECT 'ratio_endettement'::text AS view_name,
    ratio_endettement.ratio_endettement AS resultat
   FROM public.ratio_endettement
UNION ALL
 SELECT 'levier_financier'::text AS view_name,
    levier_financier.levier_financier AS resultat
   FROM public.levier_financier
UNION ALL
 SELECT 'ROE'::text AS view_name,
    roe.roe AS resultat
   FROM public.roe
UNION ALL
 SELECT 'ratio_liquidite_reduite'::text AS view_name,
    ratio_liquidite_reduite.ratio_liquidite_reduite AS resultat
   FROM public.ratio_liquidite_reduite
UNION ALL
 SELECT 'ROE_avec_levier'::text AS view_name,
    roe_avec_levier.roe_avec_levier AS resultat
   FROM public.roe_avec_levier;


ALTER TABLE public.interpretations OWNER TO postgres;

--
-- Name: resultat_exploitation; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.resultat_exploitation AS
 SELECT resultat_operationnel.montant AS resultat_exploitation
   FROM public.resultat_operationnel;


ALTER TABLE public.resultat_exploitation OWNER TO postgres;

--
-- Name: rubriques_id_rubrique_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rubriques_id_rubrique_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rubriques_id_rubrique_seq OWNER TO postgres;

--
-- Name: rubriques_id_rubrique_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rubriques_id_rubrique_seq OWNED BY public.rubriques.id_rubrique;


--
-- Name: total_charge_ordinaire; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.total_charge_ordinaire AS
 SELECT (((((((( SELECT consommation_exercice.montant
           FROM public.consommation_exercice) + COALESCE(financial_data.cp, (0)::numeric)) + COALESCE(financial_data.it, (0)::numeric)) + COALESCE(financial_data.co, (0)::numeric)) + COALESCE(financial_data.dp, (0)::numeric)) + COALESCE(financial_data.cf, (0)::numeric)) + COALESCE(financial_data.ie, (0)::numeric)) + COALESCE(financial_data.id, (0)::numeric)) AS montant
   FROM public.financial_data;


ALTER TABLE public.total_charge_ordinaire OWNER TO postgres;

--
-- Name: total_produit_ordinaire; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.total_produit_ordinaire AS
 SELECT (((( SELECT production_exercice.montant
           FROM public.production_exercice) + COALESCE(financial_data.ao, (0)::numeric)) + COALESCE(financial_data.rp, (0)::numeric)) + COALESCE(financial_data.pf, (0)::numeric)) AS montant
   FROM public.financial_data;


ALTER TABLE public.total_produit_ordinaire OWNER TO postgres;

--
-- Name: type_id_type_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.type_id_type_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.type_id_type_seq OWNER TO postgres;

--
-- Name: type_id_type_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.type_id_type_seq OWNED BY public.type.id_type;


--
-- Name: vue_compte_resultat_transpose; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.vue_compte_resultat_transpose AS
 SELECT row_number() OVER (ORDER BY ( SELECT NULL::text)) AS id,
    subquery.rubriques,
    subquery.montant,
    subquery.isimportant
   FROM ( SELECT 'Chiffre d''affaire'::text AS rubriques,
            financial_data.ca AS montant,
            false AS isimportant
           FROM public.financial_data
        UNION ALL
         SELECT 'Production stockée'::text,
            financial_data.ps,
            false AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'Production immobilisée'::text,
            financial_data.pi,
            false AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'I - Production de l''exercice'::text,
            ( SELECT production_exercice.montant
                   FROM public.production_exercice) AS montant,
            true AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'Achats consommés'::text,
            financial_data.ac,
            false AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'Services extérieurs'::text,
            financial_data.se,
            false AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'II - Consommation de l''exercice'::text,
            ( SELECT consommation_exercice.montant
                   FROM public.consommation_exercice) AS montant,
            true AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'III - Valeur ajoutée d''exploitation'::text,
            ( SELECT valeur_ajoute_exploitation.montant
                   FROM public.valeur_ajoute_exploitation) AS montant,
            true AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'Charges de personnel'::text,
            financial_data.cp,
            false AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'Impots, taxes et versement assimilés'::text,
            financial_data.it,
            false AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'IV - Exédents brut d''exploitation'::text,
            ( SELECT excedent_brut_exploitation.montant
                   FROM public.excedent_brut_exploitation) AS montant,
            true AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'Autres produits opérationnels'::text,
            financial_data.ao,
            false AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'Autres charges opérationnels'::text,
            financial_data.co,
            false AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'Dotations aux amortissements, aux provisions et aux pertes de valeurs'::text,
            financial_data.dp,
            false AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'Reprises aux provisions et aux pertes de valeur'::text,
            financial_data.rp,
            false AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'V - Résultat opérationnel'::text,
            ( SELECT resultat_operationnel.montant
                   FROM public.resultat_operationnel) AS montant,
            true AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'Produits financiers'::text,
            financial_data.pf,
            false AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'Charges financiers'::text,
            financial_data.cf,
            false AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'VI - Résultat financier'::text,
            ( SELECT resultat_financier.montant
                   FROM public.resultat_financier) AS montant,
            true AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'VII - Résultat avant impôt'::text,
            ( SELECT resultat_avant_impots.montant
                   FROM public.resultat_avant_impots) AS montant,
            true AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'Impôts exigibles sur résultat'::text,
            financial_data.ie,
            false AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'Impôts différés (Variations)'::text,
            financial_data.id,
            false AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'Total des produits des activités ordinaires'::text,
            ( SELECT total_produit_ordinaire.montant
                   FROM public.total_produit_ordinaire) AS montant,
            true AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'Total des charges des activités ordinaires'::text,
            ( SELECT total_charge_ordinaire.montant
                   FROM public.total_charge_ordinaire) AS montant,
            true AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'VII - Résultat net des activités ordinaires'::text,
            ( SELECT resultat_net_ordinaire.montant
                   FROM public.resultat_net_ordinaire) AS montant,
            true AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'Elements extraordinaires (Produits)'::text,
            financial_data.ep,
            false AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'Elements extraordinaires (charges)'::text,
            financial_data.ec,
            false AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'IX - Résultat extraordinaire'::text,
            ( SELECT resultat_extraordinaire.montant
                   FROM public.resultat_extraordinaire) AS montant,
            true AS bool
           FROM public.financial_data
        UNION ALL
         SELECT 'X - Résultat net de l''exercice'::text,
            ( SELECT resultat_net.montant
                   FROM public.resultat_net) AS montant,
            true AS bool
           FROM public.financial_data) subquery;


ALTER TABLE public.vue_compte_resultat_transpose OWNER TO postgres;

--
-- Name: compte_resultat id_rubrique; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compte_resultat ALTER COLUMN id_rubrique SET DEFAULT nextval('public.compte_resultat_id_rubrique_seq'::regclass);


--
-- Name: rubriques id_rubrique; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rubriques ALTER COLUMN id_rubrique SET DEFAULT nextval('public.rubriques_id_rubrique_seq'::regclass);


--
-- Name: type id_type; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type ALTER COLUMN id_type SET DEFAULT nextval('public.type_id_type_seq'::regclass);


--
-- Data for Name: compte_resultat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.compte_resultat (id_rubrique, rubrique, est_important, montant, numero_section) FROM stdin;
1	CA	f	0.00	1
2	PS	f	0.00	1
3	PI	f	0.00	1
5	AC	f	0.00	2
6	SE	f	0.00	2
9	CP	f	0.00	3
10	IT	f	0.00	3
12	AO	f	0.00	4
13	CO	f	0.00	5
14	DP	f	0.00	5
15	RP	f	0.00	6
17	PF	f	0.00	7
18	CF	f	0.00	8
21	IE	f	0.00	9
22	ID	f	0.00	9
26	EP	f	0.00	10
27	EC	f	0.00	11
\.


--
-- Data for Name: financial_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.financial_data (year, ca, ps, pi, ac, se, cp, it, ao, co, dp, rp, pf, cf, ie, id, ep, ec) FROM stdin;
2024	25000.00	\N	\N	10000.00	\N	8000.00	\N	1200.00	3000.00	2000.00	\N	\N	1000.00	200.00	\N	\N	\N
\.


--
-- Data for Name: rubriques; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rubriques (id_rubrique, rubrique, montant, n_compte, id_type, id_rubrique_mere, est_stock) FROM stdin;
1	Actifs	\N	\N	1	\N	f
2	Actifs courants	\N	\N	1	1	f
6	Actifs non courants	\N	\N	2	1	f
9	Passifs et Capitaux propres	\N	\N	3	\N	f
10	Passifs courants	\N	\N	3	9	f
13	Passifs non courants	\N	\N	4	9	f
15	Capitaux propres	\N	\N	5	9	f
20	Immobilisation incorporelles	\N	\N	2	6	f
21	Immobilisation corporelles	\N	\N	2	6	f
25	Immobilisations en cours	\N	\N	2	6	f
26	Immobilisations financières	\N	\N	2	6	f
34	Créances et emplois assimilés	\N	\N	1	2	f
38	Trésorerie et équivalents de trésoreries	\N	\N	1	2	f
41	Trésorerie (fond de caisse et dépôts à vue)	\N	\N	1	38	f
42	Banque	700.00	\N	1	41	f
43	Caisse	300.00	\N	1	41	f
44	Placement et autres équivalents de trésorerie	\N	\N	1	38	f
45	Clients et autres débiteurs	5000.00	\N	1	34	f
46	Impôts	\N	\N	1	34	f
47	Autres créances et actifs assimilés	\N	\N	1	34	f
50	Terrains agricoles	10000.00	\N	2	21	f
51	Bâtiments industriels	15000.00	\N	2	21	f
52	Matériels agricoles	5000.00	\N	2	21	f
53	Titres mis en équivalences	\N	\N	2	26	f
54	Autres participations et créances rattachées	\N	\N	2	26	f
55	Autres titres immobilisés	\N	\N	2	26	f
56	Prêts et autres immobilisations financières	\N	\N	2	26	f
57	Capital émis	20000.00	\N	5	15	f
58	Primes et réserves consolidées	8000.00	\N	5	15	f
59	Ecarts d'évaluation	\N	\N	5	15	f
60	Ecarts d'équivalence	\N	\N	5	15	f
61	Autres capitaux propres - report à nouveau	\N	\N	5	15	f
62	Produits différés : subsventions d'investissements	\N	\N	4	13	f
63	Impôts différés	\N	\N	4	13	f
64	Emprunts et dettes financières	\N	\N	4	13	f
65	Provisions et produits constatés d'avance	\N	\N	4	13	f
66	Dettes à court terme - partie à court terme	5000.00	\N	3	10	f
67	Fournisseurs et comptes rattachés	\N	\N	3	10	f
68	Provisions et produits constatés d'avance	\N	\N	3	10	f
69	Autres dettes	6000.00	\N	3	10	f
70	Compte de trésorerie (découverte bancaire)	\N	\N	3	10	f
49	Produits finis	3000.00	\N	1	31	t
31	Stock et encours	\N	\N	1	2	t
48	Matières premières	2000.00	\N	1	31	t
76	Terrains agricoles 2	30000.00	\N	2	21	f
77	Dettes à long terme	30000.00	\N	4	64	t
\.


--
-- Data for Name: type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type (id_type, nom, est_actif) FROM stdin;
1	Actifs courants	t
2	Actifs non courants	t
3	Passifs courants	f
4	Passifs non courants	f
5	Capitaux propres	f
6	Stocks	t
\.


--
-- Name: compte_resultat_id_rubrique_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.compte_resultat_id_rubrique_seq', 29, true);


--
-- Name: rubriques_id_rubrique_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rubriques_id_rubrique_seq', 77, true);


--
-- Name: type_id_type_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_id_type_seq', 6, true);


--
-- Name: compte_resultat compte_resultat_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compte_resultat
    ADD CONSTRAINT compte_resultat_pk UNIQUE (rubrique);


--
-- Name: compte_resultat compte_resultat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compte_resultat
    ADD CONSTRAINT compte_resultat_pkey PRIMARY KEY (id_rubrique);


--
-- Name: financial_data financial_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financial_data
    ADD CONSTRAINT financial_data_pkey PRIMARY KEY (year);


--
-- Name: rubriques rubriques_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rubriques
    ADD CONSTRAINT rubriques_pkey PRIMARY KEY (id_rubrique);


--
-- Name: type type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type
    ADD CONSTRAINT type_pkey PRIMARY KEY (id_type);


--
-- Name: rubriques rubriques_id_rubrique_mere_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rubriques
    ADD CONSTRAINT rubriques_id_rubrique_mere_fkey FOREIGN KEY (id_rubrique_mere) REFERENCES public.rubriques(id_rubrique);


--
-- Name: rubriques rubriques_id_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rubriques
    ADD CONSTRAINT rubriques_id_type_fkey FOREIGN KEY (id_type) REFERENCES public.type(id_type);


--
-- PostgreSQL database dump complete
--

