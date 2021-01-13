import {Produit} from '../models/Produit';
import {Action, StateContext} from "@ngxs/store";
import {PanierStateModel} from "../states/panier-state-model";

export class AjouterProduit {
  static readonly type = '[Produit] Ajouter Produit';
  constructor(public produitEnParamDeAjouterProduit: Produit) {}
}

export class SupprimerProduit {
  static readonly type = '[Produit] Supprimer Produit';

  constructor(public produitEnParamDeSupprimerProduit: Produit) {}
}

export class ViderPanier {
  static readonly type = '[Produit] Vider Panier';

  constructor() {
  }
}
