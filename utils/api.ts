import { Personnel, Task } from './types';

/**
 * Configuration de l'API
 */
let API_URL: string = 'http://localhost:8080/api';

/**
 * API pour la gestion des membres du personnel
 */
export const personnelApi = {
  /**
   * Récupère la liste complète des membres du personnel
   * @returns Une promesse contenant un tableau de membres du personnel
   */
  getAll: async (): Promise<Personnel[]> => {
    try {
      const response = await fetch(`${API_URL}/personnels`);
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération du personnel:', error);
      throw error;
    }
  },

  /**
   * Récupère un membre du personnel par son identifiant
   * @param id - L'identifiant du membre du personnel
   * @returns Une promesse contenant les données du membre du personnel
   */
  getById: async (id: number): Promise<Personnel> => {
    try {
      const response = await fetch(`${API_URL}/personnels/${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la récupération du personnel ${id}:`, error);
      throw error;
    }
  },

  /**
   * Récupère un membre du personnel avec la liste de ses tâches associées
   * @param id - L'identifiant du membre du personnel
   * @returns Une promesse contenant les données du membre du personnel incluant ses tâches
   */
  getWithTasks: async (id: number): Promise<Personnel> => {
    try {
      const response = await fetch(`${API_URL}/personnels/${id}/tasks`);
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la récupération du personnel ${id} avec ses tâches:`, error);
      throw error;
    }
  },

  /**
   * Crée un nouveau membre du personnel
   * @param personnel - Les données du membre du personnel à créer
   * @returns Une promesse contenant les données du membre du personnel créé
   */
  create: async (personnel: Partial<Personnel>): Promise<Personnel> => {
    try {
      const response = await fetch(`${API_URL}/personnels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personnel),
      });
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la création du personnel:', error);
      throw error;
    }
  },

  /**
   * Met à jour les informations d'un membre du personnel existant
   * @param id - L'identifiant du membre du personnel à mettre à jour
   * @param personnel - Les nouvelles données du membre du personnel
   * @returns Une promesse contenant les données du membre du personnel mis à jour
   */
  update: async (id: number, personnel: Partial<Personnel>): Promise<Personnel> => {
    try {
      const response = await fetch(`${API_URL}/personnels/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personnel),
      });
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du personnel ${id}:`, error);
      throw error;
    }
  },

  /**
   * Supprime un membre du personnel
   * @param id - L'identifiant du membre du personnel à supprimer
   * @returns Une promesse contenant un objet indiquant le succès de l'opération
   */
  delete: async (id: number): Promise<{ success: boolean }> => {
    try {
      const response = await fetch(`${API_URL}/personnels/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la suppression du personnel ${id}:`, error);
      throw error;
    }
  },
};

/**
 * API pour la gestion des tâches
 */
export const taskApi = {
  /**
   * Récupère la liste complète des tâches
   * @returns Une promesse contenant un tableau de tâches
   */
  getAll: async (): Promise<Task[]> => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
      throw error;
    }
  },

  /**
   * Récupère une tâche par son identifiant
   * @param id - L'identifiant de la tâche
   * @returns Une promesse contenant les données de la tâche
   */
  getById: async (id: number): Promise<Task> => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la récupération de la tâche ${id}:`, error);
      throw error;
    }
  },

  /**
   * Récupère toutes les tâches assignées à un membre du personnel spécifique
   * @param personnelId - L'identifiant du membre du personnel
   * @returns Une promesse contenant un tableau des tâches du membre du personnel
   */
  getByPersonnel: async (personnelId: number): Promise<Task[]> => {
    try {
      const response = await fetch(`${API_URL}/tasks/personnel/${personnelId}`);
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la récupération des tâches du personnel ${personnelId}:`, error);
      throw error;
    }
  },

  /**
   * Récupère les tâches terminées d'un membre du personnel spécifique
   * @param personnelId - L'identifiant du membre du personnel
   * @returns Une promesse contenant un tableau des tâches terminées du membre du personnel
   */
  getCompletedByPersonnel: async (personnelId: number): Promise<Task[]> => {
    try {
      const response = await fetch(`${API_URL}/tasks/personnel/${personnelId}/completed`);
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la récupération des tâches réalisées du personnel ${personnelId}:`, error);
      throw error;
    }
  },

  /**
   * Récupère les tâches en cours (non terminées) d'un membre du personnel spécifique
   * @param personnelId - L'identifiant du membre du personnel
   * @returns Une promesse contenant un tableau des tâches en cours du membre du personnel
   */
  getPendingByPersonnel: async (personnelId: number): Promise<Task[]> => {
    try {
      const response = await fetch(`${API_URL}/tasks/personnel/${personnelId}/pending`);
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la récupération des tâches non réalisées du personnel ${personnelId}:`, error);
      throw error;
    }
  },

  /**
   * Crée une nouvelle tâche
   * @param task - Les données de la tâche à créer
   * @returns Une promesse contenant les données de la tâche créée
   */
  create: async (task: Partial<Task>): Promise<Task> => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la création de la tâche:', error);
      throw error;
    }
  },

  /**
   * Met à jour les informations d'une tâche existante
   * @param id - L'identifiant de la tâche à mettre à jour
   * @param task - Les nouvelles données de la tâche
   * @returns Une promesse contenant les données de la tâche mise à jour
   */
  update: async (id: number, task: Partial<Task>): Promise<Task> => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la tâche ${id}:`, error);
      throw error;
    }
  },

  /**
   * Marque une tâche comme terminée
   * @param id - L'identifiant de la tâche à marquer comme terminée
   * @returns Une promesse contenant les données de la tâche mise à jour
   */
  markAsCompleted: async (id: number): Promise<Task> => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}/complete`, {
        method: 'PUT',
      });
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors du marquage de la tâche ${id} comme réalisée:`, error);
      throw error;
    }
  },

  /**
   * Supprime une tâche
   * @param id - L'identifiant de la tâche à supprimer
   * @returns Une promesse contenant un objet indiquant le succès de l'opération
   */
  delete: async (id: number): Promise<{ success: boolean }> => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la suppression de la tâche ${id}:`, error);
      throw error;
    }
  },
};
