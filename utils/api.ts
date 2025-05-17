import { mockPersonnel, mockTasks, mockUtils } from './mockData';
import { Personnel, Task } from './types';

// API configuration
let API_URL: string;

API_URL = 'http://localhost:8080/api';

const USE_MOCK_DATA = false;

// Fonctions d'API pour le personnel
export const personnelApi = {
  // Récupérer tous les membres du personnel
  getAll: async (): Promise<Personnel[]> => {
    if (USE_MOCK_DATA) {
      console.log('Utilisation des données fictives pour le personnel');
      return mockPersonnel;
    }
    
    try {
      const response = await fetch(`${API_URL}/personnels`);
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération du personnel:', error);
      throw error;
    }
  },

  // Récupérer un membre du personnel par ID
  getById: async (id: number): Promise<Personnel> => {
    if (USE_MOCK_DATA) {
      console.log(`Utilisation des données fictives pour le personnel ${id}`);
      const personnel = mockPersonnel.find(p => p.id === id);
      if (!personnel) {
        throw new Error(`Personnel avec l'ID ${id} non trouvé`);
      }
      return personnel;
    }
    
    try {
      const response = await fetch(`${API_URL}/personnels/${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la récupération du personnel ${id}:`, error);
      throw error;
    }
  },

  // Récupérer un membre du personnel avec ses tâches
  getWithTasks: async (id: number): Promise<Personnel> => {
    if (USE_MOCK_DATA) {
      console.log(`Utilisation des données fictives pour le personnel ${id} avec ses tâches`);
      const personnel = mockPersonnel.find(p => p.id === id);
      if (!personnel) {
        throw new Error(`Personnel avec l'ID ${id} non trouvé`);
      }
      
      // Ajouter les tâches au personnel
      const personnelWithTasks = { ...personnel };
      personnelWithTasks.taches = mockUtils.getTasksByPersonnelId(id);
      return personnelWithTasks;
    }
    
    try {
      const response = await fetch(`${API_URL}/personnels/${id}/tasks`);
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la récupération du personnel ${id} avec ses tâches:`, error);
      throw error;
    }
  },

  // Créer un nouveau membre du personnel
  create: async (personnel: Partial<Personnel>): Promise<Personnel> => {
    if (USE_MOCK_DATA) {
      console.log('Utilisation des données fictives pour créer un personnel');
      // Simuler la création d'un nouveau personnel
      const newId = Math.max(...mockPersonnel.map(p => p.id || 0)) + 1;
      const newPersonnel: Personnel = {
        id: newId,
        nom: personnel.nom || '',
        prenom: personnel.prenom || '',
        email: personnel.email || '',
        telephone: personnel.telephone,
        poste: personnel.poste,
        departement: personnel.departement,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockPersonnel.push(newPersonnel);
      return newPersonnel;
    }
    
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

  // Mettre à jour un membre du personnel
  update: async (id: number, personnel: Partial<Personnel>): Promise<Personnel> => {
    if (USE_MOCK_DATA) {
      console.log(`Utilisation des données fictives pour mettre à jour le personnel ${id}`);
      const index = mockPersonnel.findIndex(p => p.id === id);
      if (index === -1) {
        throw new Error(`Personnel avec l'ID ${id} non trouvé`);
      }
      
      // Mettre à jour le personnel
      mockPersonnel[index] = {
        ...mockPersonnel[index],
        ...personnel,
        updatedAt: new Date().toISOString()
      };
      
      return mockPersonnel[index];
    }
    
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

  // Supprimer un membre du personnel
  delete: async (id: number): Promise<{ success: boolean }> => {
    if (USE_MOCK_DATA) {
      console.log(`Utilisation des données fictives pour supprimer le personnel ${id}`);
      const index = mockPersonnel.findIndex(p => p.id === id);
      if (index === -1) {
        throw new Error(`Personnel avec l'ID ${id} non trouvé`);
      }
      
      // Supprimer le personnel
      mockPersonnel.splice(index, 1);
      
      return { success: true };
    }
    
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

// Fonctions d'API pour les tâches
export const taskApi = {
  // Récupérer toutes les tâches
  getAll: async (): Promise<Task[]> => {
    if (USE_MOCK_DATA) {
      console.log('Utilisation des données fictives pour les tâches');
      return mockTasks;
    }
    
    try {
      const response = await fetch(`${API_URL}/tasks`);
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
      throw error;
    }
  },

  // Récupérer une tâche par ID
  getById: async (id: number): Promise<Task> => {
    if (USE_MOCK_DATA) {
      console.log(`Utilisation des données fictives pour la tâche ${id}`);
      const task = mockTasks.find(t => t.id === id);
      if (!task) {
        throw new Error(`Tâche avec l'ID ${id} non trouvée`);
      }
      return task;
    }
    
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la récupération de la tâche ${id}:`, error);
      throw error;
    }
  },

  // Récupérer toutes les tâches d'un membre du personnel
  getByPersonnel: async (personnelId: number): Promise<Task[]> => {
    if (USE_MOCK_DATA) {
      console.log(`Utilisation des données fictives pour les tâches du personnel ${personnelId}`);
      return mockUtils.getTasksByPersonnelId(personnelId);
    }
    
    try {
      const response = await fetch(`${API_URL}/tasks/personnel/${personnelId}`);
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la récupération des tâches du personnel ${personnelId}:`, error);
      throw error;
    }
  },

  // Récupérer les tâches réalisées d'un membre du personnel
  getCompletedByPersonnel: async (personnelId: number): Promise<Task[]> => {
    if (USE_MOCK_DATA) {
      console.log(`Utilisation des données fictives pour les tâches réalisées du personnel ${personnelId}`);
      return mockUtils.getCompletedTasksByPersonnelId(personnelId);
    }
    
    try {
      const response = await fetch(`${API_URL}/tasks/personnel/${personnelId}/completed`);
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la récupération des tâches réalisées du personnel ${personnelId}:`, error);
      throw error;
    }
  },

  // Récupérer les tâches non réalisées d'un membre du personnel
  getPendingByPersonnel: async (personnelId: number): Promise<Task[]> => {
    if (USE_MOCK_DATA) {
      console.log(`Utilisation des données fictives pour les tâches non réalisées du personnel ${personnelId}`);
      return mockUtils.getPendingTasksByPersonnelId(personnelId);
    }
    
    try {
      const response = await fetch(`${API_URL}/tasks/personnel/${personnelId}/pending`);
      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la récupération des tâches non réalisées du personnel ${personnelId}:`, error);
      throw error;
    }
  },

  // Créer une nouvelle tâche
  create: async (task: Partial<Task>): Promise<Task> => {
    if (USE_MOCK_DATA) {
      console.log('Utilisation des données fictives pour créer une tâche');
      // Simuler la création d'une nouvelle tâche
      const newId = Math.max(...mockTasks.map(t => t.id || 0)) + 1;
      const newTask: Task = {
        id: newId,
        titre: task.titre || '',
        description: task.description || '',
        dateEcheance: task.dateEcheance,
        priorite: task.priorite,
        statut: task.statut || 'à faire',
        realisee: task.realisee || false,
        personnelId: task.personnelId || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Ajouter les informations du personnel si disponibles
      if (task.personnelId) {
        const personnel = mockPersonnel.find(p => p.id === task.personnelId);
        if (personnel) {
          newTask.personnel = personnel;
        }
      }
      
      mockTasks.push(newTask);
      return newTask;
    }
    
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

  // Mettre à jour une tâche
  update: async (id: number, task: Partial<Task>): Promise<Task> => {
    if (USE_MOCK_DATA) {
      console.log(`Utilisation des données fictives pour mettre à jour la tâche ${id}`);
      const index = mockTasks.findIndex(t => t.id === id);
      if (index === -1) {
        throw new Error(`Tâche avec l'ID ${id} non trouvée`);
      }
      
      // Mettre à jour la tâche
      mockTasks[index] = {
        ...mockTasks[index],
        ...task,
        updatedAt: new Date().toISOString()
      };
      
      // Mettre à jour les informations du personnel si nécessaire
      if (task.personnelId && task.personnelId !== mockTasks[index].personnelId) {
        const personnel = mockPersonnel.find(p => p.id === task.personnelId);
        if (personnel) {
          mockTasks[index].personnel = personnel;
        }
      }
      
      return mockTasks[index];
    }
    
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

  // Marquer une tâche comme réalisée
  markAsCompleted: async (id: number): Promise<Task> => {
    if (USE_MOCK_DATA) {
      console.log(`Utilisation des données fictives pour marquer la tâche ${id} comme réalisée`);
      const index = mockTasks.findIndex(t => t.id === id);
      if (index === -1) {
        throw new Error(`Tâche avec l'ID ${id} non trouvée`);
      }
      
      // Marquer la tâche comme réalisée
      mockTasks[index] = {
        ...mockTasks[index],
        realisee: true,
        statut: 'terminée',
        updatedAt: new Date().toISOString()
      };
      
      return mockTasks[index];
    }
    
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

  // Supprimer une tâche
  delete: async (id: number): Promise<{ success: boolean }> => {
    if (USE_MOCK_DATA) {
      console.log(`Utilisation des données fictives pour supprimer la tâche ${id}`);
      const index = mockTasks.findIndex(t => t.id === id);
      if (index === -1) {
        throw new Error(`Tâche avec l'ID ${id} non trouvée`);
      }
      
      // Supprimer la tâche
      mockTasks.splice(index, 1);
      
      return { success: true };
    }
    
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
