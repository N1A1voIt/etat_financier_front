package itu.vitafoam.indicateur;

import itu.vitafoam.YearCorpDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterpretationsService {
    @Autowired
    EntityManager entityManager;
    public InterpretationsAndSolutions interpret(YearCorpDTO yearCorpDTO){
        Interpretations interpretations;
        Query query = entityManager.createNativeQuery("SELECT  " +
                "    b.id_entreprise, " +
                "    b.id_annee, " +
                "    (cr.resultat_net / cr.revenus) * 100 AS marge_nette, " +
                "    (cr.resultat_net / (b.actifs_courants + b.actifs_immobilises)) * 100 AS retour_sur_actifs, " +
                "    (b.actifs_courants / b.passifs_courants) AS ratio_liquidite_generale, " +
                "    ((b.actifs_courants - ac.stocks) / b.passifs_courants) AS ratio_liquidite_reduite, " +
                "    ((b.passifs_courants + b.passifs_non_courants) / (b.actifs_courants + b.actifs_immobilises)) * 100 AS ratio_endettement_global, " +
                "    (cr.resultat_exploitation / cr.charges_financieres) AS couverture_interets " +
                "FROM  " +
                "    bilan b " +
                "JOIN  " +
                "    compte_resultat cr ON b.id_entreprise = cr.id_entreprise AND b.id_annee = cr.id_annee " +
                "JOIN  " +
                "    actif_courant ac ON b.id_bilan = ac.id_bilan WHERE b.id_entreprise=:idEntreprise AND b.id_annee=:idAnnee");
        query.setParameter("idEntreprise",yearCorpDTO.getIdEntreprise());
        query.setParameter("idAnnee",yearCorpDTO.getIdAnnee());
        List<Interpretations> interpretationsList = query.getResultList();
        interpretations = interpretationsList.get(0);
        return null;
    }
}
