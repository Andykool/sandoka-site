import {ChangeDetectionStrategy, Component, signal, inject, afterNextRender} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule, FormBuilder, FormGroup} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {animate, stagger, inView} from "motion";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private fb = inject(FormBuilder);
  searchForm: FormGroup;
  activeTab = signal<'flights' | 'hotels' | 'cars' | 'packages'>('flights');
  isScrolled = signal(false);

  destinations = [
    { name: 'Abidjan', image: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=1000&auto=format&fit=crop', price: 'À partir de 45 000 FCFA', desc: 'La Perle des Lagunes, entre modernité et tradition.' },
    { name: 'Assinie', image: 'https://images.unsplash.com/photo-1544735038-3571890d2742?q=80&w=1000&auto=format&fit=crop', price: 'À partir de 85 000 FCFA', desc: 'Le paradis balnéaire de la Côte d\'Ivoire.' },
    { name: 'Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop', price: 'À partir de 450 000 FCFA', desc: 'L\'extravagance au milieu du désert.' },
    { name: 'Paris', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop', price: 'À partir de 550 000 FCFA', desc: 'La ville lumière et de la gastronomie.' },
    { name: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop', price: 'À partir de 750 000 FCFA', desc: 'L\'île des dieux et de la sérénité.' },
    { name: 'Marrakech', image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=1000&auto=format&fit=crop', price: 'À partir de 320 000 FCFA', desc: 'Les couleurs et saveurs de l\'Orient.' },
  ];

  packages = [
    { title: 'Séjour Plage Assinie', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop', price: '120 000 FCFA', desc: '3 jours de détente absolue au bord de l\'océan.' },
    { title: 'Luxe à Dubai', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1000&auto=format&fit=crop', price: '850 000 FCFA', desc: 'Hôtels 5 étoiles et shopping exclusif.' },
    { title: 'Safari Aventure', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop', price: '450 000 FCFA', desc: 'À la rencontre de la faune sauvage.' },
    { title: 'Circuit Culturel', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1000&auto=format&fit=crop', price: '280 000 FCFA', desc: 'Découvrez l\'histoire et les traditions locales.' },
  ];

  hotels = [
    { name: 'Sofitel Abidjan Hôtel Ivoire', rating: 5, price: '180 000 FCFA', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop', amenities: ['pool', 'spa', 'wifi'] },
    { name: 'La Maison Palmier', rating: 5, price: '150 000 FCFA', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop', amenities: ['restaurant', 'gym', 'wifi'] },
    { name: 'Noom Hotel Abidjan', rating: 4, price: '95 000 FCFA', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop', amenities: ['pool', 'bar', 'wifi'] },
  ];

  cars = [
    { model: 'Range Rover Sport', price: '150 000 FCFA', capacity: 5, image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?q=80&w=1000&auto=format&fit=crop' },
    { model: 'Toyota Prado TXL', price: '85 000 FCFA', capacity: 7, image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=1000&auto=format&fit=crop' },
    { model: 'Mercedes Classe S', price: '250 000 FCFA', capacity: 4, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop' },
  ];

  testimonials = [
    { name: 'Jean-Marc K.', comment: 'Un service irréprochable pour mon voyage à Dubai. Tout était parfait !', role: 'Voyageur d\'affaires' },
    { name: 'Sarah B.', comment: 'Assinie avec Sandokan Travel était magique. Je recommande vivement.', role: 'Touriste' },
    { name: 'Moussa D.', comment: 'La location de voiture était simple et le véhicule en excellent état.', role: 'Client local' },
  ];

  constructor() {
    this.searchForm = this.fb.group({
      origin: ['Abidjan'],
      destination: [''],
      departureDate: [''],
      returnDate: [''],
      travelers: [1]
    });

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 50);
      });
    }

    afterNextRender(() => {
      this.initAnimations();
    });
  }

  initAnimations() {
    try {
      // Animate hero content
      animate(".hero-title", { opacity: [0, 1], y: [50, 0] }, { duration: 1, ease: "easeOut" });
      animate(".hero-sub", { opacity: [0, 1], y: [30, 0] }, { duration: 1, delay: 0.3, ease: "easeOut" });
      animate(".booking-bar", { opacity: [0, 1], scale: [0.95, 1] }, { duration: 0.8, delay: 0.6, ease: "easeOut" });

      // Animate sections on scroll
      inView(".reveal-section", (element) => {
        animate(element, { opacity: [0, 1], y: [50, 0] }, { duration: 0.8, ease: "easeOut" });
      });

      inView(".reveal-grid", (element) => {
        const children = element.querySelectorAll(".grid-item");
        if (children.length > 0) {
          animate(children, { opacity: [0, 1], y: [30, 0] }, { 
            delay: stagger(0.1),
            duration: 0.6,
            ease: "easeOut"
          });
        }
      });
    } catch (err) {
      console.warn('Animation initialization failed:', err);
    }
  }

  setTab(tab: 'flights' | 'hotels' | 'cars' | 'packages') {
    this.activeTab.set(tab);
  }

  onSearch() {
    console.log('Searching...', this.searchForm.value);
  }
}