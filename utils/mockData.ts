import { Personnel, Task } from './types';

// Données fictives pour le personnel
export const mockPersonnel: Personnel[] = [
  {
    id: 1,
    nom: 'Dubois',
    prenom: 'Jean',
    email: 'jean.dubois@example.com',
    telephone: '0123456789',
    poste: 'Développeur Frontend',
    departement: 'Informatique',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-01-15T10:00:00Z'
  },
  {
    id: 2,
    nom: 'Martin',
    prenom: 'Sophie',
    email: 'sophie.martin@example.com',
    telephone: '0123456790',
    poste: 'Designer UI/UX',
    departement: 'Design',
    createdAt: '2023-01-16T10:00:00Z',
    updatedAt: '2023-01-16T10:00:00Z'
  },
  {
    id: 3,
    nom: 'Petit',
    prenom: 'Thomas',
    email: 'thomas.petit@example.com',
    telephone: '0123456791',
    poste: 'Développeur Backend',
    departement: 'Informatique',
    createdAt: '2023-01-17T10:00:00Z',
    updatedAt: '2023-01-17T10:00:00Z'
  },
  {
    id: 4,
    nom: 'Leroy',
    prenom: 'Emma',
    email: 'emma.leroy@example.com',
    telephone: '0123456792',
    poste: 'Chef de Projet',
    departement: 'Gestion de Projet',
    createdAt: '2023-01-18T10:00:00Z',
    updatedAt: '2023-01-18T10:00:00Z'
  },
  {
    id: 5,
    nom: 'Moreau',
    prenom: 'Lucas',
    email: 'lucas.moreau@example.com',
    telephone: '0123456793',
    poste: 'Administrateur Système',
    departement: 'Infrastructure',
    createdAt: '2023-01-19T10:00:00Z',
    updatedAt: '2023-01-19T10:00:00Z'
  }
];

// Données fictives pour les tâches
export const mockTasks: Task[] = [
  {
    id: 1,
    titre: 'Concevoir la maquette du site web',
    description: 'Créer les maquettes des pages principales du site web en utilisant Figma',
    dateEcheance: '2023-06-15T00:00:00Z',
    priorite: 'haute',
    statut: 'terminée',
    realisee: true,
    personnelId: 2,
    personnel: mockPersonnel[1],
    createdAt: '2023-05-20T10:00:00Z',
    updatedAt: '2023-06-10T15:30:00Z'
  },
  {
    id: 2,
    titre: 'Développer la page d\'accueil',
    description: 'Implémenter la page d\'accueil selon les maquettes validées',
    dateEcheance: '2023-06-20T00:00:00Z',
    priorite: 'haute',
    statut: 'en cours',
    realisee: false,
    personnelId: 1,
    personnel: mockPersonnel[0],
    createdAt: '2023-05-25T10:00:00Z',
    updatedAt: '2023-06-01T14:20:00Z'
  },
  {
    id: 3,
    titre: 'Configurer la base de données',
    description: 'Mettre en place le schéma de la base de données et créer les tables nécessaires',
    dateEcheance: '2023-06-10T00:00:00Z',
    priorite: 'haute',
    statut: 'terminée',
    realisee: true,
    personnelId: 3,
    personnel: mockPersonnel[2],
    createdAt: '2023-05-15T10:00:00Z',
    updatedAt: '2023-06-08T11:45:00Z'
  },
  {
    id: 4,
    titre: 'Planifier la réunion de lancement',
    description: 'Organiser la réunion de lancement du projet avec toutes les parties prenantes',
    dateEcheance: '2023-05-30T00:00:00Z',
    priorite: 'moyenne',
    statut: 'terminée',
    realisee: true,
    personnelId: 4,
    personnel: mockPersonnel[3],
    createdAt: '2023-05-10T10:00:00Z',
    updatedAt: '2023-05-28T09:15:00Z'
  },
  {
    id: 5,
    titre: 'Configurer l\'environnement de développement',
    description: 'Mettre en place les serveurs de développement et de test',
    dateEcheance: '2023-06-05T00:00:00Z',
    priorite: 'moyenne',
    statut: 'terminée',
    realisee: true,
    personnelId: 5,
    personnel: mockPersonnel[4],
    createdAt: '2023-05-12T10:00:00Z',
    updatedAt: '2023-06-03T16:40:00Z'
  },
  {
    id: 6,
    titre: 'Développer l\'API REST',
    description: 'Créer les endpoints de l\'API pour les fonctionnalités principales',
    dateEcheance: '2023-06-25T00:00:00Z',
    priorite: 'haute',
    statut: 'en cours',
    realisee: false,
    personnelId: 3,
    personnel: mockPersonnel[2],
    createdAt: '2023-06-01T10:00:00Z',
    updatedAt: '2023-06-10T14:30:00Z'
  },
  {
    id: 7,
    titre: 'Intégrer les formulaires',
    description: 'Implémenter les formulaires d\'inscription et de connexion',
    dateEcheance: '2023-06-22T00:00:00Z',
    priorite: 'moyenne',
    statut: 'à faire',
    realisee: false,
    personnelId: 1,
    personnel: mockPersonnel[0],
    createdAt: '2023-06-05T10:00:00Z',
    updatedAt: '2023-06-05T10:00:00Z'
  },
  {
    id: 8,
    titre: 'Créer les icônes et assets graphiques',
    description: 'Concevoir et exporter les icônes et autres éléments graphiques nécessaires',
    dateEcheance: '2023-06-18T00:00:00Z',
    priorite: 'basse',
    statut: 'à faire',
    realisee: false,
    personnelId: 2,
    personnel: mockPersonnel[1],
    createdAt: '2023-06-08T10:00:00Z',
    updatedAt: '2023-06-08T10:00:00Z'
  },
  {
    id: 9,
    titre: 'Préparer la documentation technique',
    description: 'Rédiger la documentation technique pour les développeurs',
    dateEcheance: '2023-07-05T00:00:00Z',
    priorite: 'basse',
    statut: 'à faire',
    realisee: false,
    personnelId: 4,
    personnel: mockPersonnel[3],
    createdAt: '2023-06-10T10:00:00Z',
    updatedAt: '2023-06-10T10:00:00Z'
  },
  {
    id: 10,
    titre: 'Mettre en place le monitoring',
    description: 'Configurer les outils de monitoring et d\'alerte',
    dateEcheance: '2023-06-30T00:00:00Z',
    priorite: 'moyenne',
    statut: 'à faire',
    realisee: false,
    personnelId: 5,
    personnel: mockPersonnel[4],
    createdAt: '2023-06-12T10:00:00Z',
    updatedAt: '2023-06-12T10:00:00Z'
  }
];

// Fonctions utilitaires pour manipuler les données fictives
export const mockUtils = {
  // Obtenir toutes les tâches d'un membre du personnel
  getTasksByPersonnelId: (personnelId: number): Task[] => {
    return mockTasks.filter(task => task.personnelId === personnelId);
  },
  
  // Obtenir toutes les tâches terminées d'un membre du personnel
  getCompletedTasksByPersonnelId: (personnelId: number): Task[] => {
    return mockTasks.filter(task => task.personnelId === personnelId && task.realisee);
  },
  
  // Obtenir toutes les tâches en attente d'un membre du personnel
  getPendingTasksByPersonnelId: (personnelId: number): Task[] => {
    return mockTasks.filter(task => task.personnelId === personnelId && !task.realisee);
  }
};
