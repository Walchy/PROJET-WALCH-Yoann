import {NgxsModule, Action, Selector, State, StateContext} from '@ngxs/store';
import {PanierStateModel} from './panier-state-model';
import {AjouterProduit, SupprimerProduit, ViderPanier} from '../actions/produit-actions';
import {Observable} from 'rxjs';
import {Produit} from '../models/Produit';

@State<PanierStateModel>({
  name: 'panier',
  defaults: {
    panier: []
  }
})
export class ProduitState {
  @Selector()
  static getNbProduitsDansPanier(state: PanierStateModel): number {
    return state.panier.length;
  }

  @Selector()
  static getContenuPanier(state: PanierStateModel): Produit[] {
    return state.panier;
  }

  @Action(AjouterProduit)
  add(
    {getState, patchState}: StateContext<PanierStateModel>,
    {produitEnParamDeAjouterProduit}: AjouterProduit
  ) {
    const state = getState();
    patchState({
      // créer un nouveau tableau
      // l'opérateur ... permet de constituer une liste d'élement du tableau
      panier: [...state.panier, produitEnParamDeAjouterProduit]
    });
  }

  @Action(SupprimerProduit)
  del(
    {getState, patchState}: StateContext<PanierStateModel>,
    {produitEnParamDeSupprimerProduit}: SupprimerProduit
  ) {
    const state = getState();
    let panierAJour: PanierStateModel;
    panierAJour = new PanierStateModel();
    panierAJour.panier = state.panier;
    for (const produit of panierAJour.panier) {
      if (produitEnParamDeSupprimerProduit.nom === produit.nom) {
        panierAJour.panier.splice(state.panier.indexOf(produit), 1);
        break;
      }
    }
    patchState({
      // supprimer le produitEnParamDeSupprimerProduit dans le panier
      panier: state.panier = panierAJour.panier
    });
  }


  @Action(ViderPanier)
    deleteAll(
      {patchState}: StateContext<PanierStateModel>
    )
    {
      patchState({
        panier: []
      });
    }
}

