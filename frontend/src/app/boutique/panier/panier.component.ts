import {Component, OnInit} from '@angular/core';
import {Produit} from '../../../../shared/models/Produit';
import {SupprimerProduit, ViderPanier} from '../../../../shared/actions/produit-actions';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ProduitState} from '../../../../shared/states/produit-state';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  listeProduitsDansPanier: Observable<Produit[]>;
  sommeProduitsDansPanier: number;
  listeProduitsDansPanierSubscription;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.listeProduitsDansPanier = this.store.select(ProduitState.getContenuPanier);
    this.listeProduitsDansPanierSubscription = this.listeProduitsDansPanier.subscribe((arrayProduits: Array<Produit>) => {
      this.sommeProduitsDansPanier = 0;
      for (const produit of arrayProduits) {
        this.sommeProduitsDansPanier += produit.prix;
      }
    });
  }

  // Suppression du produit
  SupprimerProduitDuPanier(produit: Produit): void {
    // on passe l'action SupprimerProduit
    this.store.dispatch(new SupprimerProduit(produit));

  }
  // clic sur la corbeille
  onSupprimerDuPanier(produit: Produit): void {
    this.SupprimerProduitDuPanier(produit);
  }

  onPasserCommande(): void {
    this.store.dispatch(new ViderPanier());
    alert('Merci pour vos achats. À bientôt chez La Poudrière !');
  }

  ngOnDestroy(): void {
    this.listeProduitsDansPanierSubscription.unsubscribe();
}
}
