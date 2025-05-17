// Types pour le modèle Personnel
export interface Personnel {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  poste?: string;
  departement?: string;
  createdAt?: string;
  updatedAt?: string;
  taches?: Task[];
}

// Types pour le modèle Task
export interface Task {
  id?: number;
  titre: string;
  description?: string;
  dateEcheance?: string;
  priorite?: 'basse' | 'moyenne' | 'haute';
  statut?: 'à faire' | 'en cours' | 'terminée';
  realisee: boolean;
  personnelId: number;
  personnel?: Personnel;
  createdAt?: string;
  updatedAt?: string;
}

// Type pour les filtres de tâches
export type TaskFilter = 'all' | 'pending' | 'completed';
