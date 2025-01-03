package itu.vitafoam.bilan;

import itu.vitafoam.actif.ActifCourant;
import itu.vitafoam.actif.ActifImmobilise;
import itu.vitafoam.actif.actifRepositories.ActifCourantRepository;
import itu.vitafoam.actif.actifRepositories.ActifImmobiliseRepository;
import itu.vitafoam.financialState.FinancialForm;
import itu.vitafoam.passifs.CapitauxPropres;
import itu.vitafoam.passifs.Passif;
import itu.vitafoam.passifs.PassifNonCourant;
import itu.vitafoam.passifs.passifRepository.CapitauxPropresRepository;
import itu.vitafoam.passifs.passifRepository.PassifNonCourantRepository;
import itu.vitafoam.passifs.passifRepository.PassifRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BilanService {
    @Autowired
    BilanRepository bilanRepository;
    @Autowired
    ActifCourantRepository actifCourantRepository;
    @Autowired
    ActifImmobiliseRepository actifImmobiliseRepository;
    @Autowired
    CapitauxPropresRepository capitauxPropresRepository;
    @Autowired
    PassifRepository passifRepository;
    @Autowired
    PassifNonCourantRepository passifNonCourantRepository;
    @Transactional
    public Bilan creerBilanEtFille(FinancialForm financialForm){
        ActifCourant actifCourant = financialForm.toActifCourant();
        ActifImmobilise actifImmobilise = financialForm.toActifImmobilise();
        Passif passif = financialForm.toPassif();
        PassifNonCourant passifNonCourant = financialForm.toPassifNonCourant();
        CapitauxPropres capitauxPropres = financialForm.toCapitauxPropres();
        Bilan bilan = new Bilan();
        bilan.setEntreprise(financialForm.getIdEntreprise());
        bilan.setAnnee(financialForm.getIdAnnee());
        bilan.setActifsCourants(actifCourant.sommerActifsCourants());
        bilan.setActifsImmobilises(actifImmobilise.sommerImmobilisation());
        bilan.setPassifsCourants(passif.sommerDettes());
        bilan.setPassifsNonCourants(passifNonCourant.sommerPassifNonCourant());
        bilan.setCapitauxPropres(capitauxPropres.sommerCapitauxPropres());
        bilan = bilanRepository.save(bilan);
        actifCourant.setIdBilan(bilan.getIdBilan());
        actifImmobilise.setIdBilan(bilan.getIdBilan());
        passifNonCourant.setIdBilan(bilan.getIdBilan());
        passif.setIdBilan(bilan.getIdBilan());
        capitauxPropres.setIdBilan(bilan.getIdBilan());
        actifCourantRepository.save(actifCourant);
        actifImmobiliseRepository.save(actifImmobilise);
        passifRepository.save(passif);
        passifNonCourantRepository.save(passifNonCourant);
        capitauxPropresRepository.save(capitauxPropres);
        return bilan;
    }
}
