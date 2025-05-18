/**
 * Interface définissant la structure d'un membre du personnel
 */
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

/**
 * Interface définissant la structure d'une tâche
 */
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

/**
 * Type définissant les options de filtrage des tâches
 * - 'all' : Toutes les tâches
 * - 'pending' : Tâches en cours
 * - 'completed' : Tâches terminées
 */
export type TaskFilter = 'all' | 'pending' | 'completed';
